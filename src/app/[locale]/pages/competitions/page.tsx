import { useTranslations } from "next-intl";
import { Footer } from "../../components/Footer";

export default function Competitions() {
  const t = useTranslations("");
  return (
    <div className="py-24 text-2xl mt-24">
      <section className="flex relative py-0">
        <div className="flex items-center">
          <div>
            <h1>{t("Header.Competitions")}</h1>
            <br />
            <br />
          </div>
        </div>
      </section>
    </div>
  );
}
