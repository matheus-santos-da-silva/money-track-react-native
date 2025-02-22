import React from "react";
import { Stack } from "./routes/Stack";
import { AuthProvider } from "./contexts/AuthContext";

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}

export default App;
