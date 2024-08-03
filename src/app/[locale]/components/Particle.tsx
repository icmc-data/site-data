"use client";

import { useCallback, useEffect, useState } from "react";
import Particles, { ParticlesProps } from "react-tsparticles";
import { loadFull } from "tsparticles";

type InitType = ParticlesProps["init"];
type InitTypeNonNullable = NonNullable<InitType>;
type InitParameters = Parameters<InitTypeNonNullable>;
type Engine = InitParameters[0];

const Particle = () => {
  const [particleColor, setParticleColor] = useState("#EC90C5"); // standard color
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  useEffect(() => {
    // gets the color from the CSS variable
    const color = getComputedStyle(document.documentElement).getPropertyValue("--data-pink").trim();
    setParticleColor(color);
  }, []);

  return (
    <Particles
      className="h-screen"
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
            value: particleColor,
          },
          links: {
            color: particleColor,
            distance: 150,
            enable: true,
            opacity: 0.2, 
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
            speed: 0.5, // decrease particle speed
          },
          number: {
            density: {
              enable: true,
              area: 1600, // increase density area for wider distribution
            },
            value: 100, // reduce number of particles to avoid clumping
          },
          opacity: {
            value: 0.2, // set particle opacity to 20%
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
  );
};

export default Particle;
