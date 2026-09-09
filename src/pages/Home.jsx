import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';
import { copy, engagements, faq, principles } from '../data/content.js';
import { Container, FAQ, LinkButton, SectionHeading } from '../components/ui.jsx';
import { GrowthDiagram } from '../components/Graphics.jsx';
import { Process, ServiceList } from '../components/Sections.jsx';
import { FinalCTA } from '../components/Layout.jsx';
import SelectedWork from '../components/SelectedWork.jsx';
export default function Home() {
  return (
    <>
      <section className="hero">
        <Container className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="accent-dot" />
              APEXGRID · DIGITAL MARKETING
            </p>
            <h1>
              Connect your brand to its next stage of <span className="accent-text">growth.</span>
            </h1>
            <p className="hero-intro">{copy.intro}</p>
            <div className="hero-actions">
              <LinkButton href="/contact/">{copy.enquiry}</LinkButton>
              <a className="text-link" href="/#services">
                Explore our services <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
            <p className="hero-note">Clear strategy. Focused execution. Useful reporting.</p>
          </div>
          <GrowthDiagram />
        </Container>
      </section>
      <div className="capabilities-strip">
        <Container>
          <span className="strip-label">CONNECTED BY DESIGN</span>
          {[
            'Search visibility',
            'Paid campaigns',
            'Social content',
            'Better websites',
            'Clear measurement',
          ].map((text) => (
            <span key={text}>
              <span aria-hidden="true">✳</span>
              {text}
            </span>
          ))}
        </Container>
      </div>
      <section className="section" id="services">
        <Container>
          <div className="section-top">
            <SectionHeading
              eyebrow="01 / WHAT WE DO"
              title={copy.servicesHeading}
              intro={copy.servicesIntro}
            />
            <span className="section-index" aria-hidden="true">
              ↗
            </span>
          </div>
          <ServiceList />
        </Container>
      </section>
      <section className="section about-section" id="about">
        <Container className="about-grid">
          <div>
            <p className="eyebrow">02 / WHY APEXGRID</p>
            <h2>{copy.aboutHeading}</h2>
            <div className="about-art" aria-hidden="true">
              <div />
              <div />
              <div />
              <span>THE WHOLE PICTURE.</span>
            </div>
          </div>
          <div className="about-copy">
            <p className="lede">{copy.about}</p>
            <ul className="principles">
              {principles.map((principle, index) => (
                <li key={principle}>
                  <span>0{index + 1}</span>
                  {principle}
                  <Check size={19} aria-hidden="true" />
                </li>
              ))}
            </ul>
            <a className="text-link" href="/approach/">
              Get to know our approach <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </Container>
      </section>
      <Process />
      <SelectedWork />
      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="BUILT AROUND YOUR NEEDS"
            title="Support that fits the work you need."
            intro="A focused starting point or a connected programme. The scope follows your goals."
          />
          <div className="engagements-grid">
            {engagements.map(([title, subtitle, text], index) => (
              <article key={title}>
                <span className="engagement-number">0{index + 1} /</span>
                <h3>{title}</h3>
                <p className="engagement-subtitle">{subtitle}</p>
                <p>{text}</p>
                <a className="text-link" href="/contact/">
                  Request a tailored proposal <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="section faq-section">
        <Container className="faq-grid">
          <SectionHeading
            eyebrow="A LITTLE MORE CLARITY"
            title="Good questions. Straight answers."
            intro="Thinking about working together? Here are a few useful things to know."
          />
          <FAQ items={faq} />
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
