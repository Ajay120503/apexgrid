import {
  ArrowUpRight,
  Search,
  Target,
  MessageCircle,
  PenTool,
  PanelsTopLeft,
  ChartNoAxesCombined,
} from 'lucide-react';
export const icons = {
  search: Search,
  target: Target,
  message: MessageCircle,
  pen: PenTool,
  layout: PanelsTopLeft,
  chart: ChartNoAxesCombined,
};
export function Icon({ name, ...props }) {
  const Component = icons[name] || ArrowUpRight;
  return <Component aria-hidden="true" size={24} strokeWidth={1.6} {...props} />;
}
export function Container({ children, className = '', ...props }) {
  return (
    <div className={`container ${className}`} {...props}>
      {children}
    </div>
  );
}
export function LinkButton({ children, href, variant = 'primary', className = '' }) {
  return (
    <a className={`button button-${variant} ${className}`} href={href}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}
export function SectionHeading({ eyebrow, title, intro, level = 2 }) {
  const Heading = `h${level}`;
  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading>{title}</Heading>
      {intro && <p className="lede">{intro}</p>}
    </div>
  );
}
export function FAQ({ items }) {
  return (
    <div className="faq-list">
      {items.map(([question, answer]) => (
        <details key={question}>
          <summary>
            {question}
            <span aria-hidden="true" className="faq-plus">
              +
            </span>
          </summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
