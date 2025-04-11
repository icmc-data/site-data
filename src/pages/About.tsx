import { useTranslation } from "react-i18next";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { MemberCard } from "@/components/MemberCard";
import { Button } from "@/components/ui/button";
import { useFetchMembers, type Member } from "@/utils/fetch-members";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

// Ícones para as categorias
import {
  Users,
  BookOpen,
  Star,
  Mic,
  Megaphone,
  Book,
  ClipboardList,
  Crown,
} from "lucide-react";

const About = () => {
  const { t } = useTranslation("about");
  const { data: members, isLoading } = useFetchMembers();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const updateView = () => {
      setIsMobile(window.innerWidth < 1060);
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  const categories = [
    { id: "all", label: t("categories.all") },
    { id: "Teaching", label: t("categories.teaching") },
    { id: "Projects", label: t("categories.projects") },
    { id: "Events", label: t("categories.events") },
    { id: "Marketing", label: t("categories.marketing") },
    { id: "Study Group", label: t("categories.studyGroup") },
    { id: "Secretariat", label: t("categories.secretariat") },
    { id: "Coordinators", label: t("categories.coordinators") },
  ];

  const categoryIcons: Record<string, JSX.Element> = {
    all: <Users className="w-4 h-4 mr-2" />,
    Teaching: <BookOpen className="w-4 h-4 mr-2" />,
    Projects: <Star className="w-4 h-4 mr-2" />,
    Events: <Mic className="w-4 h-4 mr-2" />,
    Marketing: <Megaphone className="w-4 h-4 mr-2" />,
    "Study Group": <Book className="w-4 h-4 mr-2" />,
    Secretariat: <ClipboardList className="w-4 h-4 mr-2" />,
    Coordinators: <Crown className="w-4 h-4 mr-2" />,
  };

  const filteredMembers = members?.filter((member) =>
    activeCategory === "all" ? true : member.categories.includes(activeCategory)
  );

  return (
    <>
      <ParticlesBackground />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <section className="mb-16">
            <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t("description")}
            </p>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">
                {t("organization.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("organization.description")}
              </p>
            </div>
          </section>

          <div className="mt-10 px-4 py-6 border rounded-xl text-center shadow-sm bg-background-secondary w-full max-w-md mx-auto sm:px-6 md:px-8">
            <p className="text-base sm:text-lg text-muted-foreground mb-4">
              {t("historyCTA.text")}
            </p>
            <a href="/membershistory">
              <Button className="whitespace-normal text-sm sm:text-base font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[hsl(var(--data-purple))] text-white hover:brightness-110 transition duration-200">
                {t("historyCTA.button")}
              </Button>
            </a>
          </div>

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                {t("organization.members")}
              </h2>
            </div>

            {isMobile ? (
              <div className="mb-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-fit">
                      {categoryIcons[activeCategory]}
                      {categories.find((c) => c.id === activeCategory)?.label}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {categories.map((category) => (
                      <DropdownMenuItem
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={
                          category.id === activeCategory ? "bg-muted" : ""
                        }
                      >
                        {categoryIcons[category.id]}
                        {category.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Tabs
                defaultValue="all"
                value={activeCategory}
                onValueChange={setActiveCategory}
                className="mb-8"
              >
                <TabsList className="flex flex-wrap">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex items-center gap-2"
                    >
                      {categoryIcons[category.id]}
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-muted h-72 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-6 justify-center max-w-screen-xl mx-auto">
                {filteredMembers?.map((member) => (
                  <MemberCard key={member.name} member={member} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default About;
