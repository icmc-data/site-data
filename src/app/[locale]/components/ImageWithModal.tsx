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
            backgroundColor: "var(--background-opacity)", 
            backdropFilter: "blur(20px)",
          }}
          onClick={toggleModal}
        >
          <div
            className={`relative p-4 ${modalClassName}`}
            style={{
              backgroundColor: "var(--background-secondary)", 
              color: "var(--text-secondary)", 
              borderRadius: "12px", 
            }}
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Botão de fechar */}
            <button
              className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full "
              style={{
                backgroundColor: "var(--background-secondary)", 
                color: "var(--data-purple)", 
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
                layout="responsive" 
                width={1500} 
                height={800} 
                quality={100} 
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
