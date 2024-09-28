import { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { AiOutlineClockCircle } from "react-icons/ai";
import EventIcon from "@mui/icons-material/Event";

const EventsCalendar = ({ events }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [expandedEvents, setExpandedEvents] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 620);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Verifica inicialmente

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const firstEventDay = events[0].day;
      setSelectedDay(firstEventDay);
      setExpandedEvents(new Array(events.length).fill(false));
    }
  }, [events]);

  if (events.length === 0) {
    return (
      <p className="p-3 mt-8 mb-32 bg-white text-primary font-secondary rounded-xl bg-opacity-70">
        Por enquanto não temos nenhum evento divulgado!
      </p>
    );
  }

  const filteredEvents = selectedDay
    ? events.find((event) => event.day === selectedDay)?.events || []
    : [];

  const toggleExpandEvent = (index) => {
    setExpandedEvents((prevExpandedEvents) => {
      const newExpandedEvents = [...prevExpandedEvents];
      newExpandedEvents[index] = !newExpandedEvents[index];
      return newExpandedEvents;
    });
  };

  return (
    <div className="w-full">
      {/* Seletor de dias */}
      <div className="flex justify-center mb-4 space-x-2">
        {events.map((dayData) => (
          <button
            key={dayData.day}
            className={`px-4 py-2 text-white rounded-md transition transform focus:outline-none ${
              selectedDay === dayData.day
                ? "bg-[rgb(233,30,99)] shadow-inner scale-95"
                : "bg-blue-400 hover:bg-[rgb(233,30,99)] active:scale-95 active:shadow-inner"
            }`}
            onClick={() => setSelectedDay(dayData.day)}
          >
            {dayData.day}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <VerticalTimeline
        animate={!isMobile}
        lineColor={isMobile ? "transparent" : "white"}
        className={`${isMobile ? "hidden-line" : ""}`}
      >
        {filteredEvents.map((event, index) => {
          return (
            <VerticalTimelineElement
              key={event.id}
              icon={isMobile ? null : <EventIcon />}
              iconStyle={
                isMobile
                  ? { display: "none" }
                  : { background: "rgb(233, 30, 99)", color: "#fff" }
              }
              contentStyle={{
                background: "#1f2937",
                color: "#fff",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
                maxWidth: "100%",
              }}
              contentArrowStyle={
                isMobile
                  ? { display: "none" }
                  : { borderRight: "7px solid  #1f2937" }
              }
              className={`${isMobile ? "hidden-icon" : ""}`}
            >
              <div onClick={() => toggleExpandEvent(index)}>
                <h3 className="vertical-timeline-element-title">
                  {event.title}
                </h3>
                <p className="flex items-center text-yellow-400">
                  <AiOutlineClockCircle className="mr-2" />
                  {event.startTime} - {event.endTime}
                </p>
              </div>
              <div
                className={`transition-max-height duration-700 ease-in-out overflow-hidden ${
                  expandedEvents[index] ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="p-4">
                  <h4 className="text-purple-500 vertical-timeline-element-subtitle">
                    {event.type}
                  </h4>
                  <p>{event.description}</p>
                </div>
              </div>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
};

export default EventsCalendar;
