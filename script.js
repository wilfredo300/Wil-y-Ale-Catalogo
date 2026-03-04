import { productos } from './productos.js';

const gridHoy = document.getElementById('grid-hoy');
const gridPedidos = document.getElementById('grid-pedidos');
const buscador = document.getElementById('buscador');

function crearCard(prod) {
    const card = document.createElement('div');
    card.className = 'producto-card';
    const rutaImagen = prod.imagen ? `img/${prod.imagen}` : 'img/default.png';
    
    const infoStock = prod.tipo === 'hoy' 
        ? `<p class="stock-hoy">Disponible hoy` 
        : `<p class="stock-hoy bajo-pedido">Bajo pedido</p>`;
//: ${prod.stock} unid.</p> esto iba en hace 2 lineas
    card.innerHTML = `
        <div class="imagen-contenedor">
            <img src="${rutaImagen}" alt="${prod.nombre}" onerror="this.src='img/default.png'; this.onerror=null;">
        </div>
        <div class="producto-info">
            <h3>${prod.nombre}</h3>
            ${infoStock}
            </div>
    `;
           // <div class="precio-tag">S/ ${prod.precio.toFixed(2)}</div> incluir el precio cuando haya xd
    return card;
}

function renderizar(lista) {
    gridHoy.innerHTML = "";
    gridPedidos.innerHTML = "";
    let hayParaHoy = false;
    lista.forEach(prod => {
        const card = crearCard(prod);
        if (prod.tipo === 'hoy') {
            gridHoy.appendChild(card);
            hayParaHoy = true;
        } else {
            gridPedidos.appendChild(card);
        }
    });
    if(!hayParaHoy){
        const noDisponible = document.createElement('div');
        noDisponible.className = 'noDisponible';
        noDisponible.innerHTML = '<p>No hay productos disponibles para hoy</p>';
        gridHoy.appendChild(noDisponible);
    }

}

buscador.oninput = () => {
    const termino = buscador.value.toLowerCase();
    const filtrados = productos.filter(p => 
        p.nombre.toLowerCase().includes(termino) || 
        p.categoria.toLowerCase().includes(termino)
    );
    renderizar(filtrados);
};

// Carga Inicial
renderizar(productos);
let a = 2;
let b = 6;
let galeria = productos.slice(a,b);
let carrusel = document.getElementById("carrusel");

function renderizarCarrusel(lista){
    carrusel.innerHTML = "";
    let btnIzq = document.createElement("div");
    let btnDer = document.createElement("div");
    btnIzq.className = btnDer.className = "boton-carrusel";
    carrusel.appendChild(btnIzq);
    for(let element of galeria){
        const rutaImagen = element.imagen? `img/${element.imagen}` : "img/default.png";
        carrusel.innerHTML += `
        <div class="producto-card">
            <div class="imagen-contenedor">
                <img src="${rutaImagen}" alt="${element.nombre}">
            </div>
        </div>  
            `
    }
    carrusel.appendChild(btnDer);
}

renderizarCarrusel(galeria);

carrusel.addEventListener("click",(e)=>{

    if(!e.target.classList.contains("boton-carrusel")) return;
    const botones = document.querySelectorAll(".boton-carrusel");
    if(e.target == botones[0]){
        a--;
        b--;
        if(a<0){
            b = productos.length;
            a = b - 4;
        }
    }
    if(e.target == botones[1]){
        a++;
        b++;
        if(b>productos.length){
            a = 0;
            b = a+4;
        }
    }
    galeria = productos.slice(a,b);
    
    renderizarCarrusel(galeria);
    
});
