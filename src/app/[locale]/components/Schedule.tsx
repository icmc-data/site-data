import React, { useState, useEffect } from "react";
import { Timeline } from "primereact/timeline";
import "primereact/resources/themes/saga-blue/theme.css"; // Tema do PrimeReact
import "primereact/resources/primereact.min.css"; // Estilos dos componentes
import "primeicons/primeicons.css"; // Ícones do PrimeReact
import eventData from "@/data/br/udl2024.json";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa"; // Importando ícone de relógio do react-icons

const Schedule: React.FC = () => {
  const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  // Transformando os dados para serem usados no Timeline do PrimeReact
  const [selectedDay, setSelectedDay] = useState<string>(eventData.days[0]?.date || "");
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);

  useEffect(() => {
    // Filtrando eventos do dia selecionado
    const eventsForDay = eventData.days
      .find((day) => day.date === selectedDay)
      ?.lectures.map((lecture) => ({
        ...lecture,
        time: `${lecture.start_time} - ${lecture.end_time}`, // Somente horário da palestra
        status: `Palestra de ${lecture.speaker.name}`,
      })) || [];
    setFilteredEvents(eventsForDay);
  }, [selectedDay]);

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value);
  };

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return weekDays[date.getDay()];
  };

  const customMarker = () => {
    return (
      <span className="pi pi-calendar text-3xl text-data-purple"></span> // Usando ícone de calendário para representar eventos com cor adaptada
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
    <div className="schedule-container p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 text-[var(--primary)]">Agenda do Evento</h1>
      
      <div className="text-center mb-6">
        <label htmlFor="day-selector" className="text-lg font-semibold mr-2 text-[var(--primary)]">Selecione o dia:</label>
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

      {filteredEvents.length > 0 ? (
        <Timeline
          value={filteredEvents}
          align="alternate" // Alterna os lados da timeline para criar um visual dinâmico
          marker={customMarker}
          content={customContent}
        />
      ) : (
        <p className="text-center text-lg text-[var(--text-secondary)]">
          Nenhum evento disponível no momento.
        </p>
      )}
    </div>
  );
};

export default Schedule;
