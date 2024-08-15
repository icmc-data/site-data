"use client";
import { FC } from "react";
import Button from "./Button";

interface HeroProps {
  dateText: string;
  titleText: string;
  descriptionText: string;
  buttonText: string;
  buttonLink?: string;
  buttonIcon?: keyof typeof Icons;
}

const Hero: FC<HeroProps> = ({
  dateText,
  titleText,
  descriptionText,
  buttonText,
  buttonLink,
  buttonIcon,
}) => {
  return (
    <div
      className="relative min-h-screen w-full pt-[var(--header-height)] -mt-[160px] hero-bg-blur"
      style={{
        backgroundImage: "url('/images/placeholder.JPEG')", // Define o background
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        maxWidth: '2425px',
        right: '0',
      }}
    >
      <br />
      <br />

      <div className="grid min-h-screen px-4 md:px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center bg-black bg-opacity-50 p-6 rounded-lg">
          <h5 className="mb-2 text-lg md:text-lg text-white">
            {dateText}
          </h5>
          <h2 className="text-3xl md:text-5xl lg:max-w-3xl text-white">
            {titleText}
          </h2>
          <p className="mt-1 mb-8 text-sm md:text-lg w-full md:max-w-full lg:max-w-2xl text-white">
            {descriptionText}
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Button variant="primary" size="medium" pageLink={buttonLink}>
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
