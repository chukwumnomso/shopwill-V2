const Button = ({
  onClick,
  children,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  id,
  disabled,
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
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
