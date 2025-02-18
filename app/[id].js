import { View, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { PokemonInfo } from "../components/PokemonInfo";
export default function PokemonDetail() {
  const { id } = useLocalSearchParams();
  const [pokemonData, setPokemonData] = useState(null);
  const getPokemonData = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    const pokemonData = {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
      types: data.types,
      height: data.height,
      weight: data.weight,
      abilities: data.abilities,
      base_experience: data.base_experience,
      stats: data.stats,
      moves: data.moves,
    };
    setPokemonData(pokemonData);
  };
  useEffect(() => {
    setTimeout(getPokemonData, 1500);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        padding: "30",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
      }}
    >
      {pokemonData == null ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large"></ActivityIndicator>
        </View>
      ) : (
        <PokemonInfo data={pokemonData} />
      )}
    </View>
  );
}
