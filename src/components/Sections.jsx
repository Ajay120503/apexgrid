import { process } from '../data/content.js';
import { services } from '../data/services.js';
import { Container, Icon, SectionHeading } from './ui.jsx';
export function Process({ expanded = false }) {
  return (
    <section className="section process-section">
      <Container>
        <SectionHeading
          eyebrow="HOW WE WORK"
          title="From the first question to the next move."
          intro="A practical process that keeps the work connected and the next steps clear."
        />
        <ol className="process-list">
          {process.map((step, index) => (
            <li key={step.title}>
              <span className="step-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              {expanded && <p className="process-detail">{step.detail}</p>}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
export function ServiceList({ exclude }) {
  return (
    <div className="service-list">
      {services
        .filter((service) => service.id !== exclude)
        .map((service, index) => (
          <a className="service-row" key={service.id} href={`/services/${service.id}/`}>
            <span className="service-number">0{index + 1}</span>
            <span className="service-icon">
              <Icon name={service.icon} />
            </span>
            <h3>{service.name}</h3>
            <p>{service.intro}</p>
            <span className="row-arrow">
              <Icon name="arrow" />
            </span>
          </a>
        ))}
    </div>
  );
}
