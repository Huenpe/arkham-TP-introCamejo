const slider = document.querySelector("#slider");
let sliderSecciones = document.querySelectorAll(".slider_seccion");

let sliderSeccionLast = sliderSecciones[sliderSecciones.length - 1];
slider.insertAdjacentElement('afterbegin', sliderSeccionLast);

function Sigueinte() {
    let sliderSeccionFirst = document.querySelectorAll(".slider_seccion")[0];
    slider.style.marginLeft = "-100%";
    slider.style.transition = "all 0.5s";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement('beforeend', sliderSeccionFirst);
        slider.style.marginLeft = "-0%"; 
    }, 500);
}

function Previo() {
    let sliderSecciones = document.querySelectorAll(".slider_seccion");
    let sliderSeccionLast = sliderSecciones[sliderSecciones.length - 1];
    slider.style.marginLeft = "0"; 
    slider.style.transition = "all 0.5s";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement('afterbegin', sliderSeccionLast); 
        slider.style.marginLeft = "-100%"; 
    }, 500);
}

setInterval(function(){
    Sigueinte();
}, 3000); // 
