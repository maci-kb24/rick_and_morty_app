import Footer from "./components/Footer";
import Header from "./components/Header";
import CharacterList from "./components/CharacterList";
import { ApolloProvider } from "./components/ApolloProvider";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ApolloProvider>
          <CharacterList />
        </ApolloProvider>
      </main>
      <Footer />
    </div>
  );
}
