import useScrollToTop from "../helpers/hooks/useScrollToTop";
import useModalDOM from "../helpers/hooks/useModalDOM";
import useScrollAnchor from "../helpers/hooks/useScrollAnchor";

function Document({ children }) {
  useModalDOM();
  useScrollAnchor();
  useScrollToTop();
  return children;
}

export default Document;
