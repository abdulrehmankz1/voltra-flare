import { faqIntro, faqs, type FaqEntry } from "@/content/faq";
import { cx } from "@/lib/cx";
import { ordinal } from "@/lib/ordinal";
import { spaced } from "@/lib/spaced";
import { SectionHead } from "../../primitives/heading";
import { Art, Chapter } from "../../primitives/layout";

// 084° FAQ: the dial (.faq__dial) the motion layer turns as answers open.
export function Faq() {
  return (
    <Chapter id="faq" className="faq" labelledBy="faq-t">
      <Art />{" "}
      <div className="wrap faq__in">
        <div className="faq__left">
          <SectionHead chapter="faq" id="faq-t" intro={faqIntro} /> <div className="faq__dial" aria-hidden="true" />
        </div>{" "}
        <div className="qas">
          {spaced(
            faqs,
            (entry) => entry.question,
            (entry, index) => (
              <FaqItem entry={entry} index={index} />
            ),
          )}
        </div>
      </div>
    </Chapter>
  );
}

// One question. The first ships open; the accordion in the motion layer hides the other answers on boot and
// toggles is-open, aria-expanded and hidden from there. The toggle is a plus whose vertical stroke (.v) turns away.
function FaqItem({ entry, index }: { entry: FaqEntry; index: number }) {
  const open = index === 0;
  const questionId = `qa-q${index}`;
  const answerId = `qa-a${index}`;
  return (
    <div className={cx("qa", open && "is-open")}>
      <div className="qa__bg" aria-hidden="true" />{" "}
      <h3>
        <button className="qa__q" type="button" id={questionId} aria-expanded={open} aria-controls={answerId}>
          <span className="qa__n" aria-hidden="true">
            {ordinal(index)}
          </span>
          <span className="qa__t">{entry.question}</span>
          <span className="qa__tg" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M5 12h14" />
              <path className="v" d="M12 5v14" style={{ transformOrigin: "12px 12px" }} />
            </svg>
          </span>
        </button>
      </h3>{" "}
      <div className="qa__a" id={answerId} role="region" aria-labelledby={questionId}>
        <p>{entry.answer}</p>
      </div>
    </div>
  );
}
