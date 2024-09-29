import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa"; // Importando um ícone para a seta

interface FAQItem {
  question: string;
  answer: string | JSX.Element;
}

interface FAQProps {
  data: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [height, setHeight] = useState<number>(0);
  const answerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (answerRef.current && openIndex !== null) {
      setHeight(answerRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [openIndex]);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <h2>FAQ</h2>
      <div className="faq-section w-full p-4">
        <div className="faq-container bg-[var(--background-secondary)] w-full rounded-md"> 
          {data.map((faq, index) => (
            <div
              key={index}
              className="faq-item mb-4 border-b border-[var(--text-secondary)] pb-4"
            >
              <div
                className="faq-question flex justify-between items-center cursor-pointer text-primary font-inter"
                onClick={() => toggleAnswer(index)}
              >
                <strong className="text-lg">{faq.question}</strong>
                <FaChevronDown
                  className={`faq-icon transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div
                ref={index === openIndex ? answerRef : null}
                style={{
                  height: index === openIndex ? `${height}px` : "0",
                  overflow: "hidden",
                  transition: "height 0.3s ease",
                }}
              >
                <p className="faq-answer text-primary mt-2 font-inter">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQ;
