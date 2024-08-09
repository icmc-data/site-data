"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface PhotoProps {
  imgSrc: string;
  description?: string;
  size?: number;  // prop para controlar o tamanho
  rotation?: number; // prop para controlar a rotação
}

const Photo: React.FC<PhotoProps> = ({
  imgSrc,
  description,
  size = 1, 
  rotation = 0,  
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const defaultDescription = "Default description";

  return (
    <div
      className="item"
      style={{
        transform: `scale(${size}) rotate(${rotation}deg)`,
        width: `${size * 100}%`, // Tamanho ajustado
      }}
    >
      <div className="polaroid">
        <img src={imgSrc} alt={description || defaultDescription} />
        <div className="caption">{description || defaultDescription}</div>
      </div>
    </div>
  );
};

export default Photo;
