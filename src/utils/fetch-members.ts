import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Papa from "papaparse";

type MemberCsvRow = {
  Name: string;
  Photo: string;
  Description: string;
  Categories: string;
  LinkedIn: string;
  Special: string;
  Year: string;
};

export type Member = {
  name: string;
  photo: string;
  description: string;
  categories: string[];
  funcao_especial?: string[];
  linkedin?: string;
  years: string[];
};

export function getCurrentMembersYear(date = new Date()): string {
  const calendarYear = date.getFullYear();
  const isTransitionPeriod = date.getMonth() < 2;

  return String(isTransitionPeriod ? calendarYear - 1 : calendarYear);
}

const splitPipeSeparatedValues = (value: string) =>
  value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

function parseMembersCsv(csv: string): Member[] {
  const result = Papa.parse<MemberCsvRow>(csv, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (header) => header.trim(),
  });

  if (result.errors.length > 0) {
    const details = result.errors
      .map((error) => `linha ${error.row + 2}: ${error.message}`)
      .join("; ");
    throw new Error(`Erro ao interpretar CSV de membros: ${details}`);
  }

  return result.data.map((row, index) => {
    if (!row.Name || !row.Photo || !row.Description)
      throw new Error(`Dados inválidos no CSV de membros, linha ${index + 2}`);

    const special = splitPipeSeparatedValues(row.Special ?? "");
    const years = splitPipeSeparatedValues(row.Year ?? "");

    if (years.length === 0 || years.some((year) => !/^\d{4}$/.test(year)))
      throw new Error(`Ano inválido no CSV de membros, linha ${index + 2}`);

    return {
      name: row.Name.trim(),
      photo: row.Photo.trim(),
      description: row.Description.trim(),
      categories: splitPipeSeparatedValues(row.Categories ?? ""),
      linkedin: row.LinkedIn?.trim() || undefined,
      funcao_especial: special.length > 0 ? special : undefined,
      years,
    };
  });
}

export function useFetchMembers(year = getCurrentMembersYear(), enabled = true) {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language || "pt";

  return useQuery({
    queryKey: ["members", language],
    queryFn: async ({ signal }) => {
      const response = await fetch(`/data/${language}/members.csv`, { signal });
      if (!response.ok)
        throw new Error("Erro ao carregar membros");

      const csv = await response.text();
      return parseMembersCsv(csv);
    },
    select: (members) =>
      members.filter((member) => member.years.includes(year)),
    enabled,
  });
}
