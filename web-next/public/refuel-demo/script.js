// Refuel demo interactions, shared by all four pages. Each part only runs when
// its markup is on the page.

/* ── Mobile menu ── */

const header = document.querySelector('.site-header')
const toggle = document.querySelector('.menu-toggle')
if (header && toggle) {
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open')
    toggle.setAttribute('aria-expanded', String(open))
  })
}

/* ── Contact form ──
   A demo, so nothing is sent: check the fields and say so. */

const form = document.querySelector('.message-form')
if (form) {
  const note = form.querySelector('.form-note')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const missing = [...form.elements].find(el => el.required && !el.value.trim())
    const badEmail = !form.email.validity.valid
    if (missing || badEmail) {
      note.textContent = missing
        ? `Please fill in your ${missing.name}.`
        : 'Please check your email address.'
      ;(missing || form.email).focus()
      return
    }
    note.textContent = 'Thanks. This is a design demo, so your message was not sent.'
    form.reset()
  })
}
