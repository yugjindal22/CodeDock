import "@styles/global.css";
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: 'CodeDock',
    description: 'Discover & Share AI Snippets'
}

const RootLayout = ({children}) => {
  return (
    <html lang="en" className="scroll-smooth">
        <head>
            <link rel="icon" href="/assets/images/logo.png" />
        </head>
        <body className="overflow-x-hidden">
            <Provider>
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
  )
}

export default RootLayout
