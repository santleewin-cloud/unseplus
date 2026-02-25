// Main JavaScript for 운세플러스
     2	// Handles all main interactions and animations
     3	
     4	// Initialize AOS (Animate On Scroll)
     5	document.addEventListener('DOMContentLoaded', function() {
     6	    AOS.init({
     7	        duration: 800,
     8	        once: true,
     9	        offset: 100
    10	    });
    11	    
    12	    // Initialize counters
    13	    animateCounters();
    14	    
    15	    // Setup event listeners
    16	    setupEventListeners();
    17	});
    18	
    19	// Setup all event listeners
    20	function setupEventListeners() {
    21	    // Mobile menu toggle
    22	    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    23	    const mobileMenu = document.getElementById('mobileMenu');
    24	    
    25	    if (mobileMenuBtn && mobileMenu) {
    26	        mobileMenuBtn.addEventListener('click', () => {
    27	            mobileMenu.classList.toggle('hidden');
    28	        });
    29	    }
    30	    
    31	    // Zodiac selection
    32	    const zodiacButtons = document.querySelectorAll('.zodiac-btn');
    33	    zodiacButtons.forEach(btn => {
    34	        btn.addEventListener('click', function() {
    35	            const zodiac = this.getAttribute('data-zodiac');
    36	            const icon = this.getAttribute('data-icon');
    37	            showFortuneModal(zodiac, icon);
    38	        });
    39	    });
    40	    
    41	    // Category card clicks
    42	    const categoryCards = document.querySelectorAll('.category-card');
    43	    categoryCards.forEach(card => {
    44	        const button = card.querySelector('button');
    45	        if (button) {
    46	            button.addEventListener('click', function(e) {
    47	                e.stopPropagation();
    48	                const category = card.getAttribute('data-category');
    49	                openConsultationModal(category);
    50	            });
    51	        }
    52	    });
    53	    
    54	    // Package buttons
    55	    const packageButtons = document.querySelectorAll('#packages button');
    56	    packageButtons.forEach((btn, index) => {
    57	        btn.addEventListener('click', function() {
    58	            const packages = ['연애운 풀코스', '대박운 패키지', '합격 올인원'];
    59	            openPackageModal(packages[index % 3]);
    60	        });
    61	    });
    62	    
    63	    // Close modals on outside click
    64	    window.addEventListener('click', function(e) {
    65	        const fortuneModal = document.getElementById('fortuneModal');
    66	        const consultModal = document.getElementById('consultModal');
    67	        
    68	        if (e.target === fortuneModal) {
    69	            closeFortuneModa();
    70	        }
    71	        if (e.target === consultModal) {
    72	            closeConsultModal();
    73	        }
    74	    });
    75	    
    76	    // Close modal on Escape key
    77	    document.addEventListener('keydown', function(e) {
    78	        if (e.key === 'Escape') {
    79	            closeFortuneModa();
    80	            closeConsultModal();
    81	        }
    82	    });
    83	}
    84	
    85	// Animate counters with dynamic values
    86	function animateCounters() {
    87	    const todayCounter = document.getElementById('todayCount');
    88	    const totalCounter = document.getElementById('totalCount');
    89	    
    90	    if (todayCounter) {
    91	        // 오늘의 상담 신청: 오전 7시 1건 시작, 15분마다 1건씩 증가
    92	        const todayCount = getTodayConsultCount();
    93	        animateCounter(todayCounter, todayCount, 2000);
    94	        
    95	        // 15분(900,000ms)마다 업데이트
    96	        setInterval(() => {
    97	            const newCount = getTodayConsultCount();
    98	            animateCounter(todayCounter, newCount, 1000);
    99	        }, 900000); // 15분 = 15 * 60 * 1000 = 900,000ms
   100	    }
   101	    
   102	    if (totalCounter) {
   103	        // 누적 상담: 13,265 + (현재 날짜 기준 하루 2건 증가)
   104	        const baseCount = 13265;
   105	        const baseDate = new Date('2026-01-01'); // 기준 날짜
   106	        const today = new Date();
   107	        const daysPassed = Math.floor((today - baseDate) / (1000 * 60 * 60 * 24));
   108	        const totalCount = baseCount + (daysPassed * 2);
   109	        
   110	        animateCounter(totalCounter, totalCount, 2000);
   111	    }
   112	    
   113	    // 만족도: 95.3~98.6% 사이 랜덤
   114	    updateSatisfaction();
   115	    setInterval(updateSatisfaction, 8000); // 8초마다 업데이트
   116	}
   117	
   118	// Update satisfaction percentage
   119	function updateSatisfaction() {
   120	    const satisfactionElements = document.querySelectorAll('.satisfaction-rate');
   121	    if (satisfactionElements.length > 0) {
   122	        const rate = (Math.random() * (98.6 - 95.3) + 95.3).toFixed(1);
   123	        satisfactionElements.forEach(el => {
   124	            el.textContent = rate + '%';
   125	        });
   126	    }
   127	}
   128	
   129	// Calculate today's consultation count based on time
   130	function getTodayConsultCount() {
   131	    const now = new Date();
   132	    const hours = now.getHours();
   133	    const minutes = now.getMinutes();
   134	    
   135	    // 오전 7시(07:00) 이전에는 0건
   136	    if (hours < 7) {
   137	        return 0;
   138	    }
   139	    
   140	    // 오전 7시부터 시작
   141	    const startHour = 7;
   142	    const startMinute = 0;
   143	    
   144	    // 현재 시간까지의 총 분 계산
   145	    const currentTotalMinutes = (hours * 60) + minutes;
   146	    const startTotalMinutes = (startHour * 60) + startMinute;
   147	    
   148	    // 경과 시간(분)
   149	    const elapsedMinutes = currentTotalMinutes - startTotalMinutes;
   150	    
   151	    // 15분마다 1건씩 증가 (시작은 1건)
   152	    const count = 1 + Math.floor(elapsedMinutes / 15);
   153	    
   154	    // 최대값 제한 (자정까지 계산하면 약 68건)
   155	    return Math.min(count, 100); // 안전하게 100건으로 제한
   156	}
   157	
   158	// Counter animation function
   159	function animateCounter(element, target, duration) {
   160	    let start = 0;
   161	    const increment = target / (duration / 16);
   162	    
   163	    const timer = setInterval(() => {
   164	        start += increment;
   165	        if (start >= target) {
   166	            element.textContent = target.toLocaleString();
   167	            clearInterval(timer);
   168	        } else {
   169	            element.textContent = Math.floor(start).toLocaleString();
   170	        }
   171	    }, 16);
   172	}
   173	
   174	// Show fortune modal
   175	function showFortuneModal(zodiac, icon) {
   176	    const modal = document.getElementById('fortuneModal');
   177	    const fortune = getFortune(zodiac);
   178	    
   179	    if (!fortune) {
   180	        console.error('Fortune data not found for:', zodiac);
   181	        return;
   182	    }
   183	    
   184	    // Update modal content
   185	    document.getElementById('modalZodiacIcon').textContent = icon;
   186	    document.getElementById('modalZodiacName').textContent = zodiac + '띠';
   187	    document.getElementById('modalOverall').textContent = fortune.overall;
   188	    document.getElementById('modalLove').textContent = fortune.love;
   189	    document.getElementById('modalWealth').textContent = fortune.wealth;
   190	    document.getElementById('modalHealth').textContent = fortune.health;
   191	    document.getElementById('modalColor').textContent = fortune.luckyColor;
   192	    document.getElementById('modalNumber').textContent = fortune.luckyNumber;
   193	    
   194	    // Show modal with animation
   195	    modal.classList.remove('hidden');
   196	    modal.querySelector('.bg-white').classList.add('modal-enter');
   197	    
   198	    // Prevent body scroll
   199	    document.body.style.overflow = 'hidden';
   200	    
   201	    // Track event (if analytics is set up)
   202	    trackEvent('Fortune', 'View', zodiac);
   203	}
   204	
   205	// Close fortune modal
   206	function closeFortuneModa() {
   207	    const modal = document.getElementById('fortuneModal');
   208	    modal.classList.add('hidden');
   209	    document.body.style.overflow = 'auto';
   210	}
   211	
   212	// Smooth scroll to section
   213	function scrollToSection(sectionId) {
   214	    const section = document.getElementById(sectionId);
   215	    if (section) {
   216	        const offset = 80; // Navigation height
   217	        const elementPosition = section.getBoundingClientRect().top;
   218	        const offsetPosition = elementPosition + window.pageYOffset - offset;
   219	        
   220	        window.scrollTo({
   221	            top: offsetPosition,
   222	            behavior: 'smooth'
   223	        });
   224	    }
   225	}
   226	
   227	// Track events (placeholder for analytics)
   228	function trackEvent(category, action, label) {
   229	    console.log('Event tracked:', category, action, label);
   230	    // Integrate with Google Analytics or other analytics services here
   231	    // Example: gtag('event', action, { 'event_category': category, 'event_label': label });
   232	}
   233	
   234	// Show notification
   235	function showNotification(message, type = 'info') {
   236	    const notification = document.createElement('div');
   237	    notification.className = `fixed top-20 right-4 z-50 ${type}-message shadow-2xl max-w-md`;
   238	    
   239	    const icons = {
   240	        success: '✅',
   241	        error: '❌',
   242	        info: 'ℹ️',
   243	        warning: '⚠️'
   244	    };
   245	    
   246	    notification.innerHTML = `
   247	        <i class="text-2xl">${icons[type] || icons.info}</i>
   248	        <span>${message}</span>
   249	    `;
   250	    
   251	    document.body.appendChild(notification);
   252	    
   253	    // Remove after 3 seconds
   254	    setTimeout(() => {
   255	        notification.style.animation = 'fadeOut 0.3s ease-out';
   256	        setTimeout(() => {
   257	            document.body.removeChild(notification);
   258	        }, 300);
   259	    }, 3000);
   260	}
   261	
   262	// Form validation helper
   263	function validateEmail(email) {
   264	    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   265	    return re.test(email);
   266	}
   267	
   268	function validatePhone(phone) {
   269	    const re = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
   270	    return re.test(phone.replace(/[^0-9]/g, ''));
   271	}
   272	
   273	function validateDate(dateString) {
   274	    const re = /^\d{4}-\d{2}-\d{2}$/;
   275	    if (!re.test(dateString)) return false;
   276	    
   277	    const date = new Date(dateString);
   278	    return date instanceof Date && !isNaN(date);
   279	}
   280	
   281	// Format phone number
   282	function formatPhoneNumber(phone) {
   283	    const cleaned = phone.replace(/\D/g, '');
   284	    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
   285	    if (match) {
   286	        return match[1] + '-' + match[2] + '-' + match[3];
   287	    }
   288	    return phone;
   289	}
   290	
   291	// Local storage helpers
   292	function saveToLocalStorage(key, data) {
   293	    try {
   294	        localStorage.setItem(key, JSON.stringify(data));
   295	        return true;
   296	    } catch (e) {
   297	        console.error('Failed to save to localStorage:', e);
   298	        return false;
   299	    }
   300	}
   301	
   302	function loadFromLocalStorage(key) {
   303	    try {
   304	        const data = localStorage.getItem(key);
   305	        return data ? JSON.parse(data) : null;
   306	    } catch (e) {
   307	        console.error('Failed to load from localStorage:', e);
   308	        return null;
   309	    }
   310	}
   311	
   312	function removeFromLocalStorage(key) {
   313	    try {
   314	        localStorage.removeItem(key);
   315	        return true;
   316	    } catch (e) {
   317	        console.error('Failed to remove from localStorage:', e);
   318	        return false;
   319	    }
   320	}
   321	
   322	// Open package modal (placeholder)
   323	function openPackageModal(packageName) {
   324	    showNotification(`${packageName} 패키지를 선택하셨습니다! 곧 상담 신청 페이지가 열립니다.`, 'success');
   325	    setTimeout(() => {
   326	        openConsultationModal('package', packageName);
   327	    }, 1000);
   328	}
   329	
   330	// Scroll to top button
   331	window.addEventListener('scroll', function() {
   332	    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
   333	    
   334	    // Show/hide scroll to top button
   335	    let scrollTopBtn = document.getElementById('scrollTopBtn');
   336	    if (!scrollTopBtn) {
   337	        scrollTopBtn = document.createElement('button');
   338	        scrollTopBtn.id = 'scrollTopBtn';
   339	        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
   340	        scrollTopBtn.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-primary to-secondary text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-110 z-40 hidden';
   341	        scrollTopBtn.onclick = () => {
   342	            window.scrollTo({ top: 0, behavior: 'smooth' });
   343	        };
   344	        document.body.appendChild(scrollTopBtn);
   345	    }
   346	    
   347	    if (scrollTop > 300) {
   348	        scrollTopBtn.classList.remove('hidden');
   349	    } else {
   350	        scrollTopBtn.classList.add('hidden');
   351	    }
   352	});
   353	
   354	// Add fade-out animation to CSS
   355	const style = document.createElement('style');
   356	style.textContent = `
   357	    @keyframes fadeOut {
   358	        from {
   359	            opacity: 1;
   360	            transform: translateY(0);
   361	        }
   362	        to {
   363	            opacity: 0;
   364	            transform: translateY(-20px);
   365	        }
   366	    }
   367	`;
   368	document.head.appendChild(style);
   369	
   370	// Handle page visibility change
   371	document.addEventListener('visibilitychange', function() {
   372	    if (document.hidden) {
   373	        console.log('Page is hidden');
   374	    } else {
   375	        console.log('Page is visible');
   376	        // Refresh counters when page becomes visible
   377	        animateCounters();
   378	    }
   379	});
   380	
   381	// Lazy load images (if needed)
   382	if ('IntersectionObserver' in window) {
   383	    const imageObserver = new IntersectionObserver((entries, observer) => {
   384	        entries.forEach(entry => {
   385	            if (entry.isIntersecting) {
   386	                const img = entry.target;
   387	                img.src = img.dataset.src;
   388	                img.classList.remove('lazy');
   389	                imageObserver.unobserve(img);
   390	            }
   391	        });
   392	    });
   393	    
   394	    const lazyImages = document.querySelectorAll('img.lazy');
   395	    lazyImages.forEach(img => imageObserver.observe(img));
   396	}
   397	
   398	// Console welcome message
   399	console.log('%c운세플러스 🌙', 'font-size: 24px; font-weight: bold; background: linear-gradient(to right, #9370DB, #191970); color: white; padding: 10px 20px; border-radius: 10px;');
   400	console.log('%c당신의 운명을 플러스하다', 'font-size: 14px; color: #9370DB;');
   401	
