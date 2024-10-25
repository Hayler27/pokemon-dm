import { LitElement } from 'lit-element';
export class PokemonDm extends LitElement {
  async fetchPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
    const data = await response.json();

    const pokemonDetails = await Promise.all(
      data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
    );

    const filteredPokemons = pokemonDetails.filter(pokemon => !pokemon.evolves_from_species).map(pokemon => ({
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      abilities: pokemon.abilities.map(ability => ability.ability.name).join(', '),
    }));

    console.log('Filtered Pokémon:', filteredPokemons); 
    return filteredPokemons;
  }
}
