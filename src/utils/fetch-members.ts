
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export type Member = {
  name: string;
  photo: string;
  description: string;
  categories: string[];
  funcao_especial?: string[];
  linkedin?: string;
};

export function useFetchMembers() {
  const { i18n } = useTranslation();
  const language = i18n.language || "pt";

  return useQuery({
    queryKey: ["members", language],
    queryFn: async () => {
      const response = await fetch(`/data/${language}/members.json`);
      if (!response.ok) {
        throw new Error("Erro ao carregar membros");
      }
      return response.json() as Promise<Member[]>;
    },
  });
}
