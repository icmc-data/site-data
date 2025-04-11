
import { useTranslation } from "react-i18next";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EventsLOGSpeakers = () => {
  const { t, i18n } = useTranslation("events");
  
  const speakers = i18n.language === "pt" 
    ? t("log.speakers.list", { returnObjects: true })
    : t("log.speakers.list", { returnObjects: true });

  return (
    <>
      <ParticlesBackground />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-8">
            <Link to="/events/log">
              <Button variant="ghost" className="flex items-center gap-2 mb-4">
                <ChevronLeft size={16} />
                {t("log.actions.backToEvent")}
              </Button>
            </Link>
            <h1 className="text-4xl font-bold mb-2">{t("log.speakers.title")}</h1>
            <p className="text-muted-foreground">
              {i18n.language === "pt" 
                ? "Conheça os palestrantes que estarão presentes no evento"
                : "Meet the speakers who will be present at the event"}
            </p>
          </div>

          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {speakers?.map((speaker: any, index: number) => (
                <Card key={index} className="overflow-hidden border border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3">
                        <div className="aspect-square bg-muted rounded-md overflow-hidden mb-4">
                          <img
                            src={`${speaker.photo}`}
                            alt={`${speaker.name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {(speaker.linkedin || speaker.lattes || speaker.scholar || speaker.email) && (
                          <div className="space-y-2 mt-4">
                            {speaker.linkedin && (
                              <a
                                href={speaker.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-data-purple hover:text-data-purple/80"
                              >
                                <ExternalLink size={14} />
                                LinkedIn
                              </a>
                            )}
                            
                            {speaker.lattes && (
                              <a
                                href={speaker.lattes}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-data-purple hover:text-data-purple/80"
                              >
                                <ExternalLink size={14} />
                                Lattes
                              </a>
                            )}
                            
                            {speaker.scholar && (
                              <a
                                href={speaker.scholar}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-data-purple hover:text-data-purple/80"
                              >
                                <ExternalLink size={14} />
                                Google Scholar
                              </a>
                            )}
                            
                            {speaker.email && (
                              <a
                                href={`mailto:${speaker.email}`}
                                className="flex items-center gap-2 text-sm text-data-purple hover:text-data-purple/80"
                              >
                                <ExternalLink size={14} />
                                {speaker.email}
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="w-full md:w-2/3">
                        <h2 className="text-xl font-bold mb-3">{speaker.name}</h2>
                        <p className="text-muted-foreground text-sm">{speaker.bio}</p>
                      </div>
                    </div>
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

export default EventsLOGSpeakers;
