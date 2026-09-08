import { copy, examples } from '../data/content.js';
import { Container, SectionHeading } from '../components/ui.jsx';
import { Process } from '../components/Sections.jsx';
import { ConceptGraphic } from '../components/Graphics.jsx';
import { FinalCTA } from '../components/Layout.jsx';
export default function Approach() {
  return (
    <>
      <section className="interior-hero">
        <Container>
          <p className="eyebrow">OUR APPROACH</p>
          <h1>
            Separate pieces.
            <br />
            <span className="accent-text">Shared direction.</span>
          </h1>
          <p className="lede measure">
            A useful marketing plan connects the business goal to the work. Here’s how we bring the
            pieces together—and what that thinking could look like in practice.
          </p>
        </Container>
      </section>
      <Process expanded />
      <section className="section examples-detail">
        <Container>
          <SectionHeading
            eyebrow="IDEAS IN CONTEXT"
            title="Three challenges. Connected thinking."
            intro="These illustrative concepts explain the approach. They are not completed projects, client engagements, or achieved results."
          />
          {examples.map((example, index) => (
            <article className="example-detail" id={example.id} key={example.id}>
              <div>
                <p className="eyebrow">
                  0{index + 1} / {example.channels}
                </p>
                <h2>{example.short}</h2>
                <p className="concept-label">{copy.concept}</p>
                <ConceptGraphic kind={example.kind} />
              </div>
              <div className="example-story">
                <h3>The challenge</h3>
                <p>{example.challenge}</p>
                <h3>The proposed approach</h3>
                <p>{example.solution}</p>
                <h3>Sample deliverables</h3>
                <ul>
                  {example.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h3>What we would measure</h3>
                <p>{example.measurement}</p>
              </div>
            </article>
          ))}
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
