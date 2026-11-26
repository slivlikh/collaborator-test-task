import './Description.css';

export const Description = ({ children, lineClamp }) => (
  <p className={`card-description ${lineClamp && `line-clamp-${lineClamp}`}`}>
    {children}
  </p>
);
