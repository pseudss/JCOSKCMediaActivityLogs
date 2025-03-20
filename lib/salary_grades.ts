export interface SalaryGradeStep {
    [step: string]: number;
  }
  
  export interface SalaryGradeTable {
    [grade: string]: SalaryGradeStep;
  }
  
  export interface SalaryGradeData {
    [year: string]: SalaryGradeTable;
  }
  
  export const salaryGrades: SalaryGradeData = {
    "2025": {
      "Salary Grade 1": {
        "Step 1": 14551,
        "Step 2": 14716,
        "Step 3": 14881,
        "Step 4": 15048,
        "Step 5": 15216,
        "Step 6": 15385,
        "Step 7": 15555,
        "Step 8": 15726
      },
      "Salary Grade 2": {
        "Step 1": 15895,
        "Step 2": 16067,
        "Step 3": 16240,
        "Step 4": 16415,
        "Step 5": 16590,
        "Step 6": 16766,
        "Step 7": 16944,
        "Step 8": 17122
      },
      "Salary Grade 3": {
        "Step 1": 17176,
        "Step 2": 17359,
        "Step 3": 17542,
        "Step 4": 17727,
        "Step 5": 17913,
        "Step 6": 18100,
        "Step 7": 18288,
        "Step 8": 18477
      },
      "Salary Grade 4": {
        "Step 1": 18468,
        "Step 2": 18664,
        "Step 3": 18860,
        "Step 4": 19058,
        "Step 5": 19256,
        "Step 6": 19455,
        "Step 7": 19656,
        "Step 8": 19858
      },
      "Salary Grade 5": {
        "Step 1": 19800,
        "Step 2": 20008,
        "Step 3": 20217,
        "Step 4": 20427,
        "Step 5": 20638,
        "Step 6": 20850,
        "Step 7": 21063,
        "Step 8": 21277
      },
      "Salary Grade 6": {
        "Step 1": 21296,
        "Step 2": 21518,
        "Step 3": 21741,
        "Step 4": 21965,
        "Step 5": 22190,
        "Step 6": 22416,
        "Step 7": 22643,
        "Step 8": 22871
      },
      "Salary Grade 7": {
        "Step 1": 22893,
        "Step 2": 23131,
        "Step 3": 23370,
        "Step 4": 23610,
        "Step 5": 23851,
        "Step 6": 24093,
        "Step 7": 24336,
        "Step 8": 24580
      },
      "Salary Grade 8": {
        "Step 1": 24610,
        "Step 2": 24866,
        "Step 3": 25123,
        "Step 4": 25381,
        "Step 5": 25640,
        "Step 6": 25900,
        "Step 7": 26161,
        "Step 8": 26423
      },
      "Salary Grade 9": {
        "Step 1": 26456,
        "Step 2": 26731,
        "Step 3": 27007,
        "Step 4": 27284,
        "Step 5": 27562,
        "Step 6": 27841,
        "Step 7": 28121,
        "Step 8": 28402
      },
      "Salary Grade 10": {
        "Step 1": 28441,
        "Step 2": 28736,
        "Step 3": 29032,
        "Step 4": 29329,
        "Step 5": 29627,
        "Step 6": 29926,
        "Step 7": 30226,
        "Step 8": 30527
      },
      "Salary Grade 11": {
        "Step 1": 30574,
        "Step 2": 30891,
        "Step 3": 31209,
        "Step 4": 31528,
        "Step 5": 31848,
        "Step 6": 32169,
        "Step 7": 32491,
        "Step 8": 32814
      },
      "Salary Grade 12": {
        "Step 1": 32868,
        "Step 2": 33208,
        "Step 3": 33550,
        "Step 4": 33893,
        "Step 5": 34237,
        "Step 6": 34582,
        "Step 7": 34928,
        "Step 8": 35275
      },
      "Salary Grade 13": {
        "Step 1": 35334,
        "Step 2": 35699,
        "Step 3": 36066,
        "Step 4": 36434,
        "Step 5": 36803,
        "Step 6": 37173,
        "Step 7": 37544,
        "Step 8": 37916
      },
      "Salary Grade 14": {
        "Step 1": 37984,
        "Step 2": 38376,
        "Step 3": 38770,
        "Step 4": 39165,
        "Step 5": 39561,
        "Step 6": 39958,
        "Step 7": 40356,
        "Step 8": 40755
      },
      "Salary Grade 15": {
        "Step 1": 40834,
        "Step 2": 41255,
        "Step 3": 41678,
        "Step 4": 42102,
        "Step 5": 42527,
        "Step 6": 42953,
        "Step 7": 43380,
        "Step 8": 43808
      },
      "Salary Grade 16": {
        "Step 1": 43897,
        "Step 2": 44349,
        "Step 3": 44803,
        "Step 4": 45258,
        "Step 5": 45714,
        "Step 6": 46171,
        "Step 7": 46629,
        "Step 8": 47088
      },
      "Salary Grade 17": {
        "Step 1": 47188,
        "Step 2": 47675,
        "Step 3": 48163,
        "Step 4": 48652,
        "Step 5": 49142,
        "Step 6": 49633,
        "Step 7": 50125,
        "Step 8": 50618
      },
      "Salary Grade 18": {
        "Step 1": 50730,
        "Step 2": 51252,
        "Step 3": 51776,
        "Step 4": 52301,
        "Step 5": 52827,
        "Step 6": 53354,
        "Step 7": 53882,
        "Step 8": 54411
      },
      "Salary Grade 19": {
        "Step 1": 54535,
        "Step 2": 55096,
        "Step 3": 55659,
        "Step 4": 56223,
        "Step 5": 56788,
        "Step 6": 57354,
        "Step 7": 57921,
        "Step 8": 58489
      },
      "Salary Grade 20": {
        "Step 1": 58626,
        "Step 2": 59229,
        "Step 3": 59834,
        "Step 4": 60440,
        "Step 5": 61047,
        "Step 6": 61655,
        "Step 7": 62264,
        "Step 8": 62874
      },
      "Salary Grade 21": {
        "Step 1": 63023,
        "Step 2": 63671,
        "Step 3": 64321,
        "Step 4": 64972,
        "Step 5": 65625,
        "Step 6": 66279,
        "Step 7": 66934,
        "Step 8": 67590
      },
      "Salary Grade 22": {
        "Step 1": 67750,
        "Step 2": 68447,
        "Step 3": 69146,
        "Step 4": 69846,
        "Step 5": 70547,
        "Step 6": 71249,
        "Step 7": 71953,
        "Step 8": 72658
      },
      "Salary Grade 23": {
        "Step 1": 72831,
        "Step 2": 73581,
        "Step 3": 74333,
        "Step 4": 75086,
        "Step 5": 75840,
        "Step 6": 76595,
        "Step 7": 77351,
        "Step 8": 78108
      },
      "Salary Grade 24": {
        "Step 1": 78294,
        "Step 2": 79100,
        "Step 3": 79908,
        "Step 4": 80717,
        "Step 5": 81527,
        "Step 6": 82339,
        "Step 7": 83152,
        "Step 8": 83966
      },
      "Salary Grade 25": {
        "Step 1": 84166,
        "Step 2": 85033,
        "Step 3": 85901,
        "Step 4": 86771,
        "Step 5": 87642,
        "Step 6": 88514,
        "Step 7": 89388,
        "Step 8": 90263
      },
      "Salary Grade 26": {
        "Step 1": 90478,
        "Step 2": 91410,
        "Step 3": 92344,
        "Step 4": 93279,
        "Step 5": 94215,
        "Step 6": 95153,
        "Step 7": 96092,
        "Step 8": 97033
      },
      "Salary Grade 27": {
        "Step 1": 97264,
        "Step 2": 98266,
        "Step 3": 99270,
        "Step 4": 100275,
        "Step 5": 101281,
        "Step 6": 102289,
        "Step 7": 103299,
        "Step 8": 104310
      },
      "Salary Grade 28": {
        "Step 1": 104559,
        "Step 2": 105636,
        "Step 3": 106715,
        "Step 4": 107796,
        "Step 5": 108878,
        "Step 6": 109962,
        "Step 7": 111047,
        "Step 8": 112134
      },
      "Salary Grade 29": {
        "Step 1": 112401,
        "Step 2": 113559,
        "Step 3": 114719,
        "Step 4": 115881,
        "Step 5": 117044,
        "Step 6": 118209,
        "Step 7": 119376,
        "Step 8": 120544
      },
      "Salary Grade 30": {
        "Step 1": 120831,
        "Step 2": 122076,
        "Step 3": 123323,
        "Step 4": 124572,
        "Step 5": 125823,
        "Step 6": 127075,
        "Step 7": 128329,
        "Step 8": 129585
      },
      "Salary Grade 31": {
        "Step 1": 129893,
        "Step 2": 131231,
        "Step 3": 132572,
        "Step 4": 133915,
        "Step 5": 135260,
        "Step 6": 136606,
        "Step 7": 137954,
        "Step 8": 139304
      },
      "Salary Grade 32": {
        "Step 1": 139635,
        "Step 2": 141073,
        "Step 3": 142514,
        "Step 4": 143957,
        "Step 5": 145402,
        "Step 6": 146849,
        "Step 7": 148298,
        "Step 8": 149749
      },
      "Salary Grade 33": {
        "Step 1": 150108,
        "Step 2": 151654
      }
    },
    "2024": {
      "Salary Grade 1": {
        "Step 1": 13858,
        "Step 2": 14015,
        "Step 3": 14172,
        "Step 4": 14331,
        "Step 5": 14491,
        "Step 6": 14652,
        "Step 7": 14814,
        "Step 8": 14977
      },
      "Salary Grade 2": {
        "Step 1": 15138,
        "Step 2": 15302,
        "Step 3": 15467,
        "Step 4": 15633,
        "Step 5": 15800,
        "Step 6": 15968,
        "Step 7": 16137,
        "Step 8": 16307
      },
      "Salary Grade 3": {
        "Step 1": 16358,
        "Step 2": 16532,
        "Step 3": 16707,
        "Step 4": 16883,
        "Step 5": 17060,
        "Step 6": 17238,
        "Step 7": 17417,
        "Step 8": 17597
      },
      "Salary Grade 4": {
        "Step 1": 17589,
        "Step 2": 17775,
        "Step 3": 17962,
        "Step 4": 18150,
        "Step 5": 18339,
        "Step 6": 18529,
        "Step 7": 18720,
        "Step 8": 18912
      },
      "Salary Grade 5": {
        "Step 1": 18857,
        "Step 2": 19055,
        "Step 3": 19254,
        "Step 4": 19454,
        "Step 5": 19655,
        "Step 6": 19857,
        "Step 7": 20060,
        "Step 8": 20264
      },
      "Salary Grade 6": {
        "Step 1": 20282,
        "Step 2": 20493,
        "Step 3": 20706,
        "Step 4": 20919,
        "Step 5": 21133,
        "Step 6": 21349,
        "Step 7": 21565,
        "Step 8": 21782
      },
      "Salary Grade 7": {
        "Step 1": 21803,
        "Step 2": 22030,
        "Step 3": 22257,
        "Step 4": 22486,
        "Step 5": 22715,
        "Step 6": 22946,
        "Step 7": 23177,
        "Step 8": 23410
      },
      "Salary Grade 8": {
        "Step 1": 23438,
        "Step 2": 23682,
        "Step 3": 23927,
        "Step 4": 24173,
        "Step 5": 24419,
        "Step 6": 24667,
        "Step 7": 24915,
        "Step 8": 25165
      },
      "Salary Grade 9": {
        "Step 1": 25196,
        "Step 2": 25458,
        "Step 3": 25721,
        "Step 4": 25985,
        "Step 5": 26250,
        "Step 6": 26515,
        "Step 7": 26782,
        "Step 8": 27049
      },
      "Salary Grade 10": {
        "Step 1": 27087,
        "Step 2": 27368,
        "Step 3": 27650,
        "Step 4": 27932,
        "Step 5": 28216,
        "Step 6": 28501,
        "Step 7": 28787,
        "Step 8": 29074
      },
      "Salary Grade 11": {
        "Step 1": 29118,
        "Step 2": 29420,
        "Step 3": 29723,
        "Step 4": 30027,
        "Step 5": 30332,
        "Step 6": 30637,
        "Step 7": 30944,
        "Step 8": 31251
      },
      "Salary Grade 12": {
        "Step 1": 31303,
        "Step 2": 31627,
        "Step 3": 31952,
        "Step 4": 32279,
        "Step 5": 32607,
        "Step 6": 32935,
        "Step 7": 33265,
        "Step 8": 33595
      },
      "Salary Grade 13": {
        "Step 1": 33651,
        "Step 2": 33999,
        "Step 3": 34349,
        "Step 4": 34699,
        "Step 5": 35050,
        "Step 6": 35403,
        "Step 7": 35756,
        "Step 8": 36110
      },
      "Salary Grade 14": {
        "Step 1": 36175,
        "Step 2": 36549,
        "Step 3": 36924,
        "Step 4": 37300,
        "Step 5": 37677,
        "Step 6": 38055,
        "Step 7": 38434,
        "Step 8": 38814
      },
      "Salary Grade 15": {
        "Step 1": 38890,
        "Step 2": 39291,
        "Step 3": 39693,
        "Step 4": 40097,
        "Step 5": 40502,
        "Step 6": 40908,
        "Step 7": 41314,
        "Step 8": 41722
      },
      "Salary Grade 16": {
        "Step 1": 41807,
        "Step 2": 42237,
        "Step 3": 42669,
        "Step 4": 43103,
        "Step 5": 43537,
        "Step 6": 43972,
        "Step 7": 44408,
        "Step 8": 44846
      },
      "Salary Grade 17": {
        "Step 1": 44941,
        "Step 2": 45405,
        "Step 3": 45870,
        "Step 4": 46335,
        "Step 5": 46802,
        "Step 6": 47269,
        "Step 7": 47738,
        "Step 8": 48208
      },
      "Salary Grade 18": {
        "Step 1": 48314,
        "Step 2": 48811,
        "Step 3": 49310,
        "Step 4": 49810,
        "Step 5": 50311,
        "Step 6": 50813,
        "Step 7": 51316,
        "Step 8": 51820
      },
      "Salary Grade 19": {
        "Step 1": 51938,
        "Step 2": 52472,
        "Step 3": 53008,
        "Step 4": 53545,
        "Step 5": 54084,
        "Step 6": 54623,
        "Step 7": 55163,
        "Step 8": 55704
      },
      "Salary Grade 20": {
        "Step 1": 55834,
        "Step 2": 56408,
        "Step 3": 56984,
        "Step 4": 57562,
        "Step 5": 58140,
        "Step 6": 58719,
        "Step 7": 59299,
        "Step 8": 59880
      },
      "Salary Grade 21": {
        "Step 1": 60022,
        "Step 2": 60639,
        "Step 3": 61258,
        "Step 4": 61878,
        "Step 5": 62500,
        "Step 6": 63123,
        "Step 7": 63747,
        "Step 8": 64372
      },
      "Salary Grade 22": {
        "Step 1": 64524,
        "Step 2": 65188,
        "Step 3": 65853,
        "Step 4": 66520,
        "Step 5": 67188,
        "Step 6": 67856,
        "Step 7": 68526,
        "Step 8": 69198
      },
      "Salary Grade 23": {
        "Step 1": 69363,
        "Step 2": 70077,
        "Step 3": 70793,
        "Step 4": 71510,
        "Step 5": 72229,
        "Step 6": 72948,
        "Step 7": 73668,
        "Step 8": 74389
      },
      "Salary Grade 24": {
        "Step 1": 74566,
        "Step 2": 75333,
        "Step 3": 76103,
        "Step 4": 76874,
        "Step 5": 77645,
        "Step 6": 78418,
        "Step 7": 79192,
        "Step 8": 79968
      },
      "Salary Grade 25": {
        "Step 1": 80158,
        "Step 2": 80984,
        "Step 3": 81811,
        "Step 4": 82639,
        "Step 5": 83469,
        "Step 6": 84299,
        "Step 7": 85131,
        "Step 8": 85965
      },
      "Salary Grade 26": {
        "Step 1": 86170,
        "Step 2": 87057,
        "Step 3": 87947,
        "Step 4": 88837,
        "Step 5": 89729,
        "Step 6": 90622,
        "Step 7": 91516,
        "Step 8": 92412
      },
      "Salary Grade 27": {
        "Step 1": 92632,
        "Step 2": 93587,
        "Step 3": 94543,
        "Step 4": 95500,
        "Step 5": 96458,
        "Step 6": 97418,
        "Step 7": 98380,
        "Step 8": 99343
      },
      "Salary Grade 28": {
        "Step 1": 99580,
        "Step 2": 100606,
        "Step 3": 101633,
        "Step 4": 102663,
        "Step 5": 103693,
        "Step 6": 104726,
        "Step 7": 105759,
        "Step 8": 106794
      },
      "Salary Grade 29": {
        "Step 1": 107048,
        "Step 2": 108151,
        "Step 3": 109256,
        "Step 4": 110363,
        "Step 5": 111471,
        "Step 6": 112580,
        "Step 7": 113691,
        "Step 8": 114804
      },
      "Salary Grade 30": {
        "Step 1": 115077,
        "Step 2": 116263,
        "Step 3": 117450,
        "Step 4": 118640,
        "Step 5": 119831,
        "Step 6": 121024,
        "Step 7": 122218,
        "Step 8": 123414
      },
      "Salary Grade 31": {
        "Step 1": 123708,
        "Step 2": 124982,
        "Step 3": 126259,
        "Step 4": 127538,
        "Step 5": 128819,
        "Step 6": 130101,
        "Step 7": 131385,
        "Step 8": 132671
      },
      "Salary Grade 32": {
        "Step 1": 132986,
        "Step 2": 134355,
        "Step 3": 135727,
        "Step 4": 137102,
        "Step 5": 138478,
        "Step 6": 139856,
        "Step 7": 141236,
        "Step 8": 142618
      },
      "Salary Grade 33": {
        "Step 1": 142960,
        "Step 2": 144432
      }
    },
    "2023": {
      "Salary Grade 1": {
        "Step 1": 13000,
        "Step 2": 13150,
        "Step 3": 13300,
        "Step 4": 13450,
        "Step 5": 13600,
        "Step 6": 13750,
        "Step 7": 13900,
        "Step 8": 14050
      },
      "Salary Grade 2": {
        "Step 1": 14200,
        "Step 2": 14350,
        "Step 3": 14500,
        "Step 4": 14650,
        "Step 5": 14800,
        "Step 6": 14950,
        "Step 7": 15100,
        "Step 8": 15250
      },
      "Salary Grade 3": {
        "Step 1": 15400,
        "Step 2": 15550,
        "Step 3": 15700,
        "Step 4": 15850,
        "Step 5": 16000,
        "Step 6": 16150,
        "Step 7": 16300,
        "Step 8": 16450
      },
      "Salary Grade 4": {
        "Step 1": 16600,
        "Step 2": 16750,
        "Step 3": 16900,
        "Step 4": 17050,
        "Step 5": 17200,
        "Step 6": 17350,
        "Step 7": 17500,
        "Step 8": 17650
      },
      "Salary Grade 5": {
        "Step 1": 17800,
        "Step 2": 17950,
        "Step 3": 18100,
        "Step 4": 18250,
        "Step 5": 18400,
        "Step 6": 18550,
        "Step 7": 18700,
        "Step 8": 18850
      },
      "Salary Grade 6": {
        "Step 1": 19000,
        "Step 2": 19200,
        "Step 3": 19400,
        "Step 4": 19600,
        "Step 5": 19800,
        "Step 6": 20000,
        "Step 7": 20200,
        "Step 8": 20400
      },
      "Salary Grade 7": {
        "Step 1": 20600,
        "Step 2": 20800,
        "Step 3": 21000,
        "Step 4": 21200,
        "Step 5": 21400,
        "Step 6": 21600,
        "Step 7": 21800,
        "Step 8": 22000
      },
      "Salary Grade 8": {
        "Step 1": 22200,
        "Step 2": 22400,
        "Step 3": 22600,
        "Step 4": 22800,
        "Step 5": 23000,
        "Step 6": 23200,
        "Step 7": 23400,
        "Step 8": 23600
      },
      "Salary Grade 9": {
        "Step 1": 23800,
        "Step 2": 24050,
        "Step 3": 24300,
        "Step 4": 24550,
        "Step 5": 24800,
        "Step 6": 25050,
        "Step 7": 25300,
        "Step 8": 25550
      },
      "Salary Grade 10": {
        "Step 1": 25800,
        "Step 2": 26050,
        "Step 3": 26300,
        "Step 4": 26550,
        "Step 5": 26800,
        "Step 6": 27050,
        "Step 7": 27300,
        "Step 8": 27550
      },
      "Salary Grade 11": {
        "Step 1": 27800,
        "Step 2": 28100,
        "Step 3": 28400,
        "Step 4": 28700,
        "Step 5": 29000,
        "Step 6": 29300,
        "Step 7": 29600,
        "Step 8": 29900
      },
      "Salary Grade 12": {
        "Step 1": 30200,
        "Step 2": 30500,
        "Step 3": 30800,
        "Step 4": 31100,
        "Step 5": 31400,
        "Step 6": 31700,
        "Step 7": 32000,
        "Step 8": 32300
      },
      "Salary Grade 13": {
        "Step 1": 32600,
        "Step 2": 32950,
        "Step 3": 33300,
        "Step 4": 33650,
        "Step 5": 34000,
        "Step 6": 34350,
        "Step 7": 34700,
        "Step 8": 35050
      },
      "Salary Grade 14": {
        "Step 1": 35400,
        "Step 2": 35750,
        "Step 3": 36100,
        "Step 4": 36450,
        "Step 5": 36800,
        "Step 6": 37150,
        "Step 7": 37500,
        "Step 8": 37850
      },
      "Salary Grade 15": {
        "Step 1": 38200,
        "Step 2": 38600,
        "Step 3": 39000,
        "Step 4": 39400,
        "Step 5": 39800,
        "Step 6": 40200,
        "Step 7": 40600,
        "Step 8": 41000
      },
      "Salary Grade 16": {
        "Step 1": 41400,
        "Step 2": 41800,
        "Step 3": 42200,
        "Step 4": 42600,
        "Step 5": 43000,
        "Step 6": 43400,
        "Step 7": 43800,
        "Step 8": 44200
      },
      "Salary Grade 17": {
        "Step 1": 44600,
        "Step 2": 45050,
        "Step 3": 45500,
        "Step 4": 45950,
        "Step 5": 46400,
        "Step 6": 46850,
        "Step 7": 47300,
        "Step 8": 47750
      },
      "Salary Grade 18": {
        "Step 1": 48200,
        "Step 2": 48700,
        "Step 3": 49200,
        "Step 4": 49700,
        "Step 5": 50200,
        "Step 6": 50700,
        "Step 7": 51200,
        "Step 8": 51700
      },
      "Salary Grade 19": {
        "Step 1": 52200,
        "Step 2": 52700,
        "Step 3": 53200,
        "Step 4": 53700,
        "Step 5": 54200,
        "Step 6": 54700,
        "Step 7": 55200,
        "Step 8": 55700
      },
      "Salary Grade 20": {
        "Step 1": 56200,
        "Step 2": 56750,
        "Step 3": 57300,
        "Step 4": 57850,
        "Step 5": 58400,
        "Step 6": 58950,
        "Step 7": 59500,
        "Step 8": 60050
      },
      "Salary Grade 21": {
        "Step 1": 60600,
        "Step 2": 61200,
        "Step 3": 61800,
        "Step 4": 62400,
        "Step 5": 63000,
        "Step 6": 63600,
        "Step 7": 64200,
        "Step 8": 64800
      },
      "Salary Grade 22": {
        "Step 1": 65400,
        "Step 2": 66050,
        "Step 3": 66700,
        "Step 4": 67350,
        "Step 5": 68000,
        "Step 6": 68650,
        "Step 7": 69300,
        "Step 8": 69950
      },
      "Salary Grade 23": {
        "Step 1": 70600,
        "Step 2": 71300,
        "Step 3": 72000,
        "Step 4": 72700,
        "Step 5": 73400,
        "Step 6": 74100,
        "Step 7": 74800,
        "Step 8": 75500
      },
      "Salary Grade 24": {
        "Step 1": 76200,
        "Step 2": 76950,
        "Step 3": 77700,
        "Step 4": 78450,
        "Step 5": 79200,
        "Step 6": 79950,
        "Step 7": 80700,
        "Step 8": 81450
      },
      "Salary Grade 25": {
        "Step 1": 82200,
        "Step 2": 83000,
        "Step 3": 83800,
        "Step 4": 84600,
        "Step 5": 85400,
        "Step 6": 86200,
        "Step 7": 87000,
        "Step 8": 87800
      },
      "Salary Grade 26": {
        "Step 1": 88600,
        "Step 2": 89450,
        "Step 3": 90300,
        "Step 4": 91150,
        "Step 5": 92000,
        "Step 6": 92850,
        "Step 7": 93700,
        "Step 8": 94550
      },
      "Salary Grade 27": {
        "Step 1": 95400,
        "Step 2": 96300,
        "Step 3": 97200,
        "Step 4": 98100,
        "Step 5": 99000,
        "Step 6": 99900,
        "Step 7": 100800,
        "Step 8": 101700
      },
      "Salary Grade 28": {
        "Step 1": 102600,
        "Step 2": 103550,
        "Step 3": 104500,
        "Step 4": 105450,
        "Step 5": 106400,
        "Step 6": 107350,
        "Step 7": 108300,
        "Step 8": 109250
      },
      "Salary Grade 29": {
        "Step 1": 110200,
        "Step 2": 111200,
        "Step 3": 112200,
        "Step 4": 113200,
        "Step 5": 114200,
        "Step 6": 115200,
        "Step 7": 116200,
        "Step 8": 117200
      },
      "Salary Grade 30": {
        "Step 1": 118200,
        "Step 2": 119250,
        "Step 3": 120300,
        "Step 4": 121350,
        "Step 5": 122400,
        "Step 6": 123450,
        "Step 7": 124500,
        "Step 8": 125550
      },
      "Salary Grade 31": {
        "Step 1": 126600,
        "Step 2": 127700,
        "Step 3": 128800,
        "Step 4": 129900,
        "Step 5": 131000,
        "Step 6": 132100,
        "Step 7": 133200,
        "Step 8": 134300
      },
      "Salary Grade 32": {
        "Step 1": 135400,
        "Step 2": 136550,
        "Step 3": 137700,
        "Step 4": 138850,
        "Step 5": 140000,
        "Step 6": 141150,
        "Step 7": 142300,
        "Step 8": 143450
      },
      "Salary Grade 33": {
        "Step 1": 144600,
        "Step 2": 145800
      }
    },
    "2022": {
      "Salary Grade 1": {
        "Step 1": 12517,
        "Step 2": 12662,
        "Step 3": 12807,
        "Step 4": 12952,
        "Step 5": 13097,
        "Step 6": 13242,
        "Step 7": 13387,
        "Step 8": 13532
      },
      "Salary Grade 2": {
        "Step 1": 13655,
        "Step 2": 13800,
        "Step 3": 13945,
        "Step 4": 14090,
        "Step 5": 14235,
        "Step 6": 14380,
        "Step 7": 14525,
        "Step 8": 14670
      },
      "Salary Grade 3": {
        "Step 1": 14762,
        "Step 2": 14907,
        "Step 3": 15052,
        "Step 4": 15197,
        "Step 5": 15342,
        "Step 6": 15487,
        "Step 7": 15632,
        "Step 8": 15777
      },
      "Salary Grade 4": {
        "Step 1": 15869,
        "Step 2": 16014,
        "Step 3": 16159,
        "Step 4": 16304,
        "Step 5": 16449,
        "Step 6": 16594,
        "Step 7": 16739,
        "Step 8": 16884
      },
      "Salary Grade 5": {
        "Step 1": 16976,
        "Step 2": 17121,
        "Step 3": 17266,
        "Step 4": 17411,
        "Step 5": 17556,
        "Step 6": 17701,
        "Step 7": 17846,
        "Step 8": 17991
      },
      "Salary Grade 6": {
        "Step 1": 18083,
        "Step 2": 18273,
        "Step 3": 18463,
        "Step 4": 18653,
        "Step 5": 18843,
        "Step 6": 19033,
        "Step 7": 19223,
        "Step 8": 19413
      },
      "Salary Grade 7": {
        "Step 1": 19593,
        "Step 2": 19783,
        "Step 3": 19973,
        "Step 4": 20163,
        "Step 5": 20353,
        "Step 6": 20543,
        "Step 7": 20733,
        "Step 8": 20923
      },
      "Salary Grade 8": {
        "Step 1": 21103,
        "Step 2": 21293,
        "Step 3": 21483,
        "Step 4": 21673,
        "Step 5": 21863,
        "Step 6": 22053,
        "Step 7": 22243,
        "Step 8": 22433
      },
      "Salary Grade 9": {
        "Step 1": 22613,
        "Step 2": 22853,
        "Step 3": 23093,
        "Step 4": 23333,
        "Step 5": 23573,
        "Step 6": 23813,
        "Step 7": 24053,
        "Step 8": 24293
      },
      "Salary Grade 10": {
        "Step 1": 24533,
        "Step 2": 24773,
        "Step 3": 25013,
        "Step 4": 25253,
        "Step 5": 25493,
        "Step 6": 25733,
        "Step 7": 25973,
        "Step 8": 26213
      },
      "Salary Grade 11": {
        "Step 1": 26453,
        "Step 2": 26743,
        "Step 3": 27033,
        "Step 4": 27323,
        "Step 5": 27613,
        "Step 6": 27903,
        "Step 7": 28193,
        "Step 8": 28483
      },
      "Salary Grade 12": {
        "Step 1": 28773,
        "Step 2": 29063,
        "Step 3": 29353,
        "Step 4": 29643,
        "Step 5": 29933,
        "Step 6": 30223,
        "Step 7": 30513,
        "Step 8": 30803
      },
      "Salary Grade 13": {
        "Step 1": 31093,
        "Step 2": 31433,
        "Step 3": 31773,
        "Step 4": 32113,
        "Step 5": 32453,
        "Step 6": 32793,
        "Step 7": 33133,
        "Step 8": 33473
      },
      "Salary Grade 14": {
        "Step 1": 33813,
        "Step 2": 34153,
        "Step 3": 34493,
        "Step 4": 34833,
        "Step 5": 35173,
        "Step 6": 35513,
        "Step 7": 35853,
        "Step 8": 36193
      },
      "Salary Grade 15": {
        "Step 1": 36533,
        "Step 2": 36923,
        "Step 3": 37313,
        "Step 4": 37703,
        "Step 5": 38093,
        "Step 6": 38483,
        "Step 7": 38873,
        "Step 8": 39263
      },
      "Salary Grade 16": {
        "Step 1": 39653,
        "Step 2": 40043,
        "Step 3": 40433,
        "Step 4": 40823,
        "Step 5": 41213,
        "Step 6": 41603,
        "Step 7": 41993,
        "Step 8": 42383
      },
      "Salary Grade 17": {
        "Step 1": 42773,
        "Step 2": 43213,
        "Step 3": 43653,
        "Step 4": 44093,
        "Step 5": 44533,
        "Step 6": 44973,
        "Step 7": 45413,
        "Step 8": 45853
      },
      "Salary Grade 18": {
        "Step 1": 46293,
        "Step 2": 46783,
        "Step 3": 47273,
        "Step 4": 47763,
        "Step 5": 48253,
        "Step 6": 48743,
        "Step 7": 49233,
        "Step 8": 49723
      },
      "Salary Grade 19": {
        "Step 1": 50213,
        "Step 2": 50703,
        "Step 3": 51193,
        "Step 4": 51683,
        "Step 5": 52173,
        "Step 6": 52663,
        "Step 7": 53153,
        "Step 8": 53643
      },
      "Salary Grade 20": {
        "Step 1": 54133,
        "Step 2": 54673,
        "Step 3": 55213,
        "Step 4": 55753,
        "Step 5": 56293,
        "Step 6": 56833,
        "Step 7": 57373,
        "Step 8": 57913
      },
      "Salary Grade 21": {
        "Step 1": 58453,
        "Step 2": 59043,
        "Step 3": 59633,
        "Step 4": 60223,
        "Step 5": 60813,
        "Step 6": 61403,
        "Step 7": 61993,
        "Step 8": 62583
      },
      "Salary Grade 22": {
        "Step 1": 63173,
        "Step 2": 63813,
        "Step 3": 64453,
        "Step 4": 65093,
        "Step 5": 65733,
        "Step 6": 66373,
        "Step 7": 67013,
        "Step 8": 67653
      },
      "Salary Grade 23": {
        "Step 1": 68293,
        "Step 2": 68983,
        "Step 3": 69673,
        "Step 4": 70363,
        "Step 5": 71053,
        "Step 6": 71743,
        "Step 7": 72433,
        "Step 8": 73123
      },
      "Salary Grade 24": {
        "Step 1": 73813,
        "Step 2": 74553,
        "Step 3": 75293,
        "Step 4": 76033,
        "Step 5": 76773,
        "Step 6": 77513,
        "Step 7": 78253,
        "Step 8": 78993
      },
      "Salary Grade 25": {
        "Step 1": 79733,
        "Step 2": 80523,
        "Step 3": 81313,
        "Step 4": 82103,
        "Step 5": 82893,
        "Step 6": 83683,
        "Step 7": 84473,
        "Step 8": 85263
      },
      "Salary Grade 26": {
        "Step 1": 86053,
        "Step 2": 86893,
        "Step 3": 87733,
        "Step 4": 88573,
        "Step 5": 89413,
        "Step 6": 90253,
        "Step 7": 91093,
        "Step 8": 91933
      },
      "Salary Grade 27": {
        "Step 1": 92773,
        "Step 2": 93663,
        "Step 3": 94553,
        "Step 4": 95443,
        "Step 5": 96333,
        "Step 6": 97223,
        "Step 7": 98113,
        "Step 8": 99003
      },
      "Salary Grade 28": {
        "Step 1": 99893,
        "Step 2": 100833,
        "Step 3": 101773,
        "Step 4": 102713,
        "Step 5": 103653,
        "Step 6": 104593,
        "Step 7": 105533,
        "Step 8": 106473
      },
      "Salary Grade 29": {
        "Step 1": 107413,
        "Step 2": 108403,
        "Step 3": 109393,
        "Step 4": 110383,
        "Step 5": 111373,
        "Step 6": 112363,
        "Step 7": 113353,
        "Step 8": 114343
      },
      "Salary Grade 30": {
        "Step 1": 115333,
        "Step 2": 116373,
        "Step 3": 117413,
        "Step 4": 118453,
        "Step 5": 119493,
        "Step 6": 120533,
        "Step 7": 121573,
        "Step 8": 122613
      },
      "Salary Grade 31": {
        "Step 1": 123653,
        "Step 2": 124743,
        "Step 3": 125833,
        "Step 4": 126923,
        "Step 5": 128013,
        "Step 6": 129103,
        "Step 7": 130193,
        "Step 8": 131283
      },
      "Salary Grade 32": {
        "Step 1": 132373,
        "Step 2": 133513,
        "Step 3": 134653,
        "Step 4": 135793,
        "Step 5": 136933,
        "Step 6": 138073,
        "Step 7": 139213,
        "Step 8": 140353
      },
      "Salary Grade 33": {
        "Step 1": 141493,
        "Step 2": 142683
      }
    }
  }
  