import React from "react";
import { Timeline } from "primereact/timeline";
import "primereact/resources/themes/saga-blue/theme.css"; // Tema do PrimeReact
import "primereact/resources/primereact.min.css"; // Estilos dos componentes
import "primeicons/primeicons.css"; // Ícones do PrimeReact
import eventData from "@/data/br/udl2024.json";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa"; // Importando ícone de relógio do react-icons

const Schedule: React.FC = () => {
  // Transformando os dados para serem usados no Timeline do PrimeReact
  const events = eventData.days.flatMap((day) =>
    day.lectures.map((lecture) => ({
      ...lecture,
      time: `${lecture.start_time} - ${lecture.end_time}`, // Somente horário da palestra
      status: `Palestra de ${lecture.speaker.name}`,
    }))
  );

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
      <Timeline
        value={events}
        align="alternate" // Alterna os lados da timeline para criar um visual dinâmico
        marker={customMarker}
        content={customContent}
      />
    </div>
  );
};

export default Schedule;
