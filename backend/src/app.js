const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
const port = 3002;

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.use(express.json())


app.get("/", (req,res)=>{
    res.send("Arkham Asylum")
})


///////////////////////////////////    API DE CRIMINALES    /////////////////////////////////////



app.get('/api/v1/criminales', async (req,res)=>{
    const criminales = await prisma.criminal.findMany() //findMany = SELECT * FROM DBG
    res.send(criminales)
})

app.get('/api/v1/criminales/:id', async (req,res)=>{
    const criminal = await prisma.criminal.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    if (criminal === null){
        res.sendStatus(404);
        return
    };

    res.send(criminal)
})


app.post('/api/v1/criminales', async (req, res) => {

    let personal = await prisma.personal.findUnique({
        where: {
            dni: parseInt(req.body.personal_asignado)
        }
    })

    if (personal === null){
        res.sendStatus(400)
        return
    }

    let celda = await prisma.celda.findUnique({
        where: {
            numero_celda: parseInt(req.body.celda)
        }
    })

    if (celda === null){
        res.sendStatus(400)
        return
    }



    const criminal = await prisma.criminal.create({
        data: {
            nombre: req.body.nombre,
            apodo: req.body.apodo,
            edad: req.body.edad,
            genero: req.body.genero,
            peligrosidad: req.body.peligrosidad,
            tratamiento: req.body.tratamiento,
            personal_asignado: req.body.personal_asignado,
            celda: req.body.celda,
            foto: req.body.foto
        }
    })

    res.status(201).send(criminal); // Devolvemos el usuario creado
})


app.delete('/api/v1/criminales/:id', async (req,res)=>{
    const criminal = await prisma.criminal.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (criminal === null){
        res.sendStatus(404)
        return
    }

    await prisma.criminal.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.send(criminal) //devolvemos el usuario borrado
})


app.put('/api/v1/criminales/:id', async (req,res)=> {
    let criminal = await prisma.criminal.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if(criminal === null){ 
        res.sendStatus(404)
        return
    }
    if (req.body.numero_celda !== null){
        let celda = await prisma.celda.findUnique({
            where: {
                numero_celda: parseInt(req.body.celda)
            }
        })
        if (celda === null){
            res.sendStatus(404)
            return
        }
    }
    
    if ( req.body.personal_asignado !== null){
        let personal = await prisma.personal.findUnique({
            where: {
                dni: parseInt(req.body.personal_asignado)
            }
        })
        if (personal === null){
            res.sendStatus(400)
            return
        }
    }
    

    await prisma.criminal.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            nombre: req.body.nombre,
            apodo: req.body.apodo,
            edad: req.body.edad,
            genero: req.body.genero,
            peligrosidad: req.body.peligrosidad,
            tratamiento: req.body.tratamiento,
            personal_asignado: req.body.personal_asignado,
            celda: req.body.celda,
            foto: req.body.foto
            //si le paso undefined, no me lo modifica
        }
    })
    res.send(criminal)

})



///////////////////////////////////    personal    /////////////////////////////////////



app.get('/api/v1/personal', async (req,res)=>{ //traer todo el personal
    const personal = await prisma.personal.findMany()
    res.send(personal)
})



app.get('/api/v1/personal/:dni', async (req,res)=>{ //traer un trabajador del personal
    const laburante = await prisma.personal.findUnique({
        where: {
            dni: parseInt(req.params.dni)
        }
    })
    res.send(laburante)
})





app.delete('/api/v1/personal/:dni', async (req,res)=>{  //borrar alguno edl personal
    const laburante = await prisma.personal.findUnique({
        where: {
            dni: parseInt(req.params.dni)
        }})
    if(laburante === null){
        res.sendStatus(404)
        return
    }
    await prisma.personal.delete({
        where: {
            dni: parseInt(req.params.dni)
        }
    })
    res.send(laburante)
})




app.post('/api/v1/personal', async (req, res) => {  //crear alguien del personal
    const nuevo_laburante = await prisma.personal.create({
        data: {
            dni: parseInt(req.body.dni),
            nombre: req.body.nombre,
            rol: req.body.rol,
            turno: req.body.turno,
            contacto: parseInt(req.body.contacto)
        }})
    res.send(nuevo_laburante)
})





app.put('/api/v1/personal/:dni', async (req,res)=> {  //modificar alguien del personal
    let laburante = await prisma.personal.findUnique({
        where: {
            dni: parseInt(req.params.dni)
        }
    })
    if(laburante === null){ // -1 es igual a que no lo encontró
        res.sendStatus(404)
        return
    }
    await prisma.personal.update({
        where: {
            dni: parseInt(req.params.dni)
        },
        data: {
            dni: req.body.dni,
            nombre: req.body.nombre,
            rol: req.body.rol,
            turno: req.body.turno,
            contacto: parseInt(req.body.contacto)
            
        }
    })
    res.send(laburante)

})



/////////////////////////////////////  delitos   //////////////////////////////////////////////////////



app.get('/api/v1/delitos', async (req,res)=>{
    const delitos = await prisma.delito.findMany()
    res.send(delitos)
})


app.get('/api/v1/delitos/:numero_delito', async (req,res)=>{
    const delito = await prisma.delito.findUnique({
        where: {
            numero_delito: parseInt(req.params.numero_delito)
        }
    })
    if (delito === null){
        res.sendStatus(404)
        return
    }
    res.send(delito)
})


app.post('/api/v1/delitos', async (req,res)=>{
    let criminal = await prisma.criminal.findUnique({ 
        where: {
            id: parseInt(req.body.criminal_id)
        },
    })
    if (criminal === null){  //validación
        res.sendStatus(404)
        return
    }

    let delito = await prisma.delito.create({
        data: {
            criminal_id: parseInt(req.body.criminal_id),
            descripcion: req.body.descripcion,
            fecha: req.body.fecha,
            sentencia_judicial: req.body.sentencia_judicial,
            lugarDelito: req.body.lugarDelito,
            estadoDelito: req.body.estadoDelito,
            nivelPrioridad: req.body.nivelPrioridad
        }
    })
    res.send(delito)
})

app.delete('/api/v1/delitos/:numero_delito', async  (req,res)=>{

    let delito = await prisma.delito.findUnique({
        where: {
            numero_delito: parseInt(req.params.numero_delito)
        },
    })
    if (delito === null){
        res.sendStatus(404)
        return
    }
    await prisma.delito.delete({
        where: {
            numero_delito: parseInt(req.params.numero_delito)
        },    
    })
    res.send(delito)
})

app.put('/api/v1/delitos/:numero_delito', async (req,res)=>{
    const delito = await prisma.delito.findUnique({
        where: {
            numero_delito: parseInt(req.params.numero_delito)
        },
    })
    if (delito === null){
        res.sendStatus(404)
        return
    }


    if (req.body.criminal_id !== null){
        let criminal = await prisma.criminal.findUnique({
            where: {
                id: req.body.criminal_id
            }
        })
        if (criminal === null){
            res.sendStatus(404)
            return
        }
    }

    await prisma.delito.update({
        where: {
            numero_delito: parseInt(req.params.numero_delito)
        },
        data: {
            criminal_id: req.body.criminal_id,
            descripcion: req.body.descripcion,
            fecha: req.body.fecha,
            sentencia_judicial: req.body.sentencia_judicial,
            lugarDelito: req.body.lugarDelito,
            estadoDelito: req.body.estadoDelito,
            nivelPrioridad: req.body.nivelPrioridad
        }
    })

    res.send(delito)
})




///////////////////////////// Celdas  /////////////////////////////


app.get('/api/v1/celdas', async (req, res)=>{
    const celdas = await prisma.celda.findMany()
    res.send(celdas)
})


app.get('/api/v1/celdas/:numero_celda', async (req, res)=>{
    const celda = await prisma.celda.findUnique({
        where: {
            numero_celda: parseInt(req.params.numero_celda)
        }
    })
    if (celda === null) {
        res.sendStatus(404)
        return
    }
    res.send(celda)
})

app.delete('/api/v1/celdas/:numero_celda', async (req,res)=>{
    const celda = await prisma.celda.findUnique({
        where: {
            numero_celda: parseInt(req.params.numero_celda)
        }
    })
    if (celda === null) {
        res.sendStatus(404)
        return
    }
    await prisma.celda.delete({
        where: {
            numero_celda: parseInt(req.params.numero_celda)
        }
    })
    res.send(celda)
})


app.put('/api/v1/celdas/:numero_celda', async (req,res)=>{
    let celda = await prisma.celda.findUnique({
        where: {
            numero_celda: parseInt(req.params.numero_celda)
        }
    })
    if (celda === null) {
        res.sendStatus(404)
        return
    }


    await prisma.celda.update({
        where: {
            numero_celda: parseInt(req.params.numero_celda)
        },
        data: {
            tipoCelda: req.body.tipoCelda,
            descripcionCelda: req.body.descripcionCelda,
            nivelSeguridad: req.body.nivelSeguridad,
            camarasSeguridad: JSON.parse(req.body.camarasSeguridad),
            sensoresMovimiento: JSON.parse(req.body.sensoresMovimiento),
            alarmas: JSON.parse(req.body.alarmas),
            piso: req.body.piso,
            capacidad: req.body.capacidad
        }
    })
    res.send(celda)
})


app.post('/api/v1/celdas', async (req,res)=>{
    const celda = await prisma.celda.create({
        data: {
            
            tipoCelda: req.body.tipoCelda,   
            descripcionCelda: req.body.descripcionCelda,
            nivelSeguridad: req.body.nivelSeguridad,
            camarasSeguridad: JSON.parse(req.body.camarasSeguridad),
            sensoresMovimiento: JSON.parse(req.body.sensoresMovimiento),
            alarmas: JSON.parse(req.body.alarmas),       
            piso: req.body.piso,          
            capacidad: req.body.capacidad,     

        }
    })
    res.send(celda)
})





app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
})