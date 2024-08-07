'use client'
import React from 'react';
import { Link } from '../../../navigation'; 

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'dataPurple';
  size?: 'small' | 'medium' | 'large';
  rounded?: boolean;
  styleType?: 'default' | 'outline';
  pageLink?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  rounded = false,
  styleType = 'default',
  className,
  pageLink,
  ...props
}) => {
  const sizeStyles = {
    small: 'text-sm',
    medium: 'text-base font-semibold',
    large: 'text-lg font-semibold',
  };

  const baseStyles = `focus:outline-none focus:shadow-outline ${
    rounded ? 'rounded-full' : 'rounded'
  } inline-flex items-center justify-center space-x-2 transition-transform duration-200 ease-in-out transform`;

  const variantStyles = {
    primary: styleType === 'outline' ? 'border-2 border-data-purple text-data-purple' : 'bg-button text-button-text border-2 border-button',
    secondary: styleType === 'outline' ? 'border-2 border-data-purple text-data-purple' : 'bg-secondary text-background border-2 border-secondary',
    dataPurple: 'bg-data-purple text-primary'
  };

  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (pageLink) {
    return (
      <Link href={pageLink}>
        <button className={`${buttonStyles} hover:scale-110`} style={{ padding: '10px' }} {...props}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button className={`${buttonStyles} hover:scale-110`} style={{ padding: '10px' }} {...props}>
      {children}
    </button>
  );
};

export default Button;
