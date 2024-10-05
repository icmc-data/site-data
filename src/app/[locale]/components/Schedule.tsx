import React, { useState, useEffect, ChangeEvent } from "react";
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
  photo: string;
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

interface EventData {
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
  const [selectedDay, setSelectedDay] = useState<string>(eventData.days[0]?.date || "");
  const [filteredEvents, setFilteredEvents] = useState<Lecture[]>([]);
  const [isMobileView, setIsMobileView] = useState<boolean>(
    typeof window !== "undefined" && window.innerWidth < 810
  );

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

  const handleDayChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value);
  };

  const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return weekDays[date.getDay()];
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
            src={item.speaker.photo}
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
          <span className="text-[var(--data-purple)] font-bold">{item.time}</span>
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
        <label
          htmlFor="day-selector"
          className="text-lg font-semibold mr-2 text-[var(--primary)]"
        >
          {t("Select_Day")}:
        </label>
        <select
          id="day-selector"
          value={selectedDay}
          onChange={handleDayChange}
          className="p-2 border rounded-lg text-[var(--primary)] bg-[var(--background-secondary)]"
        >
          {eventData.days.map((day) => (
            <option key={day.date} value={day.date}>
              {getDayOfWeek(day.date)}
            </option>
          ))}
        </select>
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
                <li key={index} className="border-b border-[var(--primary)] pb-6 last:border-none">
                  <h3 className="text-xl font-bold text-[var(--primary)] mb-2">
                    {event.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center mb-2">
                    <Image
                      src={event.speaker.photo}
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
                    <span className="text-[var(--data-purple)] font-bold">{event.time}</span>
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
              <Timeline value={filteredEvents} align="alternate" marker={customMarker} content={customContent} />
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
