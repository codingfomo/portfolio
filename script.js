/* ==========================================================================
   MARYADA — ISSUE 01 | Interactive JavaScript
   Features: Cover Transition, Story Reader, Draggable Before/After, Voice Switcher
   ========================================================================== */

// --- Article Data for Story Reader Modal ---
const STORIES_DATA = {
  1: {
    category: "ESSAY",
    readTime: "7 MIN READ",
    title: "WHY WE DON'T REALLY HAVE AN ATTENTION SPAN PROBLEM",
    subtitle: "The internet didn't kill our attention span. It raised our standards for earning it.",
    content: `
      <p class="dropcap">Everyone keeps repeating the same lazy headline: human attention spans have dropped below that of a goldfish. Eight seconds. That’s the famous stat thrown around marketing meetings and LinkedIn posts.</p>
      <p>Except it’s fundamentally untrue.</p>
      <p>We don't have a problem spending three hours straight watching a documentary on Netflix. We don't have a problem reading a 4,000-word Reddit thread dissecting a niche internet mystery. We don't have a problem watching someone explain how they restored a 1972 toaster for forty-five minutes on YouTube.</p>
      <div class="pull-quote">“We don't have a shorter attention span. We've simply become ruthless at recognizing when something isn't worth our time.”</div>
      <p>When someone swipes away from your video after two seconds, or clicks off your article after the first paragraph, it’s rarely because their brain gave up. It’s because your opening sentence sounded like work instead of curiosity.</p>
      <p>The internet didn't destroy our capacity to concentrate. It raised our standards for what earns it. If you want people to read what you write, stop trying to trick them into staying. Give them something worth knowing.</p>
    `
  },
  2: {
    category: "BRAND STRATEGY",
    readTime: "5 MIN READ",
    title: "WHY SOME BRANDS FEEL LIKE PEOPLE",
    subtitle: "The brands we remember aren't shouting loudest — they sound like someone you know.",
    content: `
      <p class="dropcap">You probably know brands you would never buy from, but somehow still like. You feel a strange sense of warmth toward them. That’s interesting, because brands don't technically have personalities.</p>
      <p>They don't wake up grumpy on Monday morning. They don't have a favorite song. They don't accidentally text the wrong group chat. And yet, when we talk about them, we use the exact same adjectives we use for human beings: <em>“They're playful,” “They're pretentious,” “They're reliable.”</em></p>
      <div class="pull-quote">“A brand voice isn't a list of tone guidelines. It's a set of choices about what you're brave enough to say out loud.”</div>
      <p>Corporate language is safe, neutral, and entirely forgettable. The brands that stand out are the ones that accept a simple truth: to sound like someone, you have to risk not sounding like everyone else.</p>
    `
  },
  3: {
    category: "CULTURE",
    readTime: "4 MIN READ",
    title: "THE STRANGE COMFORT OF BEING BAD AT SOMETHING",
    subtitle: "In a world obsessed with side-hustles, maybe curiosity without expectation is the ultimate luxury.",
    content: `
      <p class="dropcap">We are surrounded by people who are already good at everything. Turn on social media and someone is effortlessly playing classical piano, someone else is running a sub-three-hour marathon, and a 22-year-old is explaining how they raised $2M for their startup.</p>
      <p>Meanwhile, you're sitting on your couch watching a tutorial on how to fold a fitted sheet for the fourth time.</p>
      <p>Somewhere along the line, we decided that every hobby had to become a skill, and every skill had to become a business. But there is profound relief in being bad at something. It gives you permission to be curious without needing to be impressive.</p>
      <div class="pull-quote">“Writing isn't about proving how smart you are. It's about giving yourself permission to figure things out on the page.”</div>
    `
  },
  4: {
    category: "LONG READ",
    readTime: "8 MIN READ",
    title: "WHY BORING CONTENT ISN'T REALLY BORING",
    subtitle: "There are very few boring subjects — only boring ways to talk about them.",
    content: `
      <p class="dropcap">Take accounting. Or B2B cloud infrastructure. Or health insurance. Most writers approach these topics with a heavy sigh, assuming that corporate subjects are condemned to corporate prose.</p>
      <p>You could write: <em>“Our cloud solution offers robust scalable architecture for enterprise data management.”</em> (Technically correct. Emotionally devastating.)</p>
      <p>Or you could write: <em>“Your business made money this month. Great. Now let's figure out where it went.”</em></p>
      <div class="pull-quote">“A tax article isn't really about tax. It's about the person who is terrified of making a mistake.”</div>
      <p>The writer's job isn't to invent artificial hype. It's to find where the human story was hiding all along.</p>
    `
  }
};

// --- Page & Scroll Navigation ---
function enterMagazine() {
  document.getElementById('editors-note').scrollIntoView({ behavior: 'smooth' });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Update Page Indicator on Scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section, header');
  const scrollPos = window.scrollY + 200;
  
  sections.forEach((sec, idx) => {
    if (scrollPos >= sec.offsetTop && scrollPos < (sec.offsetTop + sec.offsetHeight)) {
      const pageNum = String(idx + 1).padStart(2, '0');
      document.getElementById('page-indicator').textContent = `ISSUE 01 // PG. ${pageNum} OF 16`;
    }
  });
});

// --- Index Modal Controls ---
function toggleIndexModal() {
  const modal = document.getElementById('indexModal');
  modal.classList.toggle('open');
}

function closeIndexModalOnBackdrop(e) {
  if (e.target.id === 'indexModal') toggleIndexModal();
}

// --- Story Reader Modal Controls ---
function openStoryModal(id) {
  const story = STORIES_DATA[id];
  if (!story) return;

  document.getElementById('modalCategoryTag').textContent = story.category;
  document.getElementById('modalReadTime').textContent = story.readTime;
  
  document.getElementById('modalStoryBody').innerHTML = `
    <h2 class="font-serif-header" style="font-size:2.2rem; line-height:1.15; margin-bottom:0.75rem;">${story.title}</h2>
    <p class="font-serif-body" style="font-style:italic; color:var(--color-ink-muted); font-size:1.2rem; margin-bottom:2rem; border-bottom:var(--border-editorial); padding-bottom:1.5rem;">
      ${story.subtitle}
    </p>
    ${story.content}
  `;

  document.getElementById('readerModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeStoryModal() {
  document.getElementById('readerModal').classList.remove('open');
  document.body.style.overflow = 'auto';
}

function closeReaderModalOnBackdrop(e) {
  if (e.target.id === 'readerModal') closeStoryModal();
}

// --- Voice Switcher (Content Lab) ---
const VOICE_MAP = {
  luxury: "“For thoughts worth keeping. Handcrafted in 100gsm archival paper.”",
  genz: "“Your Notes app could never. Literally obsessed with this layout.”",
  newspaper: "“The humble paper notebook continues its quiet survival in the digital age.”",
  chaotic: "“Write it down right now before you forget it again at 3 AM.”",
  poet: "“A quiet, empty place for loud and restless thoughts.”"
};

function switchVoice(voiceKey, btn) {
  const buttons = document.querySelectorAll('.btn-voice');
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const outputBox = document.getElementById('voiceOutput');
  outputBox.style.opacity = 0;
  setTimeout(() => {
    outputBox.textContent = VOICE_MAP[voiceKey];
    outputBox.style.opacity = 1;
  }, 150);
}

// --- Draggable Before / After Slider ---
const slider = document.getElementById('beforeAfterSlider');
const sliderAfter = document.getElementById('sliderAfter');
const sliderHandle = document.getElementById('sliderHandle');

if (slider && sliderAfter && sliderHandle) {
  let isDragging = false;

  const setSliderPosition = (x) => {
    const rect = slider.getBoundingClientRect();
    let offsetX = x - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    sliderAfter.style.width = `${percentage}%`;
    sliderHandle.style.left = `${percentage}%`;
  };

  sliderHandle.addEventListener('mousedown', () => isDragging = true);
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  // Touch support for mobile devices
  sliderHandle.addEventListener('touchstart', () => isDragging = true);
  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.touches[0].clientX);
  });
}

// --- Contact Modal Controls ---
function openContactModal() {
  document.getElementById('contactModal').classList.add('open');
}

function closeContactModal() {
  document.getElementById('contactModal').classList.remove('open');
}

function closeContactModalOnBackdrop(e) {
  if (e.target.id === 'contactModal') closeContactModal();
}

function handleFormSubmit(e) {
  e.preventDefault();
  alert("Thank you! Your message has been sent to Maryada. She'll get back to you shortly.");
  closeContactModal();
}
