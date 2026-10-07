(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer:fine)').matches;
  const THEME_KEY='sanjanaPortfolioTheme';

  // Shared chrome: progress, transition, glow, toast, quick navigation, back-to-top.
  document.body.insertAdjacentHTML('afterbegin','<div class="scroll-progress" aria-hidden="true"></div><div class="page-transition" aria-hidden="true"></div><div class="cursor-glow" aria-hidden="true"></div>');
  document.body.insertAdjacentHTML('beforeend',`<div class="toast" role="status" aria-live="polite"></div><button class="icon-btn back-top" aria-label="Back to top">↑</button><button class="quick-launch" aria-label="Open quick navigation"><span>Quick nav</span><kbd>⌘K</kbd></button><dialog class="cmd" id="cmd"><div class="dialog-pad"><input class="cmd-search" id="cmdSearch" placeholder="Jump to a page…" aria-label="Search pages"><div class="cmd-list" id="cmdList">
    <a href="index.html" data-label="home"><span>Home</span><small>Overview</small></a><a href="work.html" data-label="work projects case studies"><span>Work</span><small>Case studies</small></a><a href="process.html" data-label="process research wireframe prototype"><span>Process</span><small>How I design</small></a><a href="design-system.html" data-label="design system components tokens"><span>Design System</span><small>UI patterns</small></a><a href="about.html" data-label="about experience skills"><span>About</span><small>Background</small></a><a href="contact.html" data-label="contact email linkedin github"><span>Contact</span><small>Get in touch</small></a><a href="resume.html" data-label="resume cv experience education"><span>Resume</span><small>Full profile</small></a>
  </div></div></dialog>`);

  // Add profile image to logo and utility controls to the nav.
  const logo=$('.logo');
  if(logo && !$('.logo-avatar',logo)) logo.insertAdjacentHTML('afterbegin','<img class="logo-avatar" src="profile.png" alt="">');
  const navIn=$('.nav-in');
  const burger=$('.burger');
  if(navIn && burger){
    const tools=document.createElement('div'); tools.className='nav-tools';
    tools.innerHTML='<button class="icon-btn" id="themeToggle" aria-label="Toggle light and dark theme">◐</button>';
    navIn.insertBefore(tools,burger);
  }

  const storedTheme=localStorage.getItem(THEME_KEY);
  if(storedTheme) document.documentElement.dataset.theme=storedTheme;
  $('#themeToggle')?.addEventListener('click',()=>{
    const next=document.documentElement.dataset.theme==='light'?'dark':'light';
    document.documentElement.dataset.theme=next; localStorage.setItem(THEME_KEY,next); toast(`${next==='light'?'Light':'Dark'} theme enabled`);
  });

  // Mobile nav.
  const menu=$('#menu');
  burger?.addEventListener('click',()=>{const open=menu?.classList.toggle('open');burger.setAttribute('aria-expanded',String(open));});
  menu?.addEventListener('click',e=>{if(e.target.closest('a')){menu.classList.remove('open');burger?.setAttribute('aria-expanded','false')}});

  // Active page.
  const page=document.body.dataset.page;
  $$('[data-nav]').forEach(a=>{if(a.dataset.nav===page){a.classList.add('on');a.setAttribute('aria-current','page')}});

  // Scroll progress and back-to-top.
  const progress=$('.scroll-progress'), backTop=$('.back-top');
  const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;backTop.classList.toggle('show',scrollY>500)};
  addEventListener('scroll',onScroll,{passive:true});onScroll();backTop.addEventListener('click',()=>scrollTo({top:0,behavior:reduced?'auto':'smooth'}));

  // Cursor spotlight and card hover light.
  if(finePointer&&!reduced){const glow=$('.cursor-glow');addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';glow.style.opacity='1'});$$('.card').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',`${e.clientX-r.left}px`);card.style.setProperty('--my',`${e.clientY-r.top}px`)}));}

  // Reveal on scroll.
  const revealTargets=$$('.card,.page-hero,.project-filters,.resume h2,.resume .entry');
  revealTargets.forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=`${Math.min(i%4,3)*45}ms`});
  if(!reduced&&'IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('is-visible');io.unobserve(en.target)}}),{threshold:.12});revealTargets.forEach(el=>io.observe(el));}else revealTargets.forEach(el=>el.classList.add('is-visible'));

  // Hero/profile parallax.
  const profile=$('.profile-card');
  const stage=$('.profile-stage');
  if(profile&&stage&&finePointer&&!reduced){stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;profile.style.setProperty('--ry',`${x*10}deg`);profile.style.setProperty('--rx',`${-y*8}deg`)});stage.addEventListener('pointerleave',()=>{profile.style.setProperty('--ry','-4deg');profile.style.setProperty('--rx','3deg')});}

  // Motion is reserved for hierarchy and feedback; buttons keep predictable geometry.

  // Page transition for local navigation.
  $$('a[href]').forEach(a=>a.addEventListener('click',e=>{const href=a.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:')||a.target==='_blank'||e.metaKey||e.ctrlKey||e.shiftKey)return;const url=new URL(href,location.href);if(url.origin!==location.origin)return;e.preventDefault();if(reduced){location.href=href;return}document.body.classList.add('is-leaving');setTimeout(()=>location.href=href,260)}));

  // Quick navigation / command palette.
  const cmd=$('#cmd'),cmdSearch=$('#cmdSearch');
  const openCmd=()=>{cmd.showModal();setTimeout(()=>cmdSearch.focus(),20)};
  $('.quick-launch').addEventListener('click',openCmd);
  addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();cmd.open?cmd.close():openCmd()}if(e.key==='Escape'&&cmd.open)cmd.close()});
  cmdSearch.addEventListener('input',()=>{const q=cmdSearch.value.trim().toLowerCase();$$('#cmdList a').forEach(a=>a.hidden=!a.dataset.label.includes(q)&&!a.textContent.toLowerCase().includes(q))});
  cmd.addEventListener('click',e=>{const r=cmd.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)cmd.close()});

  // Work filters.
  $$('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{const f=btn.dataset.filter;$$('.filter-btn').forEach(b=>b.classList.toggle('active',b===btn));$$('.project-card[data-type]').forEach(card=>card.hidden=f!=='all'&&!card.dataset.type.includes(f));}));

  // Case studies.
  const caseDialog=$('#caseDialog'),caseContent=$('#caseContent');
  const cases={
    meditrust:{title:'MediTrust',meta:'AI-powered medical crowdfunding verification',color:'#315f86',challenge:'Make verification understandable without exposing technical complexity.',approach:'Organize extracted patient, hospital, date and cost data into confidence-led review states and clear next actions.',outcome:'A trust-focused review flow that prioritizes clarity, evidence and decision confidence.',tags:['Trust & safety','Document AI','Responsive UI']},
    farm2connect:{title:'Farm2Connect',meta:'Agricultural marketplace experience',color:'#557443',challenge:'Reduce friction between product discovery and purchasing for a broad range of users.',approach:'Simplify hierarchy, product browsing and purchase flow with mobile-first layouts and familiar patterns.',outcome:'A clearer marketplace journey with lower navigation complexity and stronger content scannability.',tags:['Marketplace','User flows','Responsive design']},
    fintrack:{title:'FinTrack',meta:'Personal finance web application',color:'#8a6331',challenge:'Present expenses, goals and analytics without overwhelming users with financial data.',approach:'Use progressive disclosure, reusable patterns and strong visual hierarchy across dashboard and expense flows.',outcome:'A consistent, implementation-ready experience connected to React and Spring Boot.',tags:['Fintech','Design system','Frontend handoff']}
  };
  $$('[data-case]').forEach(btn=>btn.addEventListener('click',()=>{const c=cases[btn.dataset.case];if(!c||!caseDialog)return;caseDialog.style.setProperty('--case',c.color);caseContent.innerHTML=`<div class="case-hero"></div><span class="cat">Case study</span><h2>${c.title}</h2><p class="lead">${c.meta}</p><div class="case-grid"><div class="case-stat"><small>Challenge</small><b>${c.challenge}</b></div><div class="case-stat"><small>Approach</small><b>${c.approach}</b></div><div class="case-stat"><small>Outcome</small><b>${c.outcome}</b></div></div><div class="skills">${c.tags.map(t=>`<li>${t}</li>`).join('')}</div>`;caseDialog.showModal()}));
  $('#closeCase')?.addEventListener('click',()=>caseDialog.close());
  caseDialog?.addEventListener('click',e=>{const r=caseDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)caseDialog.close()});

  // Design system demos.
  $$('.tog').forEach(t=>t.addEventListener('click',()=>{const next=t.getAttribute('aria-checked')!=='true';t.setAttribute('aria-checked',String(next));toast(next?'Component enabled':'Component disabled')}));
  $$('.acc').forEach(a=>a.addEventListener('click',()=>{const open=a.getAttribute('aria-expanded')==='true';a.setAttribute('aria-expanded',String(!open));if(a.nextElementSibling)a.nextElementSibling.hidden=open}));
  $('#radiusRange')?.addEventListener('input',e=>{$('#radiusDemo').style.setProperty('--demo-r',`${e.target.value}px`);$('#radiusValue').textContent=e.target.value+'px'});
  $$('.sw i').forEach(s=>s.addEventListener('click',()=>{const c=getComputedStyle(s).backgroundColor;navigator.clipboard?.writeText(c);toast(`Copied ${c}`)}));


  // Interactive process journey: scroll, click or keyboard all drive the same state.
  const processData=[
    {phase:'Discover',title:'Research',question:'What problem is actually worth solving?',artifact:'Interview notes + competitor audit',decision:'Assumption vs evidence',glyph:'? '},
    {phase:'Frame',title:'User understanding',question:'Whose job are we helping, and where is the friction?',artifact:'Journey + task flow',decision:'Need vs feature request',glyph:'◎'},
    {phase:'Structure',title:'Information architecture',question:'What should users see first, next and only when needed?',artifact:'Sitemap + content model',decision:'Hierarchy + navigation',glyph:'≡'},
    {phase:'Explore',title:'Wireframing',question:'Can the task work before visual polish?',artifact:'Low-fi screens',decision:'Layout + interaction model',glyph:'□'},
    {phase:'Simulate',title:'Prototyping',question:'Does the flow make sense when it can actually be used?',artifact:'Clickable prototype',decision:'Flow + feedback timing',glyph:'▶'},
    {phase:'Express',title:'Visual design',question:'How can the interface communicate hierarchy at a glance?',artifact:'Components + high-fi UI',decision:'Type + spacing + states',glyph:'✦'},
    {phase:'Validate',title:'Usability evaluation',question:'Where do real users hesitate, fail or misunderstand?',artifact:'Task observations',decision:'What to fix first',glyph:'✓'},
    {phase:'Ship',title:'Developer handoff',question:'What must stay true when the design becomes code?',artifact:'Specs + responsive rules',decision:'Implementation fidelity',glyph:'↗'}
  ];
  const processTabs=$$('.process-tab'), processTriggers=$$('.process-trigger'), processVisual=$('#processVisual');
  let activeStage=0;
  const setProcessStage=(idx,{scroll=false}={})=>{
    if(!processData[idx]) return; activeStage=idx; const d=processData[idx];
    processTabs.forEach((b,i)=>{b.classList.toggle('active',i===idx);b.setAttribute('aria-selected',String(i===idx));b.tabIndex=i===idx?0:-1});
    processTriggers.forEach((el,i)=>el.classList.toggle('is-current',i===idx));
    const copy=$('.process-copy'); copy?.classList.add('changing');
    setTimeout(()=>{
      $('#processPhase') && ($('#processPhase').textContent=d.phase); $('#processTitle') && ($('#processTitle').textContent=d.title); $('#processQuestion') && ($('#processQuestion').textContent=d.question); $('#processArtifact') && ($('#processArtifact').textContent=d.artifact); $('#processDecision') && ($('#processDecision').textContent=d.decision); $('#processGlyph') && ($('#processGlyph').textContent=d.glyph); $('#processMeterLabel') && ($('#processMeterLabel').textContent=`${String(idx+1).padStart(2,'0')} / 08`); $('#processMeterFill') && ($('#processMeterFill').style.width=`${(idx+1)/8*100}%`); if(processVisual)processVisual.dataset.stage=idx; copy?.classList.remove('changing');
    },reduced?0:120);
    if(scroll&&processTriggers[idx]) processTriggers[idx].scrollIntoView({behavior:reduced?'auto':'smooth',block:'center'});
  };
  processTabs.forEach((b,i)=>{b.addEventListener('click',()=>setProcessStage(i,{scroll:true}));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const next=(i+(e.key==='ArrowRight'?1:-1)+processTabs.length)%processTabs.length;processTabs[next].focus();setProcessStage(next,{scroll:true})})});
  if(processTriggers.length&&'IntersectionObserver'in window){const pio=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)setProcessStage(+visible.target.dataset.stage)}, {rootMargin:'-38% 0px -38% 0px',threshold:[.15,.35,.6]});processTriggers.forEach(i=>pio.observe(i));}
  if(processTabs.length)setProcessStage(0);

  // FinTrack product playground.
  const expenseData=[{n:'Groceries',c:'Food',a:1250},{n:'Metro pass',c:'Travel',a:600},{n:'Internet',c:'Bills',a:799}];
  const money=n=>'₹'+n.toLocaleString('en-IN');
  const renderFinTrack=()=>{
    if(!$('#app'))return; const total=expenseData.reduce((sum,x)=>sum+x.a,0),max=Math.max(...expenseData.map(x=>x.a),1);
    $('#total').textContent=money(total); $('#expenseCount').textContent=`${expenseData.length} item${expenseData.length===1?'':'s'}`;
    $('#mini').innerHTML=expenseData.slice(-7).map((x,i)=>`<i title="${x.n}: ${money(x.a)}" style="--h:${Math.max(14,x.a/max*100)}%;animation-delay:${i*45}ms"></i>`).join('');
    $('#list').innerHTML=expenseData.map(x=>`<li><span>${x.n}<small>${x.c}</small></span><b>${money(x.a)}</b></li>`).join('');
    const cats=['Food','Travel','Bills'].map(c=>({c,a:expenseData.filter(x=>x.c===c).reduce((s,x)=>s+x.a,0)}));
    $('#cats').innerHTML=cats.map(x=>`<div>${x.c}<b style="float:right">${money(x.a)}</b></div><div class="catbar"><i style="width:${total?x.a/total*100:0}%"></i></div>`).join('');
    const biggest=[...cats].sort((a,b)=>b.a-a.a)[0]; $('#insightText').textContent=`${biggest.c} is your largest category at ${Math.round(biggest.a/total*100)}%.`;
  };
  const goFinTrack=view=>{if(!$('#app'))return;$$('.view',$('#app')).forEach(x=>x.hidden=x.id!==`v-${view}`);$$('.tabs button',$('#app')).forEach(b=>b.setAttribute('aria-selected',String(b.dataset.go===view)))};
  $('#app')?.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)goFinTrack(b.dataset.go)});
  $('#save')?.addEventListener('click',()=>{const amount=+$('#amt').value;if(!(amount>0)){ $('#err').textContent='Enter an amount greater than 0.';$('#amt').setAttribute('aria-invalid','true');$('#amt').focus();return;}$('#err').textContent='';$('#amt').removeAttribute('aria-invalid');expenseData.push({n:'New expense',c:$('#cat').value,a:amount});$('#amt').value='';renderFinTrack();goFinTrack('exp');toast('Expense saved and totals updated')});
  renderFinTrack();

  // Micro-interaction lab demos.
  $('#toastBtn')?.addEventListener('click',()=>toast('Preference saved'));
  const demoModal=$('#demoModal'); $('#modalBtn')?.addEventListener('click',()=>demoModal?.showModal()); $('#mNo')?.addEventListener('click',()=>demoModal?.close()); $('#mYes')?.addEventListener('click',()=>{demoModal?.close();toast('Sample deleted')});
  $('#skBtn')?.addEventListener('click',()=>{const sk=$('#skel');if(!sk)return;sk.classList.remove('done');sk.textContent='';setTimeout(()=>{sk.classList.add('done');sk.textContent='Content ready'},reduced?80:1150)});

  // Work-page data visualization interaction.
  const donutCopy={Food:'Food is the largest category at 47% of tracked spending.',Travel:'Travel represents 23% of tracked spending.',Bills:'Bills represent 30% of tracked spending.'};
  $$('.chart-legend button').forEach(btn=>{const activate=()=>{const cat=btn.dataset.chartCat;$('#donutCaption').textContent=donutCopy[cat];$$('.chart-legend button').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));$('#spendDonut')?.animate?.([{transform:'scale(1)'},{transform:'scale(1.025)'},{transform:'scale(1)'}],{duration:260})};btn.addEventListener('click',activate);btn.addEventListener('mouseenter',activate)});
  $$('.trend-points circle').forEach(point=>{point.setAttribute('tabindex','0');const show=()=>{const tip=$('#trendTip');if(!tip)return;tip.hidden=false;tip.textContent=`${point.dataset.day} · ${point.dataset.value}`;const svg=point.ownerSVGElement.getBoundingClientRect(),wrap=$('#trendChart').getBoundingClientRect();const cx=+point.getAttribute('cx')/640*svg.width,cy=+point.getAttribute('cy')/260*svg.height;tip.style.left=`${cx}px`;tip.style.top=`${cy}px`;$('#trendValue').textContent=point.dataset.value};const hide=()=>{$('#trendTip')&&($('#trendTip').hidden=true)};point.addEventListener('mouseenter',show);point.addEventListener('focus',show);point.addEventListener('mouseleave',hide);point.addEventListener('blur',hide)});

  // Contact validation + copy email.
  $('#copyEmail')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('sanjanashree64@gmail.com');toast('Email copied to clipboard')}catch{toast('Copy unavailable — select the email manually')}});
  const contactForm=$('#contactForm');
  if(contactForm){contactForm.addEventListener('submit',e=>{e.preventDefault();const name=$('#name').value.trim(),email=$('#email').value.trim(),message=$('#message').value.trim();$$('.field-status').forEach(x=>x.textContent='');let ok=true;if(name.length<2){$('#nameStatus').textContent='Please enter your name.';ok=false}if(!/^\S+@\S+\.\S+$/.test(email)){$('#emailStatus').textContent='Enter a valid email address.';ok=false}if(message.length<10){$('#messageStatus').textContent='Add a little more detail (10+ characters).';ok=false}if(!ok)return;const subject=encodeURIComponent(`Portfolio enquiry from ${name}`),body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);toast('Opening your email app…');setTimeout(()=>location.href=`mailto:sanjanashree64@gmail.com?subject=${subject}&body=${body}`,180)});}

  // Inject resume avatar.
  const resumeHead=$('.resume-head');
  if(resumeHead&&!$('.resume-avatar',resumeHead))resumeHead.insertAdjacentHTML('afterbegin','<img class="resume-avatar" src="profile.png" alt="Sanjana Shree profile avatar">');

  $$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

  function toast(message){const t=$('.toast');if(!t)return;t.textContent=message;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),2200)}
})();
