import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType(); // POP = back/forward, PUSH/REPLACE = new nav

  useEffect(() => {
    if (navType !== "POP") {
      // Only reset on forward navigation, let browser restore on back/forward
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, navType]);

  return null;
}
