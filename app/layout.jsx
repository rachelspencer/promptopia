// no need to reference path, use @ then folder + file name
// imports css throughout entire app
import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from '@components/Provider';

// add metadata
export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts"
};

const RootLayout = ({ children }) => {
  return (
    // wrap all in html tag
    <html lang="en">
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className="app">
                    <Nav/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  );
};

export default RootLayout;