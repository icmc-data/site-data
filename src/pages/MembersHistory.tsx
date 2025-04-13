import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MemberCard } from "@/components/MemberCard";

// Componente para renderizar cada grupo de histórico (por ano)
interface YearHistoryItemProps {
  item: {
    year: string;
    description: string;
    photo: string;
  };
  locale: string;
}

const YearHistoryItem: React.FC<YearHistoryItemProps> = ({ item, locale }) => {
  const [members, setMembers] = useState<any[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  // Função para buscar os membros do ano a partir do arquivo JSON
  const fetchMembers = async () => {
    setIsLoadingMembers(true);
    try {
      const res = await fetch(`/data/${locale}/members-history/${item.year}.json`);
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error("Erro ao carregar os membros do ano", error);
    } finally {
      setIsLoadingMembers(false);
    }
  };

  // Toggle para exibir ou ocultar os membros; se ainda não estiverem carregados, dispara a requisição.
  const toggleMembers = () => {
    if (!showMembers && members.length === 0) {
      fetchMembers();
    }
    setShowMembers(!showMembers);
  };

  return (
    <div key={item.year} className="flex flex-col items-center scroll-mt-24">
      {item.photo && (
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
      <div className="mt-4">
        <Button
          variant="outline"
          onClick={toggleMembers}
          className="flex items-center gap-2"
        >
          Ver membros
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              showMembers ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>
      {showMembers && (
        <div className="mt-4 w-full">
          {isLoadingMembers ? (
            <div>Carregando membros...</div>
          ) : (
            <div className="flex flex-wrap gap-6 justify-center">
              {members.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MembersHistory = () => {
  const { t, ready, i18n } = useTranslation("members-history");

  if (!ready) return <div>Carregando...</div>;

  // Obtém os dados de anos históricos do arquivo de tradução
  const historyYears = t("years", { returnObjects: true });

  if (!Array.isArray(historyYears)) {
    return <div>Erro ao carregar os dados do histórico.</div>;
  }

  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const filteredYears =
    selectedYear === null
      ? historyYears
      : historyYears.filter((item: any) => item.year === selectedYear);

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

            {/* Dropdown para filtrar por ano */}
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
                {historyYears.map((item: any) => (
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

          {/* Renderiza cada ano (filtrado ou não) */}
          <div className="flex flex-col gap-16">
            {filteredYears.map((item: any) => (
              <YearHistoryItem
                key={item.year}
                item={item}
                locale={i18n.language}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default MembersHistory;
