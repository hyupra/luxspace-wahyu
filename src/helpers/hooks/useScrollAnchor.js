import { useLayoutEffect } from "react";

export default function useScrollAchor() {
  useLayoutEffect(() => {
    const smoothScrollAnchor = document.querySelectorAll("a[href^='#']");
    for (let i = 0; i < smoothScrollAnchor.length; i++) {
      const element = smoothScrollAnchor[i];
      element.addEventListener("click", (e) => {
        e.preventDefault();
        if (
          document.getElementById(element.getAttribute("href").replace("#", ""))
        )
          document.querySelector(element.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
          });
      });
    }
    return () => {};
  });
}
