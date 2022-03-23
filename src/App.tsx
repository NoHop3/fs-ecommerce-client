import { useSelector } from "react-redux";

import { RootState } from "./typescript/redux/store/";
import importTemplate from "./hooks/useImports";
import ErrorPage from "./components/pages/ErrorPage";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Authentication } from "./components/pages/Authentication";
import { Profile } from "./components/pages/Profile";
import { Products } from "./components/pages/Products";
import { Orders } from "./components/pages/Orders";
import { Cart } from "./components/pages/Cart";

function App() {
  const { BrowserRouter, Routes, Route } = importTemplate();
  const { navClass } = useSelector((state: RootState) => state.navState);
  const { lamp } = useSelector((state: RootState) => state.themeState);
  const pageBody = navClass + " " + lamp;
  return (
    <div className={pageBody}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home theme={pageBody} />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/authentication' element={<Authentication />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
