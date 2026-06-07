import { motion } from 'framer-motion';
import './Trilogy.css';

const films = [
  {
    title: 'Batman Begins',
    year: 2005,
    quote:
      'It\u2019s not who I am underneath, but what I do that defines me.',
  },
  {
    title: 'The Dark Knight',
    year: 2008,
    quote:
      'You either die a hero, or you live long enough to see yourself become the villain.',
  },
  {
    title: 'The Dark Knight Rises',
    year: 2012,
    quote:
      'A hero can be anyone. Even a man doing something as simple as putting a coat around a young boy\u2019s shoulders.',
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.15,
    },
  }),
};

export default function Trilogy() {
  return (
    <section id="trilogy" className="trilogy">
      {/* ambient radial glow */}
      <div className="trilogy__glow" aria-hidden="true" />

      <motion.div
        className="trilogy__inner"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* header */}
        <motion.p className="trilogy__eyebrow" variants={headingVariants}>
          The Legend
        </motion.p>

        <motion.h2 className="trilogy__title" variants={headingVariants}>
          THE DARK KNIGHT TRILOGY
        </motion.h2>

        <motion.p className="trilogy__desc" variants={headingVariants}>
          Three chapters. One unbreakable legend. Christopher Nolan redefined the
          superhero genre with a grounded, operatic vision of Gotham City and
          the man who swore to protect it.
        </motion.p>

        {/* cards */}
        <div className="trilogy__grid">
          {films.map((film, i) => (
            <motion.article
              key={film.year}
              className="trilogy-card"
              custom={i}
              variants={cardVariants}
            >
              <span className="trilogy-card__year">{film.year}</span>
              <h3 className="trilogy-card__title">{film.title}</h3>
              <p className="trilogy-card__quote">&ldquo;{film.quote}&rdquo;</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
