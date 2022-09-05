import { FirebaseAuthContainer } from "@hooks/firebase/useFirebaseAuth";
import useCachedResources from "@hooks/useCachedResources";
import useColorScheme from "@hooks/useColorScheme";
import Navigation from "@navigation/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import "firebase/auth";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const queryClient = new QueryClient();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <FirebaseAuthContainer.Provider>
          <QueryClientProvider client={queryClient}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </QueryClientProvider>
        </FirebaseAuthContainer.Provider>
      </SafeAreaProvider>
    );
  }
}
