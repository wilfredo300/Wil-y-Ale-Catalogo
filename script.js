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
        : `<p class="stock-hoy" style="background:#fff3e0; color:#ef6c00;">Bajo pedido</p>`;
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
