
import { useTranslation } from "react-i18next";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Card, CardContent } from "@/components/ui/card";

const Fronts = () => {
  const { t } = useTranslation("fronts");

  const frontItems = [
    {
      title: t("fronts.events.title"),
      description: t("fronts.events.description"),
      image: "/images/fronts/events.jpg"
    },
    {
      title: t("fronts.teaching.title"),
      description: t("fronts.teaching.description"),
      image: "/images/fronts/teaching.jpg"
    },
    {
      title: t("fronts.marketing.title"),
      description: t("fronts.marketing.description"),
      image: "/images/fronts/marketing.png"
    },
    {
      title: t("fronts.studyGroups.title"),
      description: t("fronts.studyGroups.description"),
      image: "/images/fronts/studyGroups.png"
    },
    {
      title: t("fronts.projects.title"),
      description: t("fronts.projects.description"),
      image: "/images/fronts/projects.jpeg"
    },

    {
      title: t("fronts.secretariat.title"),
      description: t("fronts.secretariat.description"),
      image: "/images/fronts/secretariat.png"
    }
  ];
  

  return (
    <>
      <ParticlesBackground />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <section className="mb-16">
            <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
            <p className="text-lg text-muted-foreground mb-8 ">
              {t("description")}
            </p>
            
            <p className="text-lg mb-10">
              {t("subheading")}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {frontItems.map((item, index) => (
                <Card key={index} className="overflow-hidden bg-card/80 backdrop-blur-sm">
                  <div className="aspect-video relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-center">{item.title}</h3>
                    <p className="text-muted-foreground text-center">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Fronts;
