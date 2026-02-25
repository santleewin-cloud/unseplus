 1	// Consultation Form Management for 운세플러스
     2	// Handles 4-step consultation request process with order management
     3	
     4	let currentStep = 1;
     5	let consultationData = {
     6	    category: '',
     7	    subcategory: '',
     8	    personalInfo: {},
     9	    contactMethod: 'email', // email or kakao
    10	    packageType: ''
    11	};
    12	
    13	// Load categories from admin if available
    14	function loadCategoriesFromAdmin() {
    15	    const savedCategories = localStorage.getItem('consultation_categories');
    16	    if (savedCategories) {
    17	        return JSON.parse(savedCategories);
    18	    }
    19	    return null;
    20	}
    21	
    22	// Category definitions (will be overridden by admin if available)
    23	let categories = loadCategoriesFromAdmin() || {
    24	    basic: {
    25	        name: '기본 운세',
    26	        icon: '🔮',
    27	        subcategories: [
    28	            { id: 'monthly', name: '월별운세', price: 40000 },
    29	            { id: 'newyear', name: '신년운세', price: 50000 },
    30	            { id: 'newyear_premium', name: '신년운세 프리미엄', price: 80000 },
    31	            { id: 'lifesaju', name: '평생사주풀이', price: 100000 },
    32	            { id: 'saju_premium', name: '정통사주 프리미엄', price: 150000 }
    33	        ]
    34	    },
    35	    special: {
    36	        name: '특화 운세',
    37	        icon: '💕',
    38	        subcategories: [
    39	            { id: 'love', name: '연애운', price: 30000 },
    40	            { id: 'reunion', name: '재회운', price: 35000 },
    41	            { id: 'wealth', name: '재물운', price: 30000 },
    42	            { id: 'lottery', name: '로또운', price: 25000 },
    43	            { id: 'exam', name: '합격운', price: 35000 },
    44	            { id: 'job', name: '취업운', price: 35000 },
    45	            { id: 'health', name: '건강운', price: 30000 },
    46	            { id: 'moving', name: '이사운', price: 30000 }
    47	        ]
    48	    },
    49	    mz: {
    50	        name: 'MZ 특화',
    51	        icon: '💫',
    52	        subcategories: [
    53	            { id: 'findlove', name: '내 사랑 찾기', price: 35000 },
    54	            { id: 'maturelove', name: '성숙한 연애 비법', price: 40000 },
    55	            { id: 'movieromance', name: '영화같은 로맨스', price: 45000 },
    56	            { id: 'elegantlove', name: '우아한 연애 비법', price: 40000 },
    57	            { id: 'destinystory', name: '운명 이야기', price: 50000 },
    58	            { id: 'destinyecho', name: '운명의 메아리', price: 45000 },
    59	            { id: 'magnetattract', name: '자석 매력', price: 35000 },
    60	            { id: 'crushcheck', name: '짝사랑 알아보기', price: 30000 }
    61	        ]
    62	    }
    63	};
    64	
    65	// Kakao channel for general consultations (not orders)
    66	const kakaoChannel = {
    67	    name: '카카오톡 채널',
    68	    url: 'http://pf.kakao.com/_GxdxezX',
    69	    description: '일반 상담 문의는 카카오톡 채널로 연락주세요'
    70	};
    71	
    72	// Bank account info
    73	const bankInfo = {
    74	    bank: '카카오뱅크',
    75	    account: '3333-20-7454049',
    76	    holder: '이*택'
    77	};
    78	
    79	// Open consultation modal
    80	function openConsultationModal(category, packageType = null) {
    81	    const modal = document.getElementById('consultModal');
    82	    if (!modal) return;
    83	    
    84	    // Reset state
    85	    currentStep = 1;
    86	    consultationData = {
    87	        category: category,
    88	        subcategory: '',
    89	        personalInfo: {},
    90	        contactMethod: 'email',
    91	        packageType: packageType
    92	    };
    93	    
    94	    // Load saved data if exists
    95	    const savedData = loadFromLocalStorage('consultationDraft');
    96	    if (savedData && !packageType) {
    97	        if (confirm('이전에 작성하던 내용이 있습니다. 불러오시겠습니까?')) {
    98	            consultationData = savedData;
    99	            currentStep = savedData.currentStep || 1;
   100	        }
   101	    }
   102	    
   103	    // Show modal
   104	    modal.classList.remove('hidden');
   105	    document.body.style.overflow = 'hidden';
   106	    
   107	    // Render step
   108	    if (packageType) {
   109	        renderStep4(); // Go directly to confirmation for packages
   110	    } else {
   111	        renderCurrentStep();
   112	    }
   113	}
   114	
   115	// Close consultation modal
   116	function closeConsultModal() {
   117	    const modal = document.getElementById('consultModal');
   118	    if (!modal) return;
   119	    
   120	    // Save draft
   121	    consultationData.currentStep = currentStep;
   122	    saveToLocalStorage('consultationDraft', consultationData);
   123	    
   124	    modal.classList.add('hidden');
   125	    document.body.style.overflow = 'auto';
   126	}
   127	
   128	// Render current step
   129	function renderCurrentStep() {
   130	    switch (currentStep) {
   131	        case 1:
   132	            renderStep1();
   133	            break;
   134	        case 2:
   135	            renderStep2();
   136	            break;
   137	        case 3:
   138	            renderStep3();
   139	            break;
   140	        case 4:
   141	            renderStep4();
   142	            break;
   143	        default:
   144	            renderStep1();
   145	    }
   146	}
   147	
   148	// Step 1: Category Selection
   149	function renderStep1() {
   150	    const content = document.getElementById('consultModalContent');
   151	    
   152	    content.innerHTML = `
   153	        <div class="sticky top-0 bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-t-3xl">
   154	            <div class="flex items-center justify-between">
   155	                <div>
   156	                    <h3 class="text-2xl font-bold">상담 신청</h3>
   157	                    <p class="text-gray-200 text-sm">STEP 1 / 4</p>
   158	                </div>
   159	                <button onclick="closeConsultModal()" class="text-3xl hover:rotate-90 transition-transform">
   160	                    <i class="fas fa-times"></i>
   161	                </button>
   162	            </div>
   163	        </div>
   164	        
   165	        <div class="p-8">
   166	            ${renderProgressBar(1)}
   167	            
   168	            <div class="mb-8">
   169	                <h4 class="text-2xl font-bold text-gray-800 mb-2">어떤 카테고리를 선택하시겠어요?</h4>
   170	                <p class="text-gray-600">카테고리를 선택해주세요</p>
   171	            </div>
   172	            
   173	            <div class="space-y-4">
   174	                ${Object.keys(categories).map(key => `
   175	                    <label class="block cursor-pointer">
   176	                        <input type="radio" name="category" value="${key}" 
   177	                            ${consultationData.category === key ? 'checked' : ''}
   178	                            class="hidden peer">
   179	                        <div class="border-2 border-gray-200 rounded-2xl p-6 peer-checked:border-primary peer-checked:bg-purple-50 hover:border-primary transition">
   180	                            <div class="flex items-center justify-between">
   181	                                <div class="flex items-center">
   182	                                    <span class="text-4xl mr-4">${categories[key].icon}</span>
   183	                                    <div>
   184	                                        <div class="text-xl font-bold text-gray-800">${categories[key].name}</div>
   185	                                        <div class="text-sm text-gray-600">${categories[key].subcategories.length}개 상담</div>
   186	                                    </div>
   187	                                </div>
   188	                                <i class="fas fa-check-circle text-2xl text-primary hidden peer-checked:block"></i>
   189	                            </div>
   190	                        </div>
   191	                    </label>
   192	                `).join('')}
   193	            </div>
   194	            
   195	            <div class="mt-8 flex justify-end">
   196	                <button onclick="nextStep()" class="btn-primary px-8 py-3">
   197	                    다음 단계 <i class="fas fa-arrow-right ml-2"></i>
   198	                </button>
   199	            </div>
   200	        </div>
   201	    `;
   202	    
   203	    // Add event listeners
   204	    const radioButtons = content.querySelectorAll('input[name="category"]');
   205	    radioButtons.forEach(radio => {
   206	        radio.addEventListener('change', (e) => {
   207	            consultationData.category = e.target.value;
   208	        });
   209	    });
   210	}
   211	
   212	// Step 2: Subcategory Selection
   213	function renderStep2() {
   214	    const content = document.getElementById('consultModalContent');
   215	    const categoryData = categories[consultationData.category];
   216	    
   217	    content.innerHTML = `
   218	        <div class="sticky top-0 bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-t-3xl">
   219	            <div class="flex items-center justify-between">
   220	                <div>
   221	                    <h3 class="text-2xl font-bold">상담 신청</h3>
   222	                    <p class="text-gray-200 text-sm">STEP 2 / 4</p>
   223	                </div>
   224	                <button onclick="closeConsultModal()" class="text-3xl hover:rotate-90 transition-transform">
   225	                    <i class="fas fa-times"></i>
   226	                </button>
   227	            </div>
   228	        </div>
   229	        
   230	        <div class="p-8">
   231	            ${renderProgressBar(2)}
   232	            
   233	            <div class="mb-8">
   234	                <h4 class="text-2xl font-bold text-gray-800 mb-2">${categoryData.icon} ${categoryData.name}</h4>
   235	                <p class="text-gray-600">세부 상담을 선택해주세요</p>
   236	            </div>
   237	            
   238	            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
   239	                ${categoryData.subcategories.map(sub => `
   240	                    <label class="block cursor-pointer">
   241	                        <input type="radio" name="subcategory" value="${sub.id}" 
   242	                            ${consultationData.subcategory === sub.id ? 'checked' : ''}
   243	                            class="hidden peer">
   244	                        <div class="border-2 border-gray-200 rounded-xl p-5 peer-checked:border-primary peer-checked:bg-purple-50 hover:border-primary transition h-full">
   245	                            <div class="flex flex-col h-full justify-between">
   246	                                <div>
   247	                                    <div class="text-lg font-bold text-gray-800 mb-2">${sub.name}</div>
   248	                                </div>
   249	                                <div class="flex items-center justify-between mt-4">
   250	                                    <div class="text-primary font-bold">₩${sub.price.toLocaleString()}</div>
   251	                                    <i class="fas fa-check-circle text-primary opacity-0 peer-checked:opacity-100"></i>
   252	                                </div>
   253	                            </div>
   254	                        </div>
   255	                    </label>
   256	                `).join('')}
   257	            </div>
   258	            
   259	            <div class="mt-8 flex justify-between">
   260	                <button onclick="prevStep()" class="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
   261	                    <i class="fas fa-arrow-left mr-2"></i> 이전
   262	                </button>
   263	                <button onclick="nextStep()" class="btn-primary px-8 py-3">
   264	                    다음 단계 <i class="fas fa-arrow-right ml-2"></i>
   265	                </button>
   266	            </div>
   267	        </div>
   268	    `;
   269	    
   270	    const radioButtons = content.querySelectorAll('input[name="subcategory"]');
   271	    radioButtons.forEach(radio => {
   272	        radio.addEventListener('change', (e) => {
   273	            consultationData.subcategory = e.target.value;
   274	        });
   275	    });
   276	}
   277	
   278	// Step 3: Personal Information & Contact Method
   279	function renderStep3() {
   280	    const content = document.getElementById('consultModalContent');
   281	    const savedInfo = consultationData.personalInfo;
   282	    
   283	    content.innerHTML = `
   284	        <div class="sticky top-0 bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-t-3xl">
   285	            <div class="flex items-center justify-between">
   286	                <div>
   287	                    <h3 class="text-2xl font-bold">상담 신청</h3>
   288	                    <p class="text-gray-200 text-sm">STEP 3 / 4</p>
   289	                </div>
   290	                <button onclick="closeConsultModal()" class="text-3xl hover:rotate-90 transition-transform">
   291	                    <i class="fas fa-times"></i>
   292	                </button>
   293	            </div>
   294	        </div>
   295	        
   296	        <div class="p-8">
   297	            ${renderProgressBar(3)}
   298	            
   299	            <div class="mb-8">
   300	                <h4 class="text-2xl font-bold text-gray-800 mb-2">정확한 상담을 위해 정보를 입력해주세요 ✨</h4>
   301	                <p class="text-gray-600">필수 정보만 간단히 작성해주시면 됩니다</p>
   302	            </div>
   303	            
   304	            <form id="personalInfoForm" class="space-y-6">
   305	                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
   306	                    <div>
   307	                        <label class="block text-sm font-bold text-gray-700 mb-2">
   308	                            이름 (또는 닉네임) <span class="text-red-500">*</span>
   309	                        </label>
   310	                        <input type="text" name="name" value="${savedInfo.name || ''}" required
   311	                            class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-purple-100 transition"
   312	                            placeholder="김운세">
   313	                    </div>
   314	                    
   315	                    <div>
   316	                        <label class="block text-sm font-bold text-gray-700 mb-2">
   317	                            생년월일 <span class="text-red-500">*</span>
   318	                        </label>
   319	                        <input type="date" name="birthdate" value="${savedInfo.birthdate || ''}" required
   320	                            class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-purple-100 transition">
   321	                    </div>
   322	                </div>
   323	                
   324	                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
   325	                    <div>
   326	                        <label class="block text-sm font-bold text-gray-700 mb-2">
   327	                            생시 (태어난 시간)
   328	                        </label>
   329	                        <select name="birthtime" class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-purple-100 transition">
   330	                            <option value="">모르겠어요</option>
   331	                            ${generateTimeOptions(savedInfo.birthtime)}
   332	                        </select>
   333	                    </div>
   334	                    
   335	                    <div>
   336	                        <label class="block text-sm font-bold text-gray-700 mb-2">
   337	                            성별 <span class="text-red-500">*</span>
   338	                        </label>
   339	                        <div class="flex gap-4">
   340	                            <label class="flex-1">
   341	                                <input type="radio" name="gender" value="male" ${savedInfo.gender === 'male' ? 'checked' : ''} required class="hidden peer">
   342	                                <div class="border-2 border-gray-200 rounded-xl px-4 py-3 text-center cursor-pointer peer-checked:border-primary peer-checked:bg-purple-50 hover:border-primary transition">
   343	                                    남성
   344	                                </div>
   345	                            </label>
   346	                            <label class="flex-1">
   347	                                <input type="radio" name="gender" value="female" ${savedInfo.gender === 'female' ? 'checked' : ''} required class="hidden peer">
   348	                                <div class="border-2 border-gray-200 rounded-xl px-4 py-3 text-center cursor-pointer peer-checked:border-primary peer-checked:bg-purple-50 hover:border-primary transition">
   349	                                    여성
   350	                                </div>
   351	                            </label>
   352	                        </div>
   353	                    </div>
   354	                </div>
   355	                
   356	                <div>
   357	                    <label class="block text-sm font-bold text-gray-700 mb-2">
   358	                        연락처 <span class="text-red-500">*</span>
   359	                    </label>
   360	                    <input type="tel" name="phone" value="${savedInfo.phone || ''}" required
   361	                        class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-purple-100 transition"
   362	                        placeholder="010-1234-5678">
   363	                </div>
   364	                
   365	                <div>
   366	                    <label class="block text-sm font-bold text-gray-700 mb-2">
   367	                        이메일 <span class="text-red-500">*</span>
   368	                    </label>
   369	                    <input type="email" name="email" value="${savedInfo.email || ''}" required
   370	                        class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-purple-100 transition"
   371	                        placeholder="example@email.com">
   372	                    <p class="text-xs text-gray-500 mt-1">📧 상세한 텍스트 리포트를 이메일로 발송해드립니다</p>
   373	                </div>
   374	                
   375	
   376	                
   377	                <div>
   378	                    <label class="block text-sm font-bold text-gray-700 mb-2">
   379	                        고민 내용 (선택)
   380	                    </label>
   381	                    <textarea name="concern" rows="4"
   382	                        class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-purple-100 transition resize-none"
   383	                        placeholder="상담받고 싶은 내용을 자세히 적어주시면 더 정확한 상담이 가능합니다.">${savedInfo.concern || ''}</textarea>
   384	                </div>
   385	            </form>
   386	            
   387	            <div class="mt-8 flex justify-between">
   388	                <button onclick="prevStep()" class="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
   389	                    <i class="fas fa-arrow-left mr-2"></i> 이전
   390	                </button>
   391	                <button onclick="validateAndNextStep()" class="btn-primary px-8 py-3">
   392	                    다음 단계 <i class="fas fa-arrow-right ml-2"></i>
   393	                </button>
   394	            </div>
   395	        </div>
   396	    `;
   397	}
   398	
   399	// Step 4: Final Confirmation & Order Submission
   400	function renderStep4() {
   401	    const content = document.getElementById('consultModalContent');
   402	    const categoryData = categories[consultationData.category];
   403	    const subcategory = categoryData?.subcategories.find(s => s.id === consultationData.subcategory);
   404	    // No contact method selection needed - auto-saved to DB
   405	    
   406	    // Package prices with 50% discount
   407	    const packagePrices = {
   408	        '연애운 풀코스': 40000,
   409	        '대박운 패키지': 45000,
   410	        '합격 올인원': 42500
   411	    };
   412	    
   413	    const price = consultationData.packageType ? (packagePrices[consultationData.packageType] || 40000) : (subcategory?.price || 0);
   414	    const discount = 0; // No additional discount
   415	    const finalPrice = price - discount;
   416	    
   417	    content.innerHTML = `
   418	        <div class="sticky top-0 bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-t-3xl">
   419	            <div class="flex items-center justify-between">
   420	                <div>
   421	                    <h3 class="text-2xl font-bold">상담 신청 최종 확인</h3>
   422	                    <p class="text-gray-200 text-sm">STEP 4 / 4</p>
   423	                </div>
   424	                <button onclick="closeConsultModal()" class="text-3xl hover:rotate-90 transition-transform">
   425	                    <i class="fas fa-times"></i>
   426	                </button>
   427	            </div>
   428	        </div>
   429	        
   430	        <div class="p-8">
   431	            ${renderProgressBar(4)}
   432	            
   433	            <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
   434	                <h4 class="text-xl font-bold text-gray-800 mb-4">📋 신청 내용</h4>
   435	                <div class="space-y-3">
   436	                    <div class="flex justify-between">
   437	                        <span class="text-gray-600">상담 종류</span>
   438	                        <span class="font-bold">${categoryData?.name || consultationData.packageType} > ${subcategory?.name || ''}</span>
   439	                    </div>
   440	
   441	                    <div class="flex justify-between">
   442	                        <span class="text-gray-600">결과 발송</span>
   443	                        <span class="font-bold">📧 이메일 (상세 텍스트 리포트)</span>
   444	                    </div>
   445	                    ${consultationData.packageType ? `
   446	                        <div class="flex justify-between">
   447	                            <span class="text-gray-600">패키지</span>
   448	                            <span class="font-bold text-primary">${consultationData.packageType}</span>
   449	                        </div>
   450	                    ` : ''}
   451	                </div>
   452	            </div>
   453	            
   454	            <div class="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
   455	                <h4 class="text-xl font-bold text-gray-800 mb-4">👤 신청자 정보</h4>
   456	                <div class="space-y-2 text-sm">
   457	                    <div class="flex justify-between">
   458	                        <span class="text-gray-600">이름</span>
   459	                        <span class="font-bold">${consultationData.personalInfo.name || '김*희'}</span>
   460	                    </div>
   461	                    <div class="flex justify-between">
   462	                        <span class="text-gray-600">생년월일</span>
   463	                        <span class="font-bold">${consultationData.personalInfo.birthdate || '1995-03-15'}</span>
   464	                    </div>
   465	                    <div class="flex justify-between">
   466	                        <span class="text-gray-600">연락처</span>
   467	                        <span class="font-bold">${consultationData.personalInfo.phone || '010-****-5678'}</span>
   468	                    </div>
   469	                    <div class="flex justify-between">
   470	                        <span class="text-gray-600">이메일</span>
   471	                        <span class="font-bold">${consultationData.personalInfo.email || 'user@example.com'}</span>
   472	                    </div>
   473	                </div>
   474	            </div>
   475	            
   476	            <div class="bg-gradient-to-r from-gold to-yellow-500 rounded-2xl p-6 mb-6">
   477	                <h4 class="text-xl font-bold text-secondary mb-4">💰 결제 금액</h4>
   478	                <div class="space-y-2">
   479	                    ${consultationData.packageType ? `
   480	                        <div class="flex justify-between text-secondary">
   481	                            <span>패키지 원가</span>
   482	                            <span class="font-bold line-through">₩${(price * 2).toLocaleString()}</span>
   483	                        </div>
   484	                        <div class="flex justify-between text-red-600">
   485	                            <span>패키지 할인 (50%)</span>
   486	                            <span class="font-bold">-₩${price.toLocaleString()}</span>
   487	                        </div>
   488	                        <div class="border-t border-secondary/30 pt-2"></div>
   489	                    ` : ''}
   490	                    <div class="flex justify-between text-2xl font-bold text-secondary">
   491	                        <span>최종 금액</span>
   492	                        <span>₩${finalPrice.toLocaleString()}</span>
   493	                    </div>
   494	                </div>
   495	            </div>
   496	            
   497	            <div class="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
   498	                <h4 class="text-lg font-bold text-blue-800 mb-3">📌 안내사항</h4>
   499	                <ul class="space-y-2 text-sm text-blue-700">
   500	                    <li class="flex items-start">
   501	                        <i class="fas fa-check-circle mr-2 mt-1"></i>
   502	                        <span>주문이 자동으로 접수되며, 관리자가 확인 후 연락드립니다.</span>
   503	                    </li>
   504	                    <li class="flex items-start">
   505	                        <i class="fas fa-university mr-2 mt-1"></i>
   506	                        <span><strong>입금 계좌: ${bankInfo.bank} ${bankInfo.account} (${bankInfo.holder})</strong></span>
   507	                    </li>
   508	                    <li class="flex items-start">
   509	                        <i class="fas fa-check-circle mr-2 mt-1"></i>
   510	                        <span>입금 확인 후 상담이 시작되며, 상세한 텍스트 리포트는 이메일로 발송됩니다 (영업일 기준 1-2일 소요).</span>
   511	                    </li>
   512	                    <li class="flex items-start">
   513	                        <i class="fas fa-comment text-primary mr-2 mt-1"></i>
   514	                        <span><strong>일반 상담 문의:</strong> <a href="${kakaoChannel.url}" target="_blank" class="text-primary underline hover:text-secondary">${kakaoChannel.name}</a></span>
   515	                    </li>
   516	                </ul>
   517	            </div>
   518	            
   519	            <div class="space-y-4 mb-6">
   520	                <label class="flex items-start cursor-pointer">
   521	                    <input type="checkbox" id="agreePrivacy" class="mt-1 mr-3 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary">
   522	                    <span class="text-sm text-gray-700">
   523	                        <span class="font-bold text-gray-800">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
   524	                    </span>
   525	                </label>
   526	                
   527	                <label class="flex items-start cursor-pointer">
   528	                    <input type="checkbox" id="agreeService" class="mt-1 mr-3 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary">
   529	                    <span class="text-sm text-gray-700">
   530	                        <span class="font-bold text-gray-800">[필수]</span> 서비스 이용약관에 동의합니다.
   531	                    </span>
   532	                </label>
   533	            </div>
   534	            
   535	            <div class="flex justify-between">
   536	                <button onclick="prevStep()" class="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
   537	                    <i class="fas fa-arrow-left mr-2"></i> 이전
   538	                </button>
   539	                <button onclick="submitOrder()" class="btn-gold px-12 py-4 text-lg">
   540	                    주문 신청하기
   541	                </button>
   542	            </div>
   543	        </div>
   544	    `;
   545	}
   546	
   547	// Helper: Progress Bar
   548	function renderProgressBar(step) {
   549	    const steps = ['카테고리', '세부선택', '정보입력', '최종확인'];
   550	    return `
   551	        <div class="mb-8">
   552	            <div class="flex justify-between items-center">
   553	                ${steps.map((label, index) => {
   554	                    const stepNum = index + 1;
   555	                    const isActive = stepNum === step;
   556	                    const isCompleted = stepNum < step;
   557	                    return `
   558	                        <div class="flex flex-col items-center flex-1 ${index < steps.length - 1 ? 'relative' : ''}">
   559	                            <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 ${
   560	                                isCompleted ? 'bg-green-500 text-white' :
   561	                                isActive ? 'bg-gradient-to-r from-primary to-secondary text-white scale-110' :
   562	                                'bg-gray-200 text-gray-500'
   563	                            }">
   564	                                ${isCompleted ? '<i class="fas fa-check"></i>' : stepNum}
   565	                            </div>
   566	                            <div class="text-xs text-center ${isActive ? 'text-primary font-bold' : 'text-gray-500'}">${label}</div>
   567	                            ${index < steps.length - 1 ? `
   568	                                <div class="absolute top-5 left-1/2 w-full h-0.5 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}" style="z-index: -1;"></div>
   569	                            ` : ''}
   570	                        </div>
   571	                    `;
   572	                }).join('')}
   573	            </div>
   574	        </div>
   575	    `;
   576	}
   577	
   578	// Helper: Generate time options
   579	function generateTimeOptions(selectedTime = '') {
   580	    const options = [];
   581	    for (let hour = 0; hour < 24; hour++) {
   582	        for (let minute = 0; minute < 60; minute += 30) {
   583	            const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
   584	            const selected = timeStr === selectedTime ? 'selected' : '';
   585	            options.push(`<option value="${timeStr}" ${selected}>${timeStr}</option>`);
   586	        }
   587	    }
   588	    return options.join('');
   589	}
   590	
   591	// Navigation functions
   592	function nextStep() {
   593	    // Validate current step
   594	    if (currentStep === 1 && !consultationData.category) {
   595	        showNotification('카테고리를 선택해주세요.', 'warning');
   596	        return;
   597	    }
   598	    if (currentStep === 2 && !consultationData.subcategory) {
   599	        showNotification('세부 상담을 선택해주세요.', 'warning');
   600	        return;
   601	    }
   602	    
   603	    currentStep++;
   604	    renderCurrentStep();
   605	    
   606	    // Scroll to top of modal
   607	    document.getElementById('consultModal').scrollTop = 0;
   608	}
   609	
   610	function prevStep() {
   611	    if (currentStep > 1) {
   612	        currentStep--;
   613	        renderCurrentStep();
   614	        document.getElementById('consultModal').scrollTop = 0;
   615	    }
   616	}
   617	
   618	function validateAndNextStep() {
   619	    const form = document.getElementById('personalInfoForm');
   620	    if (!form) return;
   621	    
   622	    const formData = new FormData(form);
   623	    const data = {};
   624	    
   625	    for (let [key, value] of formData.entries()) {
   626	        data[key] = value;
   627	    }
   628	    
   629	    // Validation
   630	    if (!data.name || !data.birthdate || !data.gender || !data.phone || !data.email) {
   631	        showNotification('필수 항목을 모두 입력해주세요.', 'warning');
   632	        return;
   633	    }
   634	    
   635	    if (!validateDate(data.birthdate)) {
   636	        showNotification('올바른 생년월일을 입력해주세요.', 'error');
   637	        return;
   638	    }
   639	    
   640	    if (!validatePhone(data.phone)) {
   641	        showNotification('올바른 연락처를 입력해주세요.', 'error');
   642	        return;
   643	    }
   644	    
   645	    if (!validateEmail(data.email)) {
   646	        showNotification('올바른 이메일을 입력해주세요.', 'error');
   647	        return;
   648	    }
   649	    
   650	    // No contact method needed - auto DB save
   651	    
   652	    // Save data
   653	    consultationData.personalInfo = data;
   654	    
   655	    nextStep();
   656	}
   657	
   658	// Submit order
   659	function submitOrder() {
   660	    const agreePrivacy = document.getElementById('agreePrivacy');
   661	    const agreeService = document.getElementById('agreeService');
   662	    
   663	    if (!agreePrivacy?.checked || !agreeService?.checked) {
   664	        showNotification('필수 약관에 모두 동의해주세요.', 'warning');
   665	        return;
   666	    }
   667	    
   668	    // Show loading
   669	    const button = event.target;
   670	    button.disabled = true;
   671	    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 처리중...';
   672	    
   673	    // Create order object
   674	    const order = {
   675	        id: 'ORD-' + Date.now(),
   676	        orderDate: new Date().toISOString(),
   677	        status: 'pending', // pending, processing, completed, cancelled
   678	        category: consultationData.category,
   679	        subcategory: consultationData.subcategory,
   680	        categoryName: categories[consultationData.category]?.name,
   681	        subcategoryName: categories[consultationData.category]?.subcategories.find(s => s.id === consultationData.subcategory)?.name,
   682	        price: categories[consultationData.category]?.subcategories.find(s => s.id === consultationData.subcategory)?.price || 0,
   683	        customerInfo: consultationData.personalInfo,
   684	        packageType: consultationData.packageType || null,
   685	        paymentStatus: 'pending' // pending, confirmed, completed
   686	    };
   687	    
   688	    // Save order to localStorage
   689	    saveOrder(order);
   690	    
   691	    // Simulate submission
   692	    setTimeout(() => {
   693	        // Clear draft
   694	        removeFromLocalStorage('consultationDraft');
   695	        
   696	        // Show success
   697	        showSuccessModal(order);
   698	        
   699	        // Track event
   700	        trackEvent('Order', 'Submit', consultationData.category);
   701	    }, 2000);
   702	}
   703	
   704	// Save order to localStorage
   705	function saveOrder(order) {
   706	    let orders = JSON.parse(localStorage.getItem('unseplus_orders') || '[]');
   707	    orders.unshift(order); // Add to beginning
   708	    localStorage.setItem('unseplus_orders', JSON.stringify(orders));
   709	}
   710	
   711	// Show success modal
   712	function showSuccessModal(order) {
   713	    const modal = document.getElementById('consultModal');
   714	    const content = document.getElementById('consultModalContent');
   715	    
   716	    content.innerHTML = `
   717	        <div class="p-8 text-center">
   718	            <div class="mb-6">
   719	                <div class="inline-block bg-green-100 rounded-full p-6 mb-4">
   720	                    <i class="fas fa-check-circle text-6xl text-green-500"></i>
   721	                </div>
   722	                <h3 class="text-3xl font-bold text-gray-800 mb-2">주문 신청 완료! 🎉</h3>
   723	                <p class="text-gray-600">주문이 성공적으로 접수되었습니다.</p>
   724	                <p class="text-sm text-gray-500 mt-2">주문번호: ${order.id}</p>
   725	            </div>
   726	            
   727	            <div class="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6 mb-6 text-left">
   728	                <h4 class="font-bold text-yellow-800 mb-3">💰 입금 안내</h4>
   729	                <div class="space-y-2 text-sm">
   730	                    <div class="flex justify-between items-center bg-white rounded-lg p-3">
   731	                        <span class="text-gray-600">은행</span>
   732	                        <span class="font-bold text-gray-800">${bankInfo.bank}</span>
   733	                    </div>
   734	                    <div class="flex justify-between items-center bg-white rounded-lg p-3">
   735	                        <span class="text-gray-600">계좌번호</span>
   736	                        <span class="font-bold text-primary text-lg">${bankInfo.account}</span>
   737	                    </div>
   738	                    <div class="flex justify-between items-center bg-white rounded-lg p-3">
   739	                        <span class="text-gray-600">예금주</span>
   740	                        <span class="font-bold text-gray-800">${bankInfo.holder}</span>
   741	                    </div>
   742	                    <div class="flex justify-between items-center bg-white rounded-lg p-3">
   743	                        <span class="text-gray-600">입금액</span>
   744	                        <span class="font-bold text-red-600 text-xl">₩${order.price.toLocaleString()}</span>
   745	                    </div>
   746	                </div>
   747	            </div>
   748	            
   749	            <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 text-left">
   750	                <h4 class="font-bold text-gray-800 mb-3">📱 다음 단계</h4>
   751	                <ul class="space-y-2 text-sm text-gray-700">
   752	                    <li class="flex items-start">
   753	                        <i class="fas fa-check text-primary mr-2 mt-1"></i>
   754	                        <span>위 계좌로 입금해주시면 확인 후 연락드립니다.</span>
   755	                    </li>
   756	                    <li class="flex items-start">
   757	                        <i class="fas fa-check text-primary mr-2 mt-1"></i>
   758	                        <span>입금 확인 후 상담 작업이 시작됩니다.</span>
   759	                    </li>
   760	                    <li class="flex items-start">
   761	                        <i class="fas fa-check text-primary mr-2 mt-1"></i>
   762	                        <span>상세한 텍스트 리포트는 이메일(<strong>${order.customerInfo.email}</strong>)로 발송됩니다 (1-2일 소요).</span>
   763	                    </li>
   764	                    <li class="flex items-start">
   765	                        <i class="fas fa-phone text-primary mr-2 mt-1"></i>
   766	                        <span>문의사항: <strong>santlee@naver.com</strong> 또는 카카오톡 채널</span>
   767	                    </li>
   768	                </ul>
   769	            </div>
   770	            
   771	            <div class="space-y-3">
   772	                <button onclick="window.open('${kakaoChannel.url}', '_blank')" class="w-full bg-yellow-400 text-gray-800 px-12 py-4 rounded-full font-bold hover:bg-yellow-500 transition transform hover:scale-105">
   773	                    <i class="fas fa-comment mr-2"></i> 카카오톡 채널로 문의하기
   774	                </button>
   775	                <button onclick="closeConsultModal(); location.reload();" class="w-full btn-primary px-12 py-4">
   776	                    확인
   777	                </button>
   778	            </div>
   779	        </div>
   780	    `;
   781	}
   782	
