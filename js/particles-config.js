// Particles.js Configuration for 운세플러스
     2	// Creates beautiful star particle animation in hero section
     3	
     4	document.addEventListener('DOMContentLoaded', function() {
     5	    if (typeof particlesJS !== 'undefined') {
     6	        particlesJS('particles-js', {
     7	            particles: {
     8	                number: {
     9	                    value: 80,
    10	                    density: {
    11	                        enable: true,
    12	                        value_area: 800
    13	                    }
    14	                },
    15	                color: {
    16	                    value: ['#ffffff', '#FFD700', '#FFB6C1', '#9370DB']
    17	                },
    18	                shape: {
    19	                    type: ['circle', 'star'],
    20	                    stroke: {
    21	                        width: 0,
    22	                        color: '#000000'
    23	                    },
    24	                    polygon: {
    25	                        nb_sides: 5
    26	                    }
    27	                },
    28	                opacity: {
    29	                    value: 0.8,
    30	                    random: true,
    31	                    anim: {
    32	                        enable: true,
    33	                        speed: 1,
    34	                        opacity_min: 0.3,
    35	                        sync: false
    36	                    }
    37	                },
    38	                size: {
    39	                    value: 4,
    40	                    random: true,
    41	                    anim: {
    42	                        enable: true,
    43	                        speed: 2,
    44	                        size_min: 0.5,
    45	                        sync: false
    46	                    }
    47	                },
    48	                line_linked: {
    49	                    enable: true,
    50	                    distance: 150,
    51	                    color: '#ffffff',
    52	                    opacity: 0.2,
    53	                    width: 1
    54	                },
    55	                move: {
    56	                    enable: true,
    57	                    speed: 1.5,
    58	                    direction: 'none',
    59	                    random: true,
    60	                    straight: false,
    61	                    out_mode: 'out',
    62	                    bounce: false,
    63	                    attract: {
    64	                        enable: true,
    65	                        rotateX: 600,
    66	                        rotateY: 1200
    67	                    }
    68	                }
    69	            },
    70	            interactivity: {
    71	                detect_on: 'canvas',
    72	                events: {
    73	                    onhover: {
    74	                        enable: true,
    75	                        mode: 'grab'
    76	                    },
    77	                    onclick: {
    78	                        enable: true,
    79	                        mode: 'push'
    80	                    },
    81	                    resize: true
    82	                },
    83	                modes: {
    84	                    grab: {
    85	                        distance: 140,
    86	                        line_linked: {
    87	                            opacity: 0.5
    88	                        }
    89	                    },
    90	                    push: {
    91	                        particles_nb: 4
    92	                    }
    93	                }
    94	            },
    95	            retina_detect: true
    96	        });
    97	    }
    98	});
    99	
