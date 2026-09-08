import { Container, LinkButton } from '../components/ui.jsx';
export default function NotFound() {
  return (
    <section className="not-found">
      <Container>
        <p className="eyebrow">404 / A CONNECTION WE COULDN’T FIND</p>
        <h1>A little off grid.</h1>
        <p className="lede">
          This page may have moved, or the address may be incorrect. Let’s get you back to a useful
          starting point.
        </p>
        <div className="hero-actions">
          <LinkButton href="/">Return home</LinkButton>
          <LinkButton href="/#services" variant="outline">
            Explore services
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
