import { AuthProvider } from "react-auth-kit";
import { QueryClient, QueryClientProvider } from "react-query";
import { AllRoutes } from "./config/routeMgt/AllRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <AuthProvider authType="localstorage" authName="optiva-app">
      <QueryClientProvider client={queryClient}>
        <AllRoutes />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
