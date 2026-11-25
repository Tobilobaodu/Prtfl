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

/* ── Mega menu (desktop) ──
   Copied from a screen recording of the live site, text included. Three
   columns: sections on the left, that section's pages in the middle, and a
   grey summary of the hovered page on the right with a checklist and a button.

   How it behaves, as recorded: it opens with no section chosen; hovering a
   section lists its pages; the summary only appears once a page is hovered.
   Residential's Calculator has no pages, so its summary fills the middle.
   A summary is a title and points, or a list of titled groups of points. */

const MEGA = {
  btl: [
    { name: 'Products', button: 'View products', pages: [
      { name: 'Buy to let mortgages', title: 'Buy to let mortgages:',
        points: ['Up to 75% LTV available', 'Applications in individual name', 'Maximum loan £3m'] },
      { name: 'Buy to let product transfer',
        points: ['New mortgage products for existing customers', 'Online submission available for some accounts', 'No underwriting assessment required'] },
      { name: 'Buy to let further advances', title: 'Additional borrowing',
        points: ['For existing customers requiring larger loans', 'Term must not exceed that of the original mortgage', 'Exclusions apply on use of funds'] },
    ] },
    { name: 'Criteria', button: 'View criteria', pages: [
      { name: 'The applicant',
        points: ['Portfolio landlords', 'Residency', 'SPV, limited companies (Ltd) and LLPs'] },
      { name: 'The income',
        points: ['Rental income requirements', 'Using passing rent to calculate estimated loan size', 'Income-backed buy to let'] },
      { name: 'The loan',
        points: ['Further advances', 'Source of deposit', 'Remortgages', 'Let to buy'] },
      { name: 'The property',
        points: ['Security', 'Exposure limits', 'Tenure', 'HMOs', 'Flats', 'Tenancy', 'Self-build'] },
      { name: 'Fees and charges', title: 'Application and product fees',
        points: ['Standard valuation fees', 'Specialist valuation fees', 'Complex valuation fees', 'Legal fees', 'Direct debits'] },
    ] },
    { name: 'Calculator', button: 'View', pages: [
      { name: 'Buy to let calculator', title: 'Buy to let',
        points: ['First-time landlords', 'Expanding a portfolio', 'Remortgages'] },
    ] },
    { name: 'Literature', button: 'View', pages: [
      { name: 'Non-portfolio app forms',
        points: ['Mortgage application form', 'Consents and declarations', 'Direct debit mandate', 'Buy to let property schedule'] },
      { name: 'Portfolio app forms',
        points: ['Mortgage application form', 'Consents and declarations', 'Direct debit mandate', 'Additional applicants application form', 'Buy to let property schedule', 'Business plan'] },
      { name: 'Further advance app form',
        points: ['Further advance AIP and application form'] },
      { name: 'Product transfer app form',
        points: ['Product transfer broker authorisation form'] },
      { name: 'Downloads for solicitors',
        points: ['Solicitor instructions', 'Solicitor registration form', 'Certificate of title', 'Consent and undertaking', 'Mortgage deed', 'Mortgage terms and conditions', 'Deed of postponement'] },
      { name: 'Guides',
        points: ['Buy to let mortgage products flyer', 'Broker portal user guide', 'Portfolio submission platform (BTL Hub) user guide'] },
      { name: 'Client reference sheets',
        points: ['Fees and charges'] },
    ] },
    { name: 'Placing business', button: 'Place case', pages: [
      { name: 'Submitting non-portfolio apps',
        points: ['Register', 'Log in to the portal', 'Select your journey', 'Produce an illustration', 'Submit an AIP', 'Submit your full app', 'Completion'] },
      { name: 'Submitting portfolio apps',
        points: ['Register', 'Log in to the portal', 'Select your journey', 'Produce an illustration', 'Submit an AIP', 'Submit your full app', 'Completion'] },
      { name: 'Submitting further advances',
        points: ['Complete form', 'Email', 'Completion'] },
      { name: 'Submitting product transfers',
        points: ['Use the correct online or paper process', 'Submit a product transfer request', 'Confirmation and completion'] },
      { name: 'Request a transfer of equity', title: 'Submitting a transfer of equity',
        points: ['Contact us'] },
      { name: 'Transfer to limited company', title: 'Transfer to a limited company',
        points: ['Ensure eligibility', 'Gather required details and forms', 'Contact our team', 'Completion'] },
    ] },
  ],
  res: [
    { name: 'Products', button: 'View products', pages: [
      { name: 'Residential mortgage products', href: '/krfi-demo/products', groups: [
        { title: 'Prime loans:', points: ['Up to 75% LTV available', 'Minimum loan £50k', 'Maximum loan £1m'] },
        { title: 'Near Prime 1:', points: ['Up to 75% LTV available', 'Minimum property value £75,000', 'Maximum loan £1m'] },
      ] },
      { name: 'Shared ownership mortgages', title: 'Shared ownership mortgages:',
        points: ['Part own/part rent mortgages', 'Up to 90% maximum share value'] },
      { name: 'Residential product transfer',
        points: ['New mortgage products for existing customers', 'Online submission available for some accounts', 'No underwriting assessment required'] },
      { name: 'Residential further advance',
        points: ['For existing customers requiring larger loans', 'Term must not exceed that of the original mortgage', 'Exclusions apply on use of funds'] },
    ] },
    { name: 'Criteria', button: 'View criteria', pages: [
      { name: 'The applicant',
        points: ['Prime criteria', 'Near prime criteria', 'Shared ownership criteria', 'Employed and self-employed criteria', 'Contractors criteria'] },
      { name: 'The income', title: 'The Income',
        points: ['Self-employed income', 'Overtime', 'Commission', 'Limited company income', 'Rental income', 'Secondary incomes'] },
      { name: 'The loan',
        points: ['Loan purpose', 'Minimum and maximum loans', 'Source of deposits', 'Remortgages', 'Further advances', 'Interest only'] },
      { name: 'The property',
        points: ['Flats', 'New builds, newly converted properties and renovations', 'Self-build', 'Shared ownership'] },
      { name: 'Fees and charges', title: 'The fees and charges',
        points: ['Application and product fees', 'Standard valuation fees', 'Mortgage payments (direct debit)'] },
    ] },
    { name: 'Calculator', button: 'View', summary: { title: 'Residential calculator',
      points: ['Calculate your client’s maximum loan', 'For guide purposes only'] } },
    { name: 'Literature', button: 'View', pages: [
      { name: 'Residential app forms',
        points: ['Mortgage application form', 'Additional applicants application form', 'Consents and declarations', 'Direct debit mandate', 'Buy to let property schedule'] },
      { name: 'Further advance app forms',
        points: ['Further advance AIP and application form'] },
      { name: 'Product transfer app forms',
        points: ['Product transfer broker authorisation form'] },
      { name: 'Porting app form',
        points: ['Mortgage porting app form'] },
      { name: 'Downloads for solicitors',
        points: ['Solicitor instructions', 'Solicitor registration form', 'Certificate of title', 'Consent and undertaking', 'Mortgage deed', 'Terms and conditions', 'Deed of postponement'] },
      { name: 'Guides',
        points: ['Residential mortgage product flyers', 'Broker portal user guide', 'Portfolio submission platform (BTL Hub) user guide'] },
      // Not hovered in the recording, so its summary is unknown.
      { name: 'Client reference sheets' },
    ] },
    { name: 'Placing business', button: 'Place case', pages: [
      { name: 'Submitting new apps', title: 'Submitting a new app',
        points: ['Register', 'Log in to the portal', 'Produce an illustration', 'Submit an AIP', 'Submit your full application', 'Completion'] },
      { name: 'Submitting further advances',
        points: ['Complete form', 'Email', 'Completion'] },
      { name: 'Submitting product transfers',
        points: ['Use the correct online or paper process', 'Submit a product transfer request', 'Confirmation and completion'] },
      { name: 'Submitting porting apps',
        points: ['Complete form', 'Email', 'Completion'] },
      { name: 'Request a transfer of equity', title: 'Submitting transfer of equity',
        points: ['Contact us'] },
    ] },
  ],
}

const megaTabs = [...document.querySelectorAll('.main-nav [data-mega]')]
if (header && megaTabs.length) {
  const desktop = window.matchMedia('(min-width: 761px)')
  const mega = document.createElement('div')
  mega.className = 'mega'
  mega.id = 'mega-menu'
  mega.hidden = true
  mega.innerHTML = `
    <ul class="mega-sections" role="list"></ul>
    <ul class="mega-pages" role="list"></ul>
    <div class="mega-summary"></div>`
  header.append(mega)

  const sectionsEl = mega.querySelector('.mega-sections')
  const pagesEl = mega.querySelector('.mega-pages')
  const summaryEl = mega.querySelector('.mega-summary')
  let menu = null
  let section = -1
  let closeTimer = 0

  // Re-run the short fade the live site plays when content changes.
  const fade = (el) => {
    el.classList.remove('mega-fade')
    void el.offsetWidth
    el.classList.add('mega-fade')
  }

  const points = (list) =>
    `<ul class="mega-points" role="list">${list.map((p) => `<li>${icon('check')}${p}</li>`).join('')}</ul>`

  const showSummary = (sec, page) => {
    const s = sec.summary || page
    if (!s) {
      summaryEl.innerHTML = ''
      return
    }
    const groups = s.groups || [{ title: s.title || s.name, points: s.points || [] }]
    summaryEl.innerHTML = groups.map((g) =>
      `<p class="mega-summary-title">${g.title}</p>${g.points.length ? points(g.points) : ''}`).join('') +
      `<a class="mega-button" href="${page?.href || '#'}">${sec.button}</a>`
    fade(summaryEl)
  }

  const showSection = (i) => {
    section = i
    const sec = MEGA[menu][i]
    ;[...sectionsEl.children].forEach((li, n) => li.classList.toggle('is-active', n === i))
    mega.classList.toggle('no-pages', !sec.pages)
    pagesEl.innerHTML = (sec.pages || []).map((p, n) =>
      `<li><a href="${p.href || '#'}" data-page="${n}">${p.name}</a></li>`).join('')
    fade(pagesEl)
    showSummary(sec, null) // a section with pages waits for one to be hovered
  }

  const showPage = (n) => {
    const sec = MEGA[menu][section]
    ;[...pagesEl.querySelectorAll('a')].forEach((a, i) => a.classList.toggle('is-active', i === n))
    showSummary(sec, sec.pages[n])
  }

  const open = (tab) => {
    clearTimeout(closeTimer)
    const key = tab.dataset.mega
    megaTabs.forEach((t) => {
      t.classList.toggle('is-open', t === tab)
      t.setAttribute('aria-expanded', String(t === tab))
    })
    if (menu === key && !mega.hidden) return
    menu = key
    section = -1
    sectionsEl.innerHTML = MEGA[key].map((s, i) =>
      `<li><a href="#" data-section="${i}">${s.name}${icon('chevron')}</a></li>`).join('')
    pagesEl.innerHTML = ''
    summaryEl.innerHTML = ''
    mega.classList.remove('no-pages')
    mega.setAttribute('aria-label', tab.textContent.trim())
    mega.hidden = false
  }

  const close = () => {
    mega.hidden = true
    menu = null
    megaTabs.forEach((t) => {
      t.classList.remove('is-open')
      t.setAttribute('aria-expanded', 'false')
    })
  }

  const closeSoon = () => {
    clearTimeout(closeTimer)
    closeTimer = setTimeout(close, 200)
  }

  megaTabs.forEach((tab) => {
    tab.setAttribute('aria-expanded', 'false')
    tab.setAttribute('aria-controls', mega.id)
    tab.addEventListener('mouseenter', () => desktop.matches && open(tab))
    tab.addEventListener('click', (e) => {
      if (!desktop.matches) return // on a phone the tab is a plain link
      e.preventDefault()
      if (tab.classList.contains('is-open')) close()
      else open(tab)
    })
  })

  // Other links in the bar close it, as "Insights and events" does live.
  document.querySelectorAll('.main-nav a:not([data-mega])').forEach((a) =>
    a.addEventListener('mouseenter', () => desktop.matches && close()))

  sectionsEl.addEventListener('mouseover', (e) => {
    const a = e.target.closest('[data-section]')
    if (a && Number(a.dataset.section) !== section) showSection(Number(a.dataset.section))
  })
  sectionsEl.addEventListener('focusin', (e) => {
    const a = e.target.closest('[data-section]')
    if (a && Number(a.dataset.section) !== section) showSection(Number(a.dataset.section))
  })
  sectionsEl.addEventListener('click', (e) => {
    if (e.target.closest('[data-section]')) e.preventDefault()
  })
  for (const type of ['mouseover', 'focusin']) {
    pagesEl.addEventListener(type, (e) => {
      const a = e.target.closest('[data-page]')
      if (a && !a.classList.contains('is-active')) showPage(Number(a.dataset.page))
    })
  }

  // Leaving the bar and the panel closes it, after a short grace period.
  for (const el of [header, mega]) {
    el.addEventListener('mouseleave', () => !mega.hidden && closeSoon())
    el.addEventListener('mouseenter', () => clearTimeout(closeTimer))
  }
  header.querySelector('.logo')?.addEventListener('mouseenter', () => !mega.hidden && closeSoon())

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || mega.hidden) return
    const tab = megaTabs.find((t) => t.classList.contains('is-open'))
    close()
    tab?.focus()
  })
  document.addEventListener('click', (e) => {
    if (!mega.hidden && !e.target.closest('.mega, .main-nav')) close()
  })
  desktop.addEventListener('change', close)
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
