import { useEffect, useRef, useState } from 'react';
import { work, workAsset, workGroup, isRefined } from '../data/work.js';
import { Container, Icon, SectionHeading } from './ui.jsx';
import { Wordmark } from './Layout.jsx';

export function WorkImage({ item, detail = false, version = 'refined' }) {
  const asset = workAsset(item, version);
  return (
    <img
      src={asset.variants.at(-1).url}
      srcSet={asset.variants.map((v) => `${v.url} ${v.width}w`).join(', ')}
      sizes={
        detail || item.wide ? '(max-width: 1200px) 100vw, 1200px' : '(max-width: 600px) 100vw, 50vw'
      }
      width={asset.width}
      height={asset.height}
      loading="lazy"
      decoding="async"
      alt={item.alt}
    />
  );
}

export function ArtworkFrame({ item, onOpen, detail = false }) {
  return (
    <a
      className={`artwork-frame artwork-${workGroup(item).toLowerCase()}`}
      href={workAsset(item).variants.at(-1).url}
      onClick={(event) => {
        if (
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey &&
          !event.altKey &&
          event.button === 0
        ) {
          event.preventDefault();
          onOpen(item, event.currentTarget);
        }
      }}
      aria-label={`View artwork: ${item.title}`}
    >
      <span className="artwork-stage">
        <WorkImage item={item} detail={detail} />
        <span className="artwork-expand" aria-hidden="true">
          ↗
        </span>
      </span>
      <span className="artwork-signature">
        <Wordmark />
        <span>
          Creative portfolio <span aria-hidden="true">/</span>{' '}
          {String(work.indexOf(item) + 1).padStart(2, '0')}
        </span>
      </span>
    </a>
  );
}

export function ArtworkViewer({ selection, onClose }) {
  const dialog = useRef(null);
  const [version, setVersion] = useState('refined');
  const { item, trigger } = selection;
  useEffect(() => {
    const node = dialog.current;
    const overflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      node.close();
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, [trigger]);
  return (
    <dialog
      ref={dialog}
      className="artwork-dialog"
      aria-labelledby="artwork-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <header className="artwork-toolbar">
        <div>
          <p className="eyebrow">{item.category}</p>
          <h2 id="artwork-title">{item.title}</h2>
        </div>
        <button type="button" className="viewer-close" onClick={onClose} aria-label="Close artwork">
          ✕
        </button>
      </header>
      <div className="artwork-controls">
        {isRefined(item) && (
          <div className="version-switch" role="group" aria-label="Artwork version">
            {['refined', 'original'].map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={version === v}
                onClick={() => setVersion(v)}
              >
                {v === 'refined' ? 'Refined' : 'Original'}
              </button>
            ))}
          </div>
        )}
        <a href={workAsset(item, version).variants.at(-1).url} target="_blank" rel="noreferrer">
          Open image ↗
        </a>
      </div>
      <div className="artwork-view">
        <WorkImage item={item} detail version={version} />
      </div>
      <footer className="artwork-view-caption">
        <Wordmark />
        <p>{item.detail}</p>
        {isRefined(item) && (
          <small>
            AI-assisted presentation refinement. Refer to the original for exact artwork and label
            text.
          </small>
        )}
        {item.note && <small>{item.note}</small>}
      </footer>
    </dialog>
  );
}

export default function SelectedWork() {
  const [filter, setFilter] = useState('All');
  const [selection, setSelection] = useState(null);
  const [interactive, setInteractive] = useState(false);
  useEffect(() => {
    setInteractive(true);
  }, []);
  const visible = work.filter((item) => filter === 'All' || workGroup(item) === filter);
  return (
    <section className="section selected-work" id="work">
      <Container>
        <div className="section-top">
          <SectionHeading
            eyebrow="THE CREATIVE COLLECTION / 06"
            title="Made to be seen."
            intro="Distinct identities. Considered details. Explore our brand stories, product creatives, and packaging design."
          />
          <a href="/approach/#work" className="text-link">
            Behind the design <Icon name="arrow" size={18} />
          </a>
        </div>
        {interactive && (
          <div className="work-filters" role="group" aria-label="Filter portfolio">
            {['All', 'Brand', 'Product', 'Packaging'].map((label) => (
              <button
                key={label}
                type="button"
                aria-pressed={filter === label}
                onClick={() => setFilter(label)}
              >
                {label}
                <span>
                  {label === 'All'
                    ? work.length
                    : work.filter((item) => workGroup(item) === label).length}
                </span>
              </button>
            ))}
          </div>
        )}
        <p className="sr-only" role="status">
          {visible.length} projects shown
        </p>
        <div className="work-grid">
          {visible.map((item) => (
            <article
              className={`work-card work-card-${workGroup(item).toLowerCase()}`}
              key={item.id}
            >
              <ArtworkFrame
                item={item}
                onOpen={(item, trigger) => setSelection({ item, trigger })}
              />
              <div className="work-card-heading">
                <p className="eyebrow">{item.category}</p>
                <span aria-hidden="true">0{work.indexOf(item) + 1}</span>
              </div>
              <h3>
                <a href={`/approach/#${item.id}`}>{item.title}</a>
              </h3>
              <p>{item.description}</p>
              <a className="work-details-link" href={`/approach/#${item.id}`}>
                Explore project <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        {selection && <ArtworkViewer selection={selection} onClose={() => setSelection(null)} />}
      </Container>
    </section>
  );
}
