// ===============================
// EDITOR TIKFINITY OVERLAY
// PRISM LIVE MOBILE - 9:16
// ===============================

const canvas = document.getElementById("canvas");

let selectedElement = null;


// Inicializar Moveable
const moveable = new Moveable(document.body, {
    target: null,
    draggable: true,
    resizable: true,
    keepRatio: false
});


// Seleccionar elementos
document.querySelectorAll(".widget").forEach(widget => {

    widget.addEventListener("click", () => {

        selectedElement = widget;

        moveable.target = widget;

    });

});


// Movimiento
moveable.on("drag", e => {

    e.target.style.transform = e.transform;

});


// Cambio de tamaño
moveable.on("resize", e => {

    e.target.style.width = `${e.width}px`;
    e.target.style.height = `${e.height}px`;

    e.target.style.transform = e.drag.transform;

});


// Guardar diseño
function guardarDiseño(){

    const elementos = [];

    document.querySelectorAll(".widget").forEach(widget => {

        elementos.push({

            id: widget.id,

            x: widget.offsetLeft,

            y: widget.offsetTop,

            width: widget.offsetWidth,

            height: widget.offsetHeight,

            transform: widget.style.transform

        });

    });


    firebase.database()
    .ref("diseño")
    .set(elementos)
    .then(()=>{

        alert("Diseño guardado");

    });

}



// Cargar diseño
function cargarDiseño(){

    firebase.database()
    .ref("diseño")
    .once("value")
    .then(snapshot=>{


        const datos = snapshot.val();


        if(!datos) return;


        datos.forEach(item=>{


            const elemento = document.getElementById(item.id);


            if(elemento){

                elemento.style.left=item.x+"px";

                elemento.style.top=item.y+"px";

                elemento.style.width=item.width+"px";

                elemento.style.height=item.height+"px";

                elemento.style.transform=item.transform;

            }


        });


    });

}


window.onload = ()=>{

    cargarDiseño();

};
