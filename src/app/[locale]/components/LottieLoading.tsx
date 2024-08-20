"use client";

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animationDataDark from '../../lotties/loading.json';
import animationDataLight from '../../lotties/loadingWhite.json';
import { useTheme } from 'next-themes';

interface LottieLoadingProps {
  height?: number;
  width?: number;
}

const LottieLoading: React.FC<LottieLoadingProps> = ({ height, width }) => {
  const { resolvedTheme } = useTheme();
  const [animationData, setAnimationData] = useState(animationDataLight);

  useEffect(() => {
    setAnimationData(resolvedTheme === 'dark' ? animationDataDark : animationDataLight);
  }, [resolvedTheme]);

  const aspectRatio = 2; // Proporção de largura para altura

  const calculatedHeight = height || (width ? width / aspectRatio : undefined);
  const calculatedWidth = width || (height ? height * aspectRatio : undefined);

  return (
    <div style={{ height: calculatedHeight, width: calculatedWidth }}>
      <Lottie animationData={animationData} style={{ height: '100%', width: '100%' }} loop={true} />
    </div>
  );
};

export default LottieLoading;
