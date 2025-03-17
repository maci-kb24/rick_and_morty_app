import Footer from "./components/Footer";
import Header from "./components/Header";
import CharacterExplorer from "./components/CharacterExplorer";
import { LanguageProvider } from "./components/LanguageProvider";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <CharacterExplorer />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
