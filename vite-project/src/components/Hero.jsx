import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

/* ─── canvas dual-image reveal ─── */
function useCanvasReveal(canvasRef, topSrc, bottomSrc) {
  const mouse = useRef({ x: -9999, y: -9999 });
  const smoothMouse = useRef({ x: -9999, y: -9999 });
  const trail = useRef([]);
  const images = useRef({ top: null, bottom: null });
  const loaded = useRef(0);
  const raf = useRef(null);
  const TRAIL_LEN = 60;
  const LERP = 0.13;
  const RADIUS = 160;

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');

    const resize = () => {
      cvs.width = window.innerWidth;
      cvs.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const loadImg = (src) =>
      new Promise((res) => {
        const img = new Image();
        img.onload = () => res(img);
        img.onerror = () => res(null);
        img.src = src;
      });

    Promise.all([loadImg(bottomSrc), loadImg(topSrc)]).then(([bot, top]) => {
      images.current.bottom = bot;
      images.current.top = top;
      loaded.current = (bot ? 1 : 0) + (top ? 1 : 0);
      if (loaded.current > 0) startLoop();
    });

    const handleMove = (e) => {
      const rect = cvs.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    const handleLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    window.addEventListener('mousemove', handleMove);
    cvs.addEventListener('mouseleave', handleLeave);

    function drawCover(ctx, img, w, h) {
      const iR = img.width / img.height;
      const cR = w / h;
      let sw, sh, sx, sy;
      if (cR > iR) {
        sw = img.width;
        sh = img.width / cR;
        sx = 0;
        sy = (img.height - sh) / 2;
      } else {
        sh = img.height;
        sw = img.height * cR;
        sy = 0;
        sx = (img.width - sw) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    }

    function startLoop() {
      const render = () => {
        const { width: w, height: h } = cvs;
        ctx.clearRect(0, 0, w, h);

        /* draw base (bottom) layer */
        if (images.current.bottom) {
          drawCover(ctx, images.current.bottom, w, h);
        }

        /* smooth interpolation */
        smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * LERP;
        smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * LERP;

        /* trail */
        if (mouse.current.x > -1000) {
          trail.current.push({ x: smoothMouse.current.x, y: smoothMouse.current.y });
          if (trail.current.length > TRAIL_LEN) trail.current.shift();
        } else {
          if (trail.current.length > 0) trail.current.shift();
        }

        /* reveal top layer through trail mask */
        if (images.current.top && trail.current.length > 0) {
          ctx.save();
          ctx.beginPath();

          trail.current.forEach((pt, i) => {
            const t = i / trail.current.length;
            const r = RADIUS * (0.3 + t * 0.7);
            ctx.moveTo(pt.x + r, pt.y);
            ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
          });

          ctx.clip();
          drawCover(ctx, images.current.top, w, h);
          ctx.restore();

          /* glow around cursor — cool BLUE */
          if (trail.current.length > 0) {
            const last = trail.current[trail.current.length - 1];
            const grd = ctx.createRadialGradient(last.x, last.y, 0, last.x, last.y, RADIUS * 1.3);
            grd.addColorStop(0, 'rgba(74, 127, 165, 0.22)');
            grd.addColorStop(0.5, 'rgba(74, 127, 165, 0.08)');
            grd.addColorStop(1, 'rgba(74, 127, 165, 0)');
            ctx.fillStyle = grd;
            ctx.fillRect(last.x - RADIUS * 1.5, last.y - RADIUS * 1.5, RADIUS * 3, RADIUS * 3);
          }
        }

        raf.current = requestAnimationFrame(render);
      };
      render();
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      cvs.removeEventListener('mouseleave', handleLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [canvasRef, topSrc, bottomSrc]);
}

/* ─── animation variants ─── */
const containerV = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.6 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 18, mass: 1 },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 60, damping: 20, mass: 0.9 },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 60, damping: 20, mass: 0.9 },
  },
};

const lineExpand = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { type: 'spring', stiffness: 40, damping: 16, delay: 1.2 },
  },
};

/* ─── component ─── */
export default function Hero() {
  const canvasRef = useRef(null);
  useCanvasReveal(
    canvasRef,
    `${import.meta.env.BASE_URL}images/nolan_hero.png`,
    `${import.meta.env.BASE_URL}images/gotham_city.png`
  );

  return (
    <section className="hero" id="hero">
      {/* canvas bg */}
      <canvas ref={canvasRef} className="hero__canvas" />

      {/* dark overlays */}
      <div className="hero__overlay" />
      <div className="hero__vignette" />

      {/* content grid */}
      <motion.div
        className="hero__content"
        variants={containerV}
        initial="hidden"
        animate="visible"
      >
        {/* ── left panel ── */}
        <motion.div className="hero__left" variants={containerV}>
          <motion.span className="hero__eyebrow" variants={fadeRight}>
            A Christopher Nolan Film
          </motion.span>

          <motion.h1 className="hero__title" variants={fadeUp}>
            <span className="hero__title-line">THE DARK</span>
            <span className="hero__title-line hero__title-line--accent">KNIGHT</span>
          </motion.h1>

          <motion.div
            className="hero__divider"
            variants={lineExpand}
            style={{ originX: 0 }}
          />

          <motion.p className="hero__desc" variants={fadeUp}>
            The night is darkest just before the dawn. And I promise you, the
            dawn is coming. Gotham deserves a hero who operates beyond the law
            — a silent guardian, a watchful protector.
          </motion.p>

          <motion.button className="hero__cta" variants={fadeUp}>
            <span className="hero__cta-bg" />
            <span className="hero__cta-text">Enter Gotham</span>
          </motion.button>
        </motion.div>

        {/* ── right panel ── */}
        <motion.div className="hero__right" variants={containerV}>
          <motion.span className="hero__eyebrow hero__eyebrow--blue" variants={fadeLeft}>
            Bruce Wayne
          </motion.span>

          <motion.h2 className="hero__subtitle" variants={fadeLeft}>
            The Man Behind<br />The Mask
          </motion.h2>

          <motion.div
            className="hero__divider hero__divider--right"
            variants={lineExpand}
            style={{ originX: 1 }}
          />

          <motion.p className="hero__desc hero__desc--right" variants={fadeLeft}>
            Beneath the cowl lies Gotham&rsquo;s true savior — a man forged by
            tragedy, driven by an unbreakable vow. Bruce Wayne sacrificed
            everything so that Gotham could believe in something greater than
            fear. Not a hero by title, but by choice.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1.2 }}
      >
        <div className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </motion.div>

      {/* bottom gradient to abyss */}
      <div className="hero__bottom-fade" />
    </section>
  );
}