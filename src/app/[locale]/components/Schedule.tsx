import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Timeline } from "primereact/timeline";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Image from "next/image";
import { FaRegClock, FaCalendarPlus } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { Fade } from "react-awesome-reveal";

interface Speaker {
  name: string;
  photo?: string;
}

interface Lecture {
  title: string;
  description: string;
  start_time: string;
  end_time?: string | null;
  eventReminder: string;
  speaker: Speaker;
  time?: string;
}

interface Day {
  date: string;
  lectures: Lecture[];
}

export interface EventData {  // Exportação adicionada
  days: Day[];
}

interface ScheduleProps {
  eventData: EventData;
}

const Schedule: React.FC<ScheduleProps> = ({ eventData }) => {
  const t = useTranslations("");
  const weekDays = [
    t("Weekdays.Monday"),
    t("Weekdays.Tuesday"),
    t("Weekdays.Wednesday"),
    t("Weekdays.Thursday"),
    t("Weekdays.Friday"),
    t("Weekdays.Saturday"),
    t("Weekdays.Sunday"),
  ];
  const [selectedDay, setSelectedDay] = useState<string>(
    eventData.days[0]?.date || ""
  );
  const [filteredEvents, setFilteredEvents] = useState<Lecture[]>([]);
  const [isMobileView, setIsMobileView] = useState<boolean>(
    typeof window !== "undefined" && window.innerWidth < 810
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const eventsForDay =
      eventData.days
        .find((day) => day.date === selectedDay)
        ?.lectures.map((lecture) => ({
          ...lecture,
          time: lecture.end_time
            ? `${lecture.start_time} - ${lecture.end_time}`
            : lecture.start_time,
          status: `Palestra de ${lecture.speaker.name}`,
        })) || [];
    setFilteredEvents(eventsForDay);
  }, [selectedDay, eventData]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 810);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return weekDays[date.getDay()];
  };

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    setIsDropdownOpen(false);
  };

  const customMarker = () => {
    return <span className="pi pi-calendar text-3xl text-data-purple"></span>;
  };

  const customContent = (item: Lecture) => {
    return (
      <div className="bg-[var(--background-secondary)] border rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-[var(--primary)] mb-3">
          {item.title}
        </h3>
        <p className="text-[var(--text-secondary)] mb-4">{item.description}</p>
        <div className="flex items-center mb-4">
          <Image
            src={item.speaker.photo || "/images/fallback-photo.png"} // Fallback para evitar undefined
            alt={item.speaker.name}
            width={50}
            height={50}
            className="rounded-full mr-4"
          />
          <p className="font-semibold text-lg text-[var(--primary)]">
            {item.speaker.name}
          </p>
        </div>
        <div className="flex items-center text-[var(--text-secondary)] mb-4">
          <FaRegClock className="mr-2 text-lg text-[var(--data-purple)] font-bold" />
          <span className="text-[var(--data-purple)] font-bold">
            {item.time}
          </span>
        </div>
        <a
          href={item.eventReminder}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-[var(--data-purple)] font-bold hover:text-[var(--primary)]"
        >
          <FiYoutube className="mr-2 text-lg" />
          {t("Watch_Lecture")}
        </a>
      </div>
    );
  };

  return (
    <>
      <h2 className="text-[var(--primary)] mb-6">{t("Schedule_Title")}</h2>
      <div className="text-center mb-6">
        {isMobileView ? (
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[var(--background-secondary)] px-3 py-2 text-sm font-semibold text-[var(--primary)] shadow-sm ring-1 ring-inset ring-[var(--dropdown)] hover:bg-[var(--background)]"
              id="menu-button"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              {getDayOfWeek(selectedDay)}
              <svg
                className="-mr-1 h-5 w-5 text-[var(--text-secondary)]"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div
                className="absolute z-10 mt-2 left-1/2 transform -translate-x-1/2 w-56 origin-top rounded-md bg-[var(--background-secondary)] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  {eventData.days.map((day) => (
                    <a
                      key={day.date}
                      href="#"
                      className={`block px-4 py-2 text-sm text-[var(--primary)] hover:bg-[var(--dropdown-hover)] transition-all ${
                        selectedDay === day.date
                          ? "bg-data-purple text-white"
                          : ""
                      }`}
                      role="menuitem"
                      tabIndex={-1}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDayChange(day.date);
                      }}
                    >
                      {getDayOfWeek(day.date)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center space-x-4 min-w-full custom-padding-bottom">
            {eventData.days.map((day) => (
              <button
                key={day.date}
                onClick={() => handleDayChange(day.date)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  selectedDay === day.date
                    ? "bg-data-purple text-white"
                    : "bg-[var(--background-secondary)] text-[var(--primary)] hover:bg-[var(--dropdown-hover)]"
                }`}
              >
                {getDayOfWeek(day.date)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="text-center mb-6">
        <a
          href="https://calendar.google.com/calendar/u/0?cid=Y2YwMTZkNWIwYzkzZmU5MDBhMTc4NDE1MzY1ZjI0NDM5MjQzMGM1ZWQ1MGJkNGRiYTE1NjY1ZjBlZmFkZjgzOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[var(--data-purple)] font-bold hover:text-[var(--primary)] bg-[var(--background-secondary)] p-3 rounded-lg shadow-md"
        >
          <FaCalendarPlus className="mr-2 text-lg" />
          {t("Add_to_Google_Calendar")}
        </a>
      </div>

      <div className="schedule-container p-4 max-w-4xl mx-auto">
        {filteredEvents.length > 0 ? (
          isMobileView ? (
            <ul className="bg-[var(--background-secondary)] rounded-lg p-4 space-y-6 shadow-md">
              {filteredEvents.map((event, index) => (
                <li
                  key={index}
                  className="border-b border-[var(--primary)] pb-6 last:border-none"
                >
                  <h3 className="text-xl font-bold text-[var(--primary)] mb-2">
                    {event.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center mb-2">
                    <Image
                      src={event?.speaker?.photo || ''}
                      alt={event.speaker.name}
                      width={40}
                      height={40}
                      className="rounded-full mr-2"
                    />
                    <p className="font-semibold text-md text-[var(--primary)]">
                      {event.speaker.name}
                    </p>
                  </div>
                  <div className="flex items-center text-[var(--text-secondary)] mb-4 mt-4">
                    <FaRegClock className="mr-2 text-lg text-[var(--data-purple)] font-bold" />
                    <span className="text-[var(--data-purple)] font-bold">
                      {event.time}
                    </span>
                  </div>
                  <a
                    href={event.eventReminder}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[var(--data-purple)] font-bold hover:text-[var(--primary)]"
                  >
                    <FiYoutube className="mr-2 text-lg" />
                    {t("Watch_Lecture")}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Fade triggerOnce>
              <Timeline
                value={filteredEvents}
                align="alternate"
                marker={customMarker}
                content={customContent}
              />
            </Fade>
          )
        ) : (
          <p className="text-center text-lg text-[var(--text-secondary)]">
            {t("No_Events")}
          </p>
        )}
      </div>
    </>
  );
};

export default Schedule;
