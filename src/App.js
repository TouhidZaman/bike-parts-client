import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Layout>
                    <AppRoutes />
                </Layout>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
