
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Inter, Quicksand } from "next/font/google";
import type { AppProps } from "next/app";
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools} from '@tanstack/react-query-devtools'

const inter = Inter({ subsets: ["latin"] });
const quickSand = Quicksand({ subsets: ["latin"] });

const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="inter.className">
            <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider clientId="1020024037932-siad11cpc4qg9lgmg6a8m77rm1ho5mva.apps.googleusercontent.com">
                    <Component {...pageProps} />
                    <Toaster />
                    <ReactQueryDevtools />
                </GoogleOAuthProvider>
            </QueryClientProvider>
        </div>


    );
}