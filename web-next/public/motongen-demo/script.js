// MotoNgen demo interactions, shared by all eight pages. Each part only runs
// when its markup is on the page.

const $ = (sel, root = document) => root.querySelector(sel)
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)]

/* ── Mobile menu ── */

const header = $('.site-header')
const menuToggle = $('.menu-toggle')
if (header && menuToggle) {
  menuToggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open')
    menuToggle.setAttribute('aria-expanded', String(open))
  })
}

/* ── Home: where the dark photo stops on a phone ──
   Stacked, the hero's text wraps to any height, so the photo's lower edge is
   measured: it ends just above the dark-text paragraph. Desktop ignores it. */

const homeHero = $('.home-hero')
const onLight = $('.home-about .on-light')
if (homeHero && onLight) {
  const fit = () => {
    // +8: the photo's right edge stops 8px above the paragraph; its slant
    // (48px) still clears the white text above by about 16px on the left.
    const tail = homeHero.getBoundingClientRect().bottom - onLight.getBoundingClientRect().top + 8
    homeHero.style.setProperty('--light-tail', `${Math.round(tail)}px`)
  }
  fit()
  addEventListener('resize', fit)
  document.fonts?.ready.then(fit)
}

/* ── "Our products" menu ── */

const productsToggle = $('.products-toggle')
const productsMenu = $('#products-menu')
if (productsToggle && productsMenu) {
  const setOpen = (open) => {
    productsMenu.hidden = !open
    productsToggle.setAttribute('aria-expanded', String(open))
  }
  productsToggle.addEventListener('click', () => setOpen(productsMenu.hidden))
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-menu')) setOpen(false)
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !productsMenu.hidden) {
      setOpen(false)
      productsToggle.focus()
    }
  })
}

/* ── Overlays: the quote pop-up and the thank-you alert ── */

let lastFocus = null

const openOverlay = (overlay) => {
  lastFocus = document.activeElement
  $$('.overlay').forEach((o) => { o.hidden = o !== overlay })
  overlay.hidden = false
  document.body.classList.add('has-overlay')
  const first = overlay.querySelector('.alert') || overlay.querySelector('input, select, textarea, button')
  first?.focus()
}

const closeOverlays = () => {
  $$('.overlay').forEach((o) => { o.hidden = true })
  document.body.classList.remove('has-overlay')
  lastFocus?.focus?.()
}

$$('[data-quote]').forEach((btn) =>
  btn.addEventListener('click', () => openOverlay($('#quote'))))

$$('.overlay').forEach((overlay) => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.closest('[data-close]')) closeOverlays()
  })
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && $$('.overlay').some((o) => !o.hidden)) closeOverlays()
})

/* ── Forms ──
   A demo, so nothing is sent: check the required fields, then show the
   thank-you alert. */

$$('form.form').forEach((form) => {
  const note = $('.form-note', form)
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    let firstBad = null

    $$('.field', form).forEach((field) => {
      const input = $('input, select, textarea', field)
      const bad = input.required ? !input.value.trim() || !input.checkValidity() : !input.checkValidity()
      field.classList.toggle('is-invalid', bad)
      if (bad && !firstBad) firstBad = input
    })

    const checks = $('.checks[data-required]', form)
    if (checks) {
      const none = !$$('input:checked', checks).length
      checks.classList.toggle('is-invalid', none)
      if (none && !firstBad) firstBad = $('input', checks)
    }

    if (firstBad) {
      note.textContent = 'Please fill in the fields marked in red.'
      firstBad.focus()
      return
    }

    note.textContent = ''
    form.reset()
    openOverlay($('#thanks'))
  })

  form.addEventListener('input', (e) => {
    e.target.closest('.field, .checks')?.classList.remove('is-invalid')
  })
})

/* ── About: FAQ ── */

$$('.faq-q[aria-controls]').forEach((btn) => {
  const answer = document.getElementById(btn.getAttribute('aria-controls'))
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true'
    btn.setAttribute('aria-expanded', String(open))
    answer.hidden = !open
  })
})

/* ── Gearbox: the timeline step that opens the white callout ── */

$$('.timeline-step[aria-controls]').forEach((btn) => {
  const panel = document.getElementById(btn.getAttribute('aria-controls'))
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true'
    btn.setAttribute('aria-expanded', String(open))
    panel.hidden = !open
  })
})

/* ── Engine: the process tabs ──
   The design has two slides (Overview and Thorough cleaning); the other
   tabs have no content in the file and stay inactive. */

const SLIDES = [
  {
    img: '/motongen-demo/img/accord.jpg',
    alt: 'A grey saloon car on a city street at dusk',
    play: false,
    title: '1 Year/20,000 Kilometers Warranty',
    text: 'MOTONGEN can offer this beefy warranty on our remanufactured gas engines because every one of them goes through our extensive "Do It Right" process that ensures worry-free operation. Our optional Premium Service Plan provides allowances for such items as towing, car rental, fluids and premium labour should a problem arise.',
  },
  {
    img: '/motongen-demo/img/engine-cutaway.jpg',
    alt: 'A cutaway engine on display, showing its intake and exhaust',
    play: true,
    title: 'Thorough cleaning',
    text: 'Every MOTONGEN reman petrol engine is partially or completely disassembled. Blocks, heads, connecting rods, crankshafts and camshafts are thoroughly cleaned through a variety of processes to remove contaminants that can result in premature wear to internal engine components and early engine failure.',
  },
]

const panel = $('#process-panel')
if (panel) {
  const tabs = $$('[role="tab"][data-slide]')
  const img = $('[data-slide-img]')
  const play = $('[data-slide-play]')
  let current = 0

  const show = (i, focusTab = false) => {
    current = (i + SLIDES.length) % SLIDES.length
    const s = SLIDES[current]
    img.src = s.img
    img.alt = s.alt
    play.hidden = !s.play
    $('[data-slide-title]', panel).textContent = s.title
    $('[data-slide-text]', panel).textContent = s.text
    tabs.forEach((t) => {
      const on = Number(t.dataset.slide) === current
      t.setAttribute('aria-selected', String(on))
      t.tabIndex = on ? 0 : -1
      if (on) {
        panel.setAttribute('aria-labelledby', t.id)
        if (focusTab) t.focus()
      }
    })
  }

  tabs.forEach((t) => {
    t.addEventListener('click', () => show(Number(t.dataset.slide)))
    t.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') show(current + 1, true)
      if (e.key === 'ArrowLeft') show(current - 1, true)
    })
  })
  $$('[data-step]', panel).forEach((b) =>
    b.addEventListener('click', () => show(current + Number(b.dataset.step))))
  show(0)
}

/* ── Engine: the options slider ── */

const track = $('.options-track')
if (track) {
  const cards = $$('.option', track)
  const dots = $$('[data-dot]')
  const step = () => cards[1].offsetLeft - cards[0].offsetLeft
  const max = () => track.scrollWidth - track.clientWidth

  // The arrows move one card; the dots mark how far along the row is. On a
  // wide screen most cards are already in view, so the row only scrolls a
  // little, and the dots share that distance between them.
  $$('[data-options]').forEach((b) =>
    b.addEventListener('click', () =>
      track.scrollBy({ left: Number(b.dataset.options) * step(), behavior: 'smooth' })))
  dots.forEach((d) =>
    d.addEventListener('click', () =>
      track.scrollTo({ left: (Number(d.dataset.dot) / (dots.length - 1)) * max(), behavior: 'smooth' })))

  const sync = () => {
    const i = max() > 0 ? Math.round((track.scrollLeft / max()) * (dots.length - 1)) : 0
    dots.forEach((d, n) => {
      if (n === i) d.setAttribute('aria-current', 'true')
      else d.removeAttribute('aria-current')
    })
  }
  track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true })
  sync()
}
