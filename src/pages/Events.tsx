import { useTranslation } from "react-i18next";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { useFetchEvents } from "@/utils/fetch-events";
import { useTheme } from "@/components/ThemeProvider";

const Events = () => {
  const { t } = useTranslation("events");
  const { data: eventsData, isLoading } = useFetchEvents();
  const { theme } = useTheme();

  return (
    <>
      <ParticlesBackground />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <section className="mb-16">
            <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* LoG Event Card */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-border">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={
                      theme === "light"
                        ? "/images/events/log2025/log_thumb_branca.png"
                        : "/images/events/log2025/LoGLogoThumb.png"
                    }
                    alt="Learning on Graphs Conference 2025"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">{t("log.title")}</h2>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar size={16} className="mr-1" />
                    <span>{t("log.date")}</span>
                  </div>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {t("log.description")}
                  </p>
                  <Link to="/events/log">
                    <Button
                      size="sm"
                      className="bg-data-purple hover:bg-data-purple/80"
                    >
                      {t("log.actions.learnMore")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* UDL Event Card */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-border">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src="/images/events/udl2024/UDLLogoThumb.png"
                    alt="Understanding Deep Learning 2024"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">{t("udl.title")}</h2>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar size={16} className="mr-1" />
                    <span>{t("udl.date")}</span>
                  </div>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {t("udl.description")}
                  </p>
                  <Link to="https://www.youtube.com/playlist?list=PLFE-LjWAAP9SP4rTHTbTI5JihmkNVVCt4">
                    <Button
                      size="sm"
                      className="bg-data-purple hover:bg-data-purple/80"
                    >
                      {t("udl.actions.learnMore")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* KHIPUx Event Card */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-border">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={"/images/events/khipux2025/khipux.png"}
                    alt="Escola de Primavera de LLMs - KHIPUx"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">{t("khipu.title")}</h2>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar size={16} className="mr-1" />
                    <span>{t("khipu.date")}</span>
                  </div>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {t("khipu.description")}
                  </p>
                  <Link to="/events/khipu">
                    <Button
                      size="sm"
                      className="bg-data-purple hover:bg-data-purple/80"
                    >
                      {t("khipu.actions.learnMore")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Events;
