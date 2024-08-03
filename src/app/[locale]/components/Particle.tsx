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
  const [particleOpacity, setParticleOpacity] = useState(0.2); // standard opacity

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  const updateParticleSettings = () => {
    // gets the color from the CSS variable
    const color = getComputedStyle(document.documentElement).getPropertyValue("--data-pink").trim();
    setParticleColor(color);

    // sets the opacity based on the color
    if (color === "#EC90C5") {
      setParticleOpacity(0.3); // set opacity to 30% if color matches
    } else {
      setParticleOpacity(0.1); // set opacity to 20% if color doesn't match
    }
  };

  useEffect(() => {
    // initialize particle settings
    updateParticleSettings();

    // observe changes to the :root element's style attribute
    const observer = new MutationObserver(() => {
      updateParticleSettings();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
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
            opacity: particleOpacity, // set link opacity based on color
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
              area: 2000, // increase density area for wider distribution
            },
            value: 120, // reduce number of particles to avoid clumping
          },
          opacity: {
            value: particleOpacity, // set particle opacity based on color
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
