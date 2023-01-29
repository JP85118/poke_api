//Components
import { Button } from "./Components/Button";
import { Card } from "./Components/Card";
//Styles
import './sass/App.scss';
//Icons
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";
//Hooks
import { useState,useEffect } from "react";


const App = () => {

  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonEvo, setPokemonEvo] = useState([]);

  useEffect(()=>{
    getEvolutions(pokemonId)
  }, [pokemonId])

  const getEvolutions = async (id)=>{
    const response =  await fetch (`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
    const data = await response.json()

    let pokemonEvoArr = []

    let pokemonLv1 = data.chain.species.name
    let pokemonLv1Img =  await getPokemonImages(pokemonLv1)
    pokemonEvoArr.push([pokemonLv1, pokemonLv1Img])

    if (data.chain.evolves_to.length !== 0) {
      let pokemonLv2 = data.chain.evolves_to[0].species.name
      let pokemonLv2Img =  await getPokemonImages(pokemonLv2)
      pokemonEvoArr.push([pokemonLv2, pokemonLv2Img])
      console.log(pokemonEvoArr);

      if(data.chain.evolves_to[0].evolves_to.length !== 0){
        let pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name
        let pokemonLv3Img =  await getPokemonImages(pokemonLv3)
        pokemonEvoArr.push([pokemonLv3, pokemonLv3Img])
      }
    }
    setPokemonEvo(pokemonEvoArr)
  }

  const getPokemonImages = async (name)=>{
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${name}/`)
    const data = await response.json()
    return data.sprites.other['official-artwork'].front_default;
  }

  const preClick = ()=>{
    pokemonId === 1 ? setPokemonId(1) 
    : setPokemonId(pokemonId - 1)
  }

  const nextClick = ()=>{
    setPokemonId(pokemonId + 1)
  }

  return (
    <div className="app">
      <h1 className="title">Pokemon</h1>
      <div className={`card-container card${pokemonEvo.length}`}>
      {pokemonEvo.map(pokemon => 
      <Card 
        key={pokemon[0]}
        name={pokemon[0]}
        img={pokemon[1]}
      />
      )}
      
      </div>
      <div className="buttons-container">
      <Button icon={<TiArrowLeftOutline />} 
      handleClick={preClick}
      />

      <Button icon={<TiArrowRightOutline />} 
      handleClick={nextClick}
      /> 
      </div>
    </div>
  );
}

export {App};
