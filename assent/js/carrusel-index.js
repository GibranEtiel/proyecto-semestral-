document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://my.api.mockaroo.com/users.json?key=9fdcc270';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const carouselInner = document.getElementById('carousel-inner');

            // Agrupar zapatillas en grupos de tres
            for (let i = 0; i < data.length; i += 3) {
                const isActive = i === 0 ? 'active' : '';
                const zapatillasGroup = data.slice(i, i + 3);

                const item = `
                    <div class="carousel-item ${isActive}">
                        <div class="row justify-content-center">
                            ${zapatillasGroup.map(zapatilla => `
                                <div class="col-md-4">
                                    <div class="card mb-4 shadow-sm" data-toggle="modal" data-target="#zapatillaModal" data-zapatilla-id="${zapatilla.id}">
                                        <img src="${zapatilla.imagen}" class="card-img-top" alt="${zapatilla.nombre}">
                                        <div class="card-body">
                                            <h5 class="card-title">${zapatilla.nombre}</h5>
                                            <p class="card-text"><b>Descripcion:</b> ${zapatilla.descripcion}</p>
                                            <p class="card-text">Tipo: ${zapatilla.tipo}</p>
                                            <p class="card-text"><b>${zapatilla.precio}</b></p>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                carouselInner.innerHTML += item;
            }

            // Manejar evento de clic en una tarjeta para mostrar detalles
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', () => {
                    const zapatillaId = card.getAttribute('data-zapatilla-id');
                    const zapatilla = data.find(z => z.id == zapatillaId);
                    mostrarDetallesZapatilla(zapatilla);
                });
            });
        })
        .catch(error => console.error('Error al obtener datos:', error));
});

function mostrarDetallesZapatilla(zapatilla) {
    const zapatillaDetalle = document.getElementById('zapatillaDetalle');
    zapatillaDetalle.innerHTML = `
        <img src="${zapatilla.imagen}" class="img-fluid mb-3" alt="${zapatilla.nombre}">
        <h5>${zapatilla.nombre}</h5>
        <p><b>Descripcion:</b> ${zapatilla.descripcion}</p>
        <p>Tipo: ${zapatilla.tipo}</p>
        <p><b>Precio:</b> ${zapatilla.precio}</p>
    `;
    const zapatillaModal = new bootstrap.Modal(document.getElementById('zapatillaModal'));
    zapatillaModal.show();
}