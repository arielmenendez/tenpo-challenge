import type { ButtonHTMLAttributes } from 'react';

const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      style={{
        borderRadius: '8px',
        border: '1px solid #ccc',
        padding: '0.6em 1.2em',
        background: '#1a1a1a',
        color: '#fff',
        cursor: 'pointer',
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
