import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll
    window.scrollTo(0, 0);
    
    // Backup scroll after a tiny delay to ensure it works
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}