// Ruta al archivo JSON
const courseJsonFile = 'assets/json/course.json'; // Renombra la variable

// Función para cargar el JSON y generar las tarjetas
fetch(courseJsonFile)
    .then(response => response.json())
    .then(courseData => {
        const carousel = document.getElementById('carousel');

        courseData.forEach(course => {
            const card = document.createElement('div');
            card.classList.add('courseCard');

            card.innerHTML = `
                <img src="${course.videoThumbnail}" alt="Course Image">
                <div class="courseInfo">
                    <p class="courseTitle">${course.videoTitle}</p>
                    <a href="${course.videoLink}" class="startButton" target="_blank">Iniciar</a>
                </div>
            `;

            // Añadir la tarjeta generada al carrusel
            carousel.appendChild(card);
        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

