import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Herosection";
import FeaturedCards from "../components/featuredcards";
import HowItWorks from "../components/HowItWorks";
import Ctasection from "../components/Ctasection";
import Footer from "../components/footer";
import type { Item } from "../Types/info";

export default function Home() {
  const location = useLocation();
  // When the user searches from the Navbar, results + query are passed here via router state
  const searchResults: Item[] | undefined = location.state?.searchResults;
  const searchQuery: string | undefined = location.state?.searchQuery;

  return (
    <>
      <Navbar />
      <main>
        {/* Hide the Hero when showing search results so the results are front and centre */}
        {!searchResults && <Hero />}
        <FeaturedCards searchResults={searchResults} searchQuery={searchQuery} />
        {!searchResults && <HowItWorks />}
        {!searchResults && <Ctasection />}
        <Footer />
      </main>
    </>
  );
}
