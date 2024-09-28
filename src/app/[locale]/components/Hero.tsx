import { FaCalendarAlt, FaUserFriends } from "react-icons/fa"; // Importando ícones
import Button from "./Button"; // Importando o componente Button

export default function Hero() {
  return (
    <section className="relative w-full p-8 lg:flex lg:items-start lg:justify-between lg:px-32 mt-16">
      <div className="lg:w-2/3 lg:pr-16">
        <div className="flex items-center mb-6">
          <h1 className="text-primary dark:text-primary font-montserrat font-bold text-5xl leading-tight mr-4">
            Discover new product and best possibilities
          </h1>
        </div>
        <p className="text-text-secondary dark:text-text-secondary text-lg font-inter mb-8 max-w-lg">
          Here at FlowBite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-start">
            <FaCalendarAlt className="w-10 h-10 text-primary dark:text-primary mb-4" />
            <div>
              <h3 className="text-primary dark:text-primary text-xl font-bold mb-2">
                28 November 2021
              </h3>
              <p className="text-text-secondary dark:text-text-secondary font-inter">
                Join us at FlowBite 2021 to understand what’s next as the global
                tech and startup ecosystem, rethinks the future of everything.
              </p>
              <Button
                variant="primary"
                size="medium"
                rounded={true}
                className="mt-4"
              >
                Conference
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <FaUserFriends className="w-10 h-10 text-primary dark:text-primary mb-4" />
            <div>
              <h3 className="text-primary dark:text-primary text-xl font-bold mb-2">
                25+ top notch speakers
              </h3>
              <p className="text-text-secondary dark:text-text-secondary font-inter">
                Here you will find keynote speakers, who all are able to talk
                about Recruiting. Click on the individual keynote speakers and
                read more about them and their keynotes.
              </p>
              <Button
                variant="secondary"
                size="medium"
                rounded={true}
                className="mt-4"
              >
                View list
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="lg:w-1/3 mt-8 lg:mt-0 h-96 bg-cover bg-center rounded-lg"
        style={{
          backgroundImage:
            "url('https://yt3.googleusercontent.com/WOOCC8PkqyMdpIMj0Wu05WX4W9Zyfb21WXdUf3rw5GbUZ3ZcAuCKe1P_1qhEy_RTa5n6synAnw=s900-c-k-c0x00ffffff-no-rj')",
        }}
      ></div>
    </section>
  );
}
