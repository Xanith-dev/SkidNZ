// SKID NZ — Router + Page Renderers

// ── ROUTER ──────────────────────────────────────────
const pages = ['events','venues','series','register'];

function navigate(page) {
  pages.forEach(p => {
    document.getElementById('page-' + p).classList.toggle('hidden', p !== page);
  });
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.toggle('active', a.textContent.trim().toLowerCase() === page);
  });
  window.scrollTo(0, 0);
  if (page === 'events')   renderEvents('all');
  if (page === 'venues')   renderVenues();
  if (page === 'series')   renderSeries();
  if (page === 'register') renderRegister();
}

function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

// ── EVENTS PAGE ──────────────────────────────────────
function renderEvents(filter) {
  const pg = document.getElementById('page-events');
  const filtered = filter === 'all' ? events : events.filter(e =>
    e.type === filter ||
    (filter === 'north' && e.region === 'North Island') ||
    (filter === 'south' && e.region === 'South Island')
  );
  pg.innerHTML = `
    <div class="hero">
      <div class="skid-mark"></div>
      <div class="hero-label">// New Zealand's Drift Calendar</div>
      <h1>BREAK<br><em>LOOSE</em></h1>
      <p class="hero-sub">Pro competition · club days · practice sessions<br>across Aotearoa — all year round.</p>
      <div class="hero-cta">
        <button class="btn btn-r" onclick="navigate('register')">Register for an Event</button>
        <button class="btn btn-o" onclick="navigate('venues')">Browse Venues</button>
      </div>
    </div>
    <div class="filter-bar" id="filters">
      ${['all','comp','club','practice','north','south'].map(f =>
        `<button class="filter-btn ${f===filter?'active':''}" onclick="renderEvents('${f}')">${
          {all:'All Events',comp:'Competition',club:'Club Day',practice:'Practice',north:'North Island',south:'South Island'}[f]
        }</button>`).join('')}
    </div>
    <div class="events">
      ${filtered.length ? filtered.map(e => `
        <div class="card" onclick="openModal(${events.indexOf(e)})">
          <div class="card-date">${e.date}</div>
          ${e.sold ? '<div class="card-reg">SOLD OUT</div>' : ''}
          <div class="card-title">${e.title}</div>
          <div class="card-loc">${e.loc}</div>
          <div class="card-meta">
            ${e.tags.map(t => `<span class="pill ${e.hot?'hot':''}">${t}</span>`).join('')}
            ${e.sold ? '<span class="pill sold">SOLD OUT</span>' : ''}
          </div>
        </div>`).join('') : '<div class="card" style="grid-column:1/-1;text-align:center;padding:60px;color:var(--g)">No events found for this filter.</div>'}
    </div>`;
}

// ── VENUES PAGE ──────────────────────────────────────
const venues = [
  {icon:'🏁',name:'Pukekohe Park Raceway',loc:'Pukekohe, Auckland',region:'North Island',desc:'One of NZ\'s most iconic motorsport venues. Wide sweeping layout ideal for high-speed competition runs. 4km circuit with dedicated drift track.',tags:['COMPETITION','PRACTICE']},
  {icon:'🔶',name:'Hampton Downs Motorsport Park',loc:'Waikato',region:'North Island',desc:'World-class facility with multiple track configurations. FIA Grade 2 main circuit. Regular club drift days on the infield track.',tags:['CLUB DAY','COMPETITION']},
  {icon:'🌊',name:'Manfeild Circuit Chris Amon',loc:'Feilding, Manawatū',region:'North Island',desc:'Named after the legendary Kiwi racer. Fast technical layout with excellent spectator areas. Hosts national-level rounds annually.',tags:['COMPETITION','SERIES']},
  {icon:'⚡',name:'Taupo Motorsport Park',loc:'Taupo',region:'North Island',desc:'Central North Island\'s premier motorsport hub. Multiple venues including the main circuit and skidpan. Year-round events.',tags:['ALL TYPES']},
  {icon:'🌿',name:'Ruapuna Raceway',loc:'Christchurch, Canterbury',region:'South Island',desc:'South Island\'s home of motorsport. Flat open layout rewards technical precision. Large pit facilities and public seating.',tags:['COMPETITION','CLUB DAY']},
  {icon:'🏔',name:'Cromwell Motorsport Park',loc:'Cromwell, Central Otago',region:'South Island',desc:'Stunning backdrop of Central Otago. Grassroots events in a relaxed, community-driven atmosphere. Perfect for beginners.',tags:['CLUB DAY','GRASSROOTS']},
  {icon:'🔥',name:'Meremere Dragway',loc:'Meremere, Waikato',region:'North Island',desc:'Famous NZ drag strip with dedicated drift facility. Night sessions popular. Long straight into a sweeping infield section.',tags:['PRACTICE','NIGHT']},
  {icon:'🌋',name:'Rotorua International Raceway',loc:'Rotorua, Bay of Plenty',region:'North Island',desc:'Compact technical circuit surrounded by geothermal landscape. Great club atmosphere. Regular instructed practice days.',tags:['PRACTICE','CLUB DAY']},
];

function renderVenues() {
  const pg = document.getElementById('page-venues');
  pg.innerHTML = `
    <div class="hero">
      <div class="skid-mark"></div>
      <div class="hero-label">// NZ Drift Venues</div>
      <h1>THE<br><em>TRACKS</em></h1>
      <p class="hero-sub">Eight world-class venues across Aotearoa — from Northland to Southland.</p>
    </div>
    <div class="venues-grid">
      ${venues.map(v => `
        <div class="venue-card">
          <div class="venue-thumb">${v.icon}</div>
          <div class="venue-name">${v.name}</div>
          <div class="venue-loc">⊙ ${v.loc} · ${v.region}</div>
          <div class="venue-desc">${v.desc}</div>
          <div class="venue-tags">${v.tags.map(t=>`<span class="pill">${t}</span>`).join('')}</div>
        </div>`).join('')}
    </div>`;
}

// ── SERIES PAGE ──────────────────────────────────────
const seriesData = [
  {
    name:'NZ Drift Nationals',code:'NZDN',season:'2025',rounds:6,done:2,
    desc:'The premier drift championship in Aotearoa. Six rounds across North and South Island. Pro and Pro-Am classes.',
    standings:[
      {pos:1,driver:'Mike Whiddett',car:'Mazda RX-7',pts:186},
      {pos:2,driver:'Gaz Whiter',car:'Nissan S15',pts:172},
      {pos:3,driver:'Cole Armstrong',car:'Toyota Chaser',pts:165},
      {pos:4,driver:'Darren Kelly',car:'BMW E46',pts:148},
      {pos:5,driver:'Troy Summerfield',car:'Nissan 180SX',pts:121},
    ]
  },
  {
    name:'Winter Drift Series',code:'WDS',season:'2025',rounds:4,done:0,
    desc:'Four-round winter championship held across the central North Island. Points accumulate across all rounds.',
    standings:[
      {pos:1,driver:'TBA — Season Not Started',car:'—',pts:0},
    ]
  },
  {
    name:'South Island Championship',code:'SIC',season:'2025',rounds:5,done:3,
    desc:'Dedicated championship for South Island drivers. Runs from March through September across Canterbury and Otago.',
    standings:[
      {pos:1,driver:'Brad Lauder',car:'Nissan S14',pts:210},
      {pos:2,driver:'Daynom Templeman',car:'Ford Mustang',pts:198},
      {pos:3,driver:'Nico Reid',car:'Toyota AE86',pts:177},
      {pos:4,driver:'James Munro',car:'Subaru WRX',pts:154},
    ]
  },
  {
    name:'Grassroots Club Points',code:'GCP',season:'2025',rounds:8,done:4,
    desc:'Relaxed points series for amateur and novice drivers. No license required. Runs alongside club days all year.',
    standings:[
      {pos:1,driver:'Jake Patterson',car:'Nissan 200SX',pts:98},
      {pos:2,driver:'Sam Williams',car:'Honda Civic',pts:87},
      {pos:3,driver:'Liam Tūhoe',car:'Toyota Levin',pts:82},
    ]
  },
];

function renderSeries() {
  const pg = document.getElementById('page-series');
  pg.innerHTML = `
    <div class="hero">
      <div class="skid-mark"></div>
      <div class="hero-label">// Championship Series</div>
      <h1>THE<br><em>CHASE</em></h1>
      <p class="hero-sub">Four active championships across Aotearoa. Points, standings, and season progress.</p>
    </div>
    ${seriesData.map(s => `
      <div class="section-title">// ${s.code} · ${s.season}</div>
      <div class="section-head">${s.name}</div>
      <div class="section-sub">${s.desc}</div>
      <div class="series-list">
        <div class="series-row" style="cursor:default">
          <div>
            <div class="series-name">${s.name}</div>
            <div class="series-meta">Season ${s.season} · ${s.done} of ${s.rounds} rounds complete</div>
            <div class="series-bar"><div class="series-bar-fill" style="width:${Math.round(s.done/s.rounds*100)}%"></div></div>
          </div>
          <div class="series-rounds">
            <div class="series-count">${s.rounds}</div>
            <div class="series-label">ROUNDS</div>
          </div>
        </div>
      </div>
      <table class="standings-table">
        <thead><tr><th>#</th><th>Driver</th><th>Car</th><th>Points</th></tr></thead>
        <tbody>${s.standings.map(r=>`
          <tr>
            <td class="${r.pos===1?'pos-1':r.pos===2?'pos-2':r.pos===3?'pos-3':''}">${r.pos===1?'🥇':r.pos===2?'🥈':r.pos===3?'🥉':r.pos}</td>
            <td>${r.driver}</td>
            <td style="color:var(--g)">${r.car}</td>
            <td style="color:var(--r);font-family:'Bebas Neue';font-size:16px;letter-spacing:2px">${r.pts}</td>
          </tr>`).join('')}
        </tbody>
      </table>`).join('')}`;
}

// ── REGISTER PAGE ────────────────────────────────────
function renderRegister() {
  const pg = document.getElementById('page-register');
  const eventOptions = events.map(e=>
    `<option value="${e.title}" ${e.sold?'disabled':''}>
      ${e.title} — ${e.date}${e.sold?' (SOLD OUT)':''}
    </option>`).join('');
  pg.innerHTML = `
    <div class="hero">
      <div class="skid-mark"></div>
      <div class="hero-label">// Driver Registration</div>
      <h1>SIGN<br><em>UP</em></h1>
      <p class="hero-sub">Register for upcoming NZ drift events. Fill in the form below and we'll confirm your spot.</p>
    </div>
    <div class="register-wrap">
      <div id="reg-form-wrap">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" id="f-name" placeholder="Your full name">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="f-email" placeholder="you@email.com">
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" id="f-phone" placeholder="+64 21 000 0000">
          </div>
        </div>
        <div class="form-group">
          <label>Select Event</label>
          <select id="f-event">
            <option value="">— Choose an event —</option>
            ${eventOptions}
          </select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Vehicle Make & Model</label>
            <input type="text" id="f-car" placeholder="e.g. Nissan S15 Silvia">
          </div>
          <div class="form-group">
            <label>Experience Level</label>
            <select id="f-level">
              <option value="">— Select level —</option>
              <option>Novice (First time)</option>
              <option>Club (1–3 years)</option>
              <option>Amateur (Competition ready)</option>
              <option>Pro / Semi-Pro</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Additional Notes</label>
          <textarea id="f-notes" placeholder="Any special requirements, questions, or info we should know..."></textarea>
        </div>
        <div class="form-group">
          <label>Acknowledgements</label>
          <label class="form-check"><input type="checkbox" id="ack-1"><span>I understand this is a motorsport event and I participate at my own risk.</span></label>
          <label class="form-check"><input type="checkbox" id="ack-2"><span>My vehicle complies with the event's noise and safety requirements.</span></label>
          <label class="form-check"><input type="checkbox" id="ack-3"><span>I agree to the SKID NZ terms and conditions and privacy policy.</span></label>
        </div>
        <button class="btn btn-r" style="width:100%;justify-content:center;padding:16px" onclick="submitForm()">
          Submit Registration →
        </button>
      </div>
      <div class="form-success" id="reg-success">
        <h3>🏁 You're Registered!</h3>
        <p>Thanks — we've received your entry.<br>
        A confirmation will be sent to your email within 24 hours.<br>
        See you on track.</p>
        <button class="btn btn-o" style="margin-top:20px" onclick="navigate('events')">← Back to Events</button>
      </div>
    </div>`;
}

function submitForm() {
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const event = document.getElementById('f-event').value;
  const car = document.getElementById('f-car').value.trim();
  const level = document.getElementById('f-level').value;
  const ack1 = document.getElementById('ack-1').checked;
  const ack2 = document.getElementById('ack-2').checked;
  const ack3 = document.getElementById('ack-3').checked;

  if (!name||!email||!event||!car||!level) return showToast('FILL IN ALL REQUIRED FIELDS');
  if (!ack1||!ack2||!ack3) return showToast('PLEASE ACCEPT ALL ACKNOWLEDGEMENTS');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showToast('ENTER A VALID EMAIL');

  document.getElementById('reg-form-wrap').style.display = 'none';
  document.getElementById('reg-success').classList.add('show');
  window.scrollTo(0,0);
}

// ── EVENT MODAL ──────────────────────────────────────
function openModal(i) {
  const e = events[i];
  document.getElementById('m-title').textContent = e.title;
  document.getElementById('m-date').textContent = '// ' + e.date;
  document.getElementById('m-body').textContent = e.desc;
  document.getElementById('m-venue').textContent = e.loc;
  document.getElementById('m-region').textContent = e.region;
  document.getElementById('m-cat').textContent = e.tags[0];
  document.getElementById('m-entry').textContent = e.entry;
  const link = document.getElementById('m-link');
  if (e.sold) {
    link.textContent = 'Sold Out'; link.style.opacity = '.4'; link.style.pointerEvents = 'none';
  } else {
    link.textContent = 'Register Now →'; link.style.opacity = '1'; link.style.pointerEvents = 'auto';
    link.onclick = (ev) => { ev.preventDefault(); closeModal(); navigate('register'); setTimeout(()=>{ const sel = document.getElementById('f-event'); if(sel) sel.value=e.title; },50); };
  }
  document.getElementById('modal-bg').classList.add('open');
}
function closeModal() { document.getElementById('modal-bg').classList.remove('open'); }
document.getElementById('close-modal').onclick = closeModal;
document.getElementById('modal-bg').onclick = e => { if(e.target.id==='modal-bg') closeModal(); };
document.addEventListener('keydown', e => { if(e.key==='Escape') closeModal(); });

// ── TOAST ────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── INIT ─────────────────────────────────────────────
// Init moved to fetchEvents() below — see bottom of file

// ── OVERRIDE submitForm to use the API ───────────────
async function submitForm() {
  const name  = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const eventTitle = document.getElementById('f-event').value;
  const car   = document.getElementById('f-car').value.trim();
  const level = document.getElementById('f-level').value;
  const notes = document.getElementById('f-notes').value.trim();
  const ack1  = document.getElementById('ack-1').checked;
  const ack2  = document.getElementById('ack-2').checked;
  const ack3  = document.getElementById('ack-3').checked;

  if (!name||!email||!phone||!eventTitle||!car||!level) return showToast('FILL IN ALL REQUIRED FIELDS');
  if (!ack1||!ack2||!ack3) return showToast('PLEASE ACCEPT ALL ACKNOWLEDGEMENTS');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showToast('ENTER A VALID EMAIL');

  // Find the event object by title to get its ID
  const selectedEvent = events.find(e => e.title === eventTitle);
  if (!selectedEvent) return showToast('INVALID EVENT SELECTED');

  const btn = document.querySelector('#page-register .btn-r');
  btn.textContent = 'Processing...';
  btn.disabled = true;

  try {
    // 1. Submit registration
    const regRes = await fetch(`${API_URL}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, email, phone,
        event_id: selectedEvent.id,
        car, level, notes,
        ack_risk: ack1,
        ack_noise: ack2,
        ack_terms: ack3,
      }),
    });

    if (!regRes.ok) {
      const err = await regRes.json();
      throw new Error(err.detail || 'Registration failed');
    }
    const reg = await regRes.json();

    // 2. Create Stripe checkout session
    const checkoutRes = await fetch(`${API_URL}/payments/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_id: selectedEvent.id, registration_id: reg.id }),
    });

    if (!checkoutRes.ok) throw new Error('Could not create payment session');
    const { checkout_url } = await checkoutRes.json();

    // 3. Redirect to Stripe
    window.location.href = checkout_url;

  } catch (err) {
    showToast(err.message.toUpperCase());
    btn.textContent = 'Submit Registration →';
    btn.disabled = false;
  }
}

// ── Handle payment return from Stripe ────────────────
(function handlePaymentReturn() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('payment') === 'success') {
    navigate('register');
    setTimeout(() => {
      document.getElementById('reg-form-wrap').style.display = 'none';
      document.getElementById('reg-success').classList.add('show');
    }, 100);
    // Clean URL
    window.history.replaceState({}, '', window.location.pathname);
  } else if (params.get('payment') === 'cancelled') {
    showToast('PAYMENT CANCELLED — YOUR SPOT IS NOT CONFIRMED');
    window.history.replaceState({}, '', window.location.pathname);
  }
})();