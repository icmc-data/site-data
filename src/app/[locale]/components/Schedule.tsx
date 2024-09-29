import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Timeline } from "primereact/timeline";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import PropTypes from 'prop-types';

interface EventData {
  days: {
    date: string;
    lectures: {
      title: string;
      description: string;
      start_time: string;
      end_time: string;
      speaker: {
        name: string;
        photo: string;
      };
    }[];
  }[];
}

const Schedule: React.FC<{ eventData: EventData }> = ({ eventData }) => {
  const t = useTranslations("");
  const weekDays = [
    t("Weekdays.Sunday"),
    t("Weekdays.Monday"),
    t("Weekdays.Tuesday"),
    t("Weekdays.Wednesday"),
    t("Weekdays.Thursday"),
    t("Weekdays.Friday"),
    t("Weekdays.Saturday")
  ];
  const [selectedDay, setSelectedDay] = useState<string>(eventData.days[0]?.date || "");
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);

  useEffect(() => {
    const eventsForDay = eventData.days
      .find((day) => day.date === selectedDay)
      ?.lectures.map((lecture) => ({
        ...lecture,
        time: `${lecture.start_time} - ${lecture.end_time}`,
        status: `Palestra de ${lecture.speaker.name}`,
      })) || [];
    setFilteredEvents(eventsForDay);
  }, [selectedDay, eventData]);

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value);
  };

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return weekDays[date.getDay()];
  };

  const customMarker = () => {
    return (
      <span className="pi pi-calendar text-3xl text-data-purple"></span>
    );
  };

  const customContent = (item: any) => {
    return (
      <div className="bg-[var(--background-secondary)] border rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-[var(--primary)] mb-3">{item.title}</h3>
        <p className="text-[var(--text-secondary)] mb-4">{item.description}</p>
        <div className="flex items-center mb-4">
          <Image
            src={item.speaker.photo}
            alt={item.speaker.name}
            width={50}
            height={50}
            className="rounded-full mr-4"
          />
          <p className="font-semibold text-lg text-[var(--primary)]">{item.speaker.name}</p>
        </div>
        <div className="flex items-center text-[var(--text-secondary)]">
          <FaRegClock className="mr-2 text-xl" />
          <span>{item.time}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <h2 className="text-[var(--primary)]">{t("Schedule_Title")}</h2>
      <label htmlFor="day-selector" className="text-lg font-semibold mr-2 text-[var(--primary)]">
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
      <div className="schedule-container p-6 max-w-4xl mx-auto">
        <div className="text-center mb-6"></div>
        {filteredEvents.length > 0 ? (
          <Fade triggerOnce>
            <Timeline
              value={filteredEvents}
              align="alternate"
              marker={customMarker}
              content={customContent}
            />
          </Fade>
        ) : (
          <p className="text-center text-lg text-[var(--text-secondary)]">
            Nenhum evento disponível no momento.
          </p>
        )}
      </div>
    </>
  );
};

Schedule.propTypes = {
  eventData: PropTypes.shape({
    days: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        lectures: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            start_time: PropTypes.string.isRequired,
            end_time: PropTypes.string.isRequired,
            speaker: PropTypes.shape({
              name: PropTypes.string.isRequired,
              photo: PropTypes.string.isRequired
            }).isRequired
          }).isRequired
        ).isRequired
      }).isRequired
    ).isRequired
  }).isRequired
};

export default Schedule;
