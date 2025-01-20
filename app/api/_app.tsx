"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Inter, Quicksand } from "next/font/google";
import type { AppProps } from "next/app";


const inter = Inter({ subsets: ["latin"] });
const quickSand = Quicksand({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="inter.className">
            <GoogleOAuthProvider clientId="1020024037932-siad11cpc4qg9lgmg6a8m77rm1ho5mva.apps.googleusercontent.com">
                <Component {...pageProps} />
            </GoogleOAuthProvider>
        </div>


    );
}