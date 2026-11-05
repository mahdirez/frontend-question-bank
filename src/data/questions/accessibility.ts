import type { Question } from "@/types/question";

export const accessibilityQuestions: Question[] = [
  {
    id: "a11y-alt-text-01",
    level: "basic",
    topic: "accessibility",
    question: "How do you write good alt text, and when should alt be empty?",
    answer:
      'Alt text should convey the purpose of the image in context, not just describe how it looks. Skip phrases like \'image of\'. Screen readers already announce it as an image.\n\nDecorative images (dividers, background flourishes) need an empty alt attribute (alt=""). An empty value tells screen readers to skip the image, while a missing alt may cause the file name to be read aloud.\n\nFunctional images, such as an icon inside a link or button, should describe the action or destination. For complex images like charts, give a short alt and provide the full explanation or data nearby. Decorative inline SVG icons next to visible text should be hidden with aria-hidden="true".',
    code: {
      language: "html",
      content: `<img src="logo.svg" alt="Acme home">
<img src="divider.png" alt="">

<button type="button">
  <svg aria-hidden="true">...</svg>
  Save
</button>`,
    },
  },
  {
    id: "a11y-contrast-01",
    level: "basic",
    topic: "accessibility",
    question: "What color contrast does WCAG require?",
    answer:
      "For level AA, normal text needs a contrast ratio of at least 4.5:1 against its background. Large text (about 24px, or 19px bold and above) needs 3:1. User interface components, such as input borders and icons, and focus indicators also need at least 3:1. Level AAA raises the text requirement to 7:1.\n\nDo not rely on color alone to communicate meaning. An error state should also have an icon or text, and links inside paragraphs should have more than a color difference, such as an underline.\n\nCheck contrast in both light and dark themes. Browser DevTools and tools like axe can measure ratios automatically.",
  },
  {
    id: "a11y-aria-01",
    level: "intermediate",
    topic: "accessibility",
    question:
      "What is the first rule of ARIA, and why can ARIA make things worse?",
    answer:
      'The first rule of ARIA is: if a native HTML element or attribute already provides the semantics and behavior you need, use it instead of adding ARIA.\n\nARIA only changes what assistive technologies are told about an element. It adds no behavior. A div with role="button" is announced as a button, but it still needs tabindex, Enter and Space key handling and focus styles, all of which a real button gives you for free.\n\nIncorrect ARIA is often worse than none, because it makes a promise the element does not keep. ARIA is the right tool for things HTML cannot express natively, such as aria-expanded, aria-controls, aria-describedby, aria-live, and aria-label on icon-only buttons.',
    code: {
      language: "html",
      content: `<!-- Prefer -->
<button type="button">Save</button>

<!-- Needs tabindex, key handlers, focus styles... -->
<div role="button" tabindex="0">Save</div>

<!-- Good use of ARIA: state HTML can't express -->
<button aria-expanded="false" aria-controls="menu">Menu</button>`,
    },
  },
  {
    id: "a11y-keyboard-focus-01",
    level: "intermediate",
    topic: "accessibility",
    question:
      "What makes a page keyboard accessible, and how do you manage focus?",
    answer:
      'Every interactive element must be reachable and operable with the keyboard, in an order that matches the visual and logical flow. Using native elements (button, a, input) gets most of this right automatically.\n\nFocus must always be visible. Never remove the outline without providing a clear replacement; :focus-visible shows it for keyboard users without distracting mouse users.\n\ntabindex="0" adds an element to the tab order, tabindex="-1" makes it focusable by script only, and positive values should be avoided because they break the natural order.\n\nWhen the UI changes without a page load, you must move focus yourself: into a dialog when it opens and back to the trigger when it closes, or to the new heading after a client-side route change. Provide a skip link so keyboard users can bypass repeated navigation.',
    code: {
      language: "css",
      content: `:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}`,
    },
  },
  {
    id: "a11y-modal-01",
    level: "advanced",
    topic: "accessibility",
    question: "What does an accessible modal dialog need?",
    answer:
      "When a modal opens, focus moves into it, and the rest of the page becomes inert so neither keyboard nor screen reader users can reach it. Pressing Escape closes it, and on close, focus returns to the element that opened it. The dialog needs an accessible name (aria-labelledby pointing at its heading).\n\nThe native dialog element opened with showModal() provides most of this: a focus trap, inert background, Escape handling, a backdrop and focus restoration. It is usually better than a custom div-based implementation, which has to rebuild all of those behaviors correctly.\n\nAlso prevent the background from scrolling while the modal is open, and make sure the dialog content itself is operable by keyboard.",
    code: {
      language: "tsx",
      content: `const ref = useRef<HTMLDialogElement>(null);

return (
  <>
    <button onClick={() => ref.current?.showModal()}>Delete</button>

    <dialog ref={ref} aria-labelledby="dialog-title">
      <h2 id="dialog-title">Delete this item?</h2>
      <form method="dialog">
        <button>Cancel</button>
        <button value="confirm">Delete</button>
      </form>
    </dialog>
  </>
);`,
    },
  },
  {
    id: "a11y-live-regions-01",
    level: "advanced",
    topic: "accessibility",
    question:
      "How do you announce dynamic content changes to screen reader users?",
    answer:
      'Screen readers do not announce content that changes elsewhere on the page unless it lives in a live region.\n\naria-live="polite" waits until the user is idle before announcing, which suits status updates like search result counts or \'Saved\'. aria-live="assertive" interrupts immediately and should be reserved for urgent messages. The roles status (polite) and alert (assertive) are shortcuts for these.\n\nThe live region must already exist in the DOM before its content changes. Inserting a new region together with its text is often not announced. Keep messages short and meaningful, and avoid announcing every small change. Common uses are form validation errors, toasts and loading or result-count messages.',
    code: {
      language: "html",
      content: `<p role="status" aria-live="polite">12 of 48 questions</p>

<div role="alert">Your session is about to expire.</div>`,
    },
  },
];
