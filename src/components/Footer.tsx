
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider";

export function Footer() {
  const { t } = useTranslation("common");
  const { theme } = useTheme();

  return (
    <footer className="bg-background/80 backdrop-blur-md py-12 mt-5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-2">
              <img src={theme === "dark" ? "/images/footer/simpleDATAICON.png" : "/images/footer/simpleDATAICON-white.png" } alt="Data ICMC Logo" className="h-8" />
              <span className="text-lg font-semibold">Data ICMC</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-auto">
            <div>
              <h3 className="font-semibold mb-4">{t("footer.resources")}</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">Sobre Nós</Link></li>
                <li><Link to="/fronts" className="text-muted-foreground hover:text-foreground transition-colors">Frentes do grupo</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t("footer.followUs")}</h3>
              <ul className="space-y-2">
                <li><a href="https://www.linkedin.com/school/data-icmc/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a></li>
                <li><a href="https://www.instagram.com/data.icmc/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Instagram</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t("footer.happening")}</h3>
              <ul className="space-y-2">
                <li><Link to="/learn" className="text-muted-foreground hover:text-foreground transition-colors">Machine Learning Course</Link></li>
                <li><Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors">LoG Conference</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">© {new Date().getFullYear()} Data ICMC</p>
        </div>
      </div>
    </footer>
  );
}
