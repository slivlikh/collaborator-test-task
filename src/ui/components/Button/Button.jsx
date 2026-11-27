import './Button.css';

export const Button = ({ children, className, ...props }) => {
  return (
    <button {...props} className={`${className ?? ''} button`}>
      {children}
    </button>
  );
};
