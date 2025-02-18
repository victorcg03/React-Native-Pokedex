import {
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  Text,
} from "react-native";
import { useEffect, useState } from "react";
import { Pokemon } from "../components/Pokemon";

export function Main() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsToShow, setPokemonsToShow] = useState([]);
  const [search, setSearch] = useState(null);
  const [cargandoMas, setCargandoMas] = useState(false);
  const [todoCargado, setTodoCargado] = useState(false);

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
            const pokemonData = await res.json();
            return {
              id: pokemonData.id,
              name: pokemonData.name,
              sprites: pokemonData.sprites,
              types: pokemonData.types,
              height: pokemonData.height,
              weight: pokemonData.weight,
            };
          })
        );

        setPokemons((prevPokemons) => {
          const newPokemons = [...prevPokemons, ...pokemonsData].sort(
            (a, b) => a.id - b.id
          );
          return newPokemons;
        });

        if (vuelta === 0) {
          setPokemonsToShow(pokemonsData.sort((a, b) => a.id - b.id));
          vuelta = 1;
        }

        url = data.next;
        if (!url) setTodoCargado(true);
      } while (url);
    };

    fetchAllPokemonsData();
  }, []);

  useEffect(() => {
    if (search != null) {
      if (search !== "") {
        const newPokemonsToShow = pokemons.filter((pokemon) =>
          pokemon.name.startsWith(search.toLowerCase())
        );
        setPokemonsToShow(newPokemonsToShow.sort((a, b) => a.id - b.id));
      } else if (search === "") {
        setPokemonsToShow(pokemons.slice(0, 10));
      }
    }
  }, [pokemons, search]);
  useEffect(() => {
    console.log("Fetched pokémons:", pokemons.length);
  }, [pokemons]);
  return (
    <>
      <View
        style={{
          width: "100%",
          height: 45,
          paddingVertical: 5,
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "lightgray",
          flexDirection: "row",
          gap: 5,
        }}
      >
        <Text>Search:</Text>
        <TextInput
          placeholder="Pikachu..."
          style={{
            width: "80%",
            height: "100%",
            backgroundColor: "#ddd",
            padding: 5,
            borderRadius: 3,
          }}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={{ backgroundColor: "#f3f3f3", flex: 1 }}>
        {pokemonsToShow.length === 0 && !search ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : pokemonsToShow.length > 0 ? (
          <FlatList
            data={pokemonsToShow}
            renderItem={({ item }) => <Pokemon pokemon={item} />}
            keyExtractor={(item) => item.id.toString()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              cargandoMas || (search && !todoCargado) ? (
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
              if (
                pokemonsToShow.length < pokemons.length &&
                !cargandoMas &&
                !search
              ) {
                setCargandoMas(true);

                setTimeout(() => {
                  setPokemonsToShow(
                    pokemons.slice(0, pokemonsToShow.length + 10)
                  );
                  setCargandoMas(false);
                }, 500);
              }
            }}
          />
        ) : (
          <View style={{ alignItems: "center", paddingVertical: 50 }}>
            <Text>No Pokémon found.</Text>
          </View>
        )}
      </View>
    </>
  );
}
