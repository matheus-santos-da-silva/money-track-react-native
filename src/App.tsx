import React from "react";
import { SafeAreaView } from "react-native";
import { Login } from "./screens/Login/Login";

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{ padding: 16 }}>
      <Login />
    </SafeAreaView>
  );
}

export default App;
