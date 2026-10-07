<div align="center">

# Sanjana Shree · Design Portfolio

### Designing clarity into every interaction.

UI/UX Product Design · Frontend Development · Interactive Prototyping

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

[Explore the source](https://github.com/sanjanashreem/Portfolio-/tree/main/sanjana_portfolio_full%203) · [Connect on LinkedIn](https://www.linkedin.com/in/sanjana-murugan-63764a354/) · [Email Sanjana](mailto:sanjanashree64@gmail.com)

</div>

---

## A portfolio you can interact with

A responsive, multi-page portfolio presenting Sanjana Shree’s approach to research, product design, visual systems, and frontend handoff. Visitors can explore case studies, try a finance prototype, inspect interface states, and navigate the design process.

The experience pairs clear information hierarchy with purposeful motion: transitions connect pages, feedback confirms actions, and progressive disclosure keeps secondary details within reach.

## Experience highlights

| Feature | What visitors can do |
| --- | --- |
| **Product playground** | Use a phone-shaped FinTrack prototype, add an expense, and see totals, lists, and category breakdowns update. |
| **Micro-interaction lab** | Try a toggle, accordion, toast, confirmation modal, simulated loading state, and keyboard focus example. |
| **Selected work** | Filter projects by context and open summaries of their challenge, approach, and outcome. |
| **Data visualization** | Explore a spending donut chart and inspect points on a seven-day spending graph. |
| **Design process** | Navigate eight stages with linked visual feedback and descriptions of artifacts and decisions. |
| **Light and dark themes** | Switch appearance and keep the preference in the browser. |
| **Quick navigation** | Open a searchable page menu using **⌘K / Ctrl+K**. |
| **Contact flow** | Validate an enquiry, copy the email address, or prepare a message in an email app. |

## Selected projects

### MediTrust

A healthcare crowdfunding verification concept focused on trust, evidence, and understandable review decisions.

### Farm2Connect

An agricultural marketplace experience focused on product discovery, readable layouts, and a simpler purchase journey.

### FinTrack

A personal finance experience focused on expense tracking, dashboard hierarchy, and reusable interface patterns. The portfolio includes a working browser prototype for exploring its interactions.

> Case study summaries describe design intent. Prototype data and charts are illustrative examples, rather than measured product outcomes or live financial analytics.

## Pages at a glance

| Page | Purpose |
| --- | --- |
| `index.html` | Introduction, product playground, and micro-interaction lab |
| `work.html` | Project filters, case study dialogs, and data visualization |
| `process.html` | Interactive walkthrough of the design process |
| `design-system.html` | Design language and component demonstrations |
| `about.html` | Background and design perspective |
| `contact.html` | Contact links and enquiry preparation |
| `resume.html` | Resume page |

Shared presentation and behavior live in `styles.css` and `site.js`. The profile artwork is stored in `profile.png`.

## Motion with a purpose

- Scroll reveals establish hierarchy as content enters view.
- Page transitions connect navigation between sections.
- Pointer-responsive profile artwork and card lighting add depth on supported devices.
- Toasts and state changes provide immediate feedback.
- A scroll progress indicator and back-to-top control support longer pages.
- Reduced-motion preferences suppress or simplify selected effects.

## Accessibility considerations

The interface includes a skip-to-content link, labelled navigation, visible focus treatments, active-page indicators, semantic form controls, and keyboard-accessible chart points. The process tabs support arrow-key navigation.

These are implemented accessibility features; this README does not claim a formal accessibility audit or full standards compliance.

## Run locally

This is a static website built with HTML, CSS, and vanilla JavaScript. It has no package installation or build step.

```bash
git clone https://github.com/sanjanashreem/Portfolio-.git
cd "Portfolio-/sanjana_portfolio_full 3"
python3 -m http.server 8000
```

Open **http://localhost:8000** in a modern browser. Keep the terminal running while previewing, and press **Ctrl+C** to stop the server.

## Personalize the portfolio

1. Edit page copy and project descriptions in the HTML files.
2. Update case study details and interactive behavior in `site.js`.
3. Adjust typography, spacing, colors, and motion in `styles.css`.
4. Replace `profile.png` while keeping its filename, or update the image references.
5. Update contact links in `contact.html` and the email address used in `site.js`.

## Demo behavior

- Expenses added in the FinTrack playground remain in page memory and reset after reload.
- Work-page charts use fixed sample values and do not synchronize with newly added playground expenses.
- The theme preference is stored locally in the visitor’s browser.
- The enquiry form validates fields and opens a `mailto:` draft. Sending requires an email app; there is no message-delivery backend.
- Loading, deletion, and preference confirmations in the interaction lab are demonstrations.

## Static hosting

Publish the contents of **`sanjana_portfolio_full 3`** with a static hosting provider. Keep the HTML files, stylesheet, script, and profile image together so relative links resolve correctly.

If a host supports a publish directory, select that folder. If publishing the repository root, the site’s entry page remains inside the folder unless the files are moved to the root.

## Explore the experience

- [ ] Navigate between all seven pages.
- [ ] Switch themes and refresh to check the saved preference.
- [ ] Add valid and invalid expense amounts in the phone prototype.
- [ ] Filter projects and open each case study.
- [ ] Explore chart values using a pointer and keyboard.
- [ ] Try the process tabs and quick navigation shortcut.
- [ ] Preview narrow layouts and reduced-motion settings.
- [ ] Prepare an enquiry and review the email draft.

---

<div align="center">

**Sanjana Shree**

Thoughtful interfaces. Clear decisions. Useful interactions.

[GitHub](https://github.com/sanjanashreem) · [LinkedIn](https://www.linkedin.com/in/sanjana-murugan-63764a354/) · [Email](mailto:sanjanashree64@gmail.com)

</div>
