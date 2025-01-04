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
          className="fixed inset-0 flex items-center justify-center z-[9999] overflow-hidden"
          style={{
            backgroundColor: "var(--background-opacity)", // Fundo com opacidade
            backdropFilter: "blur(20px)", // Desfoque forte
          }}
          onClick={toggleModal}
        >
          <div
            className={`relative w-full h-full max-w-screen-lg mx-auto p-4 ${modalClassName}`}
            style={{
              backgroundColor: "var(--background-secondary)", // Fundo do modal
              color: "var(--text-secondary)", // Texto do modal
              borderRadius: "12px", // Bordas arredondadas
            }}
            onClick={(e) => e.stopPropagation()} // Previne o fechamento ao clicar na imagem
          >
            {/* Botão de fechar */}
            <button
              className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full shadow-md"
              style={{
                backgroundColor: "var(--button-secondary)", // Fundo do botão
                color: "var(--button)", // Cor do texto
                fontSize: "1.2rem",
              }}
              onClick={toggleModal}
            >
              ✖
            </button>

            {/* Imagem no modal */}
            <div className="w-full h-auto max-h-[90vh] overflow-hidden">
              <Image
                src={src}
                alt={alt}
                layout="responsive" // Ajuste automático ao contêiner
                width={1200} // Proporção para layout
                height={800} // Proporção para layout
                quality={100} // Alta qualidade
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
