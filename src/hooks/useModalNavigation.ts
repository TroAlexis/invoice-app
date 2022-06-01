import { useLocation } from "react-router-dom";

export default function useModalNavigation() {
  const location = useLocation();

  return {
    state: { backgroundLocation: location },
  };
}
