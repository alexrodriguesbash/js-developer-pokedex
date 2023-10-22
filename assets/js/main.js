const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
       

        <li class="pokemon ${pokemon.type}">

            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            </a>
        </li>
       
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


pokemonList.addEventListener('click', async (event) => {
    let target = event.target;
    while (target !== null) {
        if (target.classList.contains('pokemon')) {
            const pokemonName= target.querySelector('.name').textContent; 
            const pokemonNumber= target.querySelector('.number').textContent.replace('#', '');      
            const modalContent = document.getElementById('modalContent');

            // Você pode usar o nome do Pokémon (obtido do elemento com classe "name") para preencher o conteúdo do modal
            modalContent.innerHTML = `
                <div class="image-container">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonNumber}.svg" alt="${pokemonName}">
                </div>

                <h3>#${pokemonName}</h3>
                <h3>${pokemonNumber}</h3>
            `;

            const modal = document.getElementById('pokemonModal');
            modal.style.display = 'block';

            const closeBtn = document.querySelector('.close');
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            // Feche o modal se o usuário clicar fora dele
            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });

            break; // Sair do loop após encontrar o elemento com a classe "pokemon"
        }
        target = target.parentElement; // Verificar elementos pais
    }
});


