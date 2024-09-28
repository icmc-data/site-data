import { FaCalendarAlt, FaUserFriends } from "react-icons/fa"; // Importando ícones
import Button from "./Button"; // Importando o componente Button

interface HeroProps {
  title: string;
  description: string;
  eventDateTitle: string;
  dateText: string;
  speakersTitle: string;
  speakersText: string;
  imgLink: string;
  dateLink: string;
  speakersLink: string;
  dateButtonText: string;
  eventButtonText: string;
}

export default function Hero({
  title,
  description,
  eventDateTitle,
  dateText,
  speakersTitle,
  speakersText,
  imgLink,
  dateLink,
  speakersLink,
  dateButtonText,
  eventButtonText,
}: HeroProps) {
  return (
    <section className="relative w-full p-8 lg:flex lg:items-start lg:justify-between lg:px-32 mt-16 text-center lg:text-left">
      <div className="lg:w-2/3 lg:pr-16">
        <div className="flex flex-col items-center lg:items-start mb-6">
          <h1 className="text-primary dark:text-primary font-montserrat font-bold text-5xl leading-tight mb-4">
            {title}
          </h1>
        </div>
        <p className="text-text-secondary dark:text-text-secondary text-lg font-inter mb-8 max-w-lg mx-auto lg:mx-0">
          {description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center lg:items-start">
            <FaCalendarAlt className="w-10 h-10 text-primary dark:text-primary mb-4" />
            <div>
              <h3 className="text-primary dark:text-primary text-xl font-bold mb-2">
                {eventDateTitle}
              </h3>
              <p className="text-text-secondary dark:text-text-secondary font-inter mb-4">
                {dateText}
              </p>
              <Button
                variant="primary"
                size="medium"
                className="mt-4"
                pageLink={dateLink}
              >
                {dateButtonText}
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start">
            <FaUserFriends className="w-10 h-10 text-primary dark:text-primary mb-4" />
            <div>
              <h3 className="text-primary dark:text-primary text-xl font-bold mb-2">
                {speakersTitle}
              </h3>
              <p className="text-text-secondary dark:text-text-secondary font-inter mb-4">
                {speakersText}
              </p>
              <Button
                variant="secondary"
                size="medium"
                className="mt-4"
                pageLink={speakersLink}
              >
                {eventButtonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="lg:w-1/3 mt-8 lg:mt-0 h-96 bg-cover bg-center rounded-lg"
        style={{
          backgroundImage: `url('${imgLink}')`,
        }}
      ></div>
    </section>
  );
}
