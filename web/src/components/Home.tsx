"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Video, Film, Sparkles, Mail, MessageCircle, ArrowRight } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { BlurText } from "./BlurText";
import { Marquee } from "./Marquee";
import { WorkCard } from "./WorkCard";

// Lazy-load the heavy / client-only visuals (WebGL orb + galleries).
const Orb = dynamic(() => import("./Orb"), { ssr: false });
const DomeGallery = dynamic(() => import("./DomeGallery").then((m) => m.DomeGallery), { ssr: false });
const AccordionGallery = dynamic(() => import("./AccordionGallery").then((m) => m.AccordionGallery), { ssr: false });
const CardSwap = dynamic(() => import("./CardSwap"), { ssr: false });
const FlyingButton = dynamic(() => import("./FlyingButton"), { ssr: false });
const MotionCarousel = dynamic(() => import("./MotionCarousel"), { ssr: false });
const CinemaCarousel = dynamic(() => import("./CinemaCarousel"), { ssr: false });

const sectionIcon = (section: string) =>
  section === "motion" ? <Video size={48} /> : <Film size={48} />;

export function Home({ content }: { content: SiteContent }) {
  const { hero, about, tools, contact, projects } = content;

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main id="home">
      {/* HERO */}
      <section className="hero container">
        <div className="hero-bg-glow" />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1 className="hero-title">
            <BlurText text={hero.headline} delay={0.1} />
            <span className="highlight">
              <BlurText text={hero.highlight} delay={0.2} />
            </span>
          </h1>
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            &quot;{hero.tagline}&quot;
          </motion.p>
          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {hero.intro}
          </motion.p>
          <motion.button
            className="contact-btn"
            onClick={() => scrollTo("work")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            View My Work <ArrowRight size={20} />
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-image-container"
        >
          <div className="hero-orb-container">
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              <Orb hoverIntensity={0.6} rotateOnHover hue={0} forceHoverState={false} />
            </div>
            {hero.imageUrl ? (
              <Image
                src={hero.imageUrl}
                alt="Vaishnavi Shrivastava"
                width={520}
                height={520}
                className="hero-image"
                style={{ position: "relative", zIndex: 10 }}
                priority
              />
            ) : (
              <div
                className="hero-avatar-fallback"
                style={{
                  position: "relative",
                  zIndex: 10,
                  width: "74%",
                  height: "74%",
                  borderRadius: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(227, 58, 36, 0.28), rgba(15, 15, 18, 0.88))",
                  border: "2px solid rgba(230, 213, 184, 0.28)",
                  boxShadow: "0 0 45px rgba(227, 58, 36, 0.35)",
                  backdropFilter: "blur(14px)",
                  textAlign: "center",
                  padding: "1.25rem",
                }}
              >
                <div
                  style={{
                    width: "75px",
                    height: "75px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #E33A24, #ff7a59)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.85rem",
                    boxShadow: "0 0 25px rgba(227, 58, 36, 0.65)",
                  }}
                >
                  <span style={{ fontSize: "1.9rem", fontWeight: 700, color: "#fff", letterSpacing: "1px" }}>
                    VS
                  </span>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#f5f5f7", margin: 0 }}>
                  Vaishnavi Shrivastava
                </h3>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--accent)",
                    margin: "0.3rem 0 0",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Video Editor & Motion Designer
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* WORK */}
      <div id="work">
        <Marquee tools={tools} />

        <section className="section container">
          <h2 className="section-title">Motion Graphics</h2>
          <MotionCarousel items={projects.motion} />
        </section>

        <section className="section container">
          <h2 className="section-title">Short-Form</h2>
          <p className="section-subtitle">High-retention edits for Instagram Reels and YouTube Shorts.</p>
          <DomeGallery
            items={projects.short.map((p) => ({
              title: p.title,
              category: p.category,
              color: p.color,
              poster: p.imageUrl ?? undefined,
              videoUrl: p.videoUrl,
            }))}
          />
        </section>

        <section className="section container">
          <h2 className="section-title">Long-Form</h2>
          <p className="section-subtitle">Documentaries, YouTube videos, and multi-cam podcasts.</p>
          <CinemaCarousel items={projects.long} />
        </section>

        <section className="section container">
          <h2 className="section-title">AI Creative Work</h2>
          <p className="section-subtitle">Exploring the boundaries of AI generation and enhancement.</p>
          <div style={{ width: "100%", maxWidth: "600px", margin: "2.5rem auto 0", minHeight: "440px" }}>
            <CardSwap
              items={projects.ai.map((p, idx) => {
                const sampleImages = [
                  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=900&q=80&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=900&q=80&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1633493106115-68a8607fa6d3?w=900&q=80&auto=format&fit=crop",
                ];
                return {
                  title: p.title,
                  image: p.imageUrl || sampleImages[idx % sampleImages.length],
                  icon: <Sparkles size={14} color="#E33A24" />,
                };
              })}
              width={460}
              height={320}
              theme="dark"
              cardRadius={18}
            />
          </div>
        </section>
      </div>

      {/* ABOUT — moved below the AI section: image left, text right (desktop); image above (mobile) */}
      <section id="about" className="section container about-section">
        <div className="about-image">
          {about.imageUrl ? (
            <Image src={about.imageUrl} alt="Vaishnavi Shrivastava" width={640} height={540} className="about-img-el" />
          ) : (
            <div
              className="about-img-el"
              style={{
                aspectRatio: "4 / 5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "var(--text-secondary)",
                background:
                  "linear-gradient(135deg, rgba(227,58,36,0.12), rgba(150,20,20,0.06))",
                border: "1px dashed var(--card-border)",
                padding: "1.5rem",
              }}
            >
              Add your photo in the Studio
              <br />
              (About → Image)
            </div>
          )}
        </div>
        <div className="about-text">
          <h2 className="section-title">{about.heading}</h2>
          <p className="about-desc">{about.body}</p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section container contact-section">
        <h2 className="section-title contact-title">
          {contact.heading} <span className="highlight">{contact.highlight}</span>
        </h2>
        {contact.lead && (
          <p className="section-subtitle contact-subtitle">
            {contact.lead}
          </p>
        )}
        <div style={{ width: "100%", maxWidth: "520px", height: "230px", margin: "1.5rem auto 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <FlyingButton
            theme="dark"
            size="large"
            jets={2}
            thrusters={true}
            trigger="hover"
            carryCursor={true}
            altitude={170}
            thrustColor="#E33A24"
            smokeColor="#f4f4f5"
            buttonColor="#E33A24"
            textColor="#ffffff"
            onClick={() => {
              const phone = (contact.whatsapp || "919981783744").replace(/[^0-9]/g, "");
              const whatsappUrl = `https://wa.me/${phone}?text=Hi%20Vaishnavi,%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20work%20together!`;
              window.open(whatsappUrl, "_blank");
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", fontWeight: 700 }}>
              <MessageCircle size={19} /> Ready to Connect • Chat on WhatsApp
            </span>
          </FlyingButton>
        </div>
        <div className="contact-email-section" style={{ marginTop: "1rem" }}>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
            Or email directly:
          </p>
          <a
            href="mailto:vaishnavishrivastava41@gmail.com"
            className="contact-email-link"
          >
            <Mail size={18} />
            <span>vaishnavishrivastava41@gmail.com</span>
          </a>
        </div>
      </section>
    </main>
  );
}

export default Home;
