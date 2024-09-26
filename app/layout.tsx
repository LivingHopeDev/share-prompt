import "@styles/globals.css";
import { ReactNode } from "react";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Promptopia",
  description: "Discover and share AL prompts",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(); // Get session

  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
