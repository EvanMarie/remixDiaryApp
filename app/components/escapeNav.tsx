import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

export function useEscapeBack() {
  const navigate = useNavigate();
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate(-1);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);
}
