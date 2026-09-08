import { ArrowUpRight } from 'lucide-react';
import { formCopy } from '../data/content.js';
import { Container } from '../components/ui.jsx';
import { ContactForm } from '../components/ContactForm.jsx';
import { DirectLinks } from '../components/Layout.jsx';
export default function Contact() {
  return (
    <>
      <section className="interior-hero contact-hero">
        <Container>
          <p className="eyebrow">LET’S TALK ABOUT WHAT’S NEXT</p>
          <h1>
            Your next chapter
            <br />
            starts with <span className="accent-text">a conversation.</span>
          </h1>
          <p className="lede measure">{formCopy.intro}</p>
        </Container>
      </section>
      <section className="section contact-section">
        <Container className="contact-grid">
          <aside>
            <p className="eyebrow">A USEFUL STARTING POINT</p>
            <h2>
              A little context.
              <br />A clearer direction.
            </h2>
            <p>When you get in touch, it helps to include:</p>
            <ul className="contact-prompts">
              <li>What your business does and who it serves</li>
              <li>What you would like your marketing to change</li>
              <li>The services or challenges you are considering</li>
              <li>Your current website and any timing constraints</li>
            </ul>
            <p className="small-copy">
              Please keep passwords, payment details, and sensitive account information out of your
              enquiry.
            </p>
            <DirectLinks />
            <a className="text-link" href="/privacy/">
              How enquiry information is used <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </aside>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
