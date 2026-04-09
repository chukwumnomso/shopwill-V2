import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Uploads from "./components/Uploads";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { ProductProvider } from "./context/ProductCardContext";
import { WishListProvider } from "./context/WishedListContext";
import { AuthProvider } from "./context/AuthContex";
import { PopUpProvider } from "./context/PopUpContext";
// import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <PopUpProvider>
      <AuthProvider>
        <ProductProvider>
          <WishListProvider>
            {/* <ProdGrid /> */}

            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signUp" element={<SignUpPage />} />
                <Route path="/signIn" element={<SignInPage />} />

                {/* <Uploads /> */}
              </Routes>
            </BrowserRouter>
          </WishListProvider>
        </ProductProvider>
      </AuthProvider>
    </PopUpProvider>
  );
}

export default App;
