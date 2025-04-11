
import { useTranslation } from "react-i18next";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Button } from "@/components/ui/button";
import { Mail, Youtube, Instagram, Linkedin } from "lucide-react";

const Contact = () => {
  const { t } = useTranslation("contact");

  const contactMethods = [
    {
      title: t("contactMethods.email"),
      description: "data@icmc.usp.br",
      icon: Mail,
      href: "mailto:data@icmc.usp.br",
    },
    {
      title: t("contactMethods.youtube"),
      description: "Data ICMC",
      icon: Youtube,
      href: "https://www.youtube.com/c/DataICMC",
    },
    {
      title: t("contactMethods.instagram"),
      description: "@dataicmc",
      icon: Instagram,
      href: "https://www.instagram.com/data.icmc/",
    },
    {
      title: t("contactMethods.linkedin"),
      description: "Data ICMC",
      icon: Linkedin,
      href: "https://www.linkedin.com/school/data-icmc/",
    },
  ];

  return (
    <>
      <ParticlesBackground />
      <main className="min-h-screen flex items-center justify-center pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("description")}
            </p>
            <p className="text-2xl font-medium mt-4">
              {t("callToAction")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex flex-col items-center p-8 bg-card/80 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-colors">
                  <method.icon size={40} className="mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-muted-foreground">{method.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
