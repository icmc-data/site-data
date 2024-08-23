'use client'
import React from 'react';
import { Link } from '../../../navigation';
import * as Icons from 'react-icons/fa'; // Importa todos os ícones do FontAwesome

// Importa os pathnames
import { pathnames } from '../../../navigation';
// Use os valores de pathnames como literais exatos
type PageLink = typeof pathnames[keyof typeof pathnames];

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'dataPurple';
  size?: 'small' | 'medium' | 'large';
  rounded?: boolean;
  styleType?: 'default' | 'outline';
  pageLink?: PageLink; // Atualiza o tipo para corresponder aos valores literais exatos
  iconName?: keyof typeof Icons; // O nome do ícone opcional
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  rounded = false,
  styleType = 'default',
  className,
  pageLink,
  iconName,
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
    primary: styleType === 'outline' ? 'border-2 border-data-purple text-data-purple' : 'bg-button text-white border-2 border-button',
    secondary: styleType === 'outline' ? 'border-2 border-data-purple text-data-purple' : 'bg-secondary text-background border-2 border-secondary',
    dataPurple: 'bg-data-purple text-background'
  };

  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const inlineStyles = {
    paddingLeft: '17px',
    paddingRight: '17px',
    paddingTop: '10px',
    paddingBottom: '10px',
  };

  const IconComponent = iconName ? Icons[iconName] : null; // Obtém o componente de ícone se o nome for fornecido

  if (pageLink) {
    return (
      <Link href={pageLink}>
        <button className={`${buttonStyles} hover:scale-110`} style={inlineStyles} {...props}>
          {IconComponent && <IconComponent className="mr-2" />} {/* Renderiza o ícone se existir */}
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button className={`${buttonStyles} hover:scale-110`} style={inlineStyles} {...props}>
      {IconComponent && <IconComponent className="mr-2" />} {/* Renderiza o ícone se existir */}
      {children}
    </button>
  );
};

export default Button;
