// Fortune Data for 운세플러스
     2	// Contains fortune data for all 12 zodiac signs
     3	// 명리사주분석 DB - 매일 랜덤 업데이트
     4	
     5	// Fortune templates database
     6	const fortuneTemplates = {
     7	    overall: [
     8	        '오늘은 새로운 시작을 알리는 날입니다. 예상치 못한 행운이 찾아올 수 있으니 긍정적인 마음가짐을 유지하세요.',
     9	        '차분하고 안정적인 하루가 될 것입니다. 꾸준히 노력해온 일들이 결실을 맺기 시작합니다.',
    10	        '당신의 카리스마가 빛을 발하는 날입니다. 리더십을 발휘할 기회가 생기며, 주변의 인정을 받을 것입니다.',
    11	        '평화롭고 조화로운 하루가 될 것입니다. 주변 사람들과의 관계가 더욱 돈독해질 수 있습니다.',
    12	        '행운의 기운이 가득한 날입니다. 큰 성취를 이룰 수 있는 기회가 찾아옵니다.',
    13	        '지혜롭게 판단하고 행동하는 것이 중요한 날입니다. 직관력이 뛰어난 날입니다.',
    14	        '활동적이고 역동적인 하루가 될 것입니다. 새로운 도전을 시작하기 좋은 날입니다.',
    15	        '온화하고 평온한 하루가 될 것입니다. 예술적 감성이 풍부해지는 날입니다.',
    16	        '기발한 아이디어가 샘솟는 날입니다. 창의력을 발휘할 기회가 많습니다.',
    17	        '부지런함이 빛을 발하는 날입니다. 계획한 일들을 차근차근 진행하세요.',
    18	        '충성스럽고 진실한 마음이 빛을 발하는 날입니다. 주변 사람들의 신뢰를 얻을 수 있습니다.',
    19	        '풍요롭고 행복한 하루가 될 것입니다. 긍정적인 에너지가 가득하며, 주변에 행운을 나누게 됩니다.'
    20	    ],
    21	    love: [
    22	        '솔로라면 친구 소개로 좋은 인연을 만날 수 있습니다. 커플이라면 서로를 더 깊이 이해하는 시간을 가져보세요.',
    23	        '진지한 대화가 필요한 시기입니다. 솔로라면 지인의 소개로 인연을 만날 수 있습니다.',
    24	        '열정적인 사랑의 기운이 넘칩니다. 솔로는 적극적인 어프로치가 효과적입니다.',
    25	        '부드럽고 따뜻한 사랑의 에너지가 흐릅니다. 솔로는 자연스러운 만남의 기회가 생깁니다.',
    26	        '드라마틱한 사랑의 전개가 예상됩니다. 솔로는 운명적인 만남의 가능성이 높습니다.',
    27	        '신비로운 매력이 발산되는 날입니다. 솔로는 눈에 띄는 이성의 관심을 받을 수 있습니다.',
    28	        '자유롭고 활기찬 사랑의 에너지가 흐릅니다. 솔로는 여행이나 모임에서 인연을 만날 수 있습니다.',
    29	        '따뜻하고 포근한 사랑의 기운이 가득합니다. 솔로는 편안한 만남을 통해 좋은 인연을 만날 수 있습니다.',
    30	        '재치있고 유쾌한 매력이 빛을 발합니다. 솔로는 위트있는 대화로 이성의 마음을 사로잡습니다.',
    31	        '정성스러운 마음이 전달되는 날입니다. 솔로는 진심 어린 고백이 통할 수 있습니다.',
    32	        '진실한 사랑의 기운이 흐릅니다. 솔로는 믿을 수 있는 사람을 만날 수 있습니다.',
    33	        '따뜻하고 너그러운 마음이 사랑을 끌어당깁니다. 솔로는 편안한 분위기에서 인연을 만납니다.'
    34	    ],
    35	    wealth: [
    36	        '재물운이 상승하는 날입니다. 작은 투자나 저축 계획을 세우기 좋은 날입니다.',
    37	        '안정적인 재물운을 보입니다. 큰 수입보다는 꾸준한 저축이 중요합니다.',
    38	        '적극적인 투자로 수익을 얻을 수 있습니다. 하지만 무리한 투자는 피하세요.',
    39	        '안정적인 재물운입니다. 급하게 돈을 쓸 일이 생길 수 있으니 비상금을 준비해두세요.',
    40	        '재물운이 매우 좋습니다. 예상치 못한 수입이나 횡재수가 있을 수 있습니다.',
    41	        '재물운이 좋지만 신중한 접근이 필요합니다. 장기적인 안목으로 투자 계획을 세우세요.',
    42	        '활발한 경제 활동으로 수입이 증가할 수 있습니다. 다만 충동적인 소비는 자제하세요.',
    43	        '안정적인 재물운입니다. 예술품이나 인테리어 관련 투자가 좋습니다.',
    44	        '기회를 잘 포착하면 재물을 얻을 수 있습니다. 정보를 빠르게 파악하고 행동하세요.',
    45	        '꼼꼼한 재정 관리가 중요합니다. 작은 수입도 소중히 여기고 절약하는 습관이 도움이 됩니다.',
    46	        '정직한 노력이 보상받는 날입니다. 투기보다는 정당한 방법으로 재물을 얻으세요.',
    47	        '재물운이 매우 좋습니다. 예상치 못한 금전적 이득이 생길 수 있습니다.'
    48	    ],
    49	    health: [
    50	        '전반적으로 건강 상태가 양호합니다. 다만 과로하지 않도록 주의하세요.',
    51	        '규칙적인 생활이 건강의 열쇠입니다. 소화기 계통을 조심하세요.',
    52	        '활력이 넘치는 날이지만, 과신은 금물입니다. 무리한 운동보다는 적당한 활동이 좋습니다.',
    53	        '피부와 미용에 신경 쓰기 좋은 날입니다. 충분한 수분 섭취와 휴식이 필요합니다.',
    54	        '에너지가 넘치는 날입니다. 다만 흥분하지 말고 차분함을 유지하세요.',
    55	        '스트레스 관리가 중요합니다. 명상이나 요가 같은 정적인 활동이 도움이 됩니다.',
    56	        '운동하기 좋은 날입니다. 야외 활동이나 스포츠로 활력을 충전하세요.',
    57	        '편안한 휴식이 필요한 날입니다. 따뜻한 차를 마시며 여유를 즐기세요.',
    58	        '활발한 활동으로 피로가 쌓일 수 있습니다. 적절한 휴식과 영양 보충이 필요합니다.',
    59	        '규칙적인 생활 리듬이 건강의 비결입니다. 아침 일찍 일어나 활동하는 것이 좋습니다.',
    60	        '야외 활동이나 산책이 건강에 도움이 됩니다. 신선한 공기를 마시며 스트레스를 해소하세요.',
    61	        '맛있는 음식을 즐기기 좋은 날이지만, 과식은 주의하세요. 적당한 식사량 조절이 필요합니다.'
    62	    ]
    63	};
    64	
    65	const luckyColors = ['파란색', '빨간색', '노란색', '초록색', '보라색', '분홍색', '흰색', '검은색', '주황색', '금색', '은색', '청록색'];
    66	const luckyNumbers = [
    67	    '1, 7, 13', '2, 8, 14', '3, 9, 15', '4, 10, 16', '5, 11, 17', '6, 12, 18',
    68	    '7, 13, 19', '8, 14, 20', '9, 15, 21', '10, 16, 22', '11, 17, 23', '12, 18, 24',
    69	    '3, 7, 21', '5, 15, 25', '1, 11, 31', '2, 12, 22', '4, 14, 24', '6, 16, 26'
    70	];
    71	
    72	// Generate daily fortune based on date
    73	function getDailyFortuneIndex(zodiac) {
    74	    const today = new Date();
    75	    const dateString = today.toDateString();
    76	    const seed = dateString + zodiac;
    77	    
    78	    // Simple hash function for consistent daily random
    79	    let hash = 0;
    80	    for (let i = 0; i < seed.length; i++) {
    81	        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    82	        hash = hash & hash;
    83	    }
    84	    return Math.abs(hash);
    85	}
    86	
    87	// Zodiac icons mapping
    88	const zodiacIcons = {
    89	    '쥐': '🐭', '소': '🐮', '호랑이': '🐯', '토끼': '🐰',
    90	    '용': '🐲', '뱀': '🐍', '말': '🐴', '양': '🐑',
    91	    '원숭이': '🐵', '닭': '🐔', '개': '🐶', '돼지': '🐷'
    92	};
    93	
    94	const fortuneData = {};
    95	
    96	// Generate fortune data for each zodiac
    97	Object.keys(zodiacIcons).forEach(zodiac => {
    98	    const index = getDailyFortuneIndex(zodiac);
    99	    
   100	    fortuneData[zodiac] = {
   101	        icon: zodiacIcons[zodiac],
   102	        overall: fortuneTemplates.overall[index % fortuneTemplates.overall.length],
   103	        love: fortuneTemplates.love[index % fortuneTemplates.love.length],
   104	        wealth: fortuneTemplates.wealth[index % fortuneTemplates.wealth.length],
   105	        health: fortuneTemplates.health[index % fortuneTemplates.health.length],
   106	        luckyColor: luckyColors[index % luckyColors.length] + ', ' + luckyColors[(index + 3) % luckyColors.length],
   107	        luckyNumber: luckyNumbers[index % luckyNumbers.length]
   108	    };
   109	});
   110	
   111	// Get fortune by zodiac sign
   112	function getFortune(zodiac) {
   113	    return fortuneData[zodiac] || null;
   114	}
   115	
   116	// Generate random fortune variation for more dynamic experience
   117	function getRandomFortuneVariation(zodiac) {
   118	    const fortune = getFortune(zodiac);
   119	    if (!fortune) return null;
   120	    
   121	    // You can add variation logic here if needed
   122	    return fortune;
   123	}
   124	
