// ZLT CRM Demo - Navigation & Interactivity

// ===== NAVIGATION =====
function navigate(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target page
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');
  // Update tab active state
  document.querySelectorAll('.topnav-tabs .tab').forEach(t => {
    t.classList.toggle('active', t.dataset.page === page);
  });
}

// ===== OPPORTUNITY DETAIL =====
function showOpportunityDetail(id) {
  navigate('opportunity-detail');
  // Update active tab to Opportunities
  document.querySelectorAll('.topnav-tabs .tab').forEach(t => {
    t.classList.toggle('active', t.dataset.page === 'opportunities');
  });
}

function toggleOppEdit(editing) {
  document.getElementById('opp-edit-btn').style.display = editing ? 'none' : '';
  document.getElementById('opp-cancel-btn').style.display = editing ? '' : 'none';
  document.getElementById('opp-save-btn').style.display = editing ? '' : 'none';
  // Toggle editable fields
  const headerCard = document.querySelector('.opp-header-card');
  if (headerCard) headerCard.classList.toggle('editing', editing);
}

function switchOppTab(tab) {
  document.querySelectorAll('.opp-body .opp-left .opp-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  document.querySelectorAll('.opp-body .opp-left .opp-tab-content').forEach(c => {
    c.classList.toggle('active', c.id === 'tab-' + tab);
  });
}

// ===== ACCOUNT DETAIL =====
const accountsData = {
  'ace-hardware': { name: 'Ace Hardware', type: 'Customer', value: '$1.5M', owner: 'Marcus Reynolds', opps: [
    { name: 'Kitchen Remodel — Store #1842', bids: 2, date: 'Mar 5', amount: '$390,000', stage: 'Qualifying', created: '2 days ago' },
    { name: 'HVAC Replacement — NE Region', bids: 0, date: 'Mar 8', amount: '$100,000', stage: 'Qualifying', created: '5 days ago' }
  ]},
  'target': { name: 'Target', type: 'Prospect', value: '$0', owner: 'Sarah Kim', opps: [
    { name: 'Storefront Refresh — Store #1842', bids: 3, date: 'Mar 5', amount: '$208,000', stage: 'Needs Analysis', overdue: '2 days' }
  ]},
  'menards': { name: 'Menards', type: 'Customer', value: '$150,000', owner: 'Marcus Reynolds', opps: [
    { name: 'Bathroom Package — 15 Stores', bids: 3, date: 'Mar 5', amount: '$627,000', stage: 'Needs Analysis', noActivity: '6 months' }
  ]},
  'artguild': { name: 'ArtGuild', type: 'Customer', value: '$3.2M', owner: 'Sarah Kim', opps: [] },
  'hom-furniture': { name: 'HOM Furniture', type: 'Prospect', value: '$0', owner: 'Marcus Reynolds', opps: [] },
  'vanguard': { name: 'Vanguard', type: 'Customer', value: '$500,000', owner: 'Marcus Reynolds', opps: [] },
  'array-macys': { name: "Array Macy's Beauty", type: 'Customer', value: '$500,000', owner: 'Marcus Reynolds', opps: [] }
};

function showAccountDetail(id) {
  const acct = accountsData[id];
  if (!acct) return;
  navigate('account-detail');
  document.querySelectorAll('.topnav-tabs .tab').forEach(t => {
    t.classList.toggle('active', t.dataset.page === 'accounts');
  });
  document.getElementById('account-name').textContent = acct.name;
  document.getElementById('account-type').textContent = acct.type;
  document.getElementById('account-type').className = 'account-type-badge ' + (acct.type === 'Customer' ? 'customer' : 'prospect');
  document.getElementById('account-pipeline-val').textContent = acct.value;
  document.getElementById('account-owner').textContent = acct.owner;

  const oppsContainer = document.getElementById('account-opps');
  if (acct.opps.length === 0) {
    oppsContainer.innerHTML = '<div class="empty-state">No active opportunities for this account.</div>';
  } else {
    oppsContainer.innerHTML = acct.opps.map(opp => `
      <div class="opp-mini-card card" onclick="showOpportunityDetail('${id}')">
        <div class="opp-mini-header">
          <span class="opp-mini-tag">${acct.name}</span>
          ${opp.bids ? `<span class="opp-mini-meta">&#128101; ${opp.bids} bids</span>` : ''}
          <span class="opp-mini-meta">&#128197; ${opp.date}</span>
        </div>
        <div class="opp-mini-title">${opp.name}</div>
        <div class="opp-mini-amount">${opp.amount}</div>
        ${opp.overdue ? `<div class="opp-mini-warning">&#9888; Overdue by ${opp.overdue}</div>` : ''}
        ${opp.noActivity ? `<div class="opp-mini-muted">No activity for ${opp.noActivity}</div>` : ''}
        ${opp.created ? `<div class="opp-mini-muted">Created ${opp.created}</div>` : ''}
        <div class="opp-mini-stage">${opp.stage}</div>
      </div>
    `).join('');
  }
  // Reset to first tab
  switchAccountTab('acc-opportunities');
}

function switchAccountTab(tab) {
  document.querySelectorAll('#page-account-detail .opp-tab').forEach(t => {
    const tabName = 'acc-' + t.textContent.toLowerCase().trim();
    t.classList.toggle('active', tabName === tab);
  });
  document.querySelectorAll('#page-account-detail .opp-tab-content').forEach(c => {
    c.classList.toggle('active', c.id === 'tab-' + tab);
  });
}

// ===== CONTACT DETAIL =====
const contactsData = {
  'bob-menard': { name: 'Bob Menard', initials: 'BM', role: 'Purchasing Director', company: 'Menards', location: 'Phoenix, AZ', email: 'bob.menard@menards.com', phone: '(602) 555-0188', preferred: 'Email' },
  'carol-brand': { name: 'Carol Brand', initials: 'CB', role: 'Sales Director', company: 'Ace Hardware', location: 'New York City, NY', email: 'carol.brand@acehardware.com', phone: '(212) 555-0142', preferred: 'Call' },
  'john-doe': { name: 'John Doe', initials: 'JD', role: 'Head of Marketing', company: 'Target', location: 'Sunnyvale, CA', email: 'john.doe@target.com', phone: '(456) 555-0101', preferred: 'Email' },
  'emma-v': { name: 'Emma V', initials: 'EV', role: 'Regional Manager', company: "Lowe's", location: 'Chicago, IL', email: 'emma.v@lowes.com', phone: '(312) 555-0199', preferred: '--' },
  'kevin-marsh': { name: 'Kevin Marsh', initials: 'KM', role: 'Head of Marketing', company: "Lowe's", location: 'Chicago, IL', email: 'kevin.marsh@lowes.com', phone: '(312) 555-0177', preferred: 'Email' },
  'lisa-park': { name: 'Lisa Park', initials: 'LP', role: 'Merchandise Director', company: "Lowe's", location: 'Chicago, IL', email: 'lisa.park@lowes.com', phone: '(312) 555-0155', preferred: 'Email' },
  'tom-chen': { name: 'Tom Chen', initials: 'TC', role: 'Recruiter', company: 'Target', location: 'Salt Lake City, UT', email: 'tom.chen@target.com', phone: '(801) 555-0133', preferred: 'Email' }
};

function showContactDetail(id) {
  const contact = contactsData[id];
  if (!contact) return;
  navigate('contact-detail');
  document.querySelectorAll('.topnav-tabs .tab').forEach(t => {
    t.classList.toggle('active', t.dataset.page === 'contacts');
  });
  document.getElementById('contact-avatar').textContent = contact.initials;
  document.getElementById('contact-name').textContent = contact.name;
  document.getElementById('contact-location').textContent = contact.location;
  document.getElementById('contact-role').innerHTML = `<em>${contact.role}</em> at <a href="#">${contact.company}</a>`;
  document.getElementById('contact-email').textContent = contact.email;
  document.getElementById('contact-phone').textContent = contact.phone;
}

// ===== KANBAN BOARD =====
const kanbanData = {
  'Qualifying': { count: 2, total: '$490,000', cards: [
    { company: "Lowe's", companyColor: '#2D4A3E', bids: 2, date: 'Mar 5', title: 'Kitchen Remodel— Store #1842', amount: '$390,000', sub: 'Created 2 days ago' },
    { company: 'Home Depot', companyColor: '#F59E0B', bids: 0, date: 'Mar 8', title: 'HVAC Replacement — Northeast Region', amount: '$100,000', sub: 'Created 5 days ago' }
  ]},
  'Needs Analysis': { count: 3, total: '$1,019,000', cards: [
    { company: "Lowe's", companyColor: '#2D4A3E', bids: 2, date: 'Mar 5', title: 'Kitchen Remodel— Store #1842', amount: '$390,000', sub: 'Created 2 days ago' },
    { company: "Lowe's", companyColor: '#2D4A3E', bids: 3, date: 'Mar 5', title: 'Bathroom Package — 15 Stores', amount: '$627,000', sub: 'No activity for 6 months' },
    { company: 'Target', companyColor: '#EF4444', bids: 3, date: 'Mar 5', title: 'Storefront Refresh — Store #1842', amount: '$208,000', overdue: '2 days', sub: 'No activity for 3 months' }
  ]},
  'Estimate Prep': { count: 4, total: '$1,560,000', cards: [
    { company: "Lowe's", companyColor: '#2D4A3E', bids: 3, date: 'Mar 5', title: "Lowe's Rural Kitchens — Store #1842", amount: '$390,000', overdue: '2 days', sub: 'No activity for 3 months' },
    { company: "Lowe's", companyColor: '#2D4A3E', bids: 3, date: 'Mar 5', title: "Lowe's Rural Kitchens — Store #1842", amount: '$390,000', overdue: '2 days', sub: 'No activity for 3 months' },
    { company: "Lowe's", companyColor: '#2D4A3E', bids: 3, date: 'Mar 5', title: "Lowe's Rural Kitchens — Store #1842", amount: '$390,000', overdue: '2 days', sub: 'No activity for 3 months' }
  ]},
  'Estimate Submitted': { count: 4, total: '$1,560,000', cards: [
    { company: "Lowe's", companyColor: '#2D4A3E', bids: 3, date: 'Mar 5', title: "Lowe's Rural Kitchens — Store #1842", amount: '$390,000', overdue: '2 days', sub: 'No activity for 3 months' },
    { company: "Lowe's", companyColor: '#2D4A3E', bids: 3, date: 'Mar 5', title: "Lowe's Rural Kitchens — Store #1842", amount: '$390,000', sub: 'No activity for 3 months' },
    { company: "Lowe's", companyColor: '#2D4A3E', bids: 3, date: 'Mar 5', title: "Lowe's Rural Kitchens — Store #1842", amount: '$390,000', overdue: '2 days' }
  ]},
  'Negotiation': { count: 2, total: '$780,000', cards: [
    { company: "Lowe's", companyColor: '#2D4A3E', bids: 3, date: 'Mar 5', title: "Lowe's Rural Kitchens — Store #1842", amount: '$390,000', overdue: '2 days', sub: 'No activity for 3 months' },
    { company: "Lowe's", companyColor: '#2D4A3E', bids: 3, date: 'Mar 5', title: "Lowe's Rural Kitchens — Store #1842", amount: '$390,000', overdue: '2 days', sub: 'Submitted estimate' }
  ]}
};

function renderKanban() {
  const board = document.getElementById('kanban-board');
  board.innerHTML = Object.entries(kanbanData).map(([stage, data]) => `
    <div class="kanban-column">
      <div class="kanban-column-header">
        <div class="kanban-column-title">${stage} <span class="kanban-count">${data.count}</span></div>
        <button class="kanban-add">+</button>
      </div>
      <div class="kanban-column-total">${data.total}</div>
      <div class="kanban-ai-insight">
        <svg width="14" height="14" fill="none" stroke="#888" stroke-width="1.5"><path d="M3 11L7 3l4 8"/></svg>
        Early inquiries require more key details
      </div>
      <div class="kanban-cards">
        ${data.cards.map(card => `
          <div class="kanban-card" onclick="showOpportunityDetail('card')">
            <div class="kanban-card-header">
              <span class="kanban-tag" style="background:${card.companyColor};color:#fff">${card.company}</span>
              ${card.bids ? `<span class="kanban-meta">&#128101; ${card.bids} bids</span>` : ''}
              <span class="kanban-meta">&#128197; ${card.date}</span>
            </div>
            <div class="kanban-card-title">${card.title}</div>
            <div class="kanban-card-amount">${card.amount}</div>
            ${card.overdue ? `<div class="kanban-card-overdue">&#9888; Overdue by ${card.overdue}</div>` : ''}
            ${card.sub ? `<div class="kanban-card-sub">${card.sub}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderKanban();
});
