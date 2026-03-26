import React, { useEffect, useState } from "react";
import { Stack } from "./routes/Stack";
import { SlashScreen } from "./screens/SlashScreen/SlashScreen";
import { AuthProvider } from "./contexts/AuthContext";
import { withIAPContext } from "react-native-iap";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TransactionsProvider } from "./contexts/TransactionsContext";

function App(): React.JSX.Element {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
  }, []);
  return (
    <SafeAreaProvider>
      <AuthProvider>
        {isSplashVisible ? (
          <SlashScreen />
        ) : (
          <TransactionsProvider>
            <Stack />
          </TransactionsProvider>
        )}
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default withIAPContext(App);
