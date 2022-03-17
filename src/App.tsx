import { useSelector } from "react-redux";

import { RootState } from "./typescript/redux/store/";
import importTemplate from "./hooks/useImports";
import ErrorPage from "./components/pages/ErrorPage";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Authentication } from "./components/pages/Authentication";

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
          <Route path='/' element={<Home theme={pageBody}/>} />
          <Route path='/authentication' element={<Authentication />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
