// =====================================
// EDITOR TIKFINITY OVERLAY
// PRISM LIVE MOBILE 9:16
// =====================================


let elementoSeleccionado = null;


// Obtener widgets

const widgets = document.querySelectorAll(".widget");



// ===============================
// SELECCIONAR WIDGET
// ===============================

widgets.forEach(widget => {


    widget.addEventListener("click",()=>{


        elementoSeleccionado = widget;


        widget.classList.add("seleccionado");


        moveable.target = widget;


    });


});



// ===============================
// MOVEABLE
// ===============================


const moveable = new Moveable(document.body,{

    target:null,

    draggable:true,

    resizable:true,

    keepRatio:false

});




// Movimiento

moveable.on("drag",e=>{


    e.target.style.transform = e.transform;


});



// Tamaño

moveable.on("resize",e=>{


    e.target.style.width = e.width + "px";

    e.target.style.height = e.height + "px";


    e.target.style.transform = e.drag.transform;


});





// ===============================
// GUARDAR DISEÑO
// ===============================


function guardarDiseño(){


    let datos=[];



    document.querySelectorAll(".widget").forEach(widget=>{


        datos.push({


            id:widget.id,


            x:widget.offsetLeft,


            y:widget.offsetTop,


            width:widget.offsetWidth,


            height:widget.offsetHeight,


            transform:widget.style.transform



        });



    });



    firebase.database()
    .ref("diseño")
    .set(datos)
    .then(()=>{


        alert("Diseño guardado correctamente");


    });



}





// ===============================
// CARGAR DISEÑO
// ===============================


function cargarDiseño(){



    firebase.database()
    .ref("diseño")
    .once("value")
    .then(snapshot=>{


        const datos=snapshot.val();



        if(!datos)return;



        datos.forEach(item=>{


            const widget=document.getElementById(item.id);



            if(widget){


                widget.style.left=item.x+"px";


                widget.style.top=item.y+"px";


                widget.style.width=item.width+"px";


                widget.style.height=item.height+"px";


                widget.style.transform=item.transform;


            }



        });



    });



}





// ===============================
// BOTÓN GUARDAR
// ===============================


document
.getElementById("btnGuardar")
.addEventListener("click",guardarDiseño);





// INICIO

window.onload=()=>{


    cargarDiseño();


};
