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
  <div className="bg-background-secondary rounded-lg shadow-md overflow-hidden w-80 transform transition-transform duration-300 hover:scale-105">
    <img src={image} alt={title} className="w-full h-72 object-cover" />
    <div className="p-6">
      <h2 className="text-primary font-brawler text-xl mb-2">{title}</h2>
      <p className="text-text-secondary text-sm">{description}</p>
    </div>
  </div>
);

export default CardComponent;
