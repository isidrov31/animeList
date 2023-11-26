//obtengo los elementos del html
const addAnime1 = document.getElementById("addAnime1")
const addAnime2 = document.getElementById("addAnime2")
nombreAnimeNico = document.getElementById("nombreAnimeNico")
temporadaAnimeNico = document.getElementById("temporadaAnimeNico")
capituloAnimeNico = document.getElementById("capituloAnimeNico")
estadoAnimeNico = document.getElementById("estadoAnimeNico")
nombreAnimeLuciano = document.getElementById("nombreAnimeLuciano")
temporadaAnimeLuciano = document.getElementById("temporadaAnimeLuciano")
capituloAnimeLuciano = document.getElementById("capituloAnimeLuciano")
estadoAnimeLuciano = document.getElementById("estadoAnimeLuciano")
animeAgregadosNico = document.getElementById("animeAgregadosNico")
animeAgregadosLuciano = document.getElementById("animeAgregadosLuciano")

const baseUrl = `${window.origin}/api`

let animeEdit = null

//le doy funcionalidad a los botones

addAnime1.addEventListener("click", function(){
    const creating = !animeEdit
    console.log("Agregar anime")
    console.log({nombreAnimeNico})
    console.log({temporadaAnimeNico})
    console.log({capituloAnimeNico})
    console.log({estadoAnimeNico})
    const path = creating ? "anime" : `anime/${animeEdit._id}`
    const method = creating ? "POST" : "PUT"

    fetch(`${baseUrl}/${path}`,{
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            name: nombreAnimeNico.value, 
            season: temporadaAnimeNico.value, 
            chapter: capituloAnimeNico.value, 
            state: estadoAnimeNico.value,
            user: "nico" }),
    })
    .then((res) => {
        nombreAnimeNico.value = "",
        temporadaAnimeNico.value= "",
        capituloAnimeNico.value= "",
        estadoAnimeNico.value= "",
        getAnimeNico()
        addAnime1.innerText = "Agregar Anime"
        console.log({ res })
        return res.json()
    })
    .then((resJSON) => {
        console.log({ resJSON })
    })
    .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
    });
});

addAnime2.addEventListener("click", function(){
    const creating = !animeEdit
    console.log("Agregar anime")
    console.log({nombreAnimeLuciano})
    console.log({temporadaAnimeLuciano})
    console.log({capituloAnimeLuciano})
    console.log({estadoAnimeLuciano})
    const path = creating ? "anime" : `anime/${animeEdit._id}`
    const method = creating ? "POST" : "PUT"

    fetch(`${baseUrl}/${path}`,{
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            name: nombreAnimeLuciano.value, 
            season: temporadaAnimeLuciano.value, 
            chapter: capituloAnimeLuciano.value, 
            state: estadoAnimeLuciano.value,
            user: "luciano" }),
    })
    .then((res) => {
        nombreAnimeLuciano.value = "",
        temporadaAnimeLuciano.value= "",
        capituloAnimeLuciano.value= "",
        estadoAnimeLuciano.value= "",
        getAnimeLuciano()
        addAnime2.innerText = "Agregar Anime"
        console.log({ res })
        return res.json()
    })
    .then((resJSON) => {
        console.log({ resJSON })
    })
    .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
    });
});

function getAnimeNico() {
    animeAgregadosNico.innerHTML = null;

    fetch(`${baseUrl}/anime`)
        .then((res) => res.json())
        .then((resJSON) => {
            const animes = resJSON.data;

            const nicoContainer = document.createElement('div');
            nicoContainer.classList.add('col-md-6');

            for (const anime of animes) {
                if (anime.user === 'nico') {
                    const animeCard = createAnimeCard(anime);
                    nicoContainer.appendChild(animeCard);
                }
            }

            animeAgregadosNico.appendChild(nicoContainer);
        });
}

function getAnimeLuciano() {
    animeAgregadosLuciano.innerHTML = null;

    fetch(`${baseUrl}/anime`)
        .then((res) => res.json())
        .then((resJSON) => {
            const animes = resJSON.data;

            const lucianoContainer = document.createElement('div');
            lucianoContainer.classList.add('col-md-6');

            for (const anime of animes) {
                if (anime.user === 'luciano') {
                    const animeCard = createAnimeCard(anime);
                    lucianoContainer.appendChild(animeCard);
                }
            }

            animeAgregadosLuciano.appendChild(lucianoContainer);
        });
}

function createAnimeCard(anime) {
    const animeCard = document.createElement('div');
    animeCard.classList.add('card', 'mb-3', 'col-md-6');

    // Mostrar el nombre de la anime
    const nombreParagraph = document.createElement('p');
    nombreParagraph.innerText = `Nombre: ${anime.name}`;
    animeCard.appendChild(nombreParagraph);

    // Mostrar el season de la anime
    const seasonParagraph = document.createElement('p');
    seasonParagraph.innerText = `Season: ${anime.season}`;
    animeCard.appendChild(seasonParagraph);

    // Mostrar el chapter de la anime
    const chapterParagraph = document.createElement('p');
    chapterParagraph.innerText = `Capitulo: ${anime.chapter}`;
    animeCard.appendChild(chapterParagraph);

    // Mostrar el state de la anime
    const stateParagraph = document.createElement('p');
    stateParagraph.innerText = `Estado: ${anime.state}`;
    animeCard.appendChild(stateParagraph);

    // Agregar botón de borrado
    const deleteAnimeBtn = document.createElement('button');
    deleteAnimeBtn.innerText = 'Borrar';
    deleteAnimeBtn.classList.add('btn', 'btn-danger', 'delete-button');
    // Configurar el ID
    deleteAnimeBtn.setAttribute('id', anime._id);

    deleteAnimeBtn.addEventListener('click', function (e) {
        animeid = e.target.id;
        fetch(`${baseUrl}/anime/${animeid}`, {
            method: 'DELETE',
        }).then(() => {
            animeCard.remove();
        });
    });

    animeCard.appendChild(deleteAnimeBtn);

    return animeCard;
}


getAnimeNico();
getAnimeLuciano();