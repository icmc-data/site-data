
import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadLinksPreset } from "tsparticles-preset-links";
import { useTheme } from "./ThemeProvider";

export const ParticlesBackground = () => {
  const { theme } = useTheme();
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadLinksPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "links",
        background: {
          color: {
            value: "transparent",
          },
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: theme === "dark" ? "#c479ce" : "#ec90c5", // Data-purple para escuro, data-pink para claro
          },
          links: {
            enable: true,
            distance: 150,
            color: theme === "dark" ? "#c479ce" : "#ec90c5", // Data-purple para escuro, data-pink para claro
            opacity: theme === "dark" ? 0.4 : 0.8, 
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "window",
          events: {
            onhover: {
              enable: true,
              mode: "repulse", // ← muda de "grab" para "repulse"
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,  // distância de repulsão
              duration: 0.4,  // duração do efeito
            },
            push: {
              quantity: 4,    // quantidade de partículas ao clicar
            },
          },
        },
        
        retina_detect: true,
      }}
      className="fixed inset-0 -z-10"
    />
  );
};
