import type { Chapter } from "../../../types/grammar";

export const chapter3: Chapter = {
  "id": 3,
  "title": "نَصِيحَةُ إِبْرَاهِيمَ",
  "translation": "The Advice of Ibrahim",
  "source": "Qisas an-Nabiyeen (Story 1: Sayyiduna Ibrahim AS)",
  "sentences": [
    {
      "id": "ch3_s1",
      "order": 1,
      "text": "وَكَانَ إِبْرَاهِيمُ يَسْأَلُ قَوْمَهُ.",
      "translation": "And Ibrahim used to ask his people.",
      "tokens": [
        "وَ",
        "كَانَ",
        "إِبْرَاهِيمُ",
        "يَسْأَلُ",
        "قَوْمَ",
        "ـهُ"
      ],
      "tree": [
        {
          "id": "c3_1_1",
          "span": [
            0,
            0
          ],
          "roles": [
            "حَرْفُ اسْتِئْنَافٍ",
            "حَرْفُ عَطْفٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c3_1_2",
          "span": [
            1,
            1
          ],
          "roles": [
            "فِعْلٌ مَاضٍ نَاقِصٌ"
          ],
          "category": "afal_naqisah"
        },
        {
          "id": "c3_1_3",
          "span": [
            2,
            2
          ],
          "roles": [
            "اِسْمُ كَانَ"
          ],
          "category": "marfooat"
        },
        {
          "id": "c3_1_8",
          "span": [
            3,
            5
          ],
          "roles": [
            "خَبَرُ كَانَ (جُمْلَةٌ فِعْلِيَّةٌ)"
          ],
          "category": "tarkib_jumla",
          "children": [
            {
              "id": "c3_1_4",
              "span": [
                3,
                3
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah",
              "taqdeer": "وَفَاعِلُهُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ (هُوَ)"
            },
            {
              "id": "c3_1_7",
              "span": [
                4,
                5
              ],
              "roles": [
                "مُرَكَّبٌ إِضَافِيٌّ"
              ],
              "category": "murakkabat",
              "children": [
                {
                  "id": "c3_1_5",
                  "span": [
                    4,
                    4
                  ],
                  "roles": [
                    "مَفْعُولٌ بِهِ"
                  ],
                  "category": "mansoobat"
                },
                {
                  "id": "c3_1_6",
                  "span": [
                    5,
                    5
                  ],
                  "roles": [
                    "مُضَافٌ إِلَيْهِ"
                  ],
                  "category": "majroorat"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ch3_s2",
      "order": 2,
      "text": "هَلْ تَسْمَعُ هَذِهِ الأَصْنَامُ؟",
      "translation": "Do these idols hear?",
      "tokens": [
        "هَلْ",
        "تَسْمَعُ",
        "هَـٰذِهِ",
        "الأَصْنَامُ"
      ],
      "tree": [
        {
          "id": "c3_2_1",
          "span": [
            0,
            0
          ],
          "roles": [
            "حَرْفُ اسْتِفْهَامٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c3_2_2",
          "span": [
            1,
            1
          ],
          "roles": [
            "فِعْلٌ مُضَارِعٌ"
          ],
          "category": "afal_tammah"
        },
        {
          "id": "c3_2_5",
          "span": [
            2,
            3
          ],
          "roles": [
            "مُرَكَّبٌ إِشَارِيٌّ"
          ],
          "category": "murakkabat",
          "children": [
            {
              "id": "c3_2_3",
              "span": [
                2,
                2
              ],
              "roles": [
                "اِسْمُ إِشَارَةٍ",
                "فَاعِلٌ"
              ],
              "category": "marfooat"
            },
            {
              "id": "c3_2_4",
              "span": [
                3,
                3
              ],
              "roles": [
                "بَدَلٌ"
              ],
              "category": "tawabi"
            }
          ]
        }
      ]
    },
    {
      "id": "ch3_s3",
      "order": 3,
      "text": "هَلْ تَنْفَعُ هَذِهِ الأَصْنَامُ أَوْ تَضُرُّ؟",
      "translation": "Do these idols benefit or harm?",
      "tokens": [
        "هَلْ",
        "تَنْفَعُ",
        "هَـٰذِهِ",
        "الأَصْنَامُ",
        "أَوْ",
        "تَضُرُّ"
      ],
      "tree": [
        {
          "id": "c3_3_1",
          "span": [
            0,
            0
          ],
          "roles": [
            "حَرْفُ اسْتِفْهَامٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c3_3_2",
          "span": [
            1,
            1
          ],
          "roles": [
            "فِعْلٌ مُضَارِعٌ"
          ],
          "category": "afal_tammah"
        },
        {
          "id": "c3_3_7",
          "span": [
            2,
            3
          ],
          "roles": [
            "مُرَكَّبٌ إِشَارِيٌّ"
          ],
          "category": "murakkabat",
          "children": [
            {
              "id": "c3_3_3",
              "span": [
                2,
                2
              ],
              "roles": [
                "اِسْمُ إِشَارَةٍ",
                "فَاعِلٌ"
              ],
              "category": "marfooat"
            },
            {
              "id": "c3_3_4",
              "span": [
                3,
                3
              ],
              "roles": [
                "بَدَلٌ"
              ],
              "category": "tawabi"
            }
          ]
        },
        {
          "id": "c3_3_5",
          "span": [
            4,
            4
          ],
          "roles": [
            "حَرْفُ عَطْفٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c3_3_6",
          "span": [
            5,
            5
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah",
          "taqdeer": "فِعْلٌ مُضَارِعٌ مَعْطُوفٌ وَفَاعِلُهُ ضَمِيرٌ مُسْتَتِرٌ (هِيَ)"
        }
      ]
    },
    {
      "id": "ch3_s4",
      "order": 4,
      "text": "فَيَقُولُونَ: لَا!",
      "translation": "So they would say: No!",
      "tokens": [
        "فَـ",
        "يَقُولُونَ",
        "لَا"
      ],
      "tree": [
        {
          "id": "c3_4_1",
          "span": [
            0,
            0
          ],
          "roles": [
            "حَرْفُ عَطْفٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c3_4_2",
          "span": [
            1,
            1
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah",
          "taqdeer": "وَالْوَاوُ ضَمِيرٌ مُتَّصِلٌ فِي مَحَلِّ رَفْعٍ فَاعِلٌ"
        },
        {
          "id": "c3_4_3",
          "span": [
            2,
            2
          ],
          "roles": [
            "حَرْفُ نَفْيٍ",
            "مَقُولُ الْقَوْلِ"
          ],
          "category": "huruf"
        }
      ]
    },
    {
      "id": "ch3_s5",
      "order": 5,
      "text": "فَيَقُولُ إِبْرَاهِيمُ: فَلِمَ تَعْبُدُونَهَا؟",
      "translation": "So Ibrahim would say: Then why do you worship them?",
      "tokens": [
        "فَـ",
        "يَقُولُ",
        "إِبْرَاهِيمُ",
        "فَـ",
        "لِـ",
        "مَ",
        "تَعْبُدُونَ",
        "ـهَا"
      ],
      "tree": [
        {
          "id": "c3_5_1",
          "span": [
            0,
            0
          ],
          "roles": [
            "حَرْفُ عَطْفٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c3_5_2",
          "span": [
            1,
            1
          ],
          "roles": [
            "فِعْلٌ مُضَارِعٌ"
          ],
          "category": "afal_tammah"
        },
        {
          "id": "c3_5_3",
          "span": [
            2,
            2
          ],
          "roles": [
            "فَاعِلٌ"
          ],
          "category": "marfooat"
        },
        {
          "id": "c3_5_9",
          "span": [
            3,
            7
          ],
          "roles": [
            "مَقُولُ الْقَوْلِ"
          ],
          "category": "tarkib_jumla",
          "children": [
            {
              "id": "c3_5_4",
              "span": [
                3,
                3
              ],
              "roles": [
                "حَرْفُ اسْتِئْنَافٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c3_5_5",
              "span": [
                4,
                4
              ],
              "roles": [
                "حَرْفُ جَرٍّ"
              ],
              "category": "huruf"
            },
            {
              "id": "c3_5_6",
              "span": [
                5,
                5
              ],
              "roles": [
                "اِسْمٌ مَجْرُورٌ (بِحَرْفِ الْجَرِّ)"
              ],
              "category": "majroorat",
              "taqdeer": "مَا الِاسْتِفْهَامِيَّةُ حُذِفَتْ أَلِفُهَا لِدُخُولِ حَرْفِ الْجَرِّ"
            },
            {
              "id": "c3_5_7",
              "span": [
                6,
                6
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah"
            },
            {
              "id": "c3_5_8",
              "span": [
                7,
                7
              ],
              "roles": [
                "مَفْعُولٌ بِهِ"
              ],
              "category": "mansoobat"
            }
          ]
        }
      ]
    },
    {
      "id": "ch3_s6",
      "order": 6,
      "text": "فَيَقُولُونَ: بَلْ وَجَدْنَا آبَاءَنَا كَذَلِكَ يَفْعَلُونَ.",
      "translation": "So they would say: Nay, we found our fathers doing likewise.",
      "tokens": [
        "فَـ",
        "يَقُولُونَ",
        "بَلْ",
        "وَجَدْنَا",
        "آبَاءَ",
        "ـنَا",
        "كَـ",
        "ذٰلِكَ",
        "يَفْعَلُونَ"
      ],
      "tree": [
        {
          "id": "c3_6_1",
          "span": [
            0,
            0
          ],
          "roles": [
            "حَرْفُ عَطْفٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c3_6_2",
          "span": [
            1,
            1
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah"
        },
        {
          "id": "c3_6_12",
          "span": [
            2,
            8
          ],
          "roles": [
            "مَقُولُ الْقَوْلِ"
          ],
          "category": "tarkib_jumla",
          "children": [
            {
              "id": "c3_6_3",
              "span": [
                2,
                2
              ],
              "roles": [
                "حَرْفُ عَطْفٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c3_6_4",
              "span": [
                3,
                3
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah",
              "taqdeer": "فِعْلٌ مَاضٍ وَ(نَا) ضَمِيرٌ مُتَّصِلٌ فِي مَحَلِّ رَفْعٍ فَاعِلٌ"
            },
            {
              "id": "c3_6_10",
              "span": [
                4,
                5
              ],
              "roles": [
                "مُرَكَّبٌ إِضَافِيٌّ"
              ],
              "category": "murakkabat",
              "children": [
                {
                  "id": "c3_6_5",
                  "span": [
                    4,
                    4
                  ],
                  "roles": [
                    "مَفْعُولٌ بِهِ"
                  ],
                  "category": "mansoobat"
                },
                {
                  "id": "c3_6_6",
                  "span": [
                    5,
                    5
                  ],
                  "roles": [
                    "مُضَافٌ إِلَيْهِ"
                  ],
                  "category": "majroorat"
                }
              ]
            },
            {
              "id": "c3_6_11",
              "span": [
                6,
                7
              ],
              "roles": [
                "شِبْهُ جُمْلَةٍ (مُتَعَلِّقٌ بِمَحْذُوفٍ)"
              ],
              "category": "tarkib_jumla",
              "children": [
                {
                  "id": "c3_6_7",
                  "span": [
                    6,
                    6
                  ],
                  "roles": [
                    "حَرْفُ جَرٍّ"
                  ],
                  "category": "huruf"
                },
                {
                  "id": "c3_6_8",
                  "span": [
                    7,
                    7
                  ],
                  "roles": [
                    "اِسْمُ إِشَارَةٍ",
                    "اِسْمٌ مَجْرُورٌ (بِحَرْفِ الْجَرِّ)"
                  ],
                  "category": "majroorat"
                }
              ]
            },
            {
              "id": "c3_6_9",
              "span": [
                8,
                8
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah"
            }
          ]
        }
      ]
    },
    {
      "id": "ch3_s7",
      "order": 7,
      "text": "وَكَانَ إِبْرَاهِيمُ يَقُولُ لِأَبِيهِ آزَرَ.",
      "translation": "And Ibrahim used to say to his father Azar.",
      "tokens": [
        "وَ",
        "كَانَ",
        "إِبْرَاهِيمُ",
        "يَقُولُ",
        "لِـ",
        "أَبِي",
        "ـهِ",
        "آزَرَ"
      ],
      "tree": [
        {
          "id": "c3_7_1",
          "span": [
            0,
            0
          ],
          "roles": [
            "حَرْفُ اسْتِئْنَافٍ",
            "حَرْفُ عَطْفٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c3_7_2",
          "span": [
            1,
            1
          ],
          "roles": [
            "فِعْلٌ مَاضٍ نَاقِصٌ"
          ],
          "category": "afal_naqisah"
        },
        {
          "id": "c3_7_3",
          "span": [
            2,
            2
          ],
          "roles": [
            "اِسْمُ كَانَ"
          ],
          "category": "marfooat"
        },
        {
          "id": "c3_7_11",
          "span": [
            3,
            7
          ],
          "roles": [
            "خَبَرُ كَانَ (جُمْلَةٌ فِعْلِيَّةٌ)"
          ],
          "category": "tarkib_jumla",
          "children": [
            {
              "id": "c3_7_4",
              "span": [
                3,
                3
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah",
              "taqdeer": "وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ (هُوَ)"
            },
            {
              "id": "c3_7_10",
              "span": [
                4,
                7
              ],
              "roles": [
                "مُتَعَلِّقٌ بِالْفِعْلِ"
              ],
              "category": "tarkib_jumla",
              "children": [
                {
                  "id": "c3_7_5",
                  "span": [
                    4,
                    4
                  ],
                  "roles": [
                    "حَرْفُ جَرٍّ"
                  ],
                  "category": "huruf"
                },
                {
                  "id": "c3_7_9",
                  "span": [
                    5,
                    6
                  ],
                  "roles": [
                    "مُرَكَّبٌ إِضَافِيٌّ"
                  ],
                  "category": "murakkabat",
                  "children": [
                    {
                      "id": "c3_7_6",
                      "span": [
                        5,
                        5
                      ],
                      "roles": [
                        "اِسْمٌ مَجْرُورٌ (بِحَرْفِ الْجَرِّ)"
                      ],
                      "category": "majroorat",
                      "taqdeer": "مَجْرُورٌ بِالْيَاءِ لِأَنَّهُ مِنَ الْأَسْمَاءِ الْخَمْسَةِ"
                    },
                    {
                      "id": "c3_7_7",
                      "span": [
                        6,
                        6
                      ],
                      "roles": [
                        "مُضَافٌ إِلَيْهِ"
                      ],
                      "category": "majroorat"
                    }
                  ]
                },
                {
                  "id": "c3_7_8",
                  "span": [
                    7,
                    7
                  ],
                  "roles": [
                    "بَدَلٌ"
                  ],
                  "category": "tawabi",
                  "taqdeer": "بَدَلٌ مَجْرُورٌ بِالْفَتْحَةِ لِأَنَّهُ مَمْنُوعٌ مِنَ الصَّرْفِ"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ch3_s8",
      "order": 8,
      "text": "يَا أَبَتِ لِمَ تَعْبُدُ مَا لَا يَسْمَعُ وَلَا يُبْصِرُ؟",
      "translation": "O my father! Why do you worship that which does not hear and does not see?",
      "tokens": [
        "يَا",
        "أَبَتِ",
        "لِـ",
        "مَ",
        "تَعْبُدُ",
        "مَا",
        "لَا",
        "يَسْمَعُ",
        "وَ",
        "لَا",
        "يُبْصِرُ"
      ],
      "tree": [
        {
          "id": "c3_8_1",
          "span": [
            0,
            0
          ],
          "roles": [
            "حَرْفُ نِدَاءٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c3_8_2",
          "span": [
            1,
            1
          ],
          "roles": [
            "مَفْعُولٌ بِهِ"
          ],
          "category": "mansoobat",
          "taqdeer": "مُنَادَى مُضَافٌ فِي مَحَلِّ نَصْبٍ"
        },
        {
          "id": "c3_8_3",
          "span": [
            2,
            2
          ],
          "roles": [
            "حَرْفُ جَرٍّ"
          ],
          "category": "huruf"
        },
        {
          "id": "c3_8_4",
          "span": [
            3,
            3
          ],
          "roles": [
            "اِسْمٌ مَجْرُورٌ (بِحَرْفِ الْجَرِّ)"
          ],
          "category": "majroorat"
        },
        {
          "id": "c3_8_5",
          "span": [
            4,
            4
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah",
          "taqdeer": "فِعْلٌ مُضَارِعٌ وَفَاعِلُهُ ضَمِيرٌ مُسْتَتِرٌ (أَنْتَ)"
        },
        {
          "id": "c3_8_6",
          "span": [
            5,
            5
          ],
          "roles": [
            "مَفْعُولٌ بِهِ"
          ],
          "category": "mansoobat",
          "taqdeer": "اِسْمٌ مَوْصُولٌ فِي مَحَلِّ نَصْبٍ مَفْعُولٌ بِهِ"
        },
        {
          "id": "c3_8_12",
          "span": [
            6,
            10
          ],
          "roles": [
            "صِلَةُ الْمَوْصُولِ"
          ],
          "category": "tarkib_jumla",
          "children": [
            {
              "id": "c3_8_7",
              "span": [
                6,
                6
              ],
              "roles": [
                "حَرْفُ نَفْيٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c3_8_8",
              "span": [
                7,
                7
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah",
              "taqdeer": "وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ (هُوَ)"
            },
            {
              "id": "c3_8_9",
              "span": [
                8,
                8
              ],
              "roles": [
                "حَرْفُ عَطْفٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c3_8_10",
              "span": [
                9,
                9
              ],
              "roles": [
                "حَرْفُ نَفْيٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c3_8_11",
              "span": [
                10,
                10
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah",
              "taqdeer": "وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ (هُوَ)",
              "sarf": {
                "family": 4,
                "person": "3rd",
                "number": "singular",
                "gender": "masc"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "ch3_s9",
      "order": 9,
      "text": "وَكَانَ آزَرُ يَغْضَبُ وَلَا يَفْهَمُ.",
      "translation": "And Azar used to become angry and did not understand.",
      "tokens": [
        "وَ",
        "كَانَ",
        "آزَرُ",
        "يَغْضَبُ",
        "وَ",
        "لَا",
        "يَفْهَمُ"
      ],
      "tree": [
        {
          "id": "c3_9_1",
          "span": [
            0,
            0
          ],
          "roles": [
            "حَرْفُ اسْتِئْنَافٍ",
            "حَرْفُ عَطْفٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c3_9_2",
          "span": [
            1,
            1
          ],
          "roles": [
            "فِعْلٌ مَاضٍ نَاقِصٌ"
          ],
          "category": "afal_naqisah"
        },
        {
          "id": "c3_9_3",
          "span": [
            2,
            2
          ],
          "roles": [
            "اِسْمُ كَانَ"
          ],
          "category": "marfooat"
        },
        {
          "id": "c3_9_4",
          "span": [
            3,
            3
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah",
          "taqdeer": "وَفَاعِلُهُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ (هُوَ)"
        },
        {
          "id": "c3_9_8",
          "span": [
            3,
            3
          ],
          "roles": [
            "خَبَرُ كَانَ (جُمْلَةٌ فِعْلِيَّةٌ)"
          ],
          "category": "tarkib_jumla"
        },
        {
          "id": "c3_9_5",
          "span": [
            4,
            4
          ],
          "roles": [
            "حَرْفُ عَطْفٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c3_9_6",
          "span": [
            5,
            5
          ],
          "roles": [
            "حَرْفُ نَفْيٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c3_9_7",
          "span": [
            6,
            6
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah",
          "taqdeer": "وَفَاعِلُهُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ (هُوَ)"
        }
      ]
    }
  ]
};

export default chapter3;
