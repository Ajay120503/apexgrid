import { ArrowUpRight, Search, Target, PenTool, MousePointer2 } from 'lucide-react';
export function GrowthDiagram() {
  return (
    <figure className="growth-figure">
      <div className="diagram-topline">
        <span>THE CONNECTED APPROACH</span>
        <span aria-hidden="true">↗</span>
      </div>
      <div className="growth-diagram" aria-hidden="true">
        <svg className="diagram-lines" viewBox="0 0 480 440" fill="none">
          <circle cx="240" cy="220" r="156" stroke="#d5d2d3" strokeDasharray="3 7" />
          <circle cx="240" cy="220" r="105" stroke="#e8e7e5" />
          <path
            d="M240 72V170M83 220H190M290 220H397M240 270V368"
            stroke="#C4197A"
            strokeWidth="1.5"
          />
          <path
            d="M230 150l10 10 10-10M310 210l-10 10 10 10M230 338l10 10 10-10M170 210l10 10-10 10"
            stroke="#C4197A"
            strokeWidth="1.5"
          />
        </svg>
        <div className="diagram-center">
          <span>YOUR BRAND</span>
          <strong>
            One clear
            <br />
            direction.
          </strong>
          <ArrowUpRight size={26} />
        </div>
        <div className="diagram-node node-strategy">
          <Target />
          <span>Strategy</span>
          <small>Start with purpose</small>
        </div>
        <div className="diagram-node node-search">
          <Search />
          <span>Search</span>
          <small>Get discovered</small>
        </div>
        <div className="diagram-node node-content">
          <PenTool />
          <span>Content</span>
          <small>Make it matter</small>
        </div>
        <div className="diagram-node node-conversion">
          <MousePointer2 />
          <span>Conversion</span>
          <small>Make the next step clear</small>
        </div>
        <span className="diagram-cross cross-one">+</span>
        <span className="diagram-cross cross-two">+</span>
      </div>
      <figcaption>
        <span className="accent-dot" />A connected plan. Not isolated activity.
      </figcaption>
    </figure>
  );
}
export function ConceptGraphic({ kind }) {
  return (
    <div className={`concept-graphic graphic-${kind}`} aria-hidden="true">
      {kind === 'search' ? (
        <div className="mock-search">
          <div className="mock-searchbar">
            <Search size={16} />
            <span>Find the right local service</span>
            <span>↗</span>
          </div>
          <div className="mock-result">
            <span className="mock-pill">LOCAL DISCOVERY</span>
            <strong>
              Closer to the people
              <br />
              looking for you.
            </strong>
            <div className="mock-lines">
              <i />
              <i />
            </div>
            <span className="mock-cta">Explore the service ↗</span>
          </div>
        </div>
      ) : kind === 'launch' ? (
        <div className="mock-launch">
          <span>AN IDEA, INTRODUCED.</span>
          <strong>
            Made to
            <br />
            <em>stand out.</em>
          </strong>
          <div className="launch-orbit" />
          <span className="launch-bottom">ONE MESSAGE. EVERY TOUCHPOINT. ↗</span>
        </div>
      ) : (
        <div className="mock-web">
          <div className="mock-webnav">
            <i />
            <span>About &nbsp; Services &nbsp; Contact</span>
          </div>
          <div className="mock-webbody">
            <span>CLARITY COMES FIRST</span>
            <strong>
              The right fit.
              <br />
              The next step.
            </strong>
            <div className="mock-lines">
              <i />
              <i />
            </div>
            <span className="mock-cta">Let’s start a conversation ↗</span>
          </div>
          <div className="mock-webtile">
            <ArrowUpRight size={38} />
          </div>
        </div>
      )}
    </div>
  );
}
