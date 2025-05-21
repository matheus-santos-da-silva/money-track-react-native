import React, { useEffect, useState } from "react";
import { Stack } from "./routes/Stack";
import { SlashScreen } from "./screens/SlashScreen/SlashScreen";
import { AuthProvider } from "./contexts/AuthContext";
import { TransactionsProvider } from "./contexts/TransactionsContext";

function App(): React.JSX.Element {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
  }, []);
  return (
    <AuthProvider>
      {isSplashVisible ? (
        <SlashScreen />
      ) : (
        <TransactionsProvider>
          <Stack />
        </TransactionsProvider>
      )}
    </AuthProvider>
  );
}

export default App;
