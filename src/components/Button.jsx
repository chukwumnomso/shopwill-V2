const Button = ({
  onClick,
  children,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  id,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={className}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        id={id}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
