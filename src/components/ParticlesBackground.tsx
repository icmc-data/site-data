
import { useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "./ThemeProvider";

const loadParticlesEngine = async (engine: Engine) => {
  await loadSlim(engine);
};

export const ParticlesBackground = () => {
  const { theme } = useTheme();
  const particleColor = theme === "dark" ? "#c479ce" : "#ec90c5";
  const options = useMemo<ISourceOptions>(() => ({
    hdr: false,
    background: {
      color: {
        value: "transparent",
      },
    },
    particles: {
      number: {
        value: 100,
        density: {
          enable: false,
        },
      },
      paint: {
        color: {
          value: particleColor,
        },
        fill: {
          enable: true,
          color: {
            value: particleColor,
          },
          opacity: 1,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: 1,
      },
      links: {
        enable: true,
        distance: 150,
        color: particleColor,
        opacity: theme === "dark" ? 0.4 : 0.8,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.3,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "out",
        },
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: false,
        },
        onClick: {
          enable: false,
        },
        resize: {
          enable: true,
        },
      },
    },
    detectRetina: true,
  }), [particleColor, theme]);

  return (
    <ParticlesProvider init={loadParticlesEngine}>
      <Particles
        id="tsparticles"
        options={options}
        className="fixed inset-0 -z-10"
      />
    </ParticlesProvider>
  );
};
