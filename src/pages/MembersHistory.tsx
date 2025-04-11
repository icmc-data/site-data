import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const MembersHistory = () => {
  const { t, ready } = useTranslation("membershistory");

  if (!ready) return <div>Carregando...</div>;

  const historyYears = t("years", { returnObjects: true });

  if (!Array.isArray(historyYears)) {
    return <div>Erro ao carregar os dados do histórico.</div>;
  }

  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const filteredYears =
    selectedYear === null
      ? historyYears
      : historyYears.filter((item) => item.year === selectedYear);

  return (
    <>
      <ParticlesBackground />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          {/* Botão para voltar para a página About */}
          <div className="mb-8">
            <Link to="/about">
              <Button variant="ghost" className="flex items-center gap-2">
                <ChevronLeft size={16} />
                {t("back_button", "Voltar para About")}
              </Button>
            </Link>
          </div>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">{t("title")}</h1>

            {/* Dropdown para selecionar um ano específico */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {selectedYear
                    ? t("filter.filtered", { year: selectedYear })
                    : t("filter.dropdown")}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedYear(null)}>
                  {t("filter.all")}
                </DropdownMenuItem>
                {historyYears.map((item) => (
                  <DropdownMenuItem
                    key={item.year}
                    onClick={() => setSelectedYear(item.year)}
                  >
                    {item.year}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Lista scrollável de anos */}
          <div className="flex flex-col gap-16">
            {filteredYears.map((item) => (
              <div
                key={item.year}
                className="flex flex-col items-center scroll-mt-24"
              >
                {item.photo !== "" && (
                  <img
                    src={item.photo}
                    alt={`Grupo de ${item.year}`}
                    className="w-full max-w-4xl h-auto mb-6 rounded-lg shadow-lg object-cover"
                  />
                )}
                <h2 className="text-3xl font-bold mb-4">{item.year}</h2>
                <p className="text-lg text-muted-foreground text-center max-w-3xl">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default MembersHistory;
