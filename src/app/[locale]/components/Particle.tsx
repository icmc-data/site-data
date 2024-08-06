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
  const [particleOpacity, setParticleOpacity] = useState(0.3);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  const updateParticleSettings = useCallback(() => {
    const color = getComputedStyle(document.documentElement).getPropertyValue("--data-pink").trim();
    const isDarkMode = resolvedTheme === 'dark';
    setParticleOpacity(isDarkMode ? 0.1 : 0.3);
  }, [resolvedTheme]);

  useEffect(() => {
    // initialize particle settings
    updateParticleSettings();

    // observe changes to the theme
    const observer = new MutationObserver(updateParticleSettings);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [updateParticleSettings]);

  return (
    <div className="no-horizontal-scroll">
      <Particles
        className="h-screen w-screen"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: { enable: false },
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
                distance: 50, // decrease repulsion distance
                duration: 0.2, // decrease repulsion duration
              },
            },
          },
          particles: {
            color: {
              value: getComputedStyle(document.documentElement).getPropertyValue("--data-pink").trim(),
            },
            links: {
              color: getComputedStyle(document.documentElement).getPropertyValue("--data-pink").trim(),
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
              speed: 0.3, // decrease particle speed
            },
            number: {
              density: {
                enable: true,
                area: 3000, // further increase density area for wider distribution
              },
              value: 120, // reduce number of particles to avoid clumping
            },
            opacity: {
              value: particleOpacity,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default Particle;
