import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectAllPokemons, fetchPokemons } from './pokemonsSlice'
import PokemonCard from './PokemonCard'

let PokemonExcerpt = props => {
  return (
    <div>
      <PokemonCard 
        pokemon={props.pokemon}
      />
    </div>
  )
}

export default function PokemonList() {
  const dispatch = useDispatch();
  const pokemons = useSelector(selectAllPokemons);

  const pokemonStatus = useSelector(state => state.pokemons.status);
  const error = useSelector(state => state.pokemons.error)

  useEffect(() => {
    if (pokemonStatus === 'idle') {
      dispatch(fetchPokemons());
    }
  },[pokemonStatus, dispatch])

  let content;

  if (pokemonStatus === 'loading') {
    content = <p>loading...</p>
  } else if (pokemonStatus === 'succeeded') {
    content = pokemons.map(pokemon => <PokemonExcerpt key={pokemon.name} pokemon={pokemon} />)
    // content = pokemons;
  } else if (pokemonStatus === 'failed') {
    content = <div>{error}</div>
  }
  
  return (
    <section className="pokemon-list">
      {content}
    </section>
  )
}







// import { useGetAllPokemonQuery } from '../api/apiSlice'

// let PokemonExcerpt = ({ pokemon }) => {
//   return (
//     <div>
//       the pokemon card itself 
//       {pokemon}
//     </div>
//   )
// }

// export default function PokemonList() {
//   const {
//       data: pokemons = [],
//       isLoading,
//       isSuccess,
//       isError,
//       error
//   } = useGetAllPokemonQuery();

//   let content;

//   if (isLoading) {
//     content = <p>loading...</p>
//   } else if (isSuccess) {
//     content = pokemons.results.map(pokemon => <PokemonExcerpt key={pokemon.name} pokemons={pokemons} />)
//     // content = pokemons;
//   } else if (isError) {
//     content = <div>{error.toString()}</div>
//   }
  
//   return (
//     <section className="pokemon-list">
//       {content}
//     </section>
//   )
// }