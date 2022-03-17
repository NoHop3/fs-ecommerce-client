import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function useTemplate() {
    const isMobile = useMediaQuery({ query: `(min-width: 380px)` });
    const isTablet = useMediaQuery({ query: `(min-width: 768px)` });
    const isLaptop = useMediaQuery({ query: `(min-width:1200px)` });
  return {
    Routes,
    Route,
    BrowserRouter,
    Link,
    isLaptop,
    isMobile,
    isTablet,
  };
}
