// Fetching Pokémon data from the pokemon.json file
fetch("pokemon.json")
  .then((response) => response.json())
  .then((data) => initializePokedex(data))
  .catch((error) => console.error("Error loading Pokémon data:", error));

function initializePokedex(pokemonData) {
  const pokemonDisplay = document.getElementById("pokemonDisplay");
  const searchBox = document.getElementById("searchBox");
  const searchResults = document.getElementById("searchResults");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  let currentIndex = 0;

  function displayPokemon(index) {
    if (index >= 0 && index < pokemonData.length) {
      const pokemon = pokemonData[index];
      pokemonDisplay.innerHTML = `
                <div class="pokemon-card p-4 text-center">
                    <img src="${pokemon.image}" alt="${
        pokemon.name
      }" class="mx-auto">
                    <h2 class="text-xl font-bold">${pokemon.name}</h2>
                    <p>Type: ${pokemon.type.join(", ")}</p>
                    <p>${pokemon.description}</p>
                </div>
            `;
    }
  }

  displayPokemon(currentIndex);

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      displayPokemon(currentIndex);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < pokemonData.length - 1) {
      currentIndex++;
      displayPokemon(currentIndex);
    }
  });

  searchBox.addEventListener("input", () => {
    const searchTerm = searchBox.value.toLowerCase();
    const filteredPokemon = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );

    if (filteredPokemon.length > 0) {
      currentIndex = pokemonData.indexOf(filteredPokemon[0]);
      displayPokemon(currentIndex);
      searchResults.textContent = "";
    } else {
      pokemonDisplay.innerHTML = "";
      searchResults.textContent = "No Pokémon found";
    }
  });
}
