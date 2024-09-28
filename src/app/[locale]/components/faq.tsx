import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // Importando um ícone para a seta

interface FAQItem {
  question: string;
  answer: string | JSX.Element; // Permite tanto string quanto JSX.Element
}

const FAQ: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      question: "O evento é gratuito?",
      answer: "Sim, totalmente gratuito!",
    },
    {
      question: "Onde será o evento?",
      answer: (
        <>
          Ele será transmitido no{" "}
          <a
            href="https://www.youtube.com/c/DataICMC"
            target="_blank"
            rel="noopener noreferrer"
            className="tooltip"
          >
            <span className="youtube-link">YouTube do Data</span>{" "}
          </a>
          .
        </>
      ),
    },

    {
      question: "Como faço para patrocinar?",
      answer: "Entre em contato conosco pelo email: dataicmc@gmail.com.",
    },
    {
      question: "Tem certificado?",
      answer: "Ainda não foi definido.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null); // Estado para controle de resposta aberta

  const toggleAnswer = (index: number) => {
    // Definindo o tipo do parâmetro index
    setOpenIndex(openIndex === index ? null : index); // Alterna entre abrir e fechar a resposta
  };

  return (
    <div className="faq-section">
      <h2>FAQ</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <strong>{faq.question}</strong>
              <FaChevronDown
                className={`faq-icon ${openIndex === index ? "open" : ""}`}
              />
            </div>
            {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
