import { Check, ArrowUpRight } from 'lucide-react';
import { Container, FAQ, Icon, LinkButton, SectionHeading } from '../components/ui.jsx';
import { Process, ServiceList } from '../components/Sections.jsx';
export default function Service({ service }) {
  return (
    <>
      <section className="interior-hero">
        <Container>
          <a className="breadcrumb" href="/#services">
            Services <span aria-hidden="true">/</span>
          </a>
          <div className="service-hero-grid">
            <div>
              <p className="eyebrow">{service.name}</p>
              <h1>{service.tagline}</h1>
              <p className="lede">{service.intro}</p>
              <LinkButton href={`/contact/?service=${service.id}`}>{service.cta}</LinkButton>
            </div>
            <div className="service-emblem" aria-hidden="true">
              <span className="emblem-label">A CONNECTED CAPABILITY</span>
              <Icon name={service.icon} size={110} strokeWidth={1} />
              <span>
                {service.short}
                <ArrowUpRight size={23} />
              </span>
            </div>
          </div>
        </Container>
      </section>
      <section className="section">
        <Container className="split-section">
          <SectionHeading
            eyebrow="THE STARTING POINT"
            title="Does this sound like your next challenge?"
          />
          <div>
            <p className="lede">{service.context}</p>
            <p>
              Start with a clear goal and an agreed scope. The work is shaped around your business,
              with no guaranteed rankings, lead volumes, or revenue outcomes.
            </p>
          </div>
        </Container>
      </section>
      <section className="section tinted">
        <Container className="split-section">
          <SectionHeading
            eyebrow="WHAT THE WORK CAN INCLUDE"
            title="Practical work. Tangible deliverables."
            intro="A proposed scope to build from. Your tailored proposal confirms the exact deliverables and responsibilities."
          />
          <ul className="deliverables">
            {service.deliverables.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" size={20} />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <Process expanded />
      <section className="section needs-section">
        <Container className="split-section">
          <SectionHeading eyebrow="A COLLABORATIVE START" title="What we need from you." />
          <p className="lede">{service.needs}</p>
        </Container>
      </section>
      <section className="section">
        <Container className="faq-grid">
          <SectionHeading eyebrow="SERVICE QUESTIONS" title="A little more detail." />
          <FAQ items={service.faq} />
        </Container>
      </section>
      <section className="service-cta">
        <Container>
          <div>
            <p className="eyebrow">YOUR NEXT STEP</p>
            <h2>{service.cta}.</h2>
            <p>Tell us what you want to change. Request a tailored proposal.</p>
          </div>
          <LinkButton href={`/contact/?service=${service.id}`}>{service.cta}</LinkButton>
        </Container>
      </section>
      <section className="section">
        <Container>
          <SectionHeading eyebrow="CONNECT THE NEXT PIECE" title="Explore related services." />
          <ServiceList exclude={service.id} />
        </Container>
      </section>
    </>
  );
}
