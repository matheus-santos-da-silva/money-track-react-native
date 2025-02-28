import React, { useEffect, useState } from "react";
import { Stack } from "./routes/Stack";
import { AuthProvider } from "./contexts/AuthContext";
import { SlashScreen } from "./screens/SlashScreen/SlashScreen";

function App(): React.JSX.Element {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
  }, []);
  return (
    <AuthProvider>{isSplashVisible ? <SlashScreen /> : <Stack />}</AuthProvider>
  );
}

export default App;
