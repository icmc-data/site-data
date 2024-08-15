"use client";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { IconButton, Button, Typography } from "@material-tailwind/react";
import { PlayIcon } from "@heroicons/react/24/solid";

export default function UnderstandingDL() {
  const t = useTranslations("");

  return (
    <div
      className="relative min-h-screen w-full bg-[url('/images/placeholder.png')] bg-cover bg-no-repeat pt-[var(--header-height)] -mt-[160px] "
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        maxWidth: '2425px',
        right: '0',
      }}
    >
      <br />
      <br />

      <div className="grid min-h-screen px-4 md:px-8" style={{ paddingTop: 'var(--header-height)' }}>
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          <Typography variant="h5" color="white" className="mb-2 md:text-lg">
            29-31 August @ New York
          </Typography>
          <Typography variant="h2" color="white" className="text-3xl md:text-5xl lg:max-w-3xl">
            AI Conference 2023: Unlocking the Future
          </Typography>
          <Typography
            variant="body1"
            color="white"
            className="mt-1 mb-8 text-sm md:text-lg w-full md:max-w-full lg:max-w-2xl"
          >
            Join us for the most anticipated event of the year - the AI Conference 2023!
          </Typography>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Button variant="gradient" color="white" className="w-full md:w-auto">
              Get started
            </Button>
            <IconButton className="rounded-full bg-white p-4 md:p-6">
              <PlayIcon className="h-4 w-4 md:h-6 md:w-6 text-gray-900" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
