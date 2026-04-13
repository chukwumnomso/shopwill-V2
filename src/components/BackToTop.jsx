import Icon from "./Icon";

const BackToTop = () => {
  const backToTop = () => {
    window.scrollTo({ top: 0, behaviour: "smooth" });
  };

  return (
    <div
      className="bg-black text-white overflow-hidden size-10 flex items-center justify-center absolute bottom-20 right-0 z-50"
      onClick={backToTop}
    >
      <Icon name="arrowUp" className="size-8" />
    </div>
  );
};

export default BackToTop;
