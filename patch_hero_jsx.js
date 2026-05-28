const fs = require('fs');
const file = 'src/components/homepage/HeroSection.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldJSX = `      <div ref={heroFixedRef} className={styles.heroFixed}>
        {/* ── Stadium atmosphere background ── */}
        <div className={styles.atmosphere}>
          <div className={styles.atmosphereCenterGlow} />
          <div className={styles.atmosphereTopGlow} />
        </div>

        {/* ── Floodlight beams ── */}
        <div ref={beamsRef} className={styles.beams} aria-hidden="true">
          <div className={\`\${styles.beam} \${styles.beamTL}\`} />
          <div className={\`\${styles.beam} \${styles.beamTR}\`} />
          <div className={\`\${styles.beam} \${styles.beamML}\`} />
          <div className={\`\${styles.beam} \${styles.beamMR}\`} />
        </div>

        {/* ── Football pitch (2D perspective — single element, no nested 3D) ── */}
        <div ref={pitchRef} className={styles.pitch}>
          <div className={styles.stadiumBowl} aria-hidden="true">
            <div className={styles.stadiumOuterRim} />
            <div className={styles.stadiumInnerRim} />
            <div className={\`\${styles.upperDeck} \${styles.upperDeckNorth}\`} />
            <div className={\`\${styles.upperDeck} \${styles.upperDeckSouth}\`} />
            <div className={\`\${styles.upperDeck} \${styles.upperDeckWest}\`} />
            <div className={\`\${styles.upperDeck} \${styles.upperDeckEast}\`} />
            <div className={\`\${styles.standTier} \${styles.standNorth}\`} />
            <div className={\`\${styles.standTier} \${styles.standSouth}\`} />
            <div className={\`\${styles.standTier} \${styles.standWest}\`} />
            <div className={\`\${styles.standTier} \${styles.standEast}\`} />
            <div className={\`\${styles.cornerTower} \${styles.cornerTowerNW}\`} />
            <div className={\`\${styles.cornerTower} \${styles.cornerTowerNE}\`} />
            <div className={\`\${styles.cornerTower} \${styles.cornerTowerSW}\`} />
            <div className={\`\${styles.cornerTower} \${styles.cornerTowerSE}\`} />
          </div>
          <div className={styles.pitchBase} aria-hidden="true" />
          <div className={styles.pitchSurface}>
            {/* Digital arena rings as CSS overlays */}
            <div className={styles.digitalGrid} />
            <div className={styles.digitalRingLarge} />
            <div className={styles.digitalRingMedium} />
            <div className={styles.digitalRingSmall} />
            <div className={styles.dataNodeLeft} />
            <div className={styles.dataNodeRight} />
            <div className={styles.dataNodeCenter} />
          </div>
          <div className={styles.pitchGlow} />
          {/* Dust particles */}
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
                    left: \`\${left}%\`,
                    top: \`\${top}%\`,
                    animationDelay: \`\${delay}s\`,
                    animationDuration: \`\${duration}s\`,
                  }}
                />
              );
            })}
          </div>
          {/* Stand shadows on left/right edges */}
          <div className={styles.standLeft} />
          <div className={styles.standRight} />

          {/* Holographic Digital Scoreboards overlaying the field logic */}
          <div ref={scoreboardRef} className={styles.scoreboard}>
            <div className={styles.scoreboardPanel}>
              <div className={styles.scoreboardHeader}>
                <div className={styles.liveTag} />
                MATCH RATE
              </div>
              <div className={styles.scoreboardContent}>
                <div className={styles.teamScore}>
                  <span className={styles.teamName}>REACH</span>
                  <span className={styles.scoreDigit}>1B+</span>
                </div>
                <div className={styles.timeDisplay}>120:00</div>
                <div className={styles.teamScore}>
                  <span className={styles.teamName}>CONV</span>
                  <span className={styles.scoreDigit}>98%</span>
                </div>
              </div>
              <div className={styles.metricsBar}>
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>ACTIVE CONNS</span>
                  <span className={styles.metricVal} id="activeGuestsValue">104,514</span>
                </div>
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>YIELD</span>
                  <span className={styles.metricVal}>3.2x</span>
                </div>
              </div>
            </div>
            {/* Reflection on pitch */}
            <div className={styles.scoreboardReflection} />
          </div>
        </div>

        {/* ── Vignette ── */}
        <div className={styles.vignette} aria-hidden="true" />
        <div className={styles.bottomFade} aria-hidden="true" />

        {/* ── 2D Headline overlay (opacity:1 from CSS, only scroll tl fades it) ── */}
        <div ref={overlayRef} className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <span className={styles.label}>{data.label}</span>
            <h1 className={styles.headline}>{data.headline}</h1>
            <p className={styles.subtext}>{data.subtext}</p>
            <div className={styles.ctaRow}>
              <Button variant="primary" size="lg" href={data.cta?.link ?? "#"}>
                {data.cta?.text ?? "Explore"}
              </Button>
            </div>
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <div className={styles.scrollHint} aria-hidden="true">
          <span>Scroll to reveal</span>
          <div className={styles.scrollArrow} />
        </div>

        {/* ── HUD (opacity:0 CSS, revealed in Stage 4) ── */}
        <div ref={hudRef} className={styles.hudContainer}>
          <div className={styles.hudLeft}>SYSTEM: ACTIVE</div>
          <div className={styles.hudRight}>GLOBAL REACH</div>
        </div>
      </div>`;

// Move the overlays outside heroFixed!
const newJSX = `      {/* Background Stadium (Fixed to Viewport) */}
      <div ref={heroFixedRef} className={styles.heroFixed}>
        <div className={styles.atmosphere}>
          <div className={styles.atmosphereCenterGlow} />
          <div className={styles.atmosphereTopGlow} />
        </div>

        <div ref={beamsRef} className={styles.beams} aria-hidden="true">
          <div className={\`\${styles.beam} \${styles.beamTL}\`} />
          <div className={\`\${styles.beam} \${styles.beamTR}\`} />
          <div className={\`\${styles.beam} \${styles.beamML}\`} />
          <div className={\`\${styles.beam} \${styles.beamMR}\`} />
        </div>

        {/* Pitch with all its 3D depth */}
        <div ref={pitchRef} className={styles.pitch}>
          <div className={styles.stadiumBowl} aria-hidden="true">
            <div className={styles.stadiumOuterRim} />
            <div className={styles.stadiumInnerRim} />
            <div className={\`\${styles.upperDeck} \${styles.upperDeckNorth}\`} />
            <div className={\`\${styles.upperDeck} \${styles.upperDeckSouth}\`} />
            <div className={\`\${styles.upperDeck} \${styles.upperDeckWest}\`} />
            <div className={\`\${styles.upperDeck} \${styles.upperDeckEast}\`} />
            <div className={\`\${styles.standTier} \${styles.standNorth}\`} />
            <div className={\`\${styles.standTier} \${styles.standSouth}\`} />
            <div className={\`\${styles.standTier} \${styles.standWest}\`} />
            <div className={\`\${styles.standTier} \${styles.standEast}\`} />
            <div className={\`\${styles.cornerTower} \${styles.cornerTowerNW}\`} />
            <div className={\`\${styles.cornerTower} \${styles.cornerTowerNE}\`} />
            <div className={\`\${styles.cornerTower} \${styles.cornerTowerSW}\`} />
            <div className={\`\${styles.cornerTower} \${styles.cornerTowerSE}\`} />
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
                <div key={i} className={styles.dustParticle} style={{ left: \`\${left}%\`, top: \`\${top}%\`, animationDelay: \`\${delay}s\`, animationDuration: \`\${duration}s\` }} />
              );
            })}
          </div>
          <div className={styles.standLeft} />
          <div className={styles.standRight} />

          {/* Central Hologram Scoreboards that move with the pitch */}
          <div ref={scoreboardRef} className={styles.scoreboard}>
            <div className={styles.scoreboardPanel}>
              <div className={styles.scoreboardHeader}>
                <div className={styles.liveTag} />
                MATCH RATE
              </div>
              <div className={styles.scoreboardContent}>
                <div className={styles.teamScore}>
                  <span className={styles.teamName}>REACH</span>
                  <span className={styles.scoreDigit}>1B+</span>
                </div>
                <div className={styles.timeDisplay}>120:00</div>
                <div className={styles.teamScore}>
                  <span className={styles.teamName}>CONV</span>
                  <span className={styles.scoreDigit}>98%</span>
                </div>
              </div>
              <div className={styles.metricsBar}>
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>ACTIVE CONNS</span>
                  <span className={styles.metricVal} id="activeGuestsValue">104,514</span>
                </div>
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>YIELD</span>
                  <span className={styles.metricVal}>3.2x</span>
                </div>
              </div>
            </div>
            <div className={styles.scoreboardReflection} />
          </div>
        </div>

        <div className={styles.vignette} aria-hidden="true" />
        <div className={styles.bottomFade} aria-hidden="true" />
      </div>

      {/* Scrolling Interactive Content */}
      <div className={styles.heroScrollWrapper}>
        <div ref={overlayRef} className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <span className={styles.label}>{data.label}</span>
            <h1 className={styles.headline}>{data.headline}</h1>
            <p className={styles.subtext}>{data.subtext}</p>
            <div className={styles.ctaRow}>
              <Button variant="primary" size="lg" href={data.cta?.link ?? "#"}>
                {data.cta?.text ?? "Explore"}
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <span>Scroll to reveal</span>
          <div className={styles.scrollArrow} />
        </div>

        <div ref={hudRef} className={styles.hudContainer}>
          <div className={styles.hudLeft}>SYSTEM: ACTIVE</div>
          <div className={styles.hudRight}>GLOBAL REACH</div>
        </div>
      </div>`;

if (content.indexOf(oldJSX) !== -1) {
  content = content.replace(oldJSX, newJSX);
  fs.writeFileSync(file, content);
  console.log("JSX updated!");
} else {
  console.log("Could not find oldJSX block string matching.");
}
