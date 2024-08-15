import React from "react";

interface CardComponentProps {
  image?: string;
  title?: string;
  description?: string;
}

const CardComponent: React.FC<CardComponentProps> = ({
  image = "https://via.placeholder.com/250x300",
  title = "Título Padrão",
  description = "Esta é uma descrição padrão do cartão, fornecida para o caso de não haver descrição especificada.",
}) => (
  <div className="bg-background-secondary rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 w-full max-w-sm">
    <img src={image} alt={title} className="w-full h-48 md:h-72 object-cover" />
    <div className="p-4 md:p-6">
      <p className="text-primary font-inter text-lg md:text-xl mb-2 font-bold text-center">{title}</p>
      <p className="text-text-secondary text-sm md:text-base text-center">{description}</p>
    </div>
  </div>
);

export default CardComponent;
