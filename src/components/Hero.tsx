import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const entrance = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const social = [
  {
    name: "GitHub",
    url: "https://github.com/gramliu",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/gramliu/",
    icon: Linkedin,
  },
  {
    name: "Email",
    url: "mailto:gram@gramliu.com",
    icon: Mail,
  },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <Image
        src="/images/landing-tower.png"
        alt="A rust-colored spiral tower rising from a golden field at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_center] md:object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bgcolor-primary/95 via-bgcolor-primary/65 to-bgcolor-primary/5 md:via-bgcolor-primary/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-bgcolor-primary/80 via-transparent to-bgcolor-primary/25" />

      <motion.div
        initial={reduceMotion ? "visible" : "hidden"}
        animate="visible"
        variants={entrance}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 md:px-12 lg:px-16"
      >
        <div className="max-w-xl">
          <p className="mb-3 font-mono text-sm tracking-[0.18em] text-text-faded">
            HELLO, I&apos;M
          </p>
          <h1 className="font-serif text-6xl font-semibold leading-[0.95] tracking-[-0.04em] text-text-primary sm:text-7xl lg:text-8xl">
            Gram Liu
          </h1>
          <div className="my-7 h-px w-28 bg-text-highlight" />
          <p className="max-w-md text-lg leading-relaxed text-text-primary/90 sm:text-xl">
            Developer. Engineer. Tech Enthusiast.
          </p>

          <div className="mt-9 flex items-center gap-3">
            {social.map(({ icon: Icon, name, url }) => (
              <a
                href={url}
                target={url.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  url.startsWith("mailto:") ? undefined : "noopener noreferrer"
                }
                aria-label={name}
                key={url}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-divider bg-bgcolor-primary/35 text-text-primary backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-text-highlight hover:bg-text-highlight hover:text-bgcolor-primary"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
