import { useTranslation } from "react-i18next";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { useFetchEvents } from "@/utils/fetch-events";

const Learn = () => {
  const { t } = useTranslation("learn");
  const { data: eventsData, isLoading } = useFetchEvents();

  return (
    <>
      <ParticlesBackground />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <section className="mb-16">
            <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Python Course Card */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-border">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src="/images/learn/python2024Thumb.png"
                    alt="Understanding Deep Learning 2024"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">
                    {t("pythoncourse.title")}
                  </h2>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar size={16} className="mr-1" />
                    <span>{t("pythoncourse.date")}</span>
                  </div>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {t("pythoncourse.description")}
                  </p>
                  <Link to="https://www.youtube.com/playlist?list=PLFE-LjWAAP9Skog9YhRvuNBjWD724c32m">
                    <Button
                      size="sm"
                      className="bg-data-purple hover:bg-data-purple/80"
                    >
                      {t("pythoncourse.actions.watch")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Machine Learning Course Card */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-border">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src="/images/learn/ML2025Thumb.png"
                    alt="Curso de Introdução ao Machine Learning 2025"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">
                    {t("mlcourse.title")}
                  </h2>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar size={16} className="mr-1" />
                    <span>{t("mlcourse.date")}</span>
                  </div>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {t("mlcourse.description")}
                  </p>
                  <Link to="https://www.youtube.com/playlist?list=PLFE-LjWAAP9QEC8KhIBWxM_tquU8UmuYW">
                    <Button
                      size="sm"
                      className="bg-data-purple hover:bg-data-purple/80"
                    >
                      {t("mlcourse.actions.watch")}
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

export default Learn;
