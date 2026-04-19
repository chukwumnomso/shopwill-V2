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
import MenProductPage from "./pages/MenProductPage";
import WomenProductPage from "./pages/WomenProductPage";
import { ModalProvider } from "./context/ModalContext";
import ViewProductPage from "./pages/ViewProductPage";
import { SortProvider } from "./context/SortContext";
import { FilterProvider } from "./context/FilterContext";
import { CategoryProvider } from "./context/CategoryContext";
import { SearchProvider } from "./context/SearchContext";
import SearchPage from "./pages/SearchPage";

// Wrap AppLayout with all providers
const AppLayoutWithProviders = () => (
  <PopUpProvider>
    <AuthProvider>
      <SearchProvider>
        <CategoryProvider>
          <ModalProvider>
            <NavBarProvider>
              <FilterProvider>
                <SortProvider>
                  <ProductProvider>
                    <WishListProvider>
                      <AppLayout />
                    </WishListProvider>
                  </ProductProvider>
                </SortProvider>
              </FilterProvider>
            </NavBarProvider>
          </ModalProvider>
        </CategoryProvider>
      </SearchProvider>
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
      { path: "/menproducts", element: <MenProductPage /> },
      { path: "/womenproducts", element: <WomenProductPage /> },
      { path: "/searched", element: <SearchPage /> },
      {
        path: "/product/:productId",
        element: <ViewProductPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// import "./style.css";

// import {
//   createBrowserRouter,
//   RouterProvider,
//   BrowserRouter,
// } from "react-router-dom";

// import HomePage from "./pages/HomePage";
// import SignUpPage from "./pages/SignUpPage";
// import SignInPage from "./pages/SignInPage";
// import { ProductProvider } from "./context/ProductCardContext";
// import { WishListProvider } from "./context/WishedListContext";
// import { AuthProvider } from "./context/AuthContext";
// import { PopUpProvider } from "./context/PopUpContext";
// import AppLayout from "./components/AppLayout";
// import MobileNav from "./components/MobileNav";
// import { NavBarProvider } from "./context/NavBarContext";
// import MenProductPage from "./pages/MenProductPage";
// import WomenProductPage from "./pages/WomenProductPage";
// import { ModalProvider } from "./context/ModalContext";
// import ViewProductPage from "./pages/ViewProductPage";
// import { SortProvider } from "./context/SortContext";
// import { FilterProvider } from "./context/FilterContext";
// import { CategoryProvider } from "./context/CategoryContext";
// import { SearchProvider } from "./context/SearchContext";
// import SearchPage from "./pages/SearchPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppLayout />,
//     children: [
//       { index: true, element: <HomePage /> },
//       { path: "/signup", element: <SignUpPage /> },
//       { path: "/signin", element: <SignInPage /> },
//       { path: "/menproducts", element: <MenProductPage /> },
//       { path: "/womenproducts", element: <WomenProductPage /> },
//       { path: "/searched", element: <SearchPage /> },
//       {
//         path: "/product/:productId",
//         element: <ViewProductPage />,
//       },
//     ],
//   },
// ]);

// function App() {
//   return (
//     <PopUpProvider>
//       <AuthProvider>
//         <SearchProvider>
//           <CategoryProvider>
//             <ModalProvider>
//               <NavBarProvider>
//                 <FilterProvider>
//                   <SortProvider>
//                     <ProductProvider>
//                       <WishListProvider>
//                         <RouterProvider router={router} />
//                       </WishListProvider>
//                     </ProductProvider>
//                   </SortProvider>
//                 </FilterProvider>
//               </NavBarProvider>
//             </ModalProvider>
//           </CategoryProvider>
//         </SearchProvider>
//       </AuthProvider>
//     </PopUpProvider>
//   );
// }

// export default App;

// // // In your App.jsx
// // function App() {
// //   return (
// //     <>

// //       {/* rest of your app */}
// //     </>
// //   );
// // }
