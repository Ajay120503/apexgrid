import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navigation } from '../lib/routes.js';
import { services } from '../data/services.js';
import { site } from '../data/site.js';
import { copy } from '../data/content.js';
import { isEmail, isHttpUrl } from '../lib/config.js';
import { Container, LinkButton } from './ui.jsx';
export function Wordmark() {
  return (
    <span className="wordmark">
      Apex<span>Grid</span>
    </span>
  );
}
export function DirectLinks({ config = site }) {
  return (
    <div className="direct-links">
      {config.location && <p className="business-location">{config.location}</p>}
      {isEmail(config.email) && <a href={`mailto:${config.email}`}>{config.email}</a>}
      {config.phoneDisplay && /^\+[1-9]\d{6,14}$/.test(config.phoneE164 || '') && (
        <a href={`tel:${config.phoneE164}`}>{config.phoneDisplay}</a>
      )}
      {/^\d{7,15}$/.test(config.whatsappNumber || '') && (
        <a href={`https://wa.me/${config.whatsappNumber}`}>
          Chat on WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      )}
      {isHttpUrl(config.bookingUrl) && (
        <a href={config.bookingUrl}>
          Book a conversation <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      )}
      {config.socialLinks
        .filter((link) => isHttpUrl(link.url))
        .map((link) => (
          <a key={link.url} href={link.url}>
            {link.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
    </div>
  );
}
function Header({ path }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    if (!open) return;
    const escape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  const links = (mobile) => (
    <>
      {navigation.map((item) => (
        <a
          key={item.href}
          href={item.href}
          aria-current={item.href === path ? 'page' : undefined}
          onClick={() => {
            if (mobile) {
              setOpen(false);
              toggle.current?.focus();
            }
          }}
        >
          {item.label}
        </a>
      ))}
      <LinkButton href="/contact/">Let’s talk</LinkButton>
    </>
  );
  return (
    <header className="site-header">
      <Container className="header-inner">
        <a className="logo-link" href="/" aria-label="ApexGrid home">
          <Wordmark />
        </a>
        <nav className="desktop-navigation" aria-label="Primary">
          {links(false)}
        </nav>
        <details
          className="mobile-menu"
          open={open}
          onToggle={(event) => setOpen(event.currentTarget.open)}
        >
          <summary ref={toggle} aria-controls="primary-nav" aria-label="Navigation">
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </summary>
          <nav id="primary-nav" aria-label="Primary">
            {links(true)}
          </nav>
        </details>
      </Container>
    </header>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta">
      <Container>
        <div>
          <p className="eyebrow">LET’S CONNECT THE DOTS</p>
          <h2>{copy.finalHeading}</h2>
          <p>{copy.finalCopy}</p>
        </div>
        <LinkButton href="/contact/">{copy.enquiry}</LinkButton>
        <span className="cta-grid" aria-hidden="true" />
      </Container>
    </section>
  );
}
function Footer({ year }) {
  return (
    <footer>
      <Container>
        <div className="footer-main">
          <div className="footer-brand">
            <a href="/" aria-label="ApexGrid home">
              <Wordmark />
            </a>
            <p>
              Strategy, creativity, and digital execution.
              <br />
              Connected around your goals.
            </p>
            <DirectLinks />
          </div>
          <div>
            <p className="footer-label">EXPLORE</p>
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <div>
            <p className="footer-label">OUR SERVICES</p>
            {services.map((service) => (
              <a key={service.id} href={`/services/${service.id}/`}>
                {service.short}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {year} ApexGrid. All rights reserved.</p>
          <div>
            <a href="/privacy/">Privacy</a>
            <a href="/terms/">Terms</a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
export function Layout({ children, path, year }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Header path={path} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer year={year} />
    </>
  );
}
