import "./style.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import Uploads from "./components/Uploads";
import Category from "./components/Category";

function App() {
  return (
    <div>
      <Header />
      <Hero />

      <Category title="new arrivals">
        <ProductCard />
      </Category>

      {/* <Uploads /> */}
    </div>
  );
}

export default App;
