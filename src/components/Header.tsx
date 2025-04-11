import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";

export function Header() {
  const { t, i18n } = useTranslation("common");
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Force reload resources for the current page
    window.localStorage.setItem("i18nextLng", lng);
  };

  // Effect to reload page content when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      // This will refresh the translations when language changes
      i18n.reloadResources(i18n.language, [
        "common",
        "home",
        "about",
        "fronts",
        "events",
        "contact",
        "learn",
      ]);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <header className="py-4  md:px-8 backdrop-blur-md bg-background/80 fixed w-full top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/images/config/icon.png"
            alt="Data ICMC Logo"
            className="h-10"
          />
        </Link>

        <div className="hidden md:flex gap-6">
          <NavLink href="/fronts" isActive={location.pathname === "/fronts"}>
            {t("navigation.fronts")}
          </NavLink>
          <NavLink href="/about" isActive={location.pathname === "/about"}>
            {t("navigation.about")}
          </NavLink>
          <NavLink
            href="/events"
            isActive={location.pathname.startsWith("/events")}
          >
            {t("navigation.events")}
          </NavLink>

          <NavLink
            href="/learn"
            isActive={location.pathname.startsWith("/learn")}
          >
            {t("navigation.learn")}
          </NavLink>

          <NavLink href="/contact" isActive={location.pathname === "/contact"}>
            {t("navigation.contact")}
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={20} /> : <Moon size={0} />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe size={20} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => changeLanguage("pt")}
                className={i18n.language === "pt" ? "bg-muted" : ""}
              >
                {t("languageSelector.pt")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => changeLanguage("en")}
                className={i18n.language === "en" ? "bg-muted" : ""}
              >
                {t("languageSelector.en")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <Link
      to={href}
      className={`transition-colors font-medium ${
        isActive
          ? "text-data-purple border-b-2 border-data-purple"
          : "text-foreground hover:text-data-purple"
      }`}
    >
      {children}
    </Link>
  );
}
