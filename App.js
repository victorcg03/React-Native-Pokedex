import { StatusBar } from "expo-status-bar";
import { Main } from "./pages/Main";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </>
  );
}
