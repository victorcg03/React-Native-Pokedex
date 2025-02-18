import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Movimiento } from "./Movimiento";
export function PokemonInfo({ data }) {
  const src = data.sprites.other["official-artwork"].front_default;
  return (
    <View
      style={{
        backgroundColor: "#ddd",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderRadius: 5,
        width: 350,
        height: "auto",
        paddingVertical: 20,
        gap: 10,
      }}
    >
      <Text
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          fontSize: 14,
          backgroundColor: "#ccc",
          padding: 5,
          borderRadius: 5,
          color: "#666",
        }}
      >
        {data.base_experience}EXP
      </Text>
      <View
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 140,
            textAlign: "center",
            color: "#ccc",
          }}
        >
          #{data.id.toString().padStart(3, "0")}
        </Text>
      </View>
      <View style={{ widt: 250, height: 250 }}>
        <Image
          source={{
            uri:
              src ??
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAAja6c9Ip37JMYpOmIIe9JGv16LvccS2OoCpr2Evz5Gv2-ImNwePvBoxNWctyWlJwYmA&usqp=CAU",
          }}
          style={{
            width: 250,
            height: 250,
          }}
        />
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        {data.types.map(({ type }) => (
          <View
            style={[styles.type, styles[type.name] || styles.defaultType]}
            key={type.name}
          >
            <Text
              style={{
                color: styles[type.name]?.color || styles.defaultType.color,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {type.name}
            </Text>
          </View>
        ))}
      </View>
      <View style={{ gap: 20, flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#666",
            padding: 5,
            borderRadius: 5,
            backgroundColor: "#ccc",
          }}
        >
          #{data.id.toString().padStart(3, "0")}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#666" }}>
          {data.name.toUpperCase()}
        </Text>
      </View>
      <View style={{ gap: 20, flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#666",
            padding: 5,
            borderRadius: 5,
            backgroundColor: "#ccc",
          }}
        >
          {data.weight / 10}Kg
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#666",
            padding: 5,
            borderRadius: 5,
            backgroundColor: "#ccc",
          }}
        >
          {data.height / 10}M
        </Text>
      </View>
      <Text style={{ fontSize: 18, color: "#666" }}>Habilidades</Text>
      <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
        {data.abilities.map(({ ability }) => (
          <Text
            style={{
              color: "#666",
              padding: 5,
              borderRadius: 5,
              backgroundColor: "#ccc",
              textAlign: "center",
            }}
            key={ability.name}
          >
            {ability.name}
          </Text>
        ))}
      </View>
      <Text style={{ fontSize: 18, color: "#666" }}>Estadísticas</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
          maxWidth: "90%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {data.stats.map(({ base_stat, stat }) => (
          <Text
            key={stat.name}
            style={{
              padding: 5,
              borderRadius: 5,
              backgroundColor: "#ccc",
              color: "#666",
            }}
          >
            {stat.name}:{base_stat}
          </Text>
        ))}
      </View>
      <Text style={{ fontSize: 18, color: "#666" }}>Movimientos</Text>
      <View style={{ maxWidth: "90%", flexDirection: "row" }}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 5,
          }}
          data={data.moves}
          keyExtractor={(item) => item.move.name}
          renderItem={({ item }) => <Movimiento item={item} />}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  type: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  defaultType: {
    backgroundColor: "#1c1c1c",
    color: "#f7f7f7",
  },
  normal: { backgroundColor: "#A8A878", color: "#1c1c1c" },
  fire: { backgroundColor: "#F08030", color: "#1c1c1c" },
  water: { backgroundColor: "#6890F0", color: "#f7f7f7" },
  grass: { backgroundColor: "#78C850", color: "#1c1c1c" },
  electric: { backgroundColor: "#F8D030", color: "#1c1c1c" },
  ice: { backgroundColor: "#98D8D8", color: "#1c1c1c" },
  fighting: { backgroundColor: "#C03028", color: "#f7f7f7" },
  poison: { backgroundColor: "#A040A0", color: "#f7f7f7" },
  ground: { backgroundColor: "#E0C068", color: "#1c1c1c" },
  flying: { backgroundColor: "#A890F0", color: "#1c1c1c" },
  psychic: { backgroundColor: "#F85888", color: "#1c1c1c" },
  bug: { backgroundColor: "#A8B820", color: "#1c1c1c" },
  rock: { backgroundColor: "#B8A038", color: "#1c1c1c" },
  ghost: { backgroundColor: "#705898", color: "#f7f7f7" },
  dark: { backgroundColor: "#705848", color: "#f7f7f7" },
  dragon: { backgroundColor: "#7038F8", color: "#f7f7f7" },
  steel: { backgroundColor: "#B8B8D0", color: "#1c1c1c" },
  fairy: { backgroundColor: "#F0B6BC", color: "#1c1c1c" },
});
