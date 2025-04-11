import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { SponsorList } from "@/components/SponsorList";

const Index = () => {
  const { t } = useTranslation("home");

  return (
    <>
      <ParticlesBackground />
      <main className="min-h-screen">
        {/* Seção Principal */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-bold">{t("title")}</h1>
                <p className="text-lg text-muted-foreground">
                  {t("description")}
                </p>
                <br />
                <Link to="/about">
                  <Button
                    size="lg"
                    className="bg-data-purple hover:bg-data-purple-dark"
                  >
                    {t("learnMore")}
                  </Button>
                </Link>
              </div>
              <div className="flex justify-center lg:justify-end">
                <img
                  src="/images/home/members.jpeg"
                  alt="Data ICMC Group"
                  className="rounded-lg shadow-lg w-full max-w-3xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Apoiadores */}
        <SponsorList />

        {/* Seção de Conteúdos de Ensino */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="/images/home/teaching.jpg"
                  alt="Conteúdos de Ensino Data ICMC"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <h2 className="text-4xl font-bold">
                  {t("learnSectionTitle", "Explore os Conteúdos de Ensino")}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t(
                    "learnSectionDescription",
                    "Descubra uma variedade de conteúdos educativos que vão desde artigos e tutoriais até cursos e vídeos. Preparamos materiais exclusivos para ajudar você a dominar as mais recentes tecnologias e metodologias em ciência de dados e machine learning, tornando o aprendizado dinâmico e aplicável ao mercado."
                  )}
                </p>
                <br />

                <Link to="/learn">
                  <Button
                    size="lg"
                    className="bg-data-purple hover:bg-data-purple-dark"
                  >
                    {t("seeLearn", "Ver Conteúdos")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Eventos */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold">
                  {t("eventSectionTitle", "Descubra os Eventos do Data ICMC")}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t(
                    "eventSectionDescription",
                    "No Data ICMC, promovemos eventos transformadores que conectam o meio acadêmico à indústria. Nossos encontros, workshops, e palestras são projetados para estimular a inovação e facilitar o networking entre profissionais, estudantes e entusiastas da ciência de dados. Cada evento é uma oportunidade única para aprender, compartilhar conhecimentos e expandir sua rede de contatos."
                  )}
                </p>
                <br />

                <Link to="/events">
                  <Button
                    size="lg"
                    className="bg-data-purple hover:bg-data-purple-dark"
                  >
                    {t("seeEvents", "Ver Eventos")}
                  </Button>
                </Link>
              </div>
              <div>
                <img
                  src="/images/home/events.jpg"
                  alt="Eventos Data ICMC"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
