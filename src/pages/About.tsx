
import { useTranslation } from "react-i18next";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { MemberCard } from "@/components/MemberCard";
import { Button } from "@/components/ui/button";
import { useFetchMembers, type Member } from "@/utils/fetch-members";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

const About = () => {
  const { t } = useTranslation("about");
  const { data: members, isLoading } = useFetchMembers();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredMembers = members?.filter(member => 
    activeCategory === "all" ? true : member.categories.includes(activeCategory)
  );

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
              <h2 className="text-2xl font-bold mb-4">{t("organization.title")}</h2>
              <p className="text-muted-foreground">
                {t("organization.description")}
              </p>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Members</h2>
            </div>

            <Tabs defaultValue="all" onValueChange={setActiveCategory} className="mb-8">
              <TabsList className="flex flex-wrap">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="bg-muted h-72 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
