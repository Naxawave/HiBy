const jsonFile = 'assets/json/videoCards.json';

fetch(jsonFile)
    .then(response => response.json())
    .then(videoData => {
        const savedVideos = JSON.parse(localStorage.getItem('savedVideos')) || [];
        const savedContainer = document.getElementById('savedContainerContent');

        // Función para generar y agregar tarjeta guardada
        const createSavedCard = (video) => {
            const card = document.createElement('div');
            card.classList.add('startVideo');

            card.innerHTML = `
                <img src="${video.videoThumbnail}">
                <div class="additionalVideoInformation">
                    <div class="toolbarVideoInformation">
                        <button class="saveButton" data-id="${video.id}">${savedVideos.includes(video.id) ? 'Guardado' : 'Guardar'}</button>
                        <button onclick="window.open('${video.videoLink}')">Reproducir</button>
                        <button>Abrir</button>
                    </div>
                    <div class="videoDescription">
                        <p>${video.videoDescription}</p>
                    </div>
                </div>
                <div class="videoToolbar">
                    <div class="authorProfileImg">
                        <img src="${video.authorProfile}">
                    </div>
                    <div class="informationVideo">
                        <span>${video.videoTitle}</span>
                    </div>
                    <div class="interactiveButton">
                        <button class="toggleInfo">Más...</button>
                    </div>
                </div>
            `;

            savedContainer.appendChild(card);

            const additionalInfo = card.querySelector('.additionalVideoInformation');
            const toggleButton = card.querySelector('.toggleInfo');
            const saveButton = card.querySelector('.saveButton');

            additionalInfo.style.maxHeight = '0';

            toggleButton.addEventListener('click', () => {
                const isVisible = additionalInfo.classList.contains('show');

                if (isVisible) {
                    additionalInfo.style.maxHeight = '0';
                    toggleButton.textContent = 'Más...';
                    additionalInfo.addEventListener('transitionend', () => {
                        additionalInfo.classList.remove('show');
                    }, { once: true });
                } else {
                    additionalInfo.classList.add('show');
                    additionalInfo.style.maxHeight = additionalInfo.scrollHeight + 'px';
                    toggleButton.textContent = 'Menos...';
                }
            });

            // Evento para alternar entre guardar y eliminar video del localStorage
            saveButton.addEventListener('click', () => {
                toggleSaveVideo(saveButton, video.id);
            });
        };

        // Filtrar los videos que están en el localStorage y generarlos
        videoData.forEach((video) => {
            if (savedVideos.includes(video.id)) {
                createSavedCard(video);
            }
        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

// Función para alternar el guardado
const toggleSaveVideo = (saveButton, videoId) => {
    let savedVideos = JSON.parse(localStorage.getItem('savedVideos')) || [];

    if (savedVideos.includes(videoId)) {
        // Eliminar video de guardados
        savedVideos = savedVideos.filter(id => id !== videoId);
        saveButton.textContent = 'Guardar';
        alert('Video eliminado de guardados'); // Mensaje opcional
    } else {
        // Guardar video
        savedVideos.push(videoId);
        saveButton.textContent = 'Guardado';
        alert('Video guardado'); // Mensaje opcional
    }

    localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
};
