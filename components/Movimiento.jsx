import { Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
export function Movimiento({ item }) {
  const [type, setType] = useState("");
  useEffect(() => {
    fetch(item.move.url)
      .then((response) => response.json())
      .then((data) => setType(data.type.name));
  }, []);
  return (
    <Text
      style={{
        color: styles[type]?.color || "#666",
        backgroundColor: styles[type]?.backgroundColor || "#ccc",
        padding: 10,
        borderRadius: 5,
        textAlign: "center",
      }}
    >
      {item.move.name}
    </Text>
  );
}

const styles = StyleSheet.create({
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
