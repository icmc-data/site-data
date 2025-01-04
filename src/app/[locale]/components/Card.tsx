import React from "react";
import Image from "next/image";

interface CardComponentProps {
  image?: string;
  title?: string;
  description?: string;
}

const CardComponent: React.FC<CardComponentProps> = ({
  image = "https://via.placeholder.com/250x300",
  title = "data image",
  description = "default description",
}) => (
  <div className="bg-background-secondary rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 w-full max-w-sm">
    <div className="relative w-full h-48 md:h-72">
      <Image
        src={image}
        alt={title}
        layout="fill" 
        objectFit="cover" 
        quality={100} 
        className="rounded-t-lg"
      />
    </div>
    <div className="p-4 md:p-6">
      <p className="text-primary font-inter text-lg md:text-xl mb-2 font-bold text-center">{title}</p>
      <p className="text-text-secondary text-sm md:text-base text-center">{description}</p>
    </div>
  </div>
);

export default CardComponent;
