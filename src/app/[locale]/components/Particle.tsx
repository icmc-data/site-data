"use client";

import { useCallback, useEffect, useState } from "react";
import Particles, { ParticlesProps } from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useTheme } from "next-themes";

type InitType = ParticlesProps["init"];
type InitTypeNonNullable = NonNullable<InitType>;
type InitParameters = Parameters<InitTypeNonNullable>;
type Engine = InitParameters[0];

const Particle = () => {
  const { resolvedTheme } = useTheme();
  const [particleColor, setParticleColor] = useState("#EC90C5");
  const [particleOpacity, setParticleOpacity] = useState(0.3);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  const updateParticleSettings = useCallback(() => {
    const color = getComputedStyle(document.documentElement).getPropertyValue("--data-pink").trim();
    setParticleColor(color);
    setParticleOpacity(resolvedTheme === 'dark' ? 0.2 : 0.4);
  }, [resolvedTheme]);

  useEffect(() => {
    updateParticleSettings();

    // theme change listener
    const observer = new MutationObserver(updateParticleSettings);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [updateParticleSettings]);

  return (
    <Particles
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: true }, // particles will cover the entire screen
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 50,
              duration: 0.2,
            },
          },
        },
        particles: {
          color: {
            value: particleColor,
          },
          links: {
            color: particleColor,
            distance: 150,
            enable: true,
            opacity: particleOpacity,
            width: 2,
          },
          collisions: {
            enable: true,
          },
          move: {
            enable: true,
            direction: "top-right",
            outModes: {
              default: "bounce",
            },
            random: true,
            straight: false,
            speed: 0.3,
          },
          number: {
            value: 200, // fixed number of particles
            density: {
              enable: true,
              area: 3000,
            },
          },
          opacity: {
            value: particleOpacity,
          },
          shape: {
            type: "triangle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default Particle;
