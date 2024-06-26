import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MyLayout from "../Components/MyLayout";
import { Provider } from "./SessionProvider";
import QueryProvider from "./QueryProvider";
import ReduxStoreProvider from "./ReduxStoreProvider";
import StoreProvider from "./StoreProvider";
import { SocketProvider } from "./custom-Hooks/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <QueryProvider>
            <ReduxStoreProvider>
              <StoreProvider>
                <SocketProvider>
                  <MyLayout>{children}</MyLayout>
                </SocketProvider>
              </StoreProvider>
            </ReduxStoreProvider>
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
}
