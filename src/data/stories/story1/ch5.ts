import type { Chapter } from "../../../types/grammar";

export const chapter5: Chapter = {
  "id": 5,
  "title": "مَنْ فَعَلَ هَذَا؟",
  "translation": "Who Did This?",
  "source": "Qisas an-Nabiyeen (Story 1: Sayyiduna Ibrahim AS)",
  "sentences": [
    {
      "id": "s1_c5_s1",
      "order": 1,
      "text": "وَرَجَعَ النَّاسُ وَدَخَلُوا فِي بَيْتِ الأَصْنَامِ.",
      "translation": "And the people returned and entered into the house of idols.",
      "tokens": [
        "وَ",
        "رَجَعَ",
        "النَّاسُ",
        "وَ",
        "دَخَلُوا",
        "فِي",
        "بَيْتِ",
        "الأَصْنَامِ"
      ],
      "tree": [
        {
          "id": "c5_s1_b1",
          "span": [
            0,
            0
          ],
          "roles": [
            "حَرْفُ اسْتِئْنَافٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s1_b2",
          "span": [
            1,
            1
          ],
          "roles": [
            "فِعْلٌ مَاضٍ"
          ],
          "category": "afal_tammah"
        },
        {
          "id": "c5_s1_b3",
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
          "id": "c5_s1_b4",
          "span": [
            3,
            3
          ],
          "roles": [
            "حَرْفُ عَطْفٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s1_b5",
          "span": [
            4,
            4
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah"
        },
        {
          "id": "c5_s1_b10",
          "span": [
            5,
            7
          ],
          "roles": [
            "مُتَعَلِّقٌ بِالْفِعْلِ"
          ],
          "category": "tarkib_jumla",
          "children": [
            {
              "id": "c5_s1_b6",
              "span": [
                5,
                5
              ],
              "roles": [
                "حَرْفُ جَرٍّ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s1_b9",
              "span": [
                6,
                7
              ],
              "roles": [
                "مُرَكَّبٌ إِضَافِيٌّ"
              ],
              "category": "murakkabat",
              "children": [
                {
                  "id": "c5_s1_b7",
                  "span": [
                    6,
                    6
                  ],
                  "roles": [
                    "اِسْمٌ مَجْرُورٌ (بِحَرْفِ الْجَرِّ)"
                  ],
                  "category": "majroorat"
                },
                {
                  "id": "c5_s1_b8",
                  "span": [
                    7,
                    7
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
      "id": "s1_c5_s2",
      "order": 2,
      "text": "وَأَرَادَ النَّاسُ أَنْ يَسْجُدُوا لِلأَصْنَامِ لِأَنَّهُ يَوْمُ عِيدٍ.",
      "translation": "And the people wanted to prostrate to the idols because it was the day of festival.",
      "tokens": [
        "وَ",
        "أَرَادَ",
        "النَّاسُ",
        "أَنْ",
        "يَسْجُدُوا",
        "لِـ",
        "الأَصْنَامِ",
        "لِـ",
        "أَنَّ",
        "ـهُ",
        "يَوْمُ",
        "عِيدٍ"
      ],
      "tree": [
        {
          "id": "c5_s2_b1",
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
          "id": "c5_s2_b2",
          "span": [
            1,
            1
          ],
          "roles": [
            "فِعْلٌ مَاضٍ"
          ],
          "category": "afal_tammah",
          "sarf": {
            "family": 4,
            "person": "3rd",
            "number": "singular",
            "gender": "masc"
          }
        },
        {
          "id": "c5_s2_b3",
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
          "id": "c5_s2_b9",
          "span": [
            3,
            6
          ],
          "roles": [
            "مَفْعُولٌ بِهِ"
          ],
          "category": "mansoobat",
          "taqdeer": "مَصْدَرٌ مُؤَوَّلٌ فِي مَحَلِّ نَصْبٍ مَفْعُولٌ بِهِ",
          "children": [
            {
              "id": "c5_s2_b4",
              "span": [
                3,
                3
              ],
              "roles": [
                "حَرْفُ نَصْبٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s2_b5",
              "span": [
                4,
                4
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah"
            },
            {
              "id": "c5_s2_b8",
              "span": [
                5,
                6
              ],
              "roles": [
                "مُتَعَلِّقٌ بِالْفِعْلِ"
              ],
              "category": "tarkib_jumla",
              "children": [
                {
                  "id": "c5_s2_b6",
                  "span": [
                    5,
                    5
                  ],
                  "roles": [
                    "حَرْفُ جَرٍّ"
                  ],
                  "category": "huruf"
                },
                {
                  "id": "c5_s2_b7",
                  "span": [
                    6,
                    6
                  ],
                  "roles": [
                    "اِسْمٌ مَجْرُورٌ (بِحَرْفِ الْجَرِّ)"
                  ],
                  "category": "majroorat"
                }
              ]
            }
          ]
        },
        {
          "id": "c5_s2_b10",
          "span": [
            7,
            7
          ],
          "roles": [
            "حَرْفُ جَرٍّ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s2_b11",
          "span": [
            8,
            8
          ],
          "roles": [
            "حَرْفٌ مُشَبَّهٌ بِالْفِعْلِ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s2_b12",
          "span": [
            9,
            9
          ],
          "roles": [
            "اِسْمُ إِنَّ"
          ],
          "category": "mansoobat"
        },
        {
          "id": "c5_s2_b15",
          "span": [
            10,
            11
          ],
          "roles": [
            "مُرَكَّبٌ إِضَافِيٌّ"
          ],
          "category": "murakkabat",
          "children": [
            {
              "id": "c5_s2_b13",
              "span": [
                10,
                10
              ],
              "roles": [
                "خَبَرُ إِنَّ"
              ],
              "category": "marfooat"
            },
            {
              "id": "c5_s2_b14",
              "span": [
                11,
                11
              ],
              "roles": [
                "مُضَافٌ إِلَيْهِ"
              ],
              "category": "majroorat"
            }
          ]
        }
      ]
    },
    {
      "id": "s1_c5_s3",
      "order": 3,
      "text": "وَلَكِنْ تَعَجَّبَ النَّاسُ وَدُهِشُوا.",
      "translation": "But the people were astonished and stunned.",
      "tokens": [
        "وَ",
        "لَكِنْ",
        "تَعَجَّبَ",
        "النَّاسُ",
        "وَ",
        "دُهِشُوا"
      ],
      "tree": [
        {
          "id": "c5_s3_b1",
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
          "id": "c5_s3_b2",
          "span": [
            1,
            1
          ],
          "roles": [
            "حَرْفُ اسْتِدْرَاكٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s3_b3",
          "span": [
            2,
            2
          ],
          "roles": [
            "فِعْلٌ مَاضٍ"
          ],
          "category": "afal_tammah",
          "sarf": {
            "family": 5,
            "person": "3rd",
            "number": "singular",
            "gender": "masc"
          }
        },
        {
          "id": "c5_s3_b4",
          "span": [
            3,
            3
          ],
          "roles": [
            "فَاعِلٌ"
          ],
          "category": "marfooat"
        },
        {
          "id": "c5_s3_b5",
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
          "id": "c5_s3_b6",
          "span": [
            5,
            5
          ],
          "roles": [
            "فِعْلٌ مَبْنِيٌّ لِلْمَجْهُولِ",
            "نَائِبُ فَاعِلٍ"
          ],
          "category": "afal_tammah"
        }
      ]
    },
    {
      "id": "s1_c5_s4",
      "order": 4,
      "text": "وَتَأَسَّفَ النَّاسُ وَغَضِبُوا.",
      "translation": "And the people grieved and became angry.",
      "tokens": [
        "وَ",
        "تَأَسَّفَ",
        "النَّاسُ",
        "وَ",
        "غَضِبُوا"
      ],
      "tree": [
        {
          "id": "c5_s4_b1",
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
          "id": "c5_s4_b2",
          "span": [
            1,
            1
          ],
          "roles": [
            "فِعْلٌ مَاضٍ"
          ],
          "category": "afal_tammah",
          "sarf": {
            "family": 5,
            "person": "3rd",
            "number": "singular",
            "gender": "masc"
          }
        },
        {
          "id": "c5_s4_b3",
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
          "id": "c5_s4_b4",
          "span": [
            3,
            3
          ],
          "roles": [
            "حَرْفُ عَطْفٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s4_b5",
          "span": [
            4,
            4
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah"
        }
      ]
    },
    {
      "id": "s1_c5_s5",
      "order": 5,
      "text": "قَالُوا: ﴿مَنْ فَعَلَ هَذَا بِآلِهَتِنَا﴾.",
      "translation": "They said: Who has done this to our gods?",
      "tokens": [
        "قَالُوا",
        "مَنْ",
        "فَعَلَ",
        "هَـٰذَا",
        "بِـ",
        "آلِهَتِ",
        "ـنَا"
      ],
      "tree": [
        {
          "id": "c5_s5_b1",
          "span": [
            0,
            0
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah"
        },
        {
          "id": "c5_s5_b11",
          "span": [
            1,
            6
          ],
          "roles": [
            "مَقُولُ الْقَوْلِ"
          ],
          "category": "tarkib_jumla",
          "children": [
            {
              "id": "c5_s5_b2",
              "span": [
                1,
                1
              ],
              "roles": [
                "مُبْتَدَأٌ"
              ],
              "category": "marfooat",
              "taqdeer": "اِسْمُ اسْتِفْهَامٍ فِي مَحَلِّ رَفْعٍ مُبْتَدَأٌ"
            },
            {
              "id": "c5_s5_b10",
              "span": [
                2,
                6
              ],
              "roles": [
                "خَبَرٌ",
                "جُمْلَةٌ فِعْلِيَّةٌ"
              ],
              "category": "tarkib_jumla",
              "children": [
                {
                  "id": "c5_s5_b3",
                  "span": [
                    2,
                    2
                  ],
                  "roles": [
                    "فِعْلٌ وَفَاعِلٌ"
                  ],
                  "category": "afal_tammah",
                  "taqdeer": "وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ (هُوَ)"
                },
                {
                  "id": "c5_s5_b4",
                  "span": [
                    3,
                    3
                  ],
                  "roles": [
                    "اِسْمُ إِشَارَةٍ",
                    "مَفْعُولٌ بِهِ"
                  ],
                  "category": "mansoobat"
                },
                {
                  "id": "c5_s5_b9",
                  "span": [
                    4,
                    6
                  ],
                  "roles": [
                    "مُتَعَلِّقٌ بِالْفِعْلِ"
                  ],
                  "category": "tarkib_jumla",
                  "children": [
                    {
                      "id": "c5_s5_b5",
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
                      "id": "c5_s5_b8",
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
                          "id": "c5_s5_b6",
                          "span": [
                            5,
                            5
                          ],
                          "roles": [
                            "اِسْمٌ مَجْرُورٌ (بِحَرْفِ الْجَرِّ)"
                          ],
                          "category": "majroorat"
                        },
                        {
                          "id": "c5_s5_b7",
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
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "s1_c5_s6",
      "order": 6,
      "text": "قَالُوا: ﴿سَمِعْنَا فَتًى يَذْكُرُهُمْ يُقَالُ لَهُ إِبْرَاهِيمُ﴾.",
      "translation": "They said: We heard a young man mentioning them who is called Ibrahim.",
      "tokens": [
        "قَالُوا",
        "سَمِعْنَا",
        "فَتًى",
        "يَذْكُرُ",
        "ـهُمْ",
        "يُقَالُ",
        "لَـ",
        "هُ",
        "إِبْرَاهِيمُ"
      ],
      "tree": [
        {
          "id": "c5_s6_b1",
          "span": [
            0,
            0
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah"
        },
        {
          "id": "c5_s6_b11",
          "span": [
            1,
            8
          ],
          "roles": [
            "مَقُولُ الْقَوْلِ"
          ],
          "category": "tarkib_jumla",
          "children": [
            {
              "id": "c5_s6_b2",
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
              "id": "c5_s6_b3",
              "span": [
                2,
                2
              ],
              "roles": [
                "مَفْعُولٌ بِهِ"
              ],
              "category": "mansoobat"
            },
            {
              "id": "c5_s6_b6",
              "span": [
                3,
                4
              ],
              "roles": [
                "صِفَةٌ (نَعْتٌ)",
                "جُمْلَةٌ فِعْلِيَّةٌ"
              ],
              "category": "tawabi",
              "children": [
                {
                  "id": "c5_s6_b4",
                  "span": [
                    3,
                    3
                  ],
                  "roles": [
                    "فِعْلٌ وَفَاعِلٌ"
                  ],
                  "category": "afal_tammah",
                  "taqdeer": "وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ (هُوَ)"
                },
                {
                  "id": "c5_s6_b5",
                  "span": [
                    4,
                    4
                  ],
                  "roles": [
                    "ضَمِيرٌ مُنْفَصِلٌ",
                    "مَفْعُولٌ بِهِ"
                  ],
                  "category": "mansoobat"
                }
              ]
            },
            {
              "id": "c5_s6_b7",
              "span": [
                5,
                5
              ],
              "roles": [
                "فِعْلٌ مَبْنِيٌّ لِلْمَجْهُولِ"
              ],
              "category": "afal_tammah",
              "sarf": {
                "family": 3,
                "person": "3rd",
                "number": "singular",
                "gender": "masc"
              }
            },
            {
              "id": "c5_s6_b8",
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
              "id": "c5_s6_b9",
              "span": [
                7,
                7
              ],
              "roles": [
                "اِسْمٌ مَجْرُورٌ (بِحَرْفِ الْجَرِّ)"
              ],
              "category": "majroorat"
            },
            {
              "id": "c5_s6_b10",
              "span": [
                8,
                8
              ],
              "roles": [
                "نَائِبُ فَاعِلٍ"
              ],
              "category": "marfooat"
            }
          ]
        }
      ]
    },
    {
      "id": "s1_c5_s7",
      "order": 7,
      "text": "قَالُوا: ﴿أَأَنْتَ فَعَلْتَ هَذَا بِآلِهَتِنَا يَا إِبْرَاهِيمُ﴾.",
      "translation": "They said: Are you the one who has done this to our gods, O Ibrahim?",
      "tokens": [
        "قَالُوا",
        "أَ",
        "أَنْتَ",
        "فَعَلْتَ",
        "هَـٰذَا",
        "بِـ",
        "آلِهَتِ",
        "ـنَا",
        "يَا",
        "إِبْرَاهِيمُ"
      ],
      "tree": [
        {
          "id": "c5_s7_b1",
          "span": [
            0,
            0
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah"
        },
        {
          "id": "c5_s7_b13",
          "span": [
            1,
            9
          ],
          "roles": [
            "مَقُولُ الْقَوْلِ"
          ],
          "category": "tarkib_jumla",
          "children": [
            {
              "id": "c5_s7_b2",
              "span": [
                1,
                1
              ],
              "roles": [
                "حَرْفُ اسْتِفْهَامٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s7_b3",
              "span": [
                2,
                2
              ],
              "roles": [
                "ضَمِيرٌ مُنْفَصِلٌ",
                "مُبْتَدَأٌ"
              ],
              "category": "marfooat"
            },
            {
              "id": "c5_s7_b10",
              "span": [
                3,
                7
              ],
              "roles": [
                "خَبَرٌ",
                "جُمْلَةٌ فِعْلِيَّةٌ"
              ],
              "category": "tarkib_jumla",
              "children": [
                {
                  "id": "c5_s7_b4",
                  "span": [
                    3,
                    3
                  ],
                  "roles": [
                    "فِعْلٌ وَفَاعِلٌ"
                  ],
                  "category": "afal_tammah"
                },
                {
                  "id": "c5_s7_b5",
                  "span": [
                    4,
                    4
                  ],
                  "roles": [
                    "اِسْمُ إِشَارَةٍ",
                    "مَفْعُولٌ بِهِ"
                  ],
                  "category": "mansoobat"
                },
                {
                  "id": "c5_s7_b6",
                  "span": [
                    5,
                    5
                  ],
                  "roles": [
                    "حَرْفُ جَرٍّ"
                  ],
                  "category": "huruf"
                },
                {
                  "id": "c5_s7_b9",
                  "span": [
                    6,
                    7
                  ],
                  "roles": [
                    "مُرَكَّبٌ إِضَافِيٌّ"
                  ],
                  "category": "murakkabat",
                  "children": [
                    {
                      "id": "c5_s7_b7",
                      "span": [
                        6,
                        6
                      ],
                      "roles": [
                        "اِسْمٌ مَجْرُورٌ (بِحَرْفِ الْجَرِّ)"
                      ],
                      "category": "majroorat"
                    },
                    {
                      "id": "c5_s7_b8",
                      "span": [
                        7,
                        7
                      ],
                      "roles": [
                        "مُضَافٌ إِلَيْهِ"
                      ],
                      "category": "majroorat"
                    }
                  ]
                }
              ]
            },
            {
              "id": "c5_s7_b11",
              "span": [
                8,
                8
              ],
              "roles": [
                "حَرْفُ نِدَاءٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s7_b12",
              "span": [
                9,
                9
              ],
              "roles": [
                "مَفْعُولٌ بِهِ"
              ],
              "category": "mansoobat",
              "taqdeer": "مُنَادَى مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ نَصْبٍ"
            }
          ]
        }
      ]
    },
    {
      "id": "s1_c5_s8",
      "order": 8,
      "text": "قَالَ: ﴿بَلْ فَعَلَهُ كَبِيرُهُمْ هَذَا فَاسْأَلُوهُمْ إِنْ كَانُوا يَنْطِقُونَ﴾.",
      "translation": "He said: Rather, this largest of them did it, so ask them, if they can speak!",
      "tokens": [
        "قَالَ",
        "بَلْ",
        "فَعَلَ",
        "ـهُ",
        "كَبِيرُ",
        "ـهُمْ",
        "هَـٰذَا",
        "فَـ",
        "اسْأَلُوا",
        "ـهُمْ",
        "إِنْ",
        "كَانُوا",
        "يَنْطِقُونَ"
      ],
      "tree": [
        {
          "id": "c5_s8_b1",
          "span": [
            0,
            0
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah"
        },
        {
          "id": "c5_s8_b15",
          "span": [
            1,
            12
          ],
          "roles": [
            "مَقُولُ الْقَوْلِ"
          ],
          "category": "tarkib_jumla",
          "children": [
            {
              "id": "c5_s8_b2",
              "span": [
                1,
                1
              ],
              "roles": [
                "حَرْفُ إِضْرَابٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s8_b3",
              "span": [
                2,
                2
              ],
              "roles": [
                "فِعْلٌ مَاضٍ"
              ],
              "category": "afal_tammah"
            },
            {
              "id": "c5_s8_b4",
              "span": [
                3,
                3
              ],
              "roles": [
                "مَفْعُولٌ بِهِ"
              ],
              "category": "mansoobat"
            },
            {
              "id": "c5_s8_b7",
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
                  "id": "c5_s8_b5",
                  "span": [
                    4,
                    4
                  ],
                  "roles": [
                    "فَاعِلٌ"
                  ],
                  "category": "marfooat"
                },
                {
                  "id": "c5_s8_b6",
                  "span": [
                    5,
                    5
                  ],
                  "roles": [
                    "ضَمِيرٌ مُنْفَصِلٌ",
                    "مُضَافٌ إِلَيْهِ"
                  ],
                  "category": "majroorat"
                }
              ]
            },
            {
              "id": "c5_s8_b8",
              "span": [
                6,
                6
              ],
              "roles": [
                "اِسْمُ إِشَارَةٍ",
                "صِفَةٌ (نَعْتٌ)",
                "بَدَلٌ"
              ],
              "category": "tawabi"
            },
            {
              "id": "c5_s8_b9",
              "span": [
                7,
                7
              ],
              "roles": [
                "حَرْفُ اسْتِئْنَافٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s8_b10",
              "span": [
                8,
                8
              ],
              "roles": [
                "فِعْلُ أَمْرٍ",
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah"
            },
            {
              "id": "c5_s8_b11",
              "span": [
                9,
                9
              ],
              "roles": [
                "ضَمِيرٌ مُنْفَصِلٌ",
                "مَفْعُولٌ بِهِ"
              ],
              "category": "mansoobat"
            },
            {
              "id": "c5_s8_b12",
              "span": [
                10,
                10
              ],
              "roles": [
                "حَرْفُ شَرْطٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s8_b13",
              "span": [
                11,
                11
              ],
              "roles": [
                "فِعْلٌ مَاضٍ نَاقِصٌ",
                "اِسْمُ كَانَ"
              ],
              "category": "afal_naqisah"
            },
            {
              "id": "c5_s8_b14",
              "span": [
                12,
                12
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ",
                "خَبَرُ كَانَ (جُمْلَةٌ فِعْلِيَّةٌ)"
              ],
              "category": "tarkib_jumla"
            }
          ]
        }
      ]
    },
    {
      "id": "s1_c5_s9",
      "order": 9,
      "text": "وَكَانَ النَّاسُ يَعْرِفُونَ أَنَّ الأَصْنَامَ حِجَارَةٌ.",
      "translation": "And the people knew that the idols were stones.",
      "tokens": [
        "وَ",
        "كَانَ",
        "النَّاسُ",
        "يَعْرِفُونَ",
        "أَنَّ",
        "الأَصْنَامَ",
        "حِجَارَةٌ"
      ],
      "tree": [
        {
          "id": "c5_s9_b1",
          "span": [
            0,
            0
          ],
          "roles": [
            "حَرْفُ اسْتِئْنَافٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s9_b2",
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
          "id": "c5_s9_b3",
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
          "id": "c5_s9_b9",
          "span": [
            3,
            6
          ],
          "roles": [
            "خَبَرُ كَانَ (جُمْلَةٌ فِعْلِيَّةٌ)"
          ],
          "category": "tarkib_jumla",
          "children": [
            {
              "id": "c5_s9_b4",
              "span": [
                3,
                3
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah"
            },
            {
              "id": "c5_s9_b8",
              "span": [
                4,
                6
              ],
              "roles": [
                "مَفْعُولٌ بِهِ"
              ],
              "category": "mansoobat",
              "taqdeer": "مَصْدَرٌ مُؤَوَّلٌ سَدَّ مَسَدَّ مَفْعُولَيْ يَعْرِفُونَ",
              "children": [
                {
                  "id": "c5_s9_b5",
                  "span": [
                    4,
                    4
                  ],
                  "roles": [
                    "حَرْفٌ مُشَبَّهٌ بِالْفِعْلِ"
                  ],
                  "category": "huruf"
                },
                {
                  "id": "c5_s9_b6",
                  "span": [
                    5,
                    5
                  ],
                  "roles": [
                    "اِسْمُ إِنَّ"
                  ],
                  "category": "mansoobat"
                },
                {
                  "id": "c5_s9_b7",
                  "span": [
                    6,
                    6
                  ],
                  "roles": [
                    "خَبَرُ إِنَّ"
                  ],
                  "category": "marfooat"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "s1_c5_s10",
      "order": 10,
      "text": "وَكَانُوا يَعْرِفُونَ أَنَّ الْحِجَارَةَ لَا تَسْمَعُ وَلَا تَنْطِقُ.",
      "translation": "And they knew that stones do not hear and do not speak.",
      "tokens": [
        "وَ",
        "كَانُوا",
        "يَعْرِفُونَ",
        "أَنَّ",
        "الْحِجَارَةَ",
        "لَا",
        "تَسْمَعُ",
        "وَ",
        "لَا",
        "تَنْطِقُ"
      ],
      "tree": [
        {
          "id": "c5_s10_b1",
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
          "id": "c5_s10_b2",
          "span": [
            1,
            1
          ],
          "roles": [
            "فِعْلٌ مَاضٍ نَاقِصٌ",
            "اِسْمُ كَانَ"
          ],
          "category": "afal_naqisah"
        },
        {
          "id": "c5_s10_b12",
          "span": [
            2,
            9
          ],
          "roles": [
            "خَبَرُ كَانَ (جُمْلَةٌ فِعْلِيَّةٌ)"
          ],
          "category": "tarkib_jumla",
          "children": [
            {
              "id": "c5_s10_b3",
              "span": [
                2,
                2
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah"
            },
            {
              "id": "c5_s10_b4",
              "span": [
                3,
                3
              ],
              "roles": [
                "حَرْفٌ مُشَبَّهٌ بِالْفِعْلِ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s10_b5",
              "span": [
                4,
                4
              ],
              "roles": [
                "اِسْمُ إِنَّ"
              ],
              "category": "mansoobat"
            },
            {
              "id": "c5_s10_b11",
              "span": [
                5,
                6
              ],
              "roles": [
                "خَبَرُ إِنَّ (جُمْلَةٌ فِعْلِيَّةٌ)"
              ],
              "category": "tarkib_jumla",
              "children": [
                {
                  "id": "c5_s10_b6",
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
                  "id": "c5_s10_b7",
                  "span": [
                    6,
                    6
                  ],
                  "roles": [
                    "فِعْلٌ وَفَاعِلٌ"
                  ],
                  "category": "afal_tammah"
                }
              ]
            },
            {
              "id": "c5_s10_b8",
              "span": [
                7,
                7
              ],
              "roles": [
                "حَرْفُ عَطْفٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s10_b9",
              "span": [
                8,
                8
              ],
              "roles": [
                "حَرْفُ نَفْيٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s10_b10",
              "span": [
                9,
                9
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
      "id": "s1_c5_s11",
      "order": 11,
      "text": "وَكَانُوا يَعْرِفُونَ أَنَّ الصَّنَمَ الأَكْبَرَ حَجَرٌ أَيْضًا.",
      "translation": "And they knew that the largest idol was also a stone.",
      "tokens": [
        "وَ",
        "كَانُوا",
        "يَعْرِفُونَ",
        "أَنَّ",
        "الصَّنَمَ",
        "الأَكْبَرَ",
        "حَجَرٌ",
        "أَيْضًا"
      ],
      "tree": [
        {
          "id": "c5_s11_b1",
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
          "id": "c5_s11_b2",
          "span": [
            1,
            1
          ],
          "roles": [
            "فِعْلٌ مَاضٍ نَاقِصٌ",
            "اِسْمُ كَانَ"
          ],
          "category": "afal_naqisah"
        },
        {
          "id": "c5_s11_b3",
          "span": [
            2,
            2
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah"
        },
        {
          "id": "c5_s11_b4",
          "span": [
            3,
            3
          ],
          "roles": [
            "حَرْفٌ مُشَبَّهٌ بِالْفِعْلِ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s11_b7",
          "span": [
            4,
            5
          ],
          "roles": [
            "مَوْصُوفٌ وَصِفَةٌ (مُرَكَّبٌ تَوْصِيفِيٌّ)"
          ],
          "category": "murakkabat",
          "children": [
            {
              "id": "c5_s11_b5",
              "span": [
                4,
                4
              ],
              "roles": [
                "اِسْمُ إِنَّ"
              ],
              "category": "mansoobat"
            },
            {
              "id": "c5_s11_b6",
              "span": [
                5,
                5
              ],
              "roles": [
                "صِفَةٌ (نَعْتٌ)"
              ],
              "category": "tawabi"
            }
          ]
        },
        {
          "id": "c5_s11_b8",
          "span": [
            6,
            6
          ],
          "roles": [
            "خَبَرُ إِنَّ"
          ],
          "category": "marfooat"
        },
        {
          "id": "c5_s11_b9",
          "span": [
            7,
            7
          ],
          "roles": [
            "مَفْعُولٌ مُطْلَقٌ"
          ],
          "category": "mansoobat"
        }
      ]
    },
    {
      "id": "s1_c5_s12",
      "order": 12,
      "text": "وَأَنَّ الصَّنَمَ الأَكْبَرَ لَا يَقْدِرُ أَنْ يَمْشِيَ وَيَتَحَرَّكَ.",
      "translation": "And that the largest idol is unable to walk or move.",
      "tokens": [
        "وَ",
        "أَنَّ",
        "الصَّنَمَ",
        "الأَكْبَرَ",
        "لَا",
        "يَقْدِرُ",
        "أَنْ",
        "يَمْشِيَ",
        "وَ",
        "يَتَحَرَّكَ"
      ],
      "tree": [
        {
          "id": "c5_s12_b1",
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
          "id": "c5_s12_b2",
          "span": [
            1,
            1
          ],
          "roles": [
            "حَرْفٌ مُشَبَّهٌ بِالْفِعْلِ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s12_b3",
          "span": [
            2,
            2
          ],
          "roles": [
            "اِسْمُ إِنَّ"
          ],
          "category": "mansoobat"
        },
        {
          "id": "c5_s12_b4",
          "span": [
            3,
            3
          ],
          "roles": [
            "صِفَةٌ (نَعْتٌ)"
          ],
          "category": "tawabi"
        },
        {
          "id": "c5_s12_b11",
          "span": [
            4,
            9
          ],
          "roles": [
            "خَبَرُ إِنَّ (جُمْلَةٌ فِعْلِيَّةٌ)"
          ],
          "category": "tarkib_jumla",
          "children": [
            {
              "id": "c5_s12_b5",
              "span": [
                4,
                4
              ],
              "roles": [
                "حَرْفُ نَفْيٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s12_b6",
              "span": [
                5,
                5
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah"
            },
            {
              "id": "c5_s12_b7",
              "span": [
                6,
                6
              ],
              "roles": [
                "حَرْفُ نَصْبٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s12_b8",
              "span": [
                7,
                7
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah"
            },
            {
              "id": "c5_s12_b9",
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
              "id": "c5_s12_b10",
              "span": [
                9,
                9
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ",
                "مَعْطُوفٌ"
              ],
              "category": "afal_tammah",
              "sarf": {
                "family": 2,
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
      "id": "s1_c5_s13",
      "order": 13,
      "text": "وَأَنَّ الصَّنَمَ الأَكْبَرَ لَا يَقْدِرُ أَنْ يَكْسِرَ الأَصْنَامَ.",
      "translation": "And that the largest idol is unable to smash the idols.",
      "tokens": [
        "وَ",
        "أَنَّ",
        "الصَّنَمَ",
        "الأَكْبَرَ",
        "لَا",
        "يَقْدِرُ",
        "أَنْ",
        "يَكْسِرَ",
        "الأَصْنَامَ"
      ],
      "tree": [
        {
          "id": "c5_s13_b1",
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
          "id": "c5_s13_b2",
          "span": [
            1,
            1
          ],
          "roles": [
            "حَرْفٌ مُشَبَّهٌ بِالْفِعْلِ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s13_b3",
          "span": [
            2,
            2
          ],
          "roles": [
            "اِسْمُ إِنَّ"
          ],
          "category": "mansoobat"
        },
        {
          "id": "c5_s13_b4",
          "span": [
            3,
            3
          ],
          "roles": [
            "صِفَةٌ (نَعْتٌ)"
          ],
          "category": "tawabi"
        },
        {
          "id": "c5_s13_b10",
          "span": [
            4,
            8
          ],
          "roles": [
            "خَبَرُ إِنَّ (جُمْلَةٌ فِعْلِيَّةٌ)"
          ],
          "category": "tarkib_jumla",
          "children": [
            {
              "id": "c5_s13_b5",
              "span": [
                4,
                4
              ],
              "roles": [
                "حَرْفُ نَفْيٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s13_b6",
              "span": [
                5,
                5
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah"
            },
            {
              "id": "c5_s13_b7",
              "span": [
                6,
                6
              ],
              "roles": [
                "حَرْفُ نَصْبٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s13_b8",
              "span": [
                7,
                7
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah"
            },
            {
              "id": "c5_s13_b9",
              "span": [
                8,
                8
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
      "id": "s1_c5_s14",
      "order": 14,
      "text": "فَقَالُوا لِإِبْرَاهِيمَ: أَنْتَ تَعْلَمُ أَنَّ الأَصْنَامَ لَا تَنْطِقُ.",
      "translation": "So they said to Ibrahim: You know that the idols do not speak.",
      "tokens": [
        "فَـ",
        "قَالُوا",
        "لِـ",
        "إِبْرَاهِيمَ",
        "أَنْتَ",
        "تَعْلَمُ",
        "أَنَّ",
        "الأَصْنَامَ",
        "لَا",
        "تَنْطِقُ"
      ],
      "tree": [
        {
          "id": "c5_s14_b1",
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
          "id": "c5_s14_b2",
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
          "id": "c5_s14_b3",
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
          "id": "c5_s14_b4",
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
          "id": "c5_s14_b12",
          "span": [
            4,
            9
          ],
          "roles": [
            "مَقُولُ الْقَوْلِ"
          ],
          "category": "tarkib_jumla",
          "children": [
            {
              "id": "c5_s14_b5",
              "span": [
                4,
                4
              ],
              "roles": [
                "ضَمِيرٌ مُنْفَصِلٌ",
                "مُبْتَدَأٌ"
              ],
              "category": "marfooat"
            },
            {
              "id": "c5_s14_b11",
              "span": [
                5,
                9
              ],
              "roles": [
                "خَبَرٌ",
                "جُمْلَةٌ فِعْلِيَّةٌ"
              ],
              "category": "tarkib_jumla",
              "children": [
                {
                  "id": "c5_s14_b6",
                  "span": [
                    5,
                    5
                  ],
                  "roles": [
                    "فِعْلٌ وَفَاعِلٌ"
                  ],
                  "category": "afal_tammah"
                },
                {
                  "id": "c5_s14_b7",
                  "span": [
                    6,
                    6
                  ],
                  "roles": [
                    "حَرْفٌ مُشَبَّهٌ بِالْفِعْلِ"
                  ],
                  "category": "huruf"
                },
                {
                  "id": "c5_s14_b8",
                  "span": [
                    7,
                    7
                  ],
                  "roles": [
                    "اِسْمُ إِنَّ"
                  ],
                  "category": "mansoobat"
                },
                {
                  "id": "c5_s14_b9",
                  "span": [
                    8,
                    8
                  ],
                  "roles": [
                    "حَرْفُ نَفْيٍ"
                  ],
                  "category": "huruf"
                },
                {
                  "id": "c5_s14_b10",
                  "span": [
                    9,
                    9
                  ],
                  "roles": [
                    "فِعْلٌ وَفَاعِلٌ"
                  ],
                  "category": "afal_tammah"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "s1_c5_s15",
      "order": 15,
      "text": "قَالَ إِبْرَاهِيمُ: فَكَيْفَ تَعْبُدُونَ الأَصْنَامَ وَإِنَّهَا لَا تَضُرُّ وَلَا تَنْفَعُ؟",
      "translation": "Ibrahim said: Then how do you worship idols when they neither harm nor benefit?",
      "tokens": [
        "قَالَ",
        "إِبْرَاهِيمُ",
        "فَـ",
        "كَيْفَ",
        "تَعْبُدُونَ",
        "الأَصْنَامَ",
        "وَ",
        "إِنَّ",
        "ـهَا",
        "لَا",
        "تَضُرُّ",
        "وَ",
        "لَا",
        "تَنْفَعُ"
      ],
      "tree": [
        {
          "id": "c5_s15_b1",
          "span": [
            0,
            0
          ],
          "roles": [
            "فِعْلٌ مَاضٍ"
          ],
          "category": "afal_tammah"
        },
        {
          "id": "c5_s15_b2",
          "span": [
            1,
            1
          ],
          "roles": [
            "فَاعِلٌ"
          ],
          "category": "marfooat"
        },
        {
          "id": "c5_s15_b15",
          "span": [
            2,
            13
          ],
          "roles": [
            "مَقُولُ الْقَوْلِ"
          ],
          "category": "tarkib_jumla",
          "children": [
            {
              "id": "c5_s15_b3",
              "span": [
                2,
                2
              ],
              "roles": [
                "حَرْفُ اسْتِئْنَافٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s15_b4",
              "span": [
                3,
                3
              ],
              "roles": [
                "حَالٌ"
              ],
              "category": "mansoobat",
              "taqdeer": "اِسْمُ اسْتِفْهَامٍ فِي مَحَلِّ نَصْبٍ حَالٌ"
            },
            {
              "id": "c5_s15_b5",
              "span": [
                4,
                4
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah"
            },
            {
              "id": "c5_s15_b6",
              "span": [
                5,
                5
              ],
              "roles": [
                "مَفْعُولٌ بِهِ"
              ],
              "category": "mansoobat"
            },
            {
              "id": "c5_s15_b7",
              "span": [
                6,
                6
              ],
              "roles": [
                "حَرْفُ حَالٍ (وَاوُ الْحَالِ)"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s15_b8",
              "span": [
                7,
                7
              ],
              "roles": [
                "حَرْفٌ مُشَبَّهٌ بِالْفِعْلِ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s15_b9",
              "span": [
                8,
                8
              ],
              "roles": [
                "اِسْمُ إِنَّ"
              ],
              "category": "mansoobat"
            },
            {
              "id": "c5_s15_b10",
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
              "id": "c5_s15_b11",
              "span": [
                10,
                10
              ],
              "roles": [
                "فِعْلٌ وَفَاعِلٌ"
              ],
              "category": "afal_tammah"
            },
            {
              "id": "c5_s15_b12",
              "span": [
                11,
                11
              ],
              "roles": [
                "حَرْفُ عَطْفٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s15_b13",
              "span": [
                12,
                12
              ],
              "roles": [
                "حَرْفُ نَفْيٍ"
              ],
              "category": "huruf"
            },
            {
              "id": "c5_s15_b14",
              "span": [
                13,
                13
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
      "id": "s1_c5_s16",
      "order": 16,
      "text": "وَكَيْفَ تَسْأَلُونَ الأَصْنَامَ وَإِنَّهَا لَا تَنْطِقُ وَلَا تَسْمَعُ؟",
      "translation": "And how do you ask idols when they do not speak and do not hear?",
      "tokens": [
        "وَ",
        "كَيْفَ",
        "تَسْأَلُونَ",
        "الأَصْنَامَ",
        "وَ",
        "إِنَّ",
        "ـهَا",
        "لَا",
        "تَنْطِقُ",
        "وَ",
        "لَا",
        "تَسْمَعُ"
      ],
      "tree": [
        {
          "id": "c5_s16_b1",
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
          "id": "c5_s16_b2",
          "span": [
            1,
            1
          ],
          "roles": [
            "حَالٌ"
          ],
          "category": "mansoobat"
        },
        {
          "id": "c5_s16_b3",
          "span": [
            2,
            2
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah"
        },
        {
          "id": "c5_s16_b4",
          "span": [
            3,
            3
          ],
          "roles": [
            "مَفْعُولٌ بِهِ"
          ],
          "category": "mansoobat"
        },
        {
          "id": "c5_s16_b5",
          "span": [
            4,
            4
          ],
          "roles": [
            "حَرْفُ حَالٍ (وَاوُ الْحَالِ)"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s16_b6",
          "span": [
            5,
            5
          ],
          "roles": [
            "حَرْفٌ مُشَبَّهٌ بِالْفِعْلِ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s16_b7",
          "span": [
            6,
            6
          ],
          "roles": [
            "اِسْمُ إِنَّ"
          ],
          "category": "mansoobat"
        },
        {
          "id": "c5_s16_b8",
          "span": [
            7,
            7
          ],
          "roles": [
            "حَرْفُ نَفْيٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s16_b9",
          "span": [
            8,
            8
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah"
        },
        {
          "id": "c5_s16_b10",
          "span": [
            9,
            9
          ],
          "roles": [
            "حَرْفُ عَطْفٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s16_b11",
          "span": [
            10,
            10
          ],
          "roles": [
            "حَرْفُ نَفْيٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s16_b12",
          "span": [
            11,
            11
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah"
        }
      ]
    },
    {
      "id": "s1_c5_s17",
      "order": 17,
      "text": "أَلَا تَفْهَمُونَ شَيْئًا؟ أَفَلَا تَعْقِلُونَ؟",
      "translation": "Do you not understand anything? Will you not use reason?",
      "tokens": [
        "أَلَا",
        "تَفْهَمُونَ",
        "شَيْئًا",
        "أَ",
        "فَـ",
        "لَا",
        "تَعْقِلُونَ"
      ],
      "tree": [
        {
          "id": "c5_s17_b1",
          "span": [
            0,
            0
          ],
          "roles": [
            "حَرْفُ اسْتِفْهَامٍ وَتَوْبِيخٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s17_b2",
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
          "id": "c5_s17_b3",
          "span": [
            2,
            2
          ],
          "roles": [
            "مَفْعُولٌ بِهِ"
          ],
          "category": "mansoobat"
        },
        {
          "id": "c5_s17_b4",
          "span": [
            3,
            3
          ],
          "roles": [
            "حَرْفُ اسْتِفْهَامٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s17_b5",
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
          "id": "c5_s17_b6",
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
          "id": "c5_s17_b7",
          "span": [
            6,
            6
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah"
        }
      ]
    },
    {
      "id": "s1_c5_s18",
      "order": 18,
      "text": "وَسَكَتَ النَّاسُ وَخَجِلُوا.",
      "translation": "And the people fell silent and felt ashamed.",
      "tokens": [
        "وَ",
        "سَكَتَ",
        "النَّاسُ",
        "وَ",
        "خَجِلُوا"
      ],
      "tree": [
        {
          "id": "c5_s18_b1",
          "span": [
            0,
            0
          ],
          "roles": [
            "حَرْفُ اسْتِئْنَافٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s18_b2",
          "span": [
            1,
            1
          ],
          "roles": [
            "فِعْلٌ مَاضٍ"
          ],
          "category": "afal_tammah"
        },
        {
          "id": "c5_s18_b3",
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
          "id": "c5_s18_b4",
          "span": [
            3,
            3
          ],
          "roles": [
            "حَرْفُ عَطْفٍ"
          ],
          "category": "huruf"
        },
        {
          "id": "c5_s18_b5",
          "span": [
            4,
            4
          ],
          "roles": [
            "فِعْلٌ وَفَاعِلٌ"
          ],
          "category": "afal_tammah"
        }
      ]
    }
  ]
};

export default chapter5;
