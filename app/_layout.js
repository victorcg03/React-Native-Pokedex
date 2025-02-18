import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
export default function Layout() {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerTitle: "Pokemon",
            headerTintColor: "black",
            headerStyle: {
              backgroundColor: "#f3f3f3",
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          }}
        />
      </SafeAreaProvider>
    </>
  );
}
