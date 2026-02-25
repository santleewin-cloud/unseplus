// Admin Panel JavaScript for 운세플러스
     2	// Price Management System
     3	
     4	// Default credentials (실제 운영 시 서버 측 인증으로 변경 필요)
     5	const ADMIN_CREDENTIALS = {
     6	    username: 'admin',
     7	    password: 'unseplus2026'
     8	};
     9	
    10	// Load categories from consultation.js structure
    11	let categories = {
    12	    basic: {
    13	        name: '기본 운세',
    14	        icon: '🔮',
    15	        subcategories: [
    16	            { id: 'monthly', name: '월별운세', price: 40000 },
    17	            { id: 'newyear', name: '신년운세', price: 50000 },
    18	            { id: 'newyear_premium', name: '신년운세 프리미엄', price: 80000 },
    19	            { id: 'lifesaju', name: '평생사주풀이', price: 100000 },
    20	            { id: 'saju_premium', name: '정통사주 프리미엄', price: 150000 }
    21	        ]
    22	    },
    23	    special: {
    24	        name: '특화 운세',
    25	        icon: '💕',
    26	        subcategories: [
    27	            { id: 'love', name: '연애운', price: 30000 },
    28	            { id: 'reunion', name: '재회운', price: 35000 },
    29	            { id: 'wealth', name: '재물운', price: 30000 },
    30	            { id: 'lottery', name: '로또운', price: 25000 },
    31	            { id: 'exam', name: '합격운', price: 35000 },
    32	            { id: 'job', name: '취업운', price: 35000 },
    33	            { id: 'health', name: '건강운', price: 30000 },
    34	            { id: 'moving', name: '이사운', price: 30000 }
    35	        ]
    36	    },
    37	    mz: {
    38	        name: 'MZ 특화',
    39	        icon: '💫',
    40	        subcategories: [
    41	            { id: 'findlove', name: '내 사랑 찾기', price: 35000 },
    42	            { id: 'maturelove', name: '성숙한 연애 비법', price: 40000 },
    43	            { id: 'movieromance', name: '영화같은 로맨스', price: 45000 },
    44	            { id: 'elegantlove', name: '우아한 연애 비법', price: 40000 },
    45	            { id: 'destinystory', name: '운명 이야기', price: 50000 },
    46	            { id: 'destinyecho', name: '운명의 메아리', price: 45000 },
    47	            { id: 'magnetattract', name: '자석 매력', price: 35000 },
    48	            { id: 'crushcheck', name: '짝사랑 알아보기', price: 30000 }
    49	        ]
    50	    }
    51	};
    52	
    53	let consultMethods = [
    54	    { id: 'kakao', name: '카톡 상담', icon: '📱', description: '실시간 1:1 채팅', price: 30000 },
    55	    { id: 'email', name: '이메일 상담', icon: '📧', description: '상세한 텍스트 리포트', price: 25000 },
    56	    { id: 'phone', name: '전화 상담', icon: '📞', description: '20분 통화', price: 40000 },
    57	    { id: 'video', name: '화상 상담', icon: '🎥', description: '30분 ZOOM', price: 50000 }
    58	];
    59	
    60	// Initialize
    61	document.addEventListener('DOMContentLoaded', function() {
    62	    loadSavedData();
    63	    
    64	    // Login form
    65	    const loginForm = document.getElementById('loginForm');
    66	    if (loginForm) {
    67	        loginForm.addEventListener('submit', handleLogin);
    68	    }
    69	    
    70	    // Check if already logged in
    71	    if (localStorage.getItem('adminLoggedIn') === 'true') {
    72	        showDashboard();
    73	    }
    74	});
    75	
    76	// Current active tab
    77	let currentTab = 'orders';
    78	let currentFilter = 'all';
    79	
    80	// Show tab
    81	function showTab(tabName) {
    82	    currentTab = tabName;
    83	    
    84	    // Update tab buttons
    85	    document.querySelectorAll('.tab-btn').forEach(btn => {
    86	        btn.classList.remove('active', 'border-primary', 'text-primary');
    87	        btn.classList.add('text-gray-600');
    88	    });
    89	    
    90	    if (tabName === 'orders') {
    91	        document.getElementById('tabOrders').classList.add('active', 'border-primary', 'text-primary');
    92	        document.getElementById('tabOrders').classList.remove('text-gray-600');
    93	    } else {
    94	        document.getElementById('tabPrices').classList.add('active', 'border-primary', 'text-primary');
    95	        document.getElementById('tabPrices').classList.remove('text-gray-600');
    96	    }
    97	    
    98	    // Show/hide content
    99	    document.getElementById('ordersTab').classList.toggle('hidden', tabName !== 'orders');
   100	    document.getElementById('pricesTab').classList.toggle('hidden', tabName !== 'prices');
   101	    
   102	    if (tabName === 'orders') {
   103	        loadOrders();
   104	    }
   105	}
   106	
   107	// Handle login
   108	function handleLogin(e) {
   109	    e.preventDefault();
   110	    
   111	    const username = document.getElementById('adminId').value;
   112	    const password = document.getElementById('adminPassword').value;
   113	    
   114	    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
   115	        localStorage.setItem('adminLoggedIn', 'true');
   116	        showNotification('로그인 성공! 환영합니다. 🎉', 'success');
   117	        setTimeout(() => {
   118	            showDashboard();
   119	        }, 500);
   120	    } else {
   121	        showNotification('아이디 또는 비밀번호가 올바르지 않습니다.', 'error');
   122	    }
   123	}
   124	
   125	// Show dashboard
   126	function showDashboard() {
   127	    document.getElementById('loginScreen').classList.add('hidden');
   128	    document.getElementById('adminDashboard').classList.remove('hidden');
   129	    
   130	    // Show orders tab by default
   131	    showTab('orders');
   132	    
   133	    renderPriceInputs();
   134	    updateStats();
   135	}
   136	
   137	// Load orders
   138	function loadOrders() {
   139	    const orders = JSON.parse(localStorage.getItem('unseplus_orders') || '[]');
   140	    
   141	    // Update stats
   142	    document.getElementById('totalOrders').textContent = orders.length;
   143	    document.getElementById('pendingOrders').textContent = orders.filter(o => o.status === 'pending').length;
   144	    document.getElementById('processingOrders').textContent = orders.filter(o => o.status === 'processing').length;
   145	    document.getElementById('completedOrders').textContent = orders.filter(o => o.status === 'completed').length;
   146	    
   147	    // Render orders
   148	    renderOrders(orders);
   149	}
   150	
   151	// Render orders
   152	function renderOrders(orders) {
   153	    const container = document.getElementById('ordersList');
   154	    
   155	    if (orders.length === 0) {
   156	        container.innerHTML = `
   157	            <div class="bg-white rounded-2xl shadow-lg p-12 text-center">
   158	                <div class="text-6xl mb-4">📦</div>
   159	                <h3 class="text-xl font-bold text-gray-800 mb-2">주문 내역이 없습니다</h3>
   160	                <p class="text-gray-600">고객이 주문을 신청하면 여기에 표시됩니다.</p>
   161	            </div>
   162	        `;
   163	        return;
   164	    }
   165	    
   166	    // Filter orders
   167	    let filteredOrders = orders;
   168	    if (currentFilter !== 'all') {
   169	        filteredOrders = orders.filter(o => o.status === currentFilter);
   170	    }
   171	    
   172	    // Search orders
   173	    const searchTerm = document.getElementById('searchOrders')?.value.toLowerCase();
   174	    if (searchTerm) {
   175	        filteredOrders = filteredOrders.filter(o => 
   176	            o.id.toLowerCase().includes(searchTerm) ||
   177	            o.customerInfo.name.toLowerCase().includes(searchTerm) ||
   178	            o.customerInfo.email.toLowerCase().includes(searchTerm)
   179	        );
   180	    }
   181	    
   182	    container.innerHTML = filteredOrders.map(order => `
   183	        <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
   184	            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
   185	                <div class="flex-1">
   186	                    <div class="flex items-center gap-3 mb-2">
   187	                        <h3 class="text-lg font-bold text-gray-800">${order.id}</h3>
   188	                        ${getStatusBadge(order.status)}
   189	                    </div>
   190	                    <p class="text-sm text-gray-600">
   191	                        <i class="far fa-calendar mr-1"></i>
   192	                        ${new Date(order.orderDate).toLocaleString('ko-KR')}
   193	                    </p>
   194	                </div>
   195	                <div class="flex gap-2">
   196	                    ${order.status === 'pending' ? `
   197	                        <button onclick="updateOrderStatus('${order.id}', 'processing')" 
   198	                            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm">
   199	                            <i class="fas fa-play mr-1"></i>처리 시작
   200	                        </button>
  ` : ''}
   202	                    ${order.status === 'processing' ? `
   203	                        <button onclick="updateOrderStatus('${order.id}', 'completed')" 
   204	                            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm">
   205	                            <i class="fas fa-check mr-1"></i>완료 처리
   206	                        </button>
   207	                    ` : ''}
   208	                    <button onclick="viewOrderDetail('${order.id}')" 
   209	                        class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition text-sm">
   210	                        <i class="fas fa-eye mr-1"></i>상세
   211	                    </button>
   212	                    <button onclick="deleteOrder('${order.id}')" 
   213	                        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm">
   214	                        <i class="fas fa-trash mr-1"></i>삭제
   215	                    </button>
   216	                </div>
   217	            </div>
   218	            
   219	            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50 rounded-xl p-4">
   220	                <div>
   221	                    <p class="text-xs text-gray-500 mb-1">상담 종류</p>
   222	                    <p class="font-bold text-gray-800">${order.categoryName}</p>
   223	                    <p class="text-sm text-gray-600">${order.subcategoryName}</p>
   224	                </div>
   225	                <div>
   226	                    <p class="text-xs text-gray-500 mb-1">고객 정보</p>
   227	                    <p class="font-bold text-gray-800">${order.customerInfo.name}</p>
   228	                    <p class="text-sm text-gray-600">${order.customerInfo.birthdate}</p>
   229	                </div>
   230	                <div>
   231	                    <p class="text-xs text-gray-500 mb-1">연락처</p>
   232	                    <p class="font-bold text-gray-800">${order.customerInfo.phone}</p>
   233	                    <p class="text-sm text-gray-600 truncate">${order.customerInfo.email}</p>
   234	                </div>
   235	                <div>
   236	                    <p class="text-xs text-gray-500 mb-1">금액</p>
   237	                    <p class="font-bold text-primary text-lg">₩${order.price.toLocaleString()}</p>
   238	                    <p class="text-sm text-gray-600">${getContactMethodLabel(order.contactMethod)}</p>
   239	                </div>
   240	            </div>
   241	        </div>
   242	    `).join('');
   243	}
   244	
   245	// Get status badge
   246	function getStatusBadge(status) {
   247	    const badges = {
   248	        pending: '<span class="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">대기중</span>',
   249	        processing: '<span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">처리중</span>',
   250	        completed: '<span class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">완료</span>',
   251	        cancelled: '<span class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">취소</span>'
   252	    };
   253	    return badges[status] || '';
   254	}
   255	
   256	// Get contact method label
   257	function getContactMethodLabel(method) {
   258	    return method === 'email' ? '📧 이메일' : '💬 카카오톡';
   259	}
   260	
   261	// Filter orders
   262	function filterOrders(status) {
   263	    currentFilter = status;
   264	    
   265	    // Update filter buttons
   266	    document.querySelectorAll('.filter-btn').forEach(btn => {
   267	        btn.classList.remove('bg-primary', 'text-white');
   268	        btn.classList.add('bg-gray-200', 'text-gray-700');
   269	    });
   270	    event.target.classList.remove('bg-gray-200', 'text-gray-700');
   271	    event.target.classList.add('bg-primary', 'text-white');
   272	    
   273	    loadOrders();
   274	}
   275	
   276	// Search orders
   277	function searchOrders() {
   278	    loadOrders();
   279	}
   280	
   281	// Refresh orders
   282	function refreshOrders() {
   283	    loadOrders();
   284	    showNotification('주문 목록이 새로고침되었습니다.', 'success');
   285	}
   286	
   287	// Update order status
   288	function updateOrderStatus(orderId, newStatus) {
   289	    let orders = JSON.parse(localStorage.getItem('unseplus_orders') || '[]');
   290	    const orderIndex = orders.findIndex(o => o.id === orderId);
   291	    
   292	    if (orderIndex !== -1) {
   293	        orders[orderIndex].status = newStatus;
   294	        orders[orderIndex].updatedAt = new Date().toISOString();
   295	        localStorage.setItem('unseplus_orders', JSON.stringify(orders));
   296	        
   297	        const statusLabels = {
   298	            processing: '처리중',
   299	            completed: '완료'
   300	        };
   301	        
   302	        showNotification(`주문이 ${statusLabels[newStatus]} 상태로 변경되었습니다.`, 'success');
   303	        loadOrders();
   304	    }
   305	}
   306	
   307	// View order detail
   308	function viewOrderDetail(orderId) {
   309	    const orders = JSON.parse(localStorage.getItem('unseplus_orders') || '[]');
   310	    const order = orders.find(o => o.id === orderId);
   311	    
   312	    if (!order) return;
   313	    
   314	    const modal = document.createElement('div');
   315	    modal.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4';
   316	    modal.onclick = (e) => {
   317	        if (e.target === modal) document.body.removeChild(modal);
   318	    };
   319	    
   320	    modal.innerHTML = `
   321	        <div class="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
   322	            <div class="sticky top-0 bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-t-3xl">
   323	                <div class="flex items-center justify-between">
   324	                    <div>
   325	                        <h3 class="text-2xl font-bold">주문 상세 정보</h3>
   326	                        <p class="text-gray-200 text-sm">${order.id}</p>
   327	                    </div>
   328	                    <button onclick="this.closest('.fixed').remove()" class="text-3xl hover:rotate-90 transition-transform">
   329	                        <i class="fas fa-times"></i>
   330	                    </button>
   331	                </div>
   332	            </div>
   333	            
   334	            <div class="p-8 space-y-6">
   335	                <!-- Status -->
   336	                <div>
   337	                    <h4 class="font-bold text-gray-800 mb-3">주문 상태</h4>
   338	                    ${getStatusBadge(order.status)}
   339	                    <p class="text-sm text-gray-600 mt-2">
   340	                        주문일시: ${new Date(order.orderDate).toLocaleString('ko-KR')}
   341	                    </p>
   342	                </div>
   343	                
   344	                <!-- Customer Info -->
   345	                <div>
   346	                    <h4 class="font-bold text-gray-800 mb-3">고객 정보</h4>
   347	                    <div class="bg-gray-50 rounded-xl p-4 space-y-2">
   348	                        <div class="flex justify-between">
   349	                            <span class="text-gray-600">이름</span>
   350	                            <span class="font-bold">${order.customerInfo.name}</span>
   351	                        </div>
   352	                        <div class="flex justify-between">
   353	                            <span class="text-gray-600">생년월일</span>
   354	                            <span class="font-bold">${order.customerInfo.birthdate}</span>
   355	                        </div>
   356	                        ${order.customerInfo.birthtime ? `
   357	                            <div class="flex justify-between">
   358	                                <span class="text-gray-600">생시</span>
   359	                                <span class="font-bold">${order.customerInfo.birthtime}</span>
   360	                            </div>
   361	                        ` : ''}
   362	                        <div class="flex justify-between">
   363	                            <span class="text-gray-600">성별</span>
   364	                            <span class="font-bold">${order.customerInfo.gender === 'male' ? '남성' : '여성'}</span>
   365	                        </div>
   366	                        <div class="flex justify-between">
   367	                            <span class="text-gray-600">연락처</span>
   368	                            <span class="font-bold">${order.customerInfo.phone}</span>
   369	                        </div>
   370	                        <div class="flex justify-between">
   371	                            <span class="text-gray-600">이메일</span>
   372	                            <span class="font-bold">${order.customerInfo.email}</span>
   373	                        </div>
   374	                    </div>
   375	                </div>
   376	                
   377	                <!-- Consultation Info -->
   378	                <div>
   379	                    <h4 class="font-bold text-gray-800 mb-3">상담 정보</h4>
   380	                    <div class="bg-gray-50 rounded-xl p-4 space-y-2">
   381	                        <div class="flex justify-between">
   382	                            <span class="text-gray-600">카테고리</span>
   383	                            <span class="font-bold">${order.categoryName}</span>
   384	                        </div>
   385	                        <div class="flex justify-between">
   386	                            <span class="text-gray-600">세부 상담</span>
   387	                            <span class="font-bold">${order.subcategoryName}</span>
   388	                        </div>
   389	                        <div class="flex justify-between">
   390	                            <span class="text-gray-600">접수 방법</span>
   391	                            <span class="font-bold">${getContactMethodLabel(order.contactMethod)}</span>
   392	                        </div>
   393	                        <div class="flex justify-between">
   394	                            <span class="text-gray-600">금액</span>
   395	                            <span class="font-bold text-primary text-lg">₩${order.price.toLocaleString()}</span>
   396	                        </div>
   397	                    </div>
   398	                </div>
   399	                
   400	                <!-- Concern -->
    ${order.customerInfo.concern ? `
   402	                    <div>
   403	                        <h4 class="font-bold text-gray-800 mb-3">고민 내용</h4>
   404	                        <div class="bg-gray-50 rounded-xl p-4">
   405	                            <p class="text-gray-700 whitespace-pre-wrap">${order.customerInfo.concern}</p>
   406	                        </div>
   407	                    </div>
   408	                ` : ''}
   409	                
   410	                <!-- Actions -->
   411	                <div class="flex gap-3">
   412	                    ${order.status === 'pending' ? `
   413	                        <button onclick="updateOrderStatus('${order.id}', 'processing'); this.closest('.fixed').remove();" 
   414	                            class="flex-1 bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition font-bold">
   415	                            <i class="fas fa-play mr-2"></i>처리 시작
   416	                        </button>
   417	                    ` : ''}
   418	                    ${order.status === 'processing' ? `
   419	                        <button onclick="updateOrderStatus('${order.id}', 'completed'); this.closest('.fixed').remove();" 
   420	                            class="flex-1 bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition font-bold">
   421	                            <i class="fas fa-check mr-2"></i>완료 처리
   422	                        </button>
   423	                    ` : ''}
   424	                    <button onclick="this.closest('.fixed').remove()" 
   425	                        class="flex-1 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition font-bold">
   426	                        닫기
   427	                    </button>
   428	                </div>
   429	            </div>
   430	        </div>
   431	    `;
   432	    
   433	    document.body.appendChild(modal);
   434	}
   435	
   436	// Delete order
   437	function deleteOrder(orderId) {
   438	    if (!confirm('이 주문을 삭제하시겠습니까?')) return;
   439	    
   440	    let orders = JSON.parse(localStorage.getItem('unseplus_orders') || '[]');
   441	    orders = orders.filter(o => o.id !== orderId);
   442	    localStorage.setItem('unseplus_orders', JSON.stringify(orders));
   443	    
   444	    showNotification('주문이 삭제되었습니다.', 'success');
   445	    loadOrders();
   446	}
   447	
   448	// Logout
   449	function logout() {
   450	    if (confirm('로그아웃 하시겠습니까?')) {
   451	        localStorage.removeItem('adminLoggedIn');
   452	        location.reload();
   453	    }
   454	}
   455	
   456	// Load saved data from localStorage
   457	function loadSavedData() {
   458	    const savedCategories = localStorage.getItem('adminCategories');
   459	    const savedMethods = localStorage.getItem('adminConsultMethods');
   460	    
   461	    if (savedCategories) {
   462	        categories = JSON.parse(savedCategories);
   463	    }
   464	    
   465	    if (savedMethods) {
   466	        consultMethods = JSON.parse(savedMethods);
   467	    }
   468	}
   469	
   470	// Render price inputs
   471	function renderPriceInputs() {
   472	    renderCategoryPrices('basic', 'basicPrices');
   473	    renderCategoryPrices('special', 'specialPrices');
   474	    renderCategoryPrices('mz', 'mzPrices');
   475	}
   476	
   477	// Render category prices
   478	function renderCategoryPrices(categoryKey, containerId) {
   479	    const container = document.getElementById(containerId);
   480	    const category = categories[categoryKey];
   481	    
   482	    if (!category) return;
   483	    
   484	    container.innerHTML = category.subcategories.map((item, index) => `
   485	        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 border-2 border-gray-200 rounded-xl hover:border-primary transition">
   486	            <div class="flex items-center">
   487	                <span class="text-2xl mr-3">${category.icon}</span>
   488	                <div>
   489	                    <div class="font-bold text-gray-800">${item.name}</div>
   490	                    <div class="text-xs text-gray-500">ID: ${item.id}</div>
   491	                </div>
   492	            </div>
   493	            <div class="flex items-center">
   494	                <span class="text-gray-600 mr-2">₩</span>
   495	                <input type="number" 
   496	                    id="${categoryKey}_${item.id}" 
   497	                    value="${item.price}" 
   498	                    min="0" 
   499	                    step="1000"
   500	                    class="flex-1 border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-primary focus:ring-2 focus:ring-purple-100 transition"
   501	                    onchange="updatePrice('${categoryKey}', ${index}, this.value)">
   502	            </div>
   503	            <div class="flex gap-2">
   504	                <button onclick="savePrice('${categoryKey}', ${index})" 
   505	                    class="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm">
   506	                    <i class="fas fa-save mr-1"></i>저장
   507	                </button>
   508	                <button onclick="resetPrice('${categoryKey}', ${index})" 
   509	                    class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition text-sm">
   510	                    <i class="fas fa-undo"></i>
   511	                </button>
   512	            </div>
   513	        </div>
   514	    `).join('');
   515	}
   516	
   517	// Update price in memory
   518	function updatePrice(categoryKey, index, newPrice) {
   519	    categories[categoryKey].subcategories[index].price = parseInt(newPrice);
   520	}
   521	
   522	// Save single price
   523	function savePrice(categoryKey, index) {
   524	    const item = categories[categoryKey].subcategories[index];
   525	    localStorage.setItem('adminCategories', JSON.stringify(categories));
   526	    
   527	    // Also update consultation.js categories in localStorage
   528	    updateConsultationData();
   529	    
   530	    showNotification(`${item.name} 가격이 ₩${item.price.toLocaleString()}으로 저장되었습니다.`, 'success');
   531	}
   532	
   533	// Reset single price to default
   534	function resetPrice(categoryKey, index) {
   535	    if (confirm('이 항목을 기본 가격으로 되돌리시겠습니까?')) {
   536	        // Default prices
   537	        const defaults = {
   538	            basic: [40000, 50000, 80000, 100000, 150000],
   539	            special: [30000, 35000, 30000, 25000, 35000, 35000, 30000, 30000],
   540	            mz: [35000, 40000, 45000, 40000, 50000, 45000, 35000, 30000]
   541	        };
   542	        
   543	        categories[categoryKey].subcategories[index].price = defaults[categoryKey][index];
   544	        document.getElementById(`${categoryKey}_${categories[categoryKey].subcategories[index].id}`).value = defaults[categoryKey][index];
   545	        
   546	        savePrice(categoryKey, index);
   547	    }
   548	}
   549	
   550	// Save all prices
   551	function saveAllPrices() {
   552	    localStorage.setItem('adminCategories', JSON.stringify(categories));
   553	    
   554	    // Update consultation.js data
   555	    updateConsultationData();
   556	    
   557	    showNotification('모든 가격이 성공적으로 저장되었습니다! 🎉', 'success');
   558	}
   559	
   560	// Update consultation.js data in localStorage
   561	function updateConsultationData() {
   562	    // Save for consultation.js to use
   563	    localStorage.setItem('consultation_categories', JSON.stringify(categories));
   564	}
   565	
   566	// Update stats
   567	function updateStats() {
   568	    document.getElementById('basicCount').textContent = categories.basic.subcategories.length;
   569	    document.getElementById('specialCount').textContent = categories.special.subcategories.length;
   570	    document.getElementById('mzCount').textContent = categories.mz.subcategories.length;
   571	}
   572	
   573	// Export data as JSON
   574	function exportData() {
   575	    const data = {
   576	        categories: categories,
   577	        consultMethods: consultMethods,
   578	        exportDate: new Date().toISOString(),
   579	        version: '1.0'
   580	    };
   581	    
   582	    const dataStr = JSON.stringify(data, null, 2);
   583	    const dataBlob = new Blob([dataStr], { type: 'application/json' });
   584	    const url = URL.createObjectURL(dataBlob);
   585	    
   586	    const link = document.createElement('a');
   587	    link.href = url;
   588	    link.download = `unseplus-prices-${new Date().toISOString().split('T')[0]}.json`;
   589	    link.click();
   590	    
   591	    showNotification('데이터가 JSON 파일로 다운로드되었습니다.', 'success');
   592	}
   593	
   594	// Reset to default
   595	function resetToDefault() {
   596	    if (confirm('⚠️ 모든 가격을 기본값으로 초기화하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) {
   597	        if (confirm('정말로 초기화하시겠습니까?')) {
   598	            localStorage.removeItem('adminCategories');
   599	            localStorage.removeItem('adminConsultMethods');
   600	            localStorage.removeItem('consultation_categories');
   601	            localStorage.removeItem('consultation_methods');
   602	            
   603	            showNotification('모든 가격이 기본값으로 초기화되었습니다.', 'success');
   604	            
   605	            setTimeout(() => {
   606	                location.reload();
   607	            }, 1500);
   608	        }
   609	    }
   610	}
   611	
   612	// Show notification
   613	function showNotification(message, type = 'info') {
   614	    const notification = document.createElement('div');
   615	    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl max-w-md animate-slide-in`;
   616	    
   617	    const colors = {
   618	        success: 'bg-green-500',
   619	        error: 'bg-red-500',
   620	        info: 'bg-blue-500',
   621	        warning: 'bg-orange-500'
   622	    };
   623	    
   624	    const icons = {
   625	        success: '✅',
   626	        error: '❌',
   627	        info: 'ℹ️',
   628	        warning: '⚠️'
   629	    };
   630	    
   631	    notification.className += ` ${colors[type]} text-white`;
   632	    
   633	    notification.innerHTML = `
   634	        <div class="flex items-center gap-3">
   635	            <span class="text-2xl">${icons[type]}</span>
   636	            <span>${message}</span>
   637	        </div>
   638	    `;
   639	    
   640	    document.body.appendChild(notification);
   641	    
   642	    setTimeout(() => {
   643	        notification.style.animation = 'slide-out 0.3s ease-out';
   644	        setTimeout(() => {
   645	            document.body.removeChild(notification);
   646	        }, 300);
   647	    }, 3000);
   648	}
   649	
   650	// Add animation styles
   651	const style = document.createElement('style');
   652	style.textContent = `
   653	    @keyframes slide-in {
   654	        from {
   655	            transform: translateX(400px);
   656	            opacity: 0;
   657	        }
   658	        to {
   659	            transform: translateX(0);
   660	            opacity: 1;
   661	        }
   662	    }
   663	    
   664	    @keyframes slide-out {
   665	        from {
   666	            transform: translateX(0);
   667	            opacity: 1;
   668	        }
   669	        to {
   670	            transform: translateX(400px);
   671	            opacity: 0;
   672	        }
   673	    }
   674	    
   675	    .animate-slide-in {
   676	        animation: slide-in 0.3s ease-out;
   677	    }
   678	`;
   679	document.head.appendChild(style);
   680	
