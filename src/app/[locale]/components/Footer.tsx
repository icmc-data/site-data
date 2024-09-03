"use client";

import { FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const Footer = () => {
  const { resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState("/simpleDATAICON.png");

  useEffect(() => {
    const updatedLogoSrc =
      resolvedTheme === "light"
        ? "/simpleDATAICON-white.png"  // Altere para o nome do arquivo da logo para whitemode
        : "/simpleDATAICON.png";
    setLogoSrc(updatedLogoSrc);
  }, [resolvedTheme]);

  return (
    <footer className="bg-background dark:bg-background-secondary">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://data.icmc.usp.br/" className="flex items-center">
              <img src={logoSrc} className="h-8 me-3" alt="Data ICMC Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-primary">Data ICMC</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-primary uppercase dark:text-primary">Recursos</h2>
              <ul className="text-text-secondary dark:text-text-secondary font-medium">
                <li className="mb-4">
                  <a href="https://data.icmc.usp.br/" className="hover:underline">Sobre Nós</a>
                </li>
                <li>
                  <a href="https://data.icmc.usp.br/eventos" className="hover:underline">Eventos</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-primary uppercase dark:text-primary">Siga-nos</h2>
              <ul className="text-text-secondary dark:text-text-secondary font-medium">
                <li className="mb-4">
                  <a href="https://www.linkedin.com/school/data-icmc/" className="hover:underline">LinkedIn</a>
                </li>
                <li>
                  <a href="https://www.instagram.com/data.icmc/" className="hover:underline">Instagram</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-primary uppercase dark:text-primary">Legal</h2>
              <ul className="text-text-secondary dark:text-text-secondary font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">Política de Privacidade</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Termos &amp; Condições</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-text-secondary sm:text-center dark:text-text-secondary">
            © 2024 <a href="https://data.icmc.usp.br/" className="hover:underline">Data ICMC</a>. Todos os Direitos Reservados.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="https://www.youtube.com/c/DataICMC" className="text-text-secondary hover:text-primary dark:hover:text-primary me-5">
              <FaYoutube className="w-4 h-4" />
              <span className="sr-only">YouTube</span>
            </a>
            <a href="https://www.instagram.com/data.icmc/" className="text-text-secondary hover:text-primary dark:hover:text-primary me-5">
              <FaInstagram className="w-4 h-4" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://www.linkedin.com/school/data-icmc/" className="text-text-secondary hover:text-primary dark:hover:text-primary me-5">
              <FaLinkedin className="w-4 h-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
