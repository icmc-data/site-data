"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface PhotoProps {
  imgSrc: string;
  description?: string;
}

const Photo: React.FC<PhotoProps> = ({ imgSrc, description }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const defaultDescription = "Default description";

  return (
    <div className="wrapper">
      <div className="item">
        <div className="polaroid">
          <img src={imgSrc} alt={description || defaultDescription} />
          <div className="caption">{description || defaultDescription}</div>
        </div>
      </div>
    </div>
  );
};

export default Photo;
