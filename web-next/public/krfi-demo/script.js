// KRFI demo interactions. Shared by both pages; each part only runs when its
// markup is on the page.

const ICONS = '/krfi-demo/icons.svg'
const icon = (name, cls = 'icon') =>
  `<svg class="${cls}" aria-hidden="true"><use href="${ICONS}#${name}"></use></svg>`

/* ── Mobile menu ── */

const header = document.querySelector('.site-header')
const menuToggle = document.querySelector('.menu-toggle')
if (header && menuToggle) {
  menuToggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open')
    menuToggle.setAttribute('aria-expanded', String(open))
    menuToggle.innerHTML = icon(open ? 'close' : 'menu') +
      `<span class="visually-hidden">${open ? 'Close menu' : 'Open menu'}</span>`
  })
}

/* ── Help panel: the side tab on desktop, "Need help?" on a phone ── */

const panel = document.querySelector('.help-panel')
if (panel) {
  const toggle = panel.querySelector('.help-toggle')
  const close = panel.querySelector('.help-close')
  const needHelp = document.querySelector('.need-help')

  const setOpen = (open) => {
    panel.classList.toggle('is-open', open)
    toggle.setAttribute('aria-expanded', String(open))
    needHelp?.setAttribute('aria-expanded', String(open))
  }

  toggle.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')))
  close.addEventListener('click', () => {
    setOpen(false)
    toggle.focus()
  })
  needHelp?.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')))
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false)
  })
}

/* ── Carousel: the active slide sits in the middle, its neighbours peek in ── */

const carousel = document.querySelector('.carousel')
if (carousel) {
  const track = carousel.querySelector('.carousel-track')
  const slides = [...track.children]
  const status = carousel.querySelector('[aria-live]')
  let index = 0

  const show = (i) => {
    index = (i + slides.length) % slides.length
    slides.forEach((s, n) => {
      const active = n === index
      s.classList.toggle('is-active', active)
      s.setAttribute('aria-hidden', String(!active))
      s.querySelectorAll('a').forEach((a) => (a.tabIndex = active ? 0 : -1))
    })
    // Centre the active slide in the viewport of the carousel.
    const slide = slides[index]
    const offset = slide.offsetLeft - (carousel.clientWidth - slide.offsetWidth) / 2
    track.style.transform = `translateX(${-offset}px)`
    status.textContent = `Slide ${index + 1} of ${slides.length}`
  }

  carousel.querySelector('[data-prev]').addEventListener('click', () => show(index - 1))
  carousel.querySelector('[data-next]').addEventListener('click', () => show(index + 1))
  window.addEventListener('resize', () => show(index))
  show(1)
}

/* ── Accordions (client types) ── */

document.querySelectorAll('.acc-trigger').forEach((btn) => {
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true'
    btn.setAttribute('aria-expanded', String(!open))
    document.getElementById(btn.getAttribute('aria-controls')).hidden = open
  })
})

/* ── "See more" toggles ── */

document.querySelectorAll('.see-more').forEach((btn) => {
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true'
    btn.setAttribute('aria-expanded', String(!open))
    btn.firstChild.textContent = open ? 'See more ' : 'See less '
    document.getElementById(btn.getAttribute('aria-controls')).hidden = open
  })
})

/* ── Credit criteria tabs ── */

const tablist = document.querySelector('.criteria [role="tablist"]')
if (tablist) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')]
  const select = (tab) => {
    tabs.forEach((t) => {
      const on = t === tab
      t.setAttribute('aria-selected', String(on))
      t.tabIndex = on ? 0 : -1
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on
    })
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab))
    tab.addEventListener('keydown', (e) => {
      const step = { ArrowDown: 1, ArrowUp: -1 }[e.key]
      if (!step) return
      e.preventDefault()
      const next = tabs[(i + step + tabs.length) % tabs.length]
      select(next)
      next.focus()
    })
  })
}

/* ── Products table ── */

const table = document.querySelector('.products-table')
if (table) {
  // Demo data: the shape and ranges of the design, not live products.
  const products = [
    { msv: 90, ltv: 75, type: 'Fixed', term: 2, rate: 4.45, fee: 399, erc: 'Yes' },
    { msv: 90, ltv: 60, type: 'Fixed', term: 2, rate: 4.24, fee: 999, erc: 'Yes' },
    { msv: 90, ltv: 85, type: 'Fixed', term: 2, rate: 4.89, fee: 399, erc: 'Yes' },
    { msv: 90, ltv: 75, type: 'Fixed', term: 5, rate: 4.59, fee: 399, erc: 'Yes' },
    { msv: 90, ltv: 65, type: 'Fixed', term: 5, rate: 4.35, fee: 999, erc: 'Yes' },
    { msv: 90, ltv: 75, type: 'Tracker', term: 2, rate: 4.69, fee: 0, erc: 'No' },
    { msv: 90, ltv: 85, type: 'Fixed', term: 5, rate: 4.99, fee: 0, erc: 'Yes' },
    { msv: 90, ltv: 60, type: 'Tracker', term: 2, rate: 4.49, fee: 999, erc: 'No' },
    { msv: 90, ltv: 75, type: 'Fixed', term: 3, rate: 4.55, fee: 399, erc: 'Yes' },
    { msv: 90, ltv: 85, type: 'Tracker', term: 2, rate: 5.09, fee: 399, erc: 'No' },
  ].map((p, i) => ({ ...p, code: `0${1653 + i * 7} KSHO${2009 + i}` }))

  const PAGE = 6
  const tbody = table.querySelector('tbody')
  const loadMore = document.querySelector('.load-more')
  let shown = PAGE
  let sort = { key: null, dir: 1 }

  const money = (n) => (n ? `£${n.toLocaleString('en-GB')}` : 'None')

  const detail = (p, id) => `
    <tr class="detail-row" id="${id}" hidden>
      <td colspan="8">
        <div class="detail">
          <p class="detail-code">Product : ${p.code}</p>
          <button class="detail-close" type="button" data-close="${id}">
            ${icon('close')}<span class="visually-hidden">Close product details</span>
          </button>
          <ul class="detail-checks">
            <li>${icon('check')}Repayment terms available?</li>
            <li>${icon('check')}First time buyers permitted?</li>
            <li>${icon('check')}Interest-only terms available?</li>
            <li>${icon('check')}Porting available?</li>
          </ul>
          <div class="detail-grid">
            <div><span>Minimum loan</span>£50,000</div>
            <div><span>Maximum loan</span>£1,000,000</div>
            <div><span>Minimum property value</span>£125,000</div>
            <div><span>Term</span>5-35 years</div>
            <div><span>ERC</span>${p.erc === 'Yes' ? 'Year one: 4%<br>Year two: 5%' : 'None'}</div>
            <div><span>Maximum no. of applicants</span>4</div>
            <div><span>Client share</span>25% -99%</div>
            <div><span>Product fee</span>${money(p.fee)}</div>
            <div><span>Initial rate</span>${p.rate.toFixed(2)}%</div>
            <div><span>Initial period</span>${p.term} years</div>
            <div><span>Max LTV</span>${p.ltv}%</div>
            <div><span>Mortgage type</span>${p.type}</div>
          </div>
        </div>
      </td>
    </tr>`

  const render = () => {
    const list = [...products]
    if (sort.key) {
      list.sort((a, b) =>
        a[sort.key] < b[sort.key] ? -sort.dir : a[sort.key] > b[sort.key] ? sort.dir : 0
      )
    }
    tbody.innerHTML = list
      .slice(0, shown)
      .map((p) => {
        const id = `detail-${p.code.replace(/\s/g, '')}`
        return `
          <tr class="row">
            <td data-label="MSV">${p.msv}%</td>
            <td data-label="LTV">${p.ltv}%</td>
            <td data-label="Mortgage type">${p.type}</td>
            <td data-label="Term">${p.term} years</td>
            <td data-label="Initial rate">${p.rate.toFixed(2)}%</td>
            <td data-label="Product fee">${money(p.fee)}</td>
            <td data-label="ERC">${p.erc}</td>
            <td class="cell-action">
              <button class="details-btn" type="button" aria-expanded="false" aria-controls="${id}">
                Show details ${icon('chevron')}
              </button>
            </td>
          </tr>${detail(p, id)}`
      })
      .join('')
    loadMore.hidden = shown >= products.length
  }

  tbody.addEventListener('click', (e) => {
    const btn = e.target.closest('.details-btn')
    const close = e.target.closest('[data-close]')
    if (btn) {
      const open = btn.getAttribute('aria-expanded') === 'true'
      btn.setAttribute('aria-expanded', String(!open))
      btn.firstChild.textContent = open ? 'Show details ' : 'Hide details '
      document.getElementById(btn.getAttribute('aria-controls')).hidden = open
    } else if (close) {
      const id = close.dataset.close
      document.getElementById(id).hidden = true
      const trigger = tbody.querySelector(`[aria-controls="${id}"]`)
      trigger.setAttribute('aria-expanded', 'false')
      trigger.firstChild.textContent = 'Show details '
      trigger.focus()
    }
  })

  table.querySelectorAll('.sort-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort
      sort = { key, dir: sort.key === key ? -sort.dir : 1 }
      table.querySelectorAll('th[aria-sort]').forEach((th) => th.removeAttribute('aria-sort'))
      btn.closest('th').setAttribute('aria-sort', sort.dir === 1 ? 'ascending' : 'descending')
      render()
    })
  })

  loadMore.addEventListener('click', () => {
    shown = products.length
    render()
  })

  render()
}
