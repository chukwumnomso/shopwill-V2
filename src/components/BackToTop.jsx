import { useState, useEffect } from "react";

const BackToTop = ({ containerRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollContainer = containerRef?.current;
    if (!scrollContainer) return;

    const toggleVisibility = () => {
      setIsVisible(scrollContainer.scrollTop > 4000);
    };

    scrollContainer.addEventListener("scroll", toggleVisibility);
    toggleVisibility();

    return () =>
      scrollContainer.removeEventListener("scroll", toggleVisibility);
  }, [containerRef]);

  const scrollToTop = () => {
    if (containerRef?.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-8 z-50 p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-all cursor-pointer"
    >
      ↑
    </button>
  );
};

export default BackToTop;
