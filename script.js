/**
 * DALE CHILDCARE HUB - JAVASCRIPT ENGINE
 * Nurturing • Learning • Growing Together | Sneinton Dale, Nottingham
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCounters();
  initProgramFilters();
  initStudentHubTabs();
  initQuizStation();
  initTuitionEstimator();
  initTestimonialSlider();
  initScrollEffects();
});

/* ==========================================================================
   1. NAVIGATION & SCROLL EFFECTS
   ========================================================================== */
function initNavigation() {
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Scroll Spy for active nav link
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navItem && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        navItem.classList.add('active');
      }
    });
  });
}

function initScrollEffects() {
  const header = document.getElementById('mainHeader');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   2. HERO LIVE COUNTER ANIMATION
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const duration = 1800; // ms
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target % 1 === 0 ? target : target.toFixed(1);
              clearInterval(timer);
            } else {
              counter.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsCard = document.querySelector('.metrics-card');
  if (metricsCard) observer.observe(metricsCard);
}

/* ==========================================================================
   3. PROGRAMS FILTER BAR
   ========================================================================== */
function initProgramFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const programCards = document.querySelectorAll('.program-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      programCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. STUDENT HUB TABS
   ========================================================================== */
function initStudentHubTabs() {
  const tabs = document.querySelectorAll('.hub-tab');
  const panels = document.querySelectorAll('.hub-tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(tab.getAttribute('data-tab'));
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE QUIZ STATION
   ========================================================================== */
const quizData = {
  animals: [
    {
      q: "Which baby animal is called a joey?",
      options: ["Baby Lion", "Baby Kangaroo", "Baby Elephant", "Baby Penguin"],
      correct: 1,
      fact: "Spot on! Baby kangaroos, wallabies, and koalas are all called joeys! 🦘"
    },
    {
      q: "What do honeybees collect from flowers to make sweet honey?",
      options: ["Leaves", "Nectar & Pollen", "Dew drops", "Seeds"],
      correct: 1,
      fact: "Brilliant! Honeybees sip sweet nectar from flowers to make honey in their hives! 🐝"
    },
    {
      q: "Which animal is known as the tallest land mammal in the world?",
      options: ["Giraffe", "Elephant", "Horse", "Hippopotamus"],
      correct: 0,
      fact: "Awesome! Adult giraffes can grow up to 19 feet (5.8 meters) tall! 🦒"
    },
    {
      q: "What do caterpillars transform into when they grow up?",
      options: ["Beetles", "Butterflies", "Dragonflies", "Birds"],
      correct: 1,
      fact: "Magical! Caterpillars wrap into a chrysalis and emerge as gorgeous butterflies! 🦋"
    }
  ],
  phonics: [
    {
      q: "Which word starts with the letter 'D' just like 'Dale'?",
      options: ["Apple", "Dolphin", "Sun", "Tree"],
      correct: 1,
      fact: "Great job! 'Dolphin' and 'Dale' both begin with the letter 'D'! 🐬"
    },
    {
      q: "Which word rhymes with 'Cat' and 'Hat'?",
      options: ["Mat", "Dog", "Fish", "Car"],
      correct: 0,
      fact: "Superb! Cat, Hat, and Mat all share the '-at' sound family! 🎩"
    },
    {
      q: "What is the vowel sound heard in the word 'Tree'?",
      options: ["Short A", "Long E (ee)", "Short O", "Long U"],
      correct: 1,
      fact: "You got it! 'Tree' has the sweet, long 'ee' vowel sound! 🌳"
    }
  ],
  math: [
    {
      q: "If you have 3 apples and Teacher Sarah gives you 2 more, how many do you have?",
      options: ["4 Apples", "5 Apples", "6 Apples", "3 Apples"],
      correct: 1,
      fact: "Hooray! 3 + 2 = 5 crisp delicious apples! 🍎"
    },
    {
      q: "Which geometric shape has 3 sides and 3 corners?",
      options: ["Square", "Circle", "Triangle", "Rectangle"],
      correct: 2,
      fact: "Spot on! A triangle always has 3 straight sides and 3 angles! 📐"
    },
    {
      q: "What number comes immediately after 9?",
      options: ["8", "10", "11", "12"],
      correct: 1,
      fact: "Fantastic! 1, 2, 3, 4, 5, 6, 7, 8, 9, and next is 10! 🔟"
    }
  ]
};

let currentQuizCat = 'animals';
let currentQuestionIdx = 0;
let quizScore = 0;

function initQuizStation() {
  const catBtns = document.querySelectorAll('.quiz-category-btn');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentQuizCat = btn.getAttribute('data-quiz-cat');
      currentQuestionIdx = 0;
      quizScore = 0;
      updateScoreDisplay();
      renderQuizQuestion();
    });
  });

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const list = quizData[currentQuizCat];
  const qObj = list[currentQuestionIdx];
  
  const stepText = document.getElementById('quizStepText');
  const qText = document.getElementById('quizQuestionText');
  const container = document.getElementById('quizOptionsContainer');
  const feedbackBox = document.getElementById('quizFeedbackBox');

  if (!stepText || !qText || !container) return;

  feedbackBox.style.display = 'none';
  stepText.textContent = `Question ${currentQuestionIdx + 1} of ${list.length}`;
  qText.textContent = qObj.q;

  container.innerHTML = '';
  qObj.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = opt;
    btn.onclick = () => selectQuizAnswer(idx);
    container.appendChild(btn);
  });
}

function selectQuizAnswer(selectedIndex) {
  const list = quizData[currentQuizCat];
  const qObj = list[currentQuestionIdx];
  const buttons = document.querySelectorAll('.quiz-opt');
  const feedbackBox = document.getElementById('quizFeedbackBox');
  const feedbackMsg = document.getElementById('quizFeedbackMsg');
  const nextBtn = document.getElementById('btnNextQuestion');

  // Disable all options
  buttons.forEach(b => b.style.pointerEvents = 'none');

  if (selectedIndex === qObj.correct) {
    buttons[selectedIndex].classList.add('correct');
    quizScore += 10;
    updateScoreDisplay();
    feedbackMsg.innerHTML = `<span style="color: #15803d;">🎉 ${qObj.fact}</span>`;
  } else {
    buttons[selectedIndex].classList.add('incorrect');
    buttons[qObj.correct].classList.add('correct');
    feedbackMsg.innerHTML = `<span style="color: #b91c1c;">Almost! The correct answer was <strong>${qObj.options[qObj.correct]}</strong>. ${qObj.fact}</span>`;
  }

  feedbackBox.style.display = 'flex';
  if (currentQuestionIdx + 1 >= list.length) {
    nextBtn.textContent = 'Finish & Restart Quiz 🔄';
  } else {
    nextBtn.textContent = 'Next Question →';
  }
}

function nextQuizQuestion() {
  const list = quizData[currentQuizCat];
  if (currentQuestionIdx + 1 < list.length) {
    currentQuestionIdx++;
    renderQuizQuestion();
  } else {
    // Quiz finished
    showToast(`🏆 Quiz complete! You scored ${quizScore} points! Great job!`, 'success');
    currentQuestionIdx = 0;
    quizScore = 0;
    updateScoreDisplay();
    renderQuizQuestion();
  }
}

function updateScoreDisplay() {
  const el = document.getElementById('quizScoreText');
  if (el) el.textContent = quizScore;
}

/* ==========================================================================
   6. AI STORYTIME GENERATOR & TEXT-TO-SPEECH
   ========================================================================== */
function generateAiStory() {
  const hero = document.getElementById('storyHero').value;
  const setting = document.getElementById('storySetting').value;
  const moral = document.getElementById('storyMoral').value;

  const titleEl = document.getElementById('storyTitle');
  const contentEl = document.getElementById('storyContent');
  const resultBox = document.getElementById('storyResultBox');

  const storyTitle = `${hero} & The Secret of ${setting}`;
  const storyText = `Once upon a sunny morning, ${hero} bounded through ${setting} with a heart full of excitement! There were colorful butterflies dancing on the breeze and tall golden sunflowers nodding in the warm air.\n\n` +
    `While exploring a sparkling pathway, ${hero} stumbled upon a tiny puzzle box tucked beside a cheerful fountain. Inside was an invitation to build a grand playground tower for all the woodland friends.\n\n` +
    `Working together with laughter and big smiles, they discovered that when you practice ${moral}, anything is possible! Every helper added their unique piece, and together they made something truly extraordinary.\n\n` +
    `As the stars began to twinkle over Nottingham, everyone celebrated with warm cocoa and happy stories, knowing that love, curiosity, and teamwork make the world the happiest place of all. The End! ✨`;

  titleEl.textContent = storyTitle;
  contentEl.textContent = storyText;
  resultBox.style.display = 'block';
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  showToast('✨ Your personalized story has been generated!', 'success');
}

let isReading = false;
function toggleReadStory() {
  const content = document.getElementById('storyContent').textContent;
  const btn = document.getElementById('audioButtonText');

  if ('speechSynthesis' in window) {
    if (isReading) {
      window.speechSynthesis.cancel();
      isReading = false;
      btn.textContent = 'Read Story Aloud';
    } else {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.pitch = 1.1;
      utterance.rate = 0.95;
      utterance.onend = () => {
        isReading = false;
        btn.textContent = 'Read Story Aloud';
      };
      window.speechSynthesis.speak(utterance);
      isReading = true;
      btn.textContent = 'Pause Reading ⏸️';
    }
  } else {
    showToast('Text-to-speech is not supported on this browser.', 'info');
  }
}

function downloadSampleWorksheet(name) {
  showToast(`📥 Downloading "${name}" PDF... Ready for printing!`, 'success');
}

/* ==========================================================================
   7. LIVE PARENT PORTAL SIMULATOR
   ========================================================================== */
const childProfiles = {
  emma: {
    name: "Emma Kim",
    room: "Preschool - Room 2B",
    avatar: "👧",
    checkin: "Today at 8:15 AM (Gate #1 - Teacher Sarah)",
    feed: [
      { icon: "🥣", bg: "bg-green-light", title: "Morning Organic Breakfast", time: "08:30 AM", desc: "Ate warm oatmeal with fresh blueberry toppings and sliced organic bananas. Drink: 100% whole organic milk.", staff: "Logged by: Teacher Sarah" },
      { icon: "📖", bg: "bg-blue-light", title: "Circle Time & Phonics Story", time: "09:45 AM", desc: "Participated enthusiastically in sound-matching phonics game. Recognized letter 'D' for Dale and 'Dolphin'.", staff: "Logged by: Teacher Sarah" },
      { icon: "🌻", bg: "bg-gold-light", title: "Outdoor Garden & Sensory Exploration", time: "11:15 AM", desc: "Planted sunflower seeds in the courtyard garden box. Showed great curiosity with magnifying glass!", staff: "Logged by: Teacher Sarah" },
      { icon: "🥪", bg: "bg-coral-light", title: "Balanced Lunch", time: "12:30 PM", desc: "Grilled turkey & spinach pinwheel wrap, steamed carrots, and sweet melon slices. Finished full portion!", staff: "Logged by: Chef Anita" },
      { icon: "🌙", bg: "bg-purple-light", title: "Afternoon Rest & Nap Time", time: "01:15 PM", desc: "Slept soundly for 1 hour 45 minutes with soft lullaby music.", staff: "Logged by: Teacher Sarah" }
    ]
  },
  ethan: {
    name: "Ethan Kim",
    room: "Toddler - Room 1A",
    avatar: "👶",
    checkin: "Today at 8:20 AM (Main Reception - Teacher Marcus)",
    feed: [
      { icon: "🍼", bg: "bg-green-light", title: "Morning Warm Milk & Organic Fruit Puree", time: "08:40 AM", desc: "Drank 180ml warm whole milk and enjoyed pear & peach puree with big smiles!", staff: "Logged by: Teacher Marcus" },
      { icon: "🧩", bg: "bg-blue-light", title: "Tactile Block Building & Motor Play", time: "10:00 AM", desc: "Successfully stacked 5 soft wooden blocks and practiced clapping along to rhyme songs.", staff: "Logged by: Teacher Sarah Lin" },
      { icon: "🛝", bg: "bg-gold-light", title: "Padded Soft Play Crawl Zone", time: "11:30 AM", desc: "Loved exploring the gentle foam slide and peek-a-boo tunnel with friends.", staff: "Logged by: Teacher Marcus" },
      { icon: "🍲", bg: "bg-coral-light", title: "Steamed Veggies & Sweet Potato Mash", time: "12:45 PM", desc: "Ate 100% of lunch portion followed by water sips.", staff: "Logged by: Chef Anita" },
      { icon: "😴", bg: "bg-purple-light", title: "Crib Nap Time", time: "01:30 PM", desc: "Resting peacefully in darkened nursery room.", staff: "Logged by: Teacher Sarah Lin" }
    ]
  }
};

function switchChildProfile(childKey) {
  const child = childProfiles[childKey];
  if (!child) return;

  document.querySelectorAll('.child-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-child') === childKey);
  });

  const timelineContainer = document.getElementById('portalTimeline');
  if (timelineContainer) {
    timelineContainer.innerHTML = child.feed.map(item => `
      <div class="timeline-item">
        <div class="timeline-icon ${item.bg}">${item.icon}</div>
        <div class="timeline-content">
          <div class="timeline-head">
            <strong>${item.title}</strong>
            <span class="time-stamp">${item.time}</span>
          </div>
          <p>${item.desc}</p>
          <span class="logged-by">${item.staff}</span>
        </div>
      </div>
    `).join('');
  }

  showToast(`Switched view to ${child.name}'s daily feed`, 'info');
}

function handleSendTeacherMessage(e) {
  e.preventDefault();
  const input = document.getElementById('chatInputText');
  const chatBox = document.getElementById('chatMessagesBox');
  const text = input.value.trim();

  if (!text) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Add parent message bubble
  const parentMsg = document.createElement('div');
  parentMsg.className = 'chat-msg msg-parent';
  parentMsg.innerHTML = `
    <div class="msg-sender">Parent • ${timeStr}</div>
    <div class="msg-bubble">${escapeHtml(text)}</div>
  `;
  chatBox.appendChild(parentMsg);
  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  // Automated realistic response after 1.2 seconds
  setTimeout(() => {
    const replies = [
      "Thank you for the note! I've updated the daily log and will keep an eye on her during playtime. 😊",
      "Got it! We'll make sure to prepare everything right away. Have a wonderful day!",
      "Noted with thanks! Teacher Marcus and I are right here if you need anything else today."
    ];
    const replyText = replies[Math.floor(Math.random() * replies.length)];
    const teacherMsg = document.createElement('div');
    teacherMsg.className = 'chat-msg msg-teacher';
    teacherMsg.innerHTML = `
      <div class="msg-sender">Teacher Sarah • Just now</div>
      <div class="msg-bubble">${replyText}</div>
    `;
    chatBox.appendChild(teacherMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1200);
}

/* ==========================================================================
   8. INTERACTIVE TUITION & SCHEDULE ESTIMATOR
   ========================================================================== */
let estimatorState = {
  basePrice: 1180,
  programName: "Preschool & Early Literacy (3–4.5y)",
  daysMultiplier: 1.0,
  scheduleFactor: 1.0,
  mealsCost: 120,
  siblingDiscount: false
};

function initTuitionEstimator() {
  // Program buttons
  const progBtns = document.querySelectorAll('#calcProgramGroup .calc-btn');
  progBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      progBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      estimatorState.basePrice = parseFloat(btn.getAttribute('data-base'));
      estimatorState.programName = btn.getAttribute('data-name');
      recalculateTuition();
    });
  });

  // Days buttons
  const daysBtns = document.querySelectorAll('#calcDaysGroup .calc-btn');
  daysBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      daysBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      estimatorState.daysMultiplier = parseFloat(btn.getAttribute('data-multiplier'));
      recalculateTuition();
    });
  });

  // Schedule buttons
  const scheduleBtns = document.querySelectorAll('#calcScheduleGroup .calc-btn');
  scheduleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scheduleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      estimatorState.scheduleFactor = parseFloat(btn.getAttribute('data-schedule-factor'));
      recalculateTuition();
    });
  });

  recalculateTuition();
}

function recalculateTuition() {
  const checkMeals = document.getElementById('checkMeals');
  const checkSibling = document.getElementById('checkSibling');

  const hasMeals = checkMeals ? checkMeals.checked : true;
  const hasSibling = checkSibling ? checkSibling.checked : false;

  // Base tuition adjusted for days & full/half schedule
  const adjustedBase = Math.round(estimatorState.basePrice * estimatorState.daysMultiplier * estimatorState.scheduleFactor);
  const mealsAmount = hasMeals ? Math.round(120 * estimatorState.daysMultiplier) : 0;
  
  let subtotal = adjustedBase + mealsAmount;
  let discountAmount = 0;
  if (hasSibling) {
    discountAmount = Math.round(subtotal * 0.10);
  }

  const grandTotal = subtotal - discountAmount;

  // Update UI Elements
  const summaryName = document.getElementById('summaryProgramName');
  const summaryBase = document.getElementById('summaryBasePrice');
  const summaryMealsRow = document.getElementById('summaryMealsRow');
  const summaryMealsPrice = document.getElementById('summaryMealsPrice');
  const summaryDiscountRow = document.getElementById('summaryDiscountRow');
  const summaryDiscountPrice = document.getElementById('summaryDiscountPrice');
  const totalDisplay = document.getElementById('tuitionGrandTotal');

  if (summaryName) summaryName.textContent = estimatorState.programName;
  if (summaryBase) summaryBase.textContent = `£${adjustedBase.toLocaleString()}/mo`;

  if (summaryMealsRow) {
    if (hasMeals) {
      summaryMealsRow.style.display = 'flex';
      summaryMealsPrice.textContent = `+ £${mealsAmount}/mo`;
    } else {
      summaryMealsRow.style.display = 'none';
    }
  }

  if (summaryDiscountRow) {
    if (hasSibling) {
      summaryDiscountRow.style.display = 'flex';
      summaryDiscountPrice.textContent = `- £${discountAmount}/mo`;
    } else {
      summaryDiscountRow.style.display = 'none';
    }
  }

  if (totalDisplay) {
    totalDisplay.textContent = grandTotal.toLocaleString();
  }
}

/* ==========================================================================
   9. TESTIMONIALS SLIDER
   ========================================================================== */
let currentSlide = 0;
let slideInterval;

function initTestimonialSlider() {
  startAutoSlide();
}

function updateSliderPosition() {
  const track = document.getElementById('testimonialTrack');
  const dots = document.querySelectorAll('#sliderDots .dot');
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024 && !isMobile;

  let slideWidthPercent = 33.333;
  if (isMobile) slideWidthPercent = 100;
  else if (isTablet) slideWidthPercent = 50;

  if (track) {
    track.style.transform = `translateX(-${currentSlide * slideWidthPercent}%)`;
  }

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentSlide);
  });
}

function nextTestimonial() {
  const maxSlides = 3;
  currentSlide = (currentSlide + 1) % (maxSlides + 1);
  updateSliderPosition();
  resetAutoSlide();
}

function prevTestimonial() {
  const maxSlides = 3;
  currentSlide = (currentSlide - 1 + (maxSlides + 1)) % (maxSlides + 1);
  updateSliderPosition();
  resetAutoSlide();
}

function jumpToTestimonial(idx) {
  currentSlide = idx;
  updateSliderPosition();
  resetAutoSlide();
}

function startAutoSlide() {
  slideInterval = setInterval(() => {
    nextTestimonial();
  }, 6000);
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

window.addEventListener('resize', updateSliderPosition);

/* ==========================================================================
   10. FAQ ACCORDION
   ========================================================================== */
function toggleFaq(btn) {
  const item = btn.parentElement;
  const allItems = document.querySelectorAll('.faq-item');
  const isOpen = item.classList.contains('active');

  allItems.forEach(i => i.classList.remove('active'));

  if (!isOpen) {
    item.classList.add('active');
  }
}

/* ==========================================================================
   11. MODALS & SUBMISSIONS
   ========================================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Close modal on outside click or ESC key
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('show');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.show').forEach(m => {
      m.classList.remove('show');
    });
    document.body.style.overflow = '';
  }
});

function openEnrollmentModal(programName, price) {
  const title = document.getElementById('enrollProgramTitle');
  const input = document.getElementById('enrollSelectedProgram');
  if (title) title.textContent = `Program: ${programName} (${price}/mo)`;
  if (input) input.value = programName;
  openModal('enrollModal');
}

// Form Handlers
function handleTourSubmit(e) {
  e.preventDefault();
  closeModal('bookTourModal');
  showToast('🎉 Tour booking requested! Our admissions team will ring you within 24 hours to confirm your visit.', 'success');
}

function handleEnrollSubmit(e) {
  e.preventDefault();
  closeModal('enrollModal');
  showToast('🌟 Priority application submitted! We have saved your spot and will send the welcome pack to your email.', 'success');
}

function handleReviewSubmit(e) {
  e.preventDefault();
  closeModal('reviewModal');
  showToast('❤️ Thank you for sharing your wonderful parent review! It will appear on our homepage after moderation.', 'success');
}

function handleContactSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  form.reset();
  showToast('📬 Message received! The Dale Childcare Hub team in Sneinton Dale will get back to you shortly.', 'success');
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('newsletterEmail');
  input.value = '';
  showToast('💌 Subscribed successfully to Dale Childcare Hub Parent Newsletter!', 'success');
}

/* ==========================================================================
   12. DALE AI ADVISOR CHATBOT SIMULATION
   ========================================================================== */
const aiKnowledgeBase = [
  {
    keywords: ['tuition', 'fee', 'price', 'cost', 'rate', 'funding', '15', '30'],
    response: "Our tuition starts from £650/mo for After-School care up to £1,450/mo for full-time Infant care. We proudly accept Government 15 & 30 Free Childcare Hours and Tax-Free Childcare vouchers for eligible working parents."
  },
  {
    keywords: ['ratio', 'staff', 'teacher'],
    response: "We maintain ultra-low, loving ratios: 1:3 for Infants (6w-18m), 1:5 for Toddlers (18m-3y), 1:8 for Preschool, and 1:12 for After-School STEM. All educators are DBS-checked and CPR-certified."
  },
  {
    keywords: ['location', 'where', 'address', 'hours', 'open', 'time'],
    response: "We are located at 67 Sneinton Dale, Nottingham NG2 4LG. We are open Monday to Friday from 6:30 AM to 6:30 PM year-round."
  },
  {
    keywords: ['pick-up', 'pickup', 'bus', 'transport', 'after school'],
    response: "Yes! Our After-School STEM & Homework Hub offers dedicated, safe school bus pick-up from partner primary schools across Sneinton, St Ann's, Carlton, and central Nottingham."
  },
  {
    keywords: ['meal', 'food', 'snack', 'organic', 'lunch', 'allergy', 'diet'],
    response: "We prepare 100% nut-free, chef-cooked organic meals daily (breakfast, hot lunch, and afternoon snacks). We cater to vegetarian, vegan, halal, gluten-free, and special allergy diets."
  }
];

function handleAiChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('aiUserInput');
  const query = input.value.trim();
  if (!query) return;

  sendAiUserMessage(query);
  input.value = '';
}

function sendAiPrompt(promptText) {
  sendAiUserMessage(promptText);
}

function sendAiUserMessage(userText) {
  const chatBody = document.getElementById('aiChatBody');

  // Append user bubble
  const userMsg = document.createElement('div');
  userMsg.className = 'ai-msg user';
  userMsg.innerHTML = `<div class="ai-bubble">${escapeHtml(userText)}</div>`;
  chatBody.appendChild(userMsg);
  chatBody.scrollTop = chatBody.scrollHeight;

  // Find match or default
  setTimeout(() => {
    let matchedResponse = "That's a great question! For specific questions regarding enrollment availability or customized scheduling, please click 'Book a Tour' or ring our team directly at 0115 778 6445.";
    const lower = userText.toLowerCase();

    for (let item of aiKnowledgeBase) {
      if (item.keywords.some(k => lower.includes(k))) {
        matchedResponse = item.response;
        break;
      }
    }

    const botMsg = document.createElement('div');
    botMsg.className = 'ai-msg bot';
    botMsg.innerHTML = `
      <span class="ai-avatar">🤖</span>
      <div class="ai-bubble">${matchedResponse}</div>
    `;
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 700);
}

/* ==========================================================================
   13. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? '✅' : 'ℹ️';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-msg">${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
