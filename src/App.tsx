import React from "react";
import { SafeAreaView } from "react-native";
import LoginScreen from "./screens/Login/Login";

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{ padding: 16 }}>
      <LoginScreen />
    </SafeAreaView>
  );
}

export default App;
