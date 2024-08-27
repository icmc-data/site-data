'use client';
import { FC, useState } from "react";
import Button from "./Button";
import * as Dialog from '@radix-ui/react-dialog';
import * as Icons from 'react-icons/fa'; // Certifique-se de importar os ícones corretamente

interface HeroProps {
  dateText: string;
  titleText: string;
  descriptionText: string;
  buttonText: string;
  buttonLink?: string;
  buttonIcon?: keyof typeof Icons;
  progress?: boolean;
}

const Hero: FC<HeroProps> = ({
  dateText,
  titleText,
  descriptionText,
  buttonText,
  buttonLink,
  buttonIcon,
  progress = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    if (!progress) {
      setIsOpen(true);
    } else if (buttonLink) {
      window.location.href = buttonLink;
    }
  };

  return (
    <div
      className={`relative min-h-screen w-full pt-[var(--header-height)] -mt-[160px] hero-bg-blur ${
        isOpen ? 'backdrop-filter backdrop-blur-sm bg-opacity-50' : ''
      }`}
      style={{
        backgroundImage: "url('/images/placeholder.JPEG')",
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
            <Button variant="primary" size="medium" onClick={handleButtonClick}>
              {buttonText}
            </Button>
          </div>
        </div>
      </div>

      {/* modal/alerta usando @radix-ui/react-dialog */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Content
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg z-30 max-w-md w-full shadow-lg"
            style={{
              backgroundColor: "var(--background)",
              color: "var(--primary)",
            }}
          >
            <Dialog.Title className="text-lg font-medium">
              Evento Não Disponível
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm">
              O evento ainda não está aberto para inscrições. Por favor, volte mais tarde.
            </Dialog.Description>
            <div className="mt-4 flex justify-end">
              <Dialog.Close asChild>
                <Button variant="secondary" size="medium">
                  OK
                </Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Hero;
