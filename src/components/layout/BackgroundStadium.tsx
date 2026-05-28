"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./BackgroundStadium.module.css";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BackgroundStadium() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const heroFixedRef = useRef<HTMLDivElement>(null);
  const pitchRef = useRef<HTMLDivElement>(null);
  const scoreboardRef = useRef<HTMLDivElement>(null);
  const beamsRef = useRef<HTMLDivElement>(null);

  const setLightIntensity = (
    targets: Element | Element[] | null | undefined,
    value: number,
    duration = 1.6,
  ) => {
    if (!targets) return;
    gsap.to(targets, {
      "--light-intensity": value,
      duration,
      ease: "sine.inOut",
      overwrite: "auto",
    });
  };

  // ── Stadium Activation & Ambient Effects ───────────────────────────────
  useEffect(() => {
    if (!mounted) return;
    
    const scoreboard = scoreboardRef.current;
    const pitch = pitchRef.current;
    const heroFixed = heroFixedRef.current;

    // --- Part 1: Activation Wake-up Sequence ---
    const lightGroups = heroFixed?.querySelectorAll(`.${styles.povLightGroup}`);
    const digitalElements = pitch?.querySelectorAll(
      `.${styles.digitalGrid}, .${styles.digitalRingLarge}, .${styles.digitalRingMedium}, .${styles.digitalRingSmall}, .${styles.dataNodeLeft}, .${styles.dataNodeRight}, .${styles.dataNodeCenter}`,
    );
    const rings = pitch?.querySelectorAll(`.${styles.pitchGlow}`);
    const atmosphere = heroFixed?.querySelectorAll(
      `.${styles.atmosphereCenterGlow}, .${styles.atmosphereTopGlow}`,
    );
    const scoreboardPanel = scoreboard?.querySelector(
      `.${styles.scoreboardPanel}`,
    );

    // Only apply sequence if elements exist
    if (
      lightGroups &&
      digitalElements &&
      rings &&
      atmosphere &&
      scoreboardPanel
    ) {
      // Set initial dark / off state
      gsap.set([digitalElements, rings, atmosphere], {
        opacity: 0,
      });
      gsap.set(lightGroups, { "--light-intensity": 0.06 });
      gsap.set(scoreboardPanel, { opacity: 0, scale: 0.95, y: 10 });

      const wakeTl = gsap.timeline({ paused: true });

      // 1. Ambient atmosphere slowly glows
      wakeTl.to(
        [atmosphere, rings],
        { opacity: 0.3, duration: 1.5, ease: "power2.inOut" },
        0,
      );

      // 2. Initial hero floodlights warm up and then remain steady.
      wakeTl.to(
        lightGroups,
        {
          "--light-intensity": 0.5,
          duration: 1.8,
          stagger: 0.12,
          ease: "sine.inOut",
        },
        0.5,
      );

      // 3. Holographic digital rings and ground nodes power up
      wakeTl.to(
        digitalElements,
        { opacity: 1, duration: 1.5, stagger: 0.1, ease: "power2.out" },
        1.0,
      );

      // 4. Removed scoreboard from wake sequence
      // Scoreboard now remains hidden until the final CTA section

      // Instantly play activation on load
      wakeTl.play();
    }

    // --- Part 2: Ongoing Ambient UI Movement ---
    if (scoreboard) {
      // Gentle Yoyo float
      gsap.to(scoreboard, {
        y: "+=12",
        rotationX: 2,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Live metrics counter tick
      const activeGuests = document.getElementById("activeGuestsValue");
      if (activeGuests) {
        let val = 104514;
        const interval = setInterval(() => {
          val +=
            Math.random() > 0.5
              ? Math.floor(Math.random() * 8)
              : -Math.floor(Math.random() * 4);
          activeGuests.innerText = val.toLocaleString();
        }, 2000);
        return () => clearInterval(interval);
      }
    }
  }, [mounted]);

  // ── Cinematic Global Background Animation (ScrollTrigger) ───────────────────────────────
  useEffect(() => {
    if (!mounted) return;
    
    const pitch = pitchRef.current;
    const scoreboard = scoreboardRef.current;
    const heroFixed = heroFixedRef.current;
    if (!pitch) return;

    // Reset any previous scroll triggers when route changes
    ScrollTrigger.getAll().forEach((st) => st.kill());
    const selectLights = (className: string) =>
      Array.from(heroFixed?.querySelectorAll(`.${className}`) ?? []);
    const allLights = selectLights(styles.povLightGroup);
    const heroLights = selectLights(styles.lightHero);
    const leftLights = selectLights(styles.lightLeft);
    const rightLights = selectLights(styles.lightRight);
    const farLights = selectLights(styles.lightFar);
    const nearLights = selectLights(styles.lightNear);

    gsap.killTweensOf([pitch, scoreboard, allLights]);
    gsap.set(allLights, { "--light-intensity": 0.06 });

    // Define the default/hero POV: Wide stadium reveal
    const defaultPitchVars: gsap.TweenVars = {
      scale: 1.0,
      y: -100,
      z: 0,
      rotationX: 20,
      rotationY: 0,
      rotationZ: 0,
      xPercent: -50,
      transformOrigin: "50% 60%",
    };

    const defaultScoreboardVars: gsap.TweenVars = {
      opacity: 0, y: -800, rotationX: 0, scale: 1
    };

    // Helper to apply POV
    const applyPov = (pitchVars: gsap.TweenVars, scoreboardVars?: gsap.TweenVars, duration = 1.5) => {
      gsap.to(pitch, { ...pitchVars, duration, ease: "power2.inOut", overwrite: "auto" });
      if (scoreboard) {
        if (scoreboardVars) {
          gsap.to(scoreboard, { ...scoreboardVars, duration, ease: "power2.inOut", overwrite: "auto" });
        } else {
          // Default behavior for scoreboard when leaving hero is to fade out
          gsap.to(scoreboard, { opacity: 0, y: -800, rotationX: -15, scale: 0.8, duration: 0.5, ease: "power2.inOut", overwrite: "auto" });
        }
      }
    };

    const activateRouteLights = (activeLights: Element[]) => {
      setLightIntensity(allLights, 0.06, 1.2);
      setLightIntensity(activeLights, 0.88, 1.8);
    };

    // If we are NOT on the homepage, apply a specific POV for that page
    if (pathname !== "/") {
      if (pathname === "/audio") {
        applyPov({ scale: 1.7, xPercent: 30, y: 100, rotationZ: 10, rotationX: -15 }, { opacity: 0 });
        activateRouteLights(leftLights);
      } else if (pathname === "/ecommerce") {
        applyPov({ scale: 1.5, y: 200, z: 100, rotationX: -10, rotationZ: 0, xPercent: -50 }, { opacity: 1, y: 0, rotationX: 0, scale: 1 });
        activateRouteLights(farLights);
      } else if (pathname === "/mobile-apps") {
        applyPov({ scale: 1.6, y: -50, z: 200, rotationX: 45, rotationZ: -10, xPercent: -40 }, { opacity: 0 });
        activateRouteLights(rightLights);
      } else if (pathname === "/casinos") {
        applyPov({ scale: 1.4, xPercent: -60, y: 300, rotationZ: -15, rotationX: 0 }, { opacity: 0 });
        activateRouteLights(nearLights);
      } else {
        // Fallback for other pages
        applyPov({ scale: 1.2, y: 0, z: 0, rotationX: 10, rotationZ: 0, xPercent: -50 }, { opacity: 0 });
        activateRouteLights(heroLights);
      }
      return;
    }

    // --- HOMEPAGE SECTION-BASED SCROLL TRIGGERS ---
    
    // Set initial state
    gsap.set(pitch, defaultPitchVars);
    gsap.set(scoreboard, defaultScoreboardVars);
    gsap.set(allLights, { "--light-intensity": 0.08 });
    gsap.set(heroLights, { "--light-intensity": 0.76 });

    // Create a single reliable timeline tied to the total scroll of the page.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "max",
        scrub: 1.5, // Super smooth scrubbing
      },
    });

    // Mapped POV transitions (0.0 to 1.0 progress of the page scroll)

    // 0.00 -> 0.15 (Hero to Positioning Section) 
    // Push the camera deep INSIDE the stadium bowl, near the pitch, slight tilt
    tl.to(pitch, { scale: 3.2, y: 400, z: 300, rotationX: 15, rotationY: -60, rotationZ: 0, xPercent: -50, duration: 0.15, ease: "power2.inOut" }, 0.0);
    tl.to(heroLights, { "--light-intensity": 0.16, duration: 0.12, ease: "sine.inOut" }, 0.0);
    tl.to(nearLights, { "--light-intensity": 0.88, duration: 0.15, ease: "sine.inOut" }, 0.0);

    // 0.15 -> 0.25 (Positioning Section - The Premium Orbit Moment)
    // Horizontal 3D pan FROM INSIDE the stadium (spins the stadium around the camera)
    tl.to(pitch, { scale: 3.2, y: 400, z: 300, rotationX: 15, rotationY: 60, rotationZ: 0, xPercent: -50, duration: 0.10, ease: "sine.inOut" }, 0.15);
    tl.to(nearLights, { "--light-intensity": 0.3, duration: 0.1, ease: "sine.inOut" }, 0.15);
    tl.to(leftLights, { "--light-intensity": 0.86, duration: 0.1, ease: "sine.inOut" }, 0.15);

    // 0.25 -> 0.40 (Stats to Services Section)
    // Dive down from the orbit towards the digital pitch nodes, resetting horizontal angle
    tl.to(pitch, { scale: 2.2, xPercent: -30, y: 200, z: 200, rotationX: 25, rotationY: 0, rotationZ: 10, duration: 0.15, ease: "power2.inOut" }, 0.25);
    tl.to(leftLights, { "--light-intensity": 0.2, duration: 0.15, ease: "sine.inOut" }, 0.25);
    tl.to(rightLights, { "--light-intensity": 0.88, duration: 0.15, ease: "sine.inOut" }, 0.25);

    // 0.40 -> 0.55 (Services to Featured Metrics Section)
    // Panning directly over the top
    tl.to(pitch, { scale: 2.6, xPercent: -50, y: 150, z: 150, rotationX: 45, rotationZ: 0, duration: 0.15, ease: "power2.inOut" }, 0.40);
    tl.to(rightLights, { "--light-intensity": 0.36, duration: 0.15, ease: "sine.inOut" }, 0.40);
    tl.to(allLights, { "--light-intensity": 0.64, duration: 0.15, ease: "sine.inOut" }, 0.40);

    // 0.55 -> 0.70 (Featured Metrics to Case Studies Section)
    // Moving towards the far end stands
    tl.to(pitch, { scale: 2.0, xPercent: -40, y: 400, z: 150, rotationX: 10, rotationZ: 5, duration: 0.15, ease: "power2.inOut" }, 0.55);
    tl.to(allLights, { "--light-intensity": 0.16, duration: 0.15, ease: "sine.inOut" }, 0.55);
    tl.to(farLights, { "--light-intensity": 0.9, duration: 0.15, ease: "sine.inOut" }, 0.55);

    // 0.70 -> 0.85 (Case Studies to Pre-CTA)
    // Pull back out slightly and center up for the broadcast shot
    tl.to(pitch, { scale: 1.5, xPercent: -50, y: 100, z: 200, rotationX: 20, rotationZ: 0, duration: 0.15, ease: "power3.inOut" }, 0.70);
    tl.to(farLights, { "--light-intensity": 0.42, duration: 0.15, ease: "sine.inOut" }, 0.70);
    tl.to(heroLights, { "--light-intensity": 0.72, duration: 0.15, ease: "sine.inOut" }, 0.70);

    // 0.85 -> 1.00 (CTA Section Finale)
    // Stable shot, scoreboard drops down from above with a massive impact bounce
    tl.to(pitch, { scale: 1.2, xPercent: -50, y: 50, z: 0, rotationX: 15, rotationZ: 0, duration: 0.15, ease: "power2.out" }, 0.85);
    tl.to(scoreboard, { opacity: 1, y: 0, rotationX: 5, scale: 1.1, duration: 0.15, ease: "bounce.out" }, 0.85);
    tl.to(allLights, { "--light-intensity": 0.62, duration: 0.15, ease: "sine.inOut" }, 0.85);

    // Handle ResizeObserver to refresh ScrollTrigger dynamically when React changes DOM
    let resizeObserver: ResizeObserver | null = null;
    if (typeof document !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(document.body);
    }
    
    // Ensure ScrollTrigger gets the right layout immediately
    ScrollTrigger.refresh();

    return () => {
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf([pitch, allLights]);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [pathname, mounted]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div ref={heroFixedRef} className={styles.heroFixed}>
      <div className={styles.atmosphere}>
        <div className={styles.atmosphereCenterGlow} />
        <div className={styles.atmosphereTopGlow} />
      </div>

      <div ref={beamsRef} className={styles.beams} aria-hidden="true">
        <div className={`${styles.beam} ${styles.beamTL} ${styles.povLightGroup} ${styles.lightHero} ${styles.lightFar} ${styles.lightLeft}`} />
        <div className={`${styles.beam} ${styles.beamTR} ${styles.povLightGroup} ${styles.lightHero} ${styles.lightFar} ${styles.lightRight}`} />
        <div className={`${styles.beam} ${styles.beamML} ${styles.povLightGroup} ${styles.lightNear} ${styles.lightLeft}`} />
        <div className={`${styles.beam} ${styles.beamMR} ${styles.povLightGroup} ${styles.lightNear} ${styles.lightRight}`} />
      </div>

      {/* Pitch with all its 3D depth */}
      <div ref={pitchRef} className={styles.pitch}>
        <div className={styles.stadiumBowl} aria-hidden="true">
          <div className={styles.stadiumOuterRim} />
          <div className={styles.stadiumInnerRim} />
          <div className={`${styles.upperDeck} ${styles.upperDeckNorth}`} />
          <div className={`${styles.upperDeck} ${styles.upperDeckSouth}`} />
          <div className={`${styles.upperDeck} ${styles.upperDeckWest}`} />
          <div className={`${styles.upperDeck} ${styles.upperDeckEast}`} />
          <div className={`${styles.standTier} ${styles.standNorth}`} />
          <div className={`${styles.standTier} ${styles.standSouth}`} />
          <div className={`${styles.standTier} ${styles.standWest}`} />
          <div className={`${styles.standTier} ${styles.standEast}`} />
          <div className={`${styles.cornerTower} ${styles.cornerTowerNW} ${styles.povLightGroup} ${styles.lightHero} ${styles.lightFar} ${styles.lightLeft}`}>
            <div className={styles.bulbGrid}>
              {[...Array(9)].map((_, j) => (
                <div key={j} className={styles.floodFixture}>
                  <span className={styles.floodLens} />
                </div>
              ))}
            </div>
          </div>
          <div className={`${styles.cornerTower} ${styles.cornerTowerNE} ${styles.povLightGroup} ${styles.lightHero} ${styles.lightFar} ${styles.lightRight}`}>
            <div className={styles.bulbGrid}>
              {[...Array(9)].map((_, j) => (
                <div key={j} className={styles.floodFixture}>
                  <span className={styles.floodLens} />
                </div>
              ))}
            </div>
          </div>
          <div className={`${styles.cornerTower} ${styles.cornerTowerSW} ${styles.povLightGroup} ${styles.lightNear} ${styles.lightLeft}`}>
            <div className={styles.bulbGrid}>
              {[...Array(9)].map((_, j) => (
                <div key={j} className={styles.floodFixture}>
                  <span className={styles.floodLens} />
                </div>
              ))}
            </div>
          </div>
          <div className={`${styles.cornerTower} ${styles.cornerTowerSE} ${styles.povLightGroup} ${styles.lightNear} ${styles.lightRight}`}>
            <div className={styles.bulbGrid}>
              {[...Array(9)].map((_, j) => (
                <div key={j} className={styles.floodFixture}>
                  <span className={styles.floodLens} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.pitchBase} aria-hidden="true" />
        <div className={styles.pitchSurface}>
          <div className={styles.digitalGrid} />
          <div className={styles.digitalRingLarge} />
          <div className={styles.digitalRingMedium} />
          <div className={styles.digitalRingSmall} />
          <div className={styles.dataNodeLeft} />
          <div className={styles.dataNodeRight} />
          <div className={styles.dataNodeCenter} />
        </div>
        <div className={styles.pitchGlow} />
        <div className={styles.dustContainer} aria-hidden="true">
          {[...Array(15)].map((_, i) => {
            const left = (i * 13.7) % 100;
            const top = (i * 23.3) % 100;
            const delay = (i * 0.7) % 5;
            const duration = 3 + ((i * 1.1) % 4);
            return (
              <div
                key={i}
                className={styles.dustParticle}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                }}
              />
            );
          })}
        </div>
        <div className={styles.standLeft} />
        <div className={styles.standRight} />

      </div>

      <div ref={scoreboardRef} className={styles.scoreboard} aria-hidden="true">
        <div className={styles.scoreboardPanel}>
          <div className={styles.scoreboardSide}>
            <span className={styles.scoreMetricValue}>1B+</span>
            <span className={styles.scoreMetricLabel}>MONTHLY VIEWS</span>
          </div>
          <div className={styles.scoreboardCenter}>
            <div className={styles.liveTag}>NETWORK ACTIVE</div>
            <div className={styles.liveScore}>
              <span id="activeGuestsValue">104,514</span>
            </div>
            <div className={styles.scoreTeams}>
              <span>ACTIVE GUESTS</span>
              <span>GLOBAL REACH</span>
            </div>
          </div>
          <div className={styles.scoreboardSide}>
            <span className={styles.scoreMetricValue}>60M</span>
            <span className={styles.scoreMetricLabel}>FOLLOWERS</span>
          </div>
        </div>
      </div>

      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.bottomFade} aria-hidden="true" />
    </div>,
    document.body
  );
}
