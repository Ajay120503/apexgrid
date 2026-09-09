import { useState } from 'react';
import { Container, SectionHeading } from '../components/ui.jsx';
import { Process } from '../components/Sections.jsx';
import { ArtworkFrame, ArtworkViewer } from '../components/SelectedWork.jsx';
import { work, workGroup } from '../data/work.js';
import { FinalCTA } from '../components/Layout.jsx';
export default function Approach() {
  const [selection, setSelection] = useState(null);
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
            A useful marketing plan connects the business goal to the work. Explore our process and
            a selection of our brand, product, and packaging artwork.
          </p>
        </Container>
      </section>
      <Process expanded />
      <section className="section work-details" id="work">
        <Container>
          <SectionHeading
            eyebrow="SELECTED WORK"
            title="A closer look at the creative."
            intro="Brand communication, product advertising, and packaging design, shown through the finished artwork."
          />
          {work.map((item, index) => (
            <article
              className={`work-detail${item.wide ? ' work-detail-wide' : ''}`}
              id={item.id}
              key={item.id}
            >
              <ArtworkFrame
                item={item}
                detail
                onOpen={(item, trigger) => setSelection({ item, trigger })}
              />
              <div>
                <p className="eyebrow">
                  0{index + 1} / {item.category}
                </p>
                <h2>{item.title}</h2>
                <p className="lede">{item.description}</p>
                <p>{item.detail}</p>
                {item.note && <p className="work-note">{item.note}</p>}
                <dl className="work-specs">
                  <div>
                    <dt>Discipline</dt>
                    <dd>{workGroup(item)} design</dd>
                  </div>
                  <div>
                    <dt>Format</dt>
                    <dd>{item.wide ? 'Five-label collection' : 'Portrait artwork'}</dd>
                  </div>
                </dl>
                <button
                  className="text-link"
                  type="button"
                  onClick={(event) => setSelection({ item, trigger: event.currentTarget })}
                >
                  View full artwork ↗
                </button>
              </div>
            </article>
          ))}
        </Container>
      </section>
      {selection && <ArtworkViewer selection={selection} onClose={() => setSelection(null)} />}
      <FinalCTA />
    </>
  );
}
