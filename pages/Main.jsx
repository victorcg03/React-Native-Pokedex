import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { Pokemon } from "../components/Pokemon";
export function Main() {
  const insets = useSafeAreaInsets();
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsToShow, setPokemonsToShow] = useState([]);
  useEffect(() => {
    const fetchAllPokemonsData = async () => {
      let url = "https://pokeapi.co/api/v2/pokemon";
      let vuelta = 0;
      do {
        const res = await fetch(url);
        if (!res.ok) return console.error("Failed to fetch", url);
        const data = await res.json();
        const pokemonsData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            if (!res.ok) return console.error("Failed to fetch", pokemon.url);
            return res.json();
          })
        );
        if (vuelta === 0) {
          setPokemonsToShow(pokemonsData.sort((a, b) => a.id - b.id));
          vuelta = 1;
        }
        setPokemons((prevPokemons) =>
          [...prevPokemons, ...pokemonsData].sort((a, b) => a.id - b.id)
        );
        url = data.next;
      } while (url);
    };
    fetchAllPokemonsData();
  }, []);
  useEffect(() => {
    console.log("Pokemons fetched", pokemons.length);
  }, [pokemons]);
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      {pokemonsToShow.length != 0 ? (
        <FlatList
          data={pokemonsToShow}
          renderItem={({ item }) => <Pokemon pokemon={item} />}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            pokemonsToShow.length > 0 &&
            pokemonsToShow.length < pokemons.length ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 20,
                }}
              >
                <ActivityIndicator size="large" color="#000" />
              </View>
            ) : null
          }
          onEndReached={() => {
            if (pokemonsToShow.length < pokemons.length) {
              const newPokemonsToShow = pokemons.slice(
                0,
                pokemonsToShow.length + 10
              );
              setTimeout(() => {
                setPokemonsToShow(newPokemonsToShow);
              }, 500);
            }
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </View>
  );
}
