import { useTranslations } from "next-intl";
import Button from "./components/Button";
import Link from "next/link";
import LogoIcon from "../icons/logo";

export default function DashboardPage() {
  const t = useTranslations("");
  return (
    <div>
      <section className="flex relative py-24">
        <div className="flex items-center space-x-4">
          <div>
            <p className="leading-loose">
              {t("Extension_Group_of")}
              <a
                href="https://www.icmc.usp.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                &nbsp; ICMC-USP &nbsp;
              </a>
              {t("Small_Description-Data")}
            </p>
            <br />
            <Button variant="secondary" size="medium" styleType="outline">
              {t("Learn_More")}
            </Button>
          </div>
        </div>
        <div className="-mt-30 ml-44">
          <LogoIcon width={400} height={400} />
        </div>
      </section>
    </div>
  );
}
