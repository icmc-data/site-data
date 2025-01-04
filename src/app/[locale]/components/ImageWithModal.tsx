import { useState } from "react";
import Image from "next/image";

interface ImageWithModalProps {
  src: string;
  alt: string;
  className?: string;
  modalClassName?: string;
}

export default function ImageWithModal({
  src,
  alt,
  className = "",
  modalClassName = "",
}: ImageWithModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Imagem clicável */}
      <img
        src={src}
        alt={alt}
        className={`cursor-pointer ${className}`}
        onClick={toggleModal}
      />

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[9999]"
          style={{
            backgroundColor: "var(--background-opacity)", // Fundo com opacidade
            backdropFilter: "blur(20px)", // Desfoque forte
          }}
          onClick={toggleModal}
        >
          <div
            className={`relative p-4 ${modalClassName}`}
            style={{
              backgroundColor: "var(--background-secondary)", // Fundo do modal
              color: "var(--text-secondary)", // Texto do modal
              borderRadius: "12px", // Bordas arredondadas
            }}
            onClick={(e) => e.stopPropagation()} // Previne o fechamento ao clicar na imagem
          >
            {/* Botão de fechar */}
            <button
              className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full "
              style={{
                backgroundColor: "var(--background-secondary)", // Fundo do botão
                color: "var(--data-purple)", // Cor do texto
                fontSize: "1.2rem",
              }}
              onClick={toggleModal}
            >
              ✖
            </button>

            {/* Imagem no modal */}
            <div className="w-full max-w-screen-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
              <Image
                src={src}
                alt={alt}
                layout="responsive" // Garante que a imagem seja responsiva
                width={1500} // Ajuste conforme necessário
                height={800} // Proporção será mantida
                quality={100} // Alta qualidade
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
