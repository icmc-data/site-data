"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface PhotoProps {
  imgSrc: string;
  description?: string;
  size?: number;  // Prop para controlar o tamanho
  rotation?: number; // Prop para controlar a rotação
}

const Photo: React.FC<PhotoProps> = ({
  imgSrc,
  description,
  size = 1,  // Tamanho padrão
  rotation = 0,  // Rotação padrão
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
