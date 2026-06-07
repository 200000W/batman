import { useState, useEffect } from 'react';
import './Navbar.css';

const navLinks = [
  { label: 'The Trilogy', href: '#trilogy' },
  { label: 'Gotham', href: '#gotham' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Wayne Enterprises', href: '#wayne-enterprises' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 80;
      const maxScroll = 400;

      setScrolled(scrollY > threshold);

      // Ramp opacity from 0 → 1 over 0–maxScroll px
      const progress = Math.min(scrollY / maxScroll, 1);
      setOpacity(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      style={{
        '--scroll-opacity': opacity,
      }}
    >
      <div className="navbar__logo">
        <span className="navbar__logo-text">
          THE DARK <span className="navbar__logo-accent">KNIGHT</span>
        </span>
      </div>

      <ul className="navbar__links">
        {navLinks.map(({ label, href }) => (
          <li key={href} className="navbar__link-item">
            <a
              href={href}
              className="navbar__link"
              onClick={(e) => handleNavClick(e, href)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}