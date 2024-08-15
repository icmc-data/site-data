"use client";
import { useState, useEffect, useRef } from "react";
import { Link } from "@/src/navigation";
import { useTranslations } from "next-intl";
import { FC } from "react";
import LogoIcon from "../../icons/logo";
import LangSwitcher from "./LangSwitcher";
import ThemeSwitch from "./ThemeSwitch";
import PageList from "./PageList";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // imports updated icons

interface Props {
  locale: string;
}

export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations("");
  const [selectedPath, setSelectedPath] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // state to control the menu
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = (path: string) => {
    setSelectedPath(path);
    setMenuOpen(false); // closes the menu when a link is clicked
  };

  const getLinkClass = (path: string) => {
    return selectedPath === path ? "text-data-purple" : "";
  };

  // close the menu when clicking outside of its scope
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuOpen]);

  const pages = [
    { name: "Understanding DL", path: "/pages/events/undertandingDL" },
    { name: "DataDay", path: "/pages/events/dataDay" },
  ];

  return (
    <div className="mx-auto flex max-w-screen-2xl items-center justify-between p-5">
      <Link lang={locale} href={`/`} onClick={() => setSelectedPath("")}>
        <div className="flex flex-row items-center">
          <div className="mb-2 h-14 w-14">
            <LogoIcon />
          </div>
        </div>
      </Link>

      {/* hamburger menu button for mobile */}
      <div className="flex md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <XMarkIcon className="h-8 w-8 text-primary" />
          ) : (
            <Bars3Icon className="h-8 w-8 text-primary" />
          )}
        </button>
      </div>

      {/* menu for mobile devices */}
      <div
        ref={menuRef}
        className={`mobile-menu md:hidden ${menuOpen ? "open" : ""}`}
      >
        <div className="flex flex-col items-center justify-center space-y-6">
          <Link
            lang={locale}
            href={`/pages/fronts`}
            className={`${getLinkClass("/pages/fronts")} block`}
            onClick={() => handleLinkClick("/pages/fronts")}
          >
            {t("Header.Fronts")}
          </Link>
          <Link
            lang={locale}
            href={`/pages/competitions`}
            className={`${getLinkClass("/pages/competitions")} block`}
            onClick={() => handleLinkClick("/pages/competitions")}
          >
            {t("Header.Competitions")}
          </Link>
          <Link
            lang={locale}
            href={`/pages/learn`}
            className={`${getLinkClass("/pages/learn")} block`}
            onClick={() => handleLinkClick("/pages/learn")}
          >
            {t("Header.Learn")}
          </Link>
          <Link
            lang={locale}
            href={`/pages/projects`}
            className={`${getLinkClass("/pages/projects")} block`}
            onClick={() => handleLinkClick("/pages/projects")}
          >
            {t("Header.Projects")}
          </Link>
          <PageList
            locale={locale}
            pages={pages}
            pageListName={t("Header.Events")}
            className="block"
          />
          <Link
            lang={locale}
            href={`/pages/contact`}
            className={`${getLinkClass("/pages/contact")} block`}
            onClick={() => handleLinkClick("/pages/contact")}
          >
            {t("Header.Contact")}
          </Link>
          <div className="flex flex-row items-center space-x-4">
            <ThemeSwitch />
            <LangSwitcher locale={locale} />
          </div>
        </div>
      </div>

      {/* default menu for larger screens */}
      <div className="hidden md:flex flex-1 flex-col items-center gap-10 text-center font-bold">
        <div className="flex gap-10 items-center">
          <Link
            lang={locale}
            href={`/pages/fronts`}
            className={getLinkClass("/pages/fronts")}
            onClick={() => handleLinkClick("/pages/fronts")}
          >
            {t("Header.Fronts")}
          </Link>
          <Link
            lang={locale}
            href={`/pages/competitions`}
            className={getLinkClass("/pages/competitions")}
            onClick={() => handleLinkClick("/pages/competitions")}
          >
            {t("Header.Competitions")}
          </Link>
          <Link
            lang={locale}
            href={`/pages/learn`}
            className={getLinkClass("/pages/learn")}
            onClick={() => handleLinkClick("/pages/learn")}
          >
            {t("Header.Learn")}
          </Link>
          <Link
            lang={locale}
            href={`/pages/projects`}
            className={getLinkClass("/pages/projects")}
            onClick={() => handleLinkClick("/pages/projects")}
          >
            {t("Header.Projects")}
          </Link>
          <PageList
            locale={locale}
            pages={pages}
            pageListName={t("Header.Events")}
          />
          <Link
            lang={locale}
            href={`/pages/contact`}
            className={getLinkClass("/pages/contact")}
            onClick={() => handleLinkClick("/pages/contact")}
          >
            {t("Header.Contact")}
          </Link>
        </div>
      </div>

      {/* theme and language switcher for desktop */}
      <div className="hidden md:flex flex-row items-center gap-3">
        <ThemeSwitch />
        <LangSwitcher locale={locale} />
      </div>
    </div>
  );
};

export default Header;
