import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="wayne-enterprises">
      {/* Top gradient divider */}
      <div className="footer__divider" />

      <motion.div
        className="footer__inner"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Bat icon */}
        <svg
          className="footer__bat"
          viewBox="0 0 100 40"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50 0C50 0 42 16 30 20C18 24 0 18 0 18C0 18 14 30 28 32C36 33 44 28 50 40C56 28 64 33 72 32C86 30 100 18 100 18C100 18 82 24 70 20C58 16 50 0 50 0Z" />
        </svg>

        <h2 className="footer__logo">THE DARK KNIGHT</h2>

        <p className="footer__subtitle">A Christopher Nolan Film</p>

        <p className="footer__location">
          Gotham City &bull; Wayne Enterprises &bull; 2005&ndash;2012
        </p>

        <div className="footer__line" />

        <p className="footer__copyright">
          This is a fan tribute. All rights belong to DC Comics &amp; Warner
          Bros.
        </p>

        {/* Developer credit */}
        <div className="footer__dev-tag">
          <span className="footer__dev-label">Developed by</span>
          <span className="footer__dev-name">Mr. Z</span>
        </div>
      </motion.div>
    </footer>
  );
}
