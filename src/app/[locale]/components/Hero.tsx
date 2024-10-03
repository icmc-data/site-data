import { FaCalendarAlt, FaUserFriends } from "react-icons/fa"; // Importando ícones
import Button from "./Button"; // Importando o componente Button
import Link from "next/link"; // Importando Link do Next.js

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
    <section className="relative w-full flex flex-col lg:flex-row items-center lg:items-start justify-between text-center lg:text-left p-4">
      <div className="w-full lg:w-2/3 lg:pr-16 mb-6">
        <div className="flex flex-col items-center lg:items-start mb-6">
          <h1 className="text-primary dark:text-primary font-montserrat font-bold leading-tight text-3xl sm:text-5xl mb-4">
            {title}
          </h1>
        </div>
        <p className="text-text-secondary dark:text-text-secondary font-inter mb-4">
          {description}
        </p>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <div className="flex flex-col items-center lg:items-start">
            <FaCalendarAlt className="w-10 h-10 text-primary dark:text-primary mb-4" />
            <div>
              <h3 className="text-primary dark:text-primary text-xl font-bold mb-2">
                {eventDateTitle}
              </h3>
              <p className="text-text-secondary dark:text-text-secondary font-inter mb-4">
                {dateText}
              </p>
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
            </div>
          </div>
        </div>

        <div className="relative mt-8 flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:justify-between lg:items-center">
          <Link href={dateLink} passHref>
            <Button variant="primary" size="medium">
              {dateButtonText}
            </Button>
          </Link>

          <Link href={speakersLink} passHref>
            <Button variant="secondary" size="medium" className="lg:ml-auto mt-4 lg:mt-0">
              {eventButtonText}
            </Button>
          </Link>
        </div>
      </div>
      <div
  className="w-full lg:w-1/3 mt-8 lg:mt-0 bg-contain bg-center rounded-lg min-h-[200px] max-h-[400px] aspect-[4/3] bg-no-repeat"
  style={{
    backgroundImage: `url('${imgLink}')`,
  }}
></div>
    </section>
  );
}
