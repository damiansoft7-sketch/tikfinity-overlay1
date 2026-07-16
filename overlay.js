// =====================================
// OVERLAY TIKFINITY
// PRISM LIVE MOBILE 9:16
// =====================================


// Cargar diseño guardado

function cargarOverlay(){

    firebase.database()
    .ref("diseño")
    .once("value")
    .then(snapshot=>{


        const datos = snapshot.val();


        if(!datos){

            console.log("No existe diseño guardado");

            return;

        }


        datos.forEach(item=>{


            const elemento = document.getElementById(item.id);


            if(elemento){


                elemento.style.left = item.x + "px";

                elemento.style.top = item.y + "px";

                elemento.style.width = item.width + "px";

                elemento.style.height = item.height + "px";

                elemento.style.transform = item.transform;


            }


        });



    });


}



// Actualizar cada cierto tiempo
// para recibir cambios nuevos

setInterval(()=>{

    cargarOverlay();

},5000);



// iniciar

window.onload=()=>{

    cargarOverlay();

};
