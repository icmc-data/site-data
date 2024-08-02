import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  rounded?: boolean
  styleType?: 'default' | 'outline'
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  rounded = false,
  styleType = 'default',
  className,
  ...props
}) => {
  const sizeStyles = {
    small: 'text-sm',
    medium: 'text-base font-semibold',
    large: 'text-lg font-semibold'
  }

  const baseStyles = `focus:outline-none focus:shadow-outline ${rounded ? 'rounded-full' : 'rounded'} inline-flex items-center justify-center space-x-2`

  const variantStyles = {
    primary: styleType === 'outline' ? 'border-2 border-data-purple text-primary' : 'bg-button text-primary border-2 border-button',
    secondary: styleType === 'outline' ? 'border-2 border-data-purple text-primary' : 'bg-secondary text-background border-2 border-secondary'
  }

  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`

  return (
    <button className={buttonStyles} style={{ padding: '10px' }} {...props}>
      {children}
    </button>
  )
}

export default Button
