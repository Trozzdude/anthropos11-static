async function loadCouncil() {
  const res = await fetch('/static/data/titans.json');
  const data = await res.json();

  renderSummary(data);
  renderMosaic(data.titans);
  renderShadow(data.shadow_titan);
}

function renderMosaic(titans) {
  const container = document.getElementById('intelligence-mosaic');
  titans.forEach(titan => {
    const card = document.createElement('article');
    card.className = 'titan-card';
    card.innerHTML = `
      <header class="titan-header">
        <div class="titan-sigil titan-sigil-${titan.id}"></div>
        <div>
          <h2>${titan.name}</h2>
          <p class="titan-domain">${titan.domain}</p>
        </div>
      </header>
      <p class="latest-signal">${titan.latest_signal}</p>
      <div class="indices">
        <div>
          <span>Risk ${titan.risk_index.toFixed(1)} / 10</span>
          <div class="index-bar">
            <div class="index-bar-fill risk" style="width:${titan.risk_index * 10}%"></div>
          </div>
        </div>
        <div>
          <span>Acceleration ${titan.acceleration_index.toFixed(1)} / 10</span>
          <div class="index-bar">
            <div class="index-bar-fill accel" style="width:${titan.acceleration_index * 10}%"></div>
          </div>
        </div>
      </div>
      <p class="r2-commentary">R2: “${titan.r2_commentary}”</p>
      <p class="sources-footnote">Sources: ${titan.sources.join(', ')}.</p>
    `;
    container.appendChild(card);
  });
}

function renderShadow(shadow) {
  const panel = document.getElementById('shadow-titan-panel');
  panel.className = 'shadow-card';
  panel.innerHTML = `
    <h2>${shadow.name}</h2>
    <p>${shadow.description}</p>
    <div class="indices">
      <div>
        <span>Rogue Agents ${shadow.rogue_agents_index} / 10</span>
      </div>
      <div>
        <span>Attribution ${shadow.attribution_index} / 10</span>
      </div>
    </div>
    <p class="r2-commentary">R2: “${shadow.r2_commentary}”</p>
  `;
}

loadCouncil();
