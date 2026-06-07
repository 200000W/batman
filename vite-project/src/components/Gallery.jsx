import { motion } from 'framer-motion';
import './Gallery.css';

const dossiers = [
  {
    name: 'Bruce Wayne',
    alias: 'Batman',
    description:
      "Gotham's billionaire vigilante. Behind the mask lies an unbreakable will — a man who turned fear into his greatest weapon.",
    image: '/images/batman.png',
    status: 'ACTIVE',
  },
  {
    name: 'The Joker',
    alias: 'Agent of Chaos',
    description:
      'An agent of chaos with no identity, no motive — only a desire to watch the world burn and prove that anyone can fall.',
    image: '/images/joker.png',
    status: 'ARKHAM',
  },
  {
    name: 'Harvey Dent',
    alias: 'Two-Face',
    description:
      "Gotham's White Knight, fallen. The best of us, corrupted by tragedy into a monster who lets chance decide fate.",
    image: '/images/twoface.png',
    status: 'DECEASED',
  },
  {
    name: "Ra's al Ghul",
    alias: 'League of Shadows',
    description:
      'Leader of the League of Shadows. He believed civilization must be purged — and nearly succeeded.',
    image: '/images/ras.png',
    status: 'DECEASED',
  },
  {
    name: 'Bane',
    alias: 'The Reckoning',
    description:
      "Born in darkness, molded by it. A revolutionary who broke the Bat and held Gotham hostage with nuclear fire.",
    image: '/images/bane.png',
    status: 'NEUTRALIZED',
  },
  {
    name: 'Selina Kyle',
    alias: 'Catwoman',
    description:
      'The cat who walks between worlds. Thief, ally, survivor — she plays every side and answers to no one.',
    image: '/images/catwoman.png',
    status: 'AT LARGE',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* SVG Bat icon for decoration */
function BatIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 40"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50 0C50 0 42 16 30 20C18 24 0 18 0 18C0 18 14 30 28 32C36 33 44 28 50 40C56 28 64 33 72 32C86 30 100 18 100 18C100 18 82 24 70 20C58 16 50 0 50 0Z" />
    </svg>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="gallery">
      {/* Batcave ambient particles */}
      <div className="gallery__cave-overlay" />
      <div className="gallery__stalactites" />

      <div className="gallery__inner">
        {/* Header */}
        <motion.div
          className="gallery__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <BatIcon className="gallery__bat-icon" />
          <span className="gallery__eyebrow">Batcave Database</span>
          <h2 className="gallery__title">THE DARK KNIGHT FILES</h2>
          <p className="gallery__subtitle">
            Classified dossiers from the Batcomputer &mdash; Wayne Enterprises
            deep archive
          </p>
          <div className="gallery__title-line" />
        </motion.div>

        {/* Grid */}
        <motion.div
          className="gallery__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {dossiers.map((dossier, i) => (
            <motion.article
              key={i}
              className="dossier"
              variants={cardVariants}
            >
              {/* Character Image */}
              <div className="dossier__image-wrap">
                <img
                  src={`${import.meta.env.BASE_URL}${dossier.image.replace(/^\//, '')}`}
                  alt={dossier.name}
                  className="dossier__image"
                  loading="lazy"
                />
                <div className="dossier__image-overlay" />
                {/* Status badge */}
                <span
                  className={`dossier__status dossier__status--${dossier.status
                    .toLowerCase()
                    .replace(/\s/g, '-')}`}
                >
                  {dossier.status}
                </span>
                {/* Scan lines effect */}
                <div className="dossier__scanlines" />
              </div>

              {/* Top accent line */}
              <span className="dossier__accent" />

              <div className="dossier__content">
                <div className="dossier__meta">
                  <span className="dossier__index">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="dossier__divider" />
                  <span className="dossier__alias">{dossier.alias}</span>
                </div>

                <h3 className="dossier__name">{dossier.name}</h3>

                <p className="dossier__description">{dossier.description}</p>
              </div>

              {/* Bottom decorative element */}
              <div className="dossier__footer-line" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
