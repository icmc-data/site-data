
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export type Speaker = {
  name: string;
  photo: string;
  title?: string;
  bio: string;
  day?: string;
  lattes?: string;
  linkedin?: string;
  email?: string;
  scholar?: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type EventData = {
  udl: {
    speakers: Speaker[];
    faq: FAQ[];
  };
  log: {
    speakers: Speaker[];
    faq: FAQ[];
  };
};

export function useFetchEvents() {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage || "pt";

  return useQuery({
    queryKey: ["events", language],
    queryFn: async () => {
      const response = await fetch(`/data/${language}/events.json`);
      if (!response.ok) {
        throw new Error("Erro ao carregar eventos");
      }
      return response.json() as Promise<EventData>;
    },
  });
}
