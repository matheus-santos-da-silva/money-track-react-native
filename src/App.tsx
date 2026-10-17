import React, { useState } from "react";
import { Stack } from "./routes/Stack";
import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./contexts/AuthContext";
import { SplashScreen } from "./screens/SplashScreen/SplashScreen";
import { withIAPContext } from "react-native-iap";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TransactionsProvider } from "./contexts/TransactionsContext";

// A splash fica por cima do Stack até a saída terminar, para a troca ser contínua.
const AppContent = () => {
  const { isBootstrapping, userToken } = useAuth();
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  return (
    <>
      {(!isBootstrapping || !isSplashVisible) && (
        <TransactionsProvider>
          <Stack />
        </TransactionsProvider>
      )}

      {isSplashVisible && (
        <SplashScreen
          isReady={!isBootstrapping}
          exitWithPanel={userToken !== null}
          onFinish={() => setIsSplashVisible(false)}
        />
      )}
    </>
  );
};

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default withIAPContext(App);
