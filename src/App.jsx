import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Suspense } from "react";
import Spinner from "./components/Spinner";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Toaster />
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <div className="App">
            <Suspense fallback={<Spinner />}>
              <RouterProvider router={router} />
            </Suspense>
          </div>
        </QueryClientProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
