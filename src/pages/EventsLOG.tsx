import { useTranslation } from "react-i18next";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Calendar,
  MapPin,
  Clock,
  MicVocal,
  ChevronLeft,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useFetchEvents } from "@/utils/fetch-events";
import { useTheme } from "@/components/ThemeProvider";

const EventsLOG = () => {
  const { t, i18n } = useTranslation("events");
  const { theme } = useTheme();

  return (
    <>
      <ParticlesBackground />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-8">
            <Link to="/events">
              <Button variant="ghost" className="flex items-center gap-2 mb-4">
                <ChevronLeft size={16} />
                {t("udl.actions.backToEvent")}
              </Button>
            </Link>
          </div>

          {/* Hero Section */}
          <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                {t("log.title")}
              </h1>
              <p className="text-lg mb-8 text-muted-foreground">
                {t("log.description")}
              </p>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={18} />
                  <span>{t("log.date")}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={18} />
                  <span>ICMC - USP São Carlos</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/events/log/register">
                  <Button className="bg-data-purple hover:bg-data-purple/80">
                    {t("log.actions.register")}
                  </Button>
                </Link>
                <Link to="/events/log/speakers">
                  <Button variant="outline">
                    {t("log.actions.viewSpeakers")}
                  </Button>
                </Link>
                <a
                  href="https://calendar.google.com/calendar/u/0?cid=Y180ZWUyN2I1YzkyMzc0MjE5M2FmOGY3YTA5ZWUwMjk2ZWE2NjZjYWJiZmI4OTExMGQ1ZTgwZmNmNmZmZGZmMjBmQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Calendar size={16} />
                    {t("log.actions.addToCalendar")}
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden aspect-video">
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
          </section>

          {/* Features Section */}
          <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-data-purple mb-4">
                  👥
                </div>
                <h2 className="text-xl font-bold mb-3">
                  {t("log.features.lectures.title")}
                </h2>
                <p className="text-muted-foreground">
                  {t("log.features.lectures.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-data-purple mb-4">
                  🔍
                </div>
                <h2 className="text-xl font-bold mb-3">
                  {t("log.features.research.title")}
                </h2>
                <p className="text-muted-foreground">
                  {t("log.features.research.description")}
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href="https://docs.google.com/forms/d/1asPebmyqtFoEpKWiHK46-2cwRk1Upk3CGI59D_cTWSY/edit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-data-purple hover:text-data-purple/80 transition-colors"
                  >
                    <ArrowUpRight size={16} />
                    {t("log.actions.submitPoster")}
                  </a>
                  <a
                    href="https://docs.google.com/forms/d/1XCRj8ohikPHGV0U7qi0lyskeMAmo9ttM871DyMEc4As/edit?pli=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-data-purple hover:text-data-purple/80 transition-colors"
                  >
                    <ArrowUpRight size={16} />
                    {t("log.actions.submitFlashTalk")}
                  </a>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* About Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">{t("log.about.title")}</h2>
            <div className="grid grid-cols-1 gap-8">
              <div className="lg:col-span-2">
                <p className="mb-4 text-muted-foreground">
                  {t("log.about.description")}
                </p>
                <p className="text-muted-foreground">
                  {t("log.about.details")}
                </p>
              </div>
            </div>
          </section>

          {/* Schedule Section */}
          <section className="mb-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-2xl font-bold">{t("log.schedule.title")}</h2>
              <a
                href="https://calendar.google.com/calendar/u/0?cid=Y180ZWUyN2I1YzkyMzc0MjE5M2FmOGY3YTA5ZWUwMjk2ZWE2NjZjYWJiZmI4OTExMGQ1ZTgwZmNmNmZmZGZmMjBmQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 md:mt-0 text-sm flex items-center gap-1 text-data-purple hover:text-data-purple/80 transition-colors"
              >
                <Calendar size={14} />
                {t("log.actions.addToCalendar")}
              </a>
            </div>

            <Tabs defaultValue="saturday">
              <TabsList className="mb-8">
                <TabsTrigger value="saturday">
                  {t("log.schedule.days.saturday")}
                </TabsTrigger>
                <TabsTrigger value="sunday">
                  {t("log.schedule.days.sunday")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="saturday" className="space-y-6">
                {t("log.schedule.saturday", { returnObjects: true })?.map(
                  (event: any, index: number) => (
                    <ScheduleItem
                      key={index}
                      title={event.title}
                      time={event.time}
                      location={event.location}
                      speaker={event.speaker}
                      speakers={event.speakers}
                      description={event.description}
                      actions={event.actions} // passando o array de ações
                    />
                  )
                )}
              </TabsContent>
              <TabsContent value="sunday" className="space-y-6">
                {t("log.schedule.sunday", { returnObjects: true })?.map(
                  (event: any, index: number) => (
                    <ScheduleItem
                      key={index}
                      title={event.title}
                      time={event.time}
                      location={event.location}
                      speaker={event.speaker}
                      speakers={event.speakers}
                      description={event.description}
                      actions={event.actions} // também passando o array de ações
                    />
                  )
                )}
              </TabsContent>
            </Tabs>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">{t("log.faq.title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    {t("log.faq.questions.language")}
                  </AccordionTrigger>
                  <AccordionContent>
                    {t("log.faq.questions.language_answer")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    {t("log.faq.questions.free")}
                  </AccordionTrigger>
                  <AccordionContent>
                    {t("log.faq.questions.free_answer")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    {t("log.faq.questions.certificate")}
                  </AccordionTrigger>
                  <AccordionContent>
                    {t("log.faq.questions.certificate_answer")}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    {t("log.faq.questions.location")}
                  </AccordionTrigger>
                  <AccordionContent>
                    {t("log.faq.questions.location_answer")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    {t("log.faq.questions.sponsor")}
                  </AccordionTrigger>
                  <AccordionContent>
                    {t("log.faq.questions.sponsor_answer")}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

const ScheduleItem = ({
  title,
  time,
  location,
  speaker,
  speakers,
  description,
  actions,
}: {
  title: string;
  time: string;
  location: string;
  speaker?: string;
  speakers?: string[];
  description: string;
  actions?: {
    text: string;
    url: string;
  }[];
}) => {
  return (
    <div className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex items-center mt-2 md:mt-0">
          <Clock size={16} className="mr-1 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{time}</span>
        </div>
      </div>
      <div className="flex items-start gap-2 mb-3">
        <MapPin size={16} className="mt-1 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{location}</span>
      </div>
      {(speaker || (speakers && speakers.length > 0)) && (
        <div className="flex items-start gap-2 mb-4">
          <MicVocal size={16} className="mt-1 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {speaker || speakers?.join(", ")}
          </span>
        </div>
      )}
      <p className="text-muted-foreground text-sm">{description}</p>
      <div className="mt-4 flex flex-col gap-2">
        {actions?.length > 0 && (
          <div className="mt-4 flex flex-col gap-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 w-fit"
              >
                <ArrowUpRight size={14} />
                <a href={action.url} target="_blank" rel="noopener noreferrer">
                  {action.text}
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsLOG;
