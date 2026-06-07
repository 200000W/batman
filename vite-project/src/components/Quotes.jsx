import { motion } from 'framer-motion';
import './Quotes.css';

const quotes = [
  {
    text: 'Why do we fall, sir? So that we can learn to pick ourselves up.',
    character: 'Alfred Pennyworth',
  },
  {
    text: "Because he's the hero Gotham deserves, but not the one it needs right now.",
    character: 'Commissioner Gordon',
  },
  {
    text: 'Introduce a little anarchy. Upset the established order, and everything becomes chaos.',
    character: 'The Joker',
  },
  {
    text: 'A hero can be anyone.',
    character: 'Batman',
  },
  {
    text: 'The night is darkest just before the dawn.',
    character: 'Harvey Dent',
  },
];

function Quotes() {
  return (
    <section id="gotham" className="quotes-section">
      <div className="quotes-container">
        <motion.h2
          className="quotes-section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Words of Gotham
        </motion.h2>

        <div className="quotes-list">
          {quotes.map((quote, index) => (
            <motion.blockquote
              key={index}
              className="quote-card"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.9,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="quote-text">{quote.text}</p>
              <footer className="quote-attribution">
                <span className="quote-dash" />
                <cite className="quote-character">{quote.character}</cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Quotes;
