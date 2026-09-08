import { site } from '../data/site.js';
import { legalContent } from '../data/legal.js';
import { Container } from '../components/ui.jsx';
export default function Legal({ type }) {
  return (
    <section className="section legal-page">
      <Container>
        <p className="eyebrow">WEBSITE INFORMATION · DRAFT FOR REVIEW</p>
        <h1>{type === 'privacy' ? 'Privacy information.' : 'Website terms.'}</h1>
        <div className="legal-content">
          {legalContent(type, site).map(([heading, text]) => (
            <section key={heading}>
              <h2>{heading}</h2>
              <p>{text}</p>
            </section>
          ))}
          <a className="text-link" href="/contact/">
            View contact availability ↗
          </a>
        </div>
      </Container>
    </section>
  );
}
