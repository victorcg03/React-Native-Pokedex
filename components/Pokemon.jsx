import { Text, View, Image, StyleSheet } from "react-native";
export function Pokemon({ pokemon }) {
  const src = pokemon.sprites.other["official-artwork"].front_default;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
      }}
    >
      <Image
        source={{
          uri:
            src ??
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAAja6c9Ip37JMYpOmIIe9JGv16LvccS2OoCpr2Evz5Gv2-ImNwePvBoxNWctyWlJwYmA&usqp=CAU",
        }}
        style={{ width: 100, height: 100 }}
      />
      <View style={{ marginLeft: 10, gap: 10, flex: 1 }}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text style={{ fontWeight: 800, fontSize: 16 }}>
            {" "}
            #{pokemon.id.toString().padStart(3, "0")}
          </Text>
          <Text style={{ textTransform: "uppercase", fontWeight: "700" }}>
            {pokemon.name}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          {pokemon.types.map(({ type }) => (
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
      </View>
      <View style={{ flex: 1, alignItems: "center", gap: 10 }}>
        <Text
          style={{
            fontWeight: "bold",
            padding: 5,
            backgroundColor: "#ddd",
            borderRadius: 5,
          }}
        >
          {pokemon.height / 10}M
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            padding: 5,
            backgroundColor: "#ddd",
            borderRadius: 5,
          }}
        >
          {pokemon.weight / 10}KG
        </Text>
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
