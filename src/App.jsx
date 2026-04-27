import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { ProductProvider } from "./context/ProductCardContext";
import { WishListProvider } from "./context/WishedListContext";
import { AuthProvider } from "./context/AuthContext";
import { PopUpProvider } from "./context/PopUpContext";
import AppLayout from "./components/AppLayout";
import { NavBarProvider } from "./context/NavBarContext";
import ProductsPage from "./pages/ProductsPage";
import WishListPage from "./components/WishListPage";
import { ModalProvider } from "./context/ModalContext";
import ViewProductPage from "./pages/ViewProductPage";
import { FilterProvider } from "./context/FilterContext";
import { SearchProvider } from "./context/SearchContext";
import SearchPage from "./pages/SearchPage";
import { CartProvider } from "./context/CartContext";
import { SearchParamsProvider } from "./context/UrlParamsContext";
import CartPage from "./pages/CartPage";

// Wrap AppLayout with all providers
const AppLayoutWithProviders = () => (
  <PopUpProvider>
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <ModalProvider>
            <SearchParamsProvider>
              <NavBarProvider>
                <FilterProvider>
                  <ProductProvider>
                    <WishListProvider>
                      <AppLayout />
                    </WishListProvider>
                  </ProductProvider>
                </FilterProvider>
              </NavBarProvider>
            </SearchParamsProvider>
          </ModalProvider>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  </PopUpProvider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayoutWithProviders />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/signin", element: <SignInPage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/wishlist", element: <WishListPage /> },
      { path: "/searched", element: <SearchPage /> },
      {
        path: "/product/:productId",
        element: <ViewProductPage />,
      },
      {
        path: "/cartpage",
        element: <CartPage />,
      },
      {
        path: "/checkoutpage",
        element: <CheckOutPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
