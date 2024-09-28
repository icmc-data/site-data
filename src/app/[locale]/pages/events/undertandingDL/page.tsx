"use client";
import { useTranslations } from "next-intl";
import React from "react";
import Hero from "../../../components/Hero";
import "./style.css";

export default function UnderstandingDL() {
  const t = useTranslations("");

  return (
    <div>
      <Hero
        title="Discover new product and best possibilities"
        description="Here at FlowBite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth."
        eventDateTitle="28 November 2021"
        dateText="Join us at FlowBite 2021 to understand what’s next as the global tech and startup ecosystem, rethinks the future of everything."
        speakersTitle="25+ top notch speakers"
        speakersText="Here you will find keynote speakers, who all are able to talk about Recruiting. Click on the individual keynote speakers and read more about them and their keynotes."
        imgLink="https://yt3.googleusercontent.com/WOOCC8PkqyMdpIMj0Wu05WX4W9Zyfb21WXdUf3rw5GbUZ3ZcAuCKe1P_1qhEy_RTa5n6synAnw=s900-c-k-c0x00ffffff-no-rj"
        dateLink="/pages/about"
        speakersLink="/pages/speakers"
        dateButtonText="Conference"
        eventButtonText="View list"
      />
    </div>
  );
}
