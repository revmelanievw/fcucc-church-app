import React, { useState, useEffect, useMemo } from 'react';

const CONFIG = {
  churchName: "First Congregational",
  churchSubtitle: "United Church of Christ",
  location: "Cedar Rapids, Iowa",
  address: "361 17th Street SE, Cedar Rapids, IA 52403",
  phone: "319-362-1926",
  email: "office@firstchurchcr.org",
  worshipTime: "Sundays at 10:00 AM",
  givingUrl: "https://www.givelify.com/donate/first-congregational-united-church-of-christ-fcucc-cedar-rapids-ia-2j7wy5MjA3MzI=/donation/amount",
  calendarUrl: "https://fcccr.org/events",
  welcomeMessage: "No matter who you are or where you are on life's journey, you are welcome here.",
};

const SECURITY = {
  directoryPassword: "fcucc2026",
  sessionDuration: 0,
};

const DIRECTORY_DATA = [
  {
    id: 1,
    name: 'Kimm Epperson',
    email: 'kmeppers@rockwellcollins.com',
    cellPhone: '319-573-1567',
    homePhone: '319-854-6941',
    address: '2890 Springville Road, Springville, IA 52336-9763',
    photo: '',
    category: 'Community'
  },
  {
    id: 2,
    name: 'Tracy Frese',
    email: '',
    cellPhone: '',
    homePhone: '',
    address: '7628 28th Ave, Watkins, IA 52354',
    photo: 'https://lh3.googleusercontent.com/d/11Gzn0MVRJRgQnnTM5jNtNQacZruyua25',
    category: 'Community'
  },
  {
    id: 3,
    name: 'Mark Cuhel',
    email: '',
    cellPhone: '',
    homePhone: '319-857-4489',
    address: '1137 L Road SW, Swisher, Ia 52338',
    photo: 'https://lh3.googleusercontent.com/d/1WbApfl8232xfVKWnaYCGS6gR7TtaAVwL',
    category: 'Community'
  },
  {
    id: 4,
    name: 'Janelle Bockhaus',
    email: '',
    cellPhone: '',
    homePhone: '319-364-8749',
    address: '3469 Lennon Lane, Marion, IA 52302-4779',
    photo: '',
    category: 'Community'
  },
  {
    id: 5,
    name: 'John Henecke',
    email: 'johnhenecke@gmail.com',
    cellPhone: '319-929-1105',
    homePhone: '319-294-0962',
    address: '2870 Hunt Trail, Cedar Rapids, IA 52411',
    photo: 'https://lh3.googleusercontent.com/d/1JT3l0mHeFFm-69Esq9GyjQimoW0E6aXI',
    category: 'Community'
  },
  {
    id: 6,
    name: 'Wendy Henecke',
    email: 'wshenecke@gmail.com',
    cellPhone: '319-981-5152',
    homePhone: '319-294-0962',
    address: '2870 Hunt Trail, Cedar Rapids, IA 52411',
    photo: 'https://lh3.googleusercontent.com/d/1ApzqfkNS0Vqk-lgzc8oqJChSCBzOjH-h',
    category: 'Community'
  },
  {
    id: 7,
    name: 'Marcia Whiteford',
    email: 'rjtandmlw@msn.com',
    cellPhone: '319-360-2398',
    homePhone: '319-360-2398',
    address: '3836 Belden Court  NE, Cedar Rapids, IA 52402',
    photo: 'https://lh3.googleusercontent.com/d/1pFbrQEHTYTWyD9VdCl769yF2VZGNu8oK',
    category: 'Community'
  },
  {
    id: 8,
    name: 'Connie Pyron',
    email: 'clpyron@hotmail.com',
    cellPhone: '319-651-9410',
    homePhone: '319-364-8516',
    address: '118 Tomahawk Trail SE, Cedar Rapids, IA 52403',
    photo: 'https://lh3.googleusercontent.com/d/1c9Um_s-yK4-_CuQxbgwnAaJO-CVrra5Q',
    category: 'Community'
  },
  {
    id: 9,
    name: 'Lori Lane',
    email: 'lanelori192@gmail.com',
    cellPhone: '319-431-2429',
    homePhone: '319-431-2429',
    address: '308 Linden Terrace SE, Cedar Rapids, IA 52403',
    photo: 'https://lh3.googleusercontent.com/d/1BOT-1TkuT92SRplyPBwZPhXBxAIEISgN',
    category: 'Community'
  },
  {
    id: 10,
    name: 'Lisa Lawrence',
    email: 'lisalawrence@1791.com',
    cellPhone: '',
    homePhone: '319-363-3571',
    address: '117 Rock Valley Drive SW, Cedar Rapids, IA 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 11,
    name: 'Brian Runge',
    email: '',
    cellPhone: '',
    homePhone: '319-398-7379',
    address: '330 Forest Drive SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 12,
    name: 'Hope Runge',
    email: 'hrunge@aea10.k12.ia.us',
    cellPhone: '',
    homePhone: '319-398-7379',
    address: '330 Forest Drive SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 13,
    name: 'Monica Walz',
    email: 'monicakwalz@gmail.com',
    cellPhone: '319-360-5152',
    homePhone: '319-541-3103',
    address: '5322 Prairie Trail Ct, Marion, IA 52302',
    photo: 'https://lh3.googleusercontent.com/d/1gT_WkHw7xAj4UUmAm3uE6AHJMjnP5Wfh',
    category: 'Community'
  },
  {
    id: 14,
    name: 'Matthew Walz',
    email: 'mwalz06@gmail.com',
    cellPhone: '319-541-3103',
    homePhone: '319-541-3103',
    address: '5322 Prairie Trail Ct, Marion, IA 52302',
    photo: 'https://lh3.googleusercontent.com/d/1gT_WkHw7xAj4UUmAm3uE6AHJMjnP5Wfh',
    category: 'Community'
  },
  {
    id: 15,
    name: 'Tami Behel',
    email: '',
    cellPhone: '',
    homePhone: '319-540-1314',
    address: '1036 34th Street N.E., Cedar Rapids, Ia 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 16,
    name: 'Sarah Benesh',
    email: 'SARNDIPT489@msn.com',
    cellPhone: '',
    homePhone: '319-895-6170',
    address: '489 Standing Rock Rd, Mt Vernon, Ia 52314',
    photo: '',
    category: 'Community'
  },
  {
    id: 17,
    name: 'Paul Bixby',
    email: 'PBixby58@gmail.com',
    cellPhone: '319-350-6267',
    homePhone: '319-350-0017',
    address: '5111 Broadlawn Drive SE, Cedar Rapids, Ia 52403',
    photo: 'https://lh3.googleusercontent.com/d/1aODHuoTuUVLiqMZgsah7EefWqgMV2pkA',
    category: 'Community'
  },
  {
    id: 18,
    name: 'Cathy Bixby',
    email: 'cathybixby@firstchurchcr.org',
    cellPhone: '319-350-0017',
    homePhone: '319-350-0017',
    address: '5111 Broadlawn Drive SE, Cedar Rapids, Ia 52403',
    photo: 'https://lh3.googleusercontent.com/d/1uXS7pfTeCYmEH5UMgdvIb7PCcNYam-DU',
    category: 'Staff'
  },
  {
    id: 19,
    name: 'R. Scott Boots',
    email: '',
    cellPhone: '319-538-7093',
    homePhone: '773-506-6311',
    address: 'PO Box 10194, Cedar Rapids, IA 52410',
    photo: '',
    category: 'Community'
  },
  {
    id: 20,
    name: 'Cynthia Brown',
    email: 'cynbrown@msn.com',
    cellPhone: '',
    homePhone: '319-377-7959',
    address: '3400 Alburnett Rd #121, Marion, Ia 52302',
    photo: 'https://lh3.googleusercontent.com/d/109Kn7IJ0QYLQb1cLlE7FfSK0nMICsiP8',
    category: 'Community'
  },
  {
    id: 21,
    name: 'Sheila Bys',
    email: 'sheila_bys@yahoo.com',
    cellPhone: '',
    homePhone: '319-654-6729',
    address: '2621 Prescott Rd #210, Modesto, CA 95350',
    photo: 'https://lh3.googleusercontent.com/d/120zjHGMOXSqYb8wnlk6MR5h1MdG1ITIU',
    category: 'Community'
  },
  {
    id: 22,
    name: 'Eva Bys',
    email: '',
    cellPhone: '',
    homePhone: '319-364-5151',
    address: 'Harmony Nursing Home, 1940 First Ave NE, Cedar Rapids, IA 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 23,
    name: 'Valerie Glasgow',
    email: '',
    cellPhone: 'Valerie - 533-0333',
    homePhone: '',
    address: '3270 Bever Avenue SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 24,
    name: 'Carl Christensen',
    email: 'beer10dr@gmail.com',
    cellPhone: '',
    homePhone: '',
    address: '3521 Stoney Point Road SW, Cedar Rapids, IA 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 25,
    name: 'Lauren Crippes',
    email: 'j.crippes@mchsi.com',
    cellPhone: '319-533-0774',
    homePhone: '319-395-7483',
    address: '5009 Autumn Drive, Cedar Rapids, Ia 52411',
    photo: 'https://lh3.googleusercontent.com/d/1Vd42kUnB9-Eupa-3L0Twi-_JdyzT4jKD',
    category: 'Community'
  },
  {
    id: 26,
    name: 'Carol Cuhel',
    email: '',
    cellPhone: '',
    homePhone: '319-857-4489',
    address: 'The Gardens of Cedar Rapids, 5710 Dean Road SW #15, Cedar Rapids, IA 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 27,
    name: 'Alan Cuhel',
    email: 'acuhel@myctl.net',
    cellPhone: '',
    homePhone: '319-390-1424',
    address: '324 Jacolyn Dr NW, Cedar Rapids, Ia 52405-3405',
    photo: 'https://lh3.googleusercontent.com/d/1_xgG1vMLSp7I9YpRncAru4pkJoBrwQ1e',
    category: 'Community'
  },
  {
    id: 28,
    name: 'Todd Culver',
    email: 'ttculver@aol.com',
    cellPhone: '',
    homePhone: '319-447-6286',
    address: '2310 Timber Creek Drive, Marion, Ia 52302',
    photo: 'https://lh3.googleusercontent.com/d/1L7DCDMnc7IE0PU_sGoUn-sftGmqhU1vk',
    category: 'Community'
  },
  {
    id: 29,
    name: 'Tami Culver',
    email: 'tamic@culverslandscape.com',
    cellPhone: '319-533-8672',
    homePhone: '319-447-6286',
    address: '2310 Timber Creek Drive, Marion, Ia 52302',
    photo: 'https://lh3.googleusercontent.com/d/197lYtqv3lgQsHnbtQEQl3YPr9c3XJ2bd',
    category: 'Community'
  },
  {
    id: 30,
    name: 'Mark Culver',
    email: 'mhmark.culver@ecicog.org',
    cellPhone: '319-981-2799',
    homePhone: '319-377-8877',
    address: '5412 Culver Lane, Marion, Ia 52302',
    photo: 'https://lh3.googleusercontent.com/d/1CfxOTRjyrdS6fs0oXrQb4kml1K6BcRP6',
    category: 'Community'
  },
  {
    id: 31,
    name: 'Kris Culver',
    email: 'kculver1969@gmail.com',
    cellPhone: '319-270-9992',
    homePhone: '319-377-8877',
    address: '5412 Culver Lane, Marion, Ia 52302',
    photo: 'https://lh3.googleusercontent.com/d/1CfxOTRjyrdS6fs0oXrQb4kml1K6BcRP6',
    category: 'Community'
  },
  {
    id: 32,
    name: 'Jean Davison',
    email: 'RJPCD@AOL.COM',
    cellPhone: '319-329-7312',
    homePhone: '319-393-7312',
    address: '2612 Falcon Dr NE, Cedar Rapids, Ia 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 33,
    name: 'Charles Davisson',
    email: '',
    cellPhone: '',
    homePhone: '319-373-0834',
    address: '2040 Spoon Creek Ct SE, Cedar Rapids, Ia 52403-1703',
    photo: '',
    category: 'Community'
  },
  {
    id: 34,
    name: 'Mary Ann Dawson',
    email: 'dawsonmaryann82@gmail.com',
    cellPhone: '319-573-6280',
    homePhone: '319-373-5097',
    address: '2570 Edinburgh Pl, Marion, Ia 52302',
    photo: 'https://lh3.googleusercontent.com/d/1d2mOUBlOQ_JdmrWGXeeyCMIsTxeSzQBJ',
    category: 'Community'
  },
  {
    id: 35,
    name: 'Jeff Dixon',
    email: '',
    cellPhone: '',
    homePhone: '319-363-6793',
    address: '1567 Matterhorn Dr NE, Cedar Rapids, Ia 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 36,
    name: 'Glenda Dixon',
    email: 'glenda.dixon@msn.com',
    cellPhone: '',
    homePhone: '319-363-6793',
    address: '1567 Matterhorn Dr NE, Cedar Rapids, Ia 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 37,
    name: 'Allan Edwards',
    email: 'adedw436@aol.com',
    cellPhone: '',
    homePhone: '319-393-7535',
    address: '150 Thompson Dr SE #122, Cedar Rapids, Ia 52403-1746',
    photo: '',
    category: 'Community'
  },
  {
    id: 38,
    name: 'Marcia Edwards',
    email: 'adedw436@aol.com',
    cellPhone: '',
    homePhone: '319-393-7535',
    address: '150 Thompson Dr SE #122, Cedar Rapids, Ia 52403-1746',
    photo: '',
    category: 'Community'
  },
  {
    id: 39,
    name: 'Larry Erb',
    email: 'Lerb@erbs.com',
    cellPhone: '',
    homePhone: '319-366-6613',
    address: '3633 Honey Hill Dr SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 40,
    name: 'Marsha Erb',
    email: '',
    cellPhone: '',
    homePhone: '319-366-6613',
    address: '3633 Honey Hill Dr SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 41,
    name: 'Richard Eyman',
    email: 'NAGATAMEN172@msn.com',
    cellPhone: '319-270-7164',
    homePhone: '319-364-8559',
    address: '369 18th Street SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 42,
    name: 'Dennis Fleer',
    email: '',
    cellPhone: '319-560-0066',
    homePhone: '319-395-9662',
    address: '3310 Timber Valley Ct NE, Cedar Rapids, Ia 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 43,
    name: 'Marilyn Fleer',
    email: 'denmar3310@gmail.com',
    cellPhone: '319-560-6699',
    homePhone: '319-395-9662',
    address: '3310 Timber Valley Ct NE, Cedar Rapids, Ia 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 44,
    name: 'Doris Gitzy',
    email: 'drdgitzy@gmail.com',
    cellPhone: '319-210-5521',
    homePhone: '319-210-5521',
    address: '1434 Center Point Rd NE #E, Cedar Rapids, Ia 52402',
    photo: 'https://lh3.googleusercontent.com/d/1TdEAdAzv_SsDrBpV2xL3iklbbfTiG256',
    category: 'Staff'
  },
  {
    id: 45,
    name: 'Kelli Goss',
    email: 'kelli-goss@uiowa.edu',
    cellPhone: '',
    homePhone: '319-393-7679',
    address: '325 Landau Street, Robins, Ia 52328',
    photo: '',
    category: 'Community'
  },
  {
    id: 46,
    name: 'James Gray',
    email: 'gray242@aol.com',
    cellPhone: '',
    homePhone: '319-365-5216',
    address: '242 Lamplight Lane SE, Cedar Rapids, Ia 52403-1924',
    photo: '',
    category: 'Community'
  },
  {
    id: 47,
    name: 'Valerie Gray',
    email: 'gray242@aol.com',
    cellPhone: '',
    homePhone: '319-365-5216',
    address: '242 Lamplight Lane SE, Cedar Rapids, Ia 52403-1924',
    photo: '',
    category: 'Community'
  },
  {
    id: 48,
    name: 'Jane Hutchins',
    email: 'jane@jhutchinsdesign.com',
    cellPhone: '319-350-0028',
    homePhone: '319-364-4454',
    address: '530 Knollwood Dr SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 49,
    name: 'Terry Gunzenhauser',
    email: 'gunzterry@southslope.net',
    cellPhone: '319-929-2597',
    homePhone: '319-828-8126',
    address: '1745 Johnson Iowa Road, Homestead, Ia 52236-8501',
    photo: '',
    category: 'Community'
  },
  {
    id: 50,
    name: 'Elaine Gunzenhauser',
    email: 'gunzelaine@southslope.net',
    cellPhone: '319-929-2602',
    homePhone: '319-828-8126',
    address: '1745 Johnson Iowa Road, Homestead, Ia 52236-8501',
    photo: '',
    category: 'Community'
  },
  {
    id: 51,
    name: 'Charles Heins',
    email: '',
    cellPhone: '',
    homePhone: '319-365-7292',
    address: '1925 Bloomington Rd, Marion, IA 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 52,
    name: 'Ann Heins',
    email: 'annabelleheins@gmail.com',
    cellPhone: '',
    homePhone: '651-324-0031',
    address: '325 25th St. Dr. SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 53,
    name: 'Jeanne Hepker',
    email: 'jknitter70@aol.com',
    cellPhone: '',
    homePhone: '319-364-2303',
    address: '6126 Rockwell Drive NE #239, Cedar Rapids, IA 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 54,
    name: 'Verlyn Hines',
    email: 'jhines551@mchsi.com',
    cellPhone: '',
    homePhone: '319-366-4618',
    address: '3236 Soutter Ave SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 55,
    name: 'Janie Hines',
    email: 'janie.hines7320@gmail.com',
    cellPhone: '',
    homePhone: '319-366-4618',
    address: '3236 Soutter Ave SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 56,
    name: 'David Holloway',
    email: 'hdhol1999sport@gmail.com',
    cellPhone: '',
    homePhone: '',
    address: '363 26th Ave SW, Cedar Rapids, Ia 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 57,
    name: 'Marilyn Hunter',
    email: '',
    cellPhone: '',
    homePhone: '319-366-1396',
    address: '3109 Tamara Dr SW, Cedar Rapids, Ia 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 58,
    name: 'Kevin King',
    email: 'kaking50112@gmail.com',
    cellPhone: '319-721-4203',
    homePhone: '319-365-8785',
    address: '5321 Seminole Valley Trail NE, Cedar Rapids, Ia 52411',
    photo: 'https://lh3.googleusercontent.com/d/1dTrHqDiNNSHHo8pFFhZQTkJdxLRmxila',
    category: 'Community'
  },
  {
    id: 59,
    name: 'Anne King',
    email: 'abwjking@msn.com',
    cellPhone: '',
    homePhone: '319-365-8785',
    address: '5321 Seminole Valley Trail NE, Cedar Rapids, Ia 52411',
    photo: '',
    category: 'Community'
  },
  {
    id: 60,
    name: 'Bill Kling',
    email: '',
    cellPhone: '',
    homePhone: '319-377-6217',
    address: '2790 Brandon Court, Marion, Ia 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 61,
    name: 'Susan Kling',
    email: 'suzkling39@gmail.com',
    cellPhone: '',
    homePhone: '319-377-6217',
    address: '2790 Brandon Court, Marion, Ia 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 62,
    name: 'Nancy Klopp',
    email: 'nbklopp@msn.com',
    cellPhone: '',
    homePhone: '',
    address: '1300 13th St NW, Unit B 207, Cedar Rapids, IA 52405',
    photo: '',
    category: 'Community'
  },
  {
    id: 63,
    name: 'Paul Knight',
    email: 'pkincr@gmail.com',
    cellPhone: '319-560-7138',
    homePhone: '319-364-2331',
    address: '942 Center Point Rd NE, Cedar Rapids, Ia 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 64,
    name: 'Pytr Knoll',
    email: 'pytrknoll@gmail.com',
    cellPhone: '',
    homePhone: '319-365-5669',
    address: '740 East Post Ct SE, Cedar Rapids, Ia 52403',
    photo: 'https://lh3.googleusercontent.com/d/1U1cA7eFwj-kfzJUULElDyyhynTpr8Hp7',
    category: 'Community'
  },
  {
    id: 65,
    name: 'Mona Knoll',
    email: 'mknoll@nazettelaw.com',
    cellPhone: '',
    homePhone: '319-365-5669',
    address: '740 East Post Ct SE, Cedar Rapids, Ia 52403',
    photo: 'https://lh3.googleusercontent.com/d/1zexf_eI74V2C1wWXKSBjVwhgIYoqoKY4',
    category: 'Community'
  },
  {
    id: 66,
    name: 'Howard Knott',
    email: '',
    cellPhone: '',
    homePhone: '319-393-2728',
    address: '5800 Sanden Road, Cedar Rapids, Ia 52411-7952',
    photo: '',
    category: 'Community'
  },
  {
    id: 67,
    name: 'Nina Knott',
    email: '',
    cellPhone: '',
    homePhone: '319-393-2728',
    address: '5800 Sanden Road, Cedar Rapids, Ia 52411-7952',
    photo: '',
    category: 'Community'
  },
  {
    id: 68,
    name: 'Karl Knutson',
    email: 'Knutson.Karl@gmail.com',
    cellPhone: '',
    homePhone: '319-366-3900',
    address: '2510 26th St Dr SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 69,
    name: 'Patricia Knutson',
    email: 'patricia.knutson@gmail.com',
    cellPhone: '',
    homePhone: '319-366-3900',
    address: '2510 26th St Dr SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 70,
    name: 'Jeanne Krieg',
    email: '',
    cellPhone: '',
    homePhone: '319-294-5007',
    address: 'Irving Point Assisted Living, 910 7th Street SE #229, Cedar Rapids, IA 52401',
    photo: '',
    category: 'Community'
  },
  {
    id: 71,
    name: 'Kevin Kubik',
    email: '',
    cellPhone: '319-360-4161',
    homePhone: '',
    address: '3407 River Ridge Ct. NE, Cedar Rapids, Ia 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 72,
    name: 'Renee Kubik',
    email: '',
    cellPhone: '319-389-6115',
    homePhone: '',
    address: '3407 River Ridge Ct. NE, Cedar Rapids, Ia 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 73,
    name: 'Geraldine Loupee',
    email: '',
    cellPhone: '',
    homePhone: '319-362-5612',
    address: '1742 Lake Terrace Road SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 74,
    name: 'Richard Lyle',
    email: '4richlyle@gmail.com',
    cellPhone: '319-213-4692',
    homePhone: '319-533-8467',
    address: '511 Dunreath Dr NE, Cedar Rapids, Ia 52402',
    photo: 'https://lh3.googleusercontent.com/d/1yQNrYWZCB9ckJJOndxBckDZ2-RbQh4cU',
    category: 'Community'
  },
  {
    id: 75,
    name: 'Victoria Lyle',
    email: 'vlyle511@hotmail.com',
    cellPhone: '319-533-8467',
    homePhone: '319-533-8467',
    address: '511 Dunreath Dr NE, Cedar Rapids, Ia 52402',
    photo: 'https://lh3.googleusercontent.com/d/1I2DpvJb8vDVH_o3RO2FX9QyyRIoOoC1l',
    category: 'Community'
  },
  {
    id: 76,
    name: 'Bonnie Lyon',
    email: 'lyonbn@gmail.com',
    cellPhone: '',
    homePhone: '',
    address: '1214 Holmans Road, Mount Vernon, Ia 52314-9630',
    photo: '',
    category: 'Community'
  },
  {
    id: 77,
    name: 'Marlene Meeker',
    email: 'studemee@msn.com',
    cellPhone: '',
    homePhone: '',
    address: '3544 35th St Ct, Marion, Ia 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 78,
    name: 'Mark Williams',
    email: 'mark.h.william@yahoo.com',
    cellPhone: '319-360-6060',
    homePhone: '',
    address: '503 Green Valley Terrace  SE, Cedar Rapids, IA 52403',
    photo: 'https://lh3.googleusercontent.com/d/1crY0AfSq6cXwsXn7ddgLp5cH3FBYypb7',
    category: 'Community'
  },
  {
    id: 79,
    name: 'Molly Williams',
    email: 'mollybairwilliams@gmail.com',
    cellPhone: '319-360-8052',
    homePhone: '',
    address: '503 Green Valley Terrace  SE, Cedar Rapids, IA 52403',
    photo: 'https://lh3.googleusercontent.com/d/19XfuOl3deucSLwKl5GbPi3csJ18Gg4wf',
    category: 'Community'
  },
  {
    id: 80,
    name: 'William Neppl',
    email: 'wneppl@bradleyriley.com',
    cellPhone: '319-861-8734',
    homePhone: '319-373-7508',
    address: '2989 Diamond Lane SE, Cedar Rapids, Ia 52403',
    photo: 'https://lh3.googleusercontent.com/d/1uXi46O0jTlXv5Ti49kJLoyM5BJTFsZ43',
    category: 'Leadership'
  },
  {
    id: 81,
    name: 'Diana Neppl',
    email: 'di2989@mchsi.com',
    cellPhone: '319-573-7508',
    homePhone: '319-573-7508',
    address: '2989 Diamond Lane SE, Cedar Rapids, Ia 52403',
    photo: 'https://lh3.googleusercontent.com/d/1uXi46O0jTlXv5Ti49kJLoyM5BJTFsZ43',
    category: 'Leadership'
  },
  {
    id: 82,
    name: 'Ann Netser',
    email: 'anetsr1@mchsi.com',
    cellPhone: '',
    homePhone: '319-377-1133',
    address: '301 Hilltop Rd, Marion, Ia 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 83,
    name: 'William Nicholson',
    email: 'wnich@rushnicholson.com',
    cellPhone: '',
    homePhone: '319-363-0661',
    address: '365 Lindsay Lane SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 84,
    name: 'Cynthia Nicholson',
    email: 'ccnich49@gmail.com',
    cellPhone: '319-721-0296',
    homePhone: '319-363-0661',
    address: '365 Lindsay Lane SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 85,
    name: 'Barbara Ochs',
    email: '',
    cellPhone: '',
    homePhone: '319-377-7232',
    address: '358 Abbotsford Rd SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 86,
    name: 'Thomas Ochs',
    email: '',
    cellPhone: '',
    homePhone: '319-363-2507',
    address: '130 26th Street Dr SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 87,
    name: 'Candace Mullen',
    email: 'candy.mullen@gmail.com',
    cellPhone: '319-210-0772',
    homePhone: '319-826-6550',
    address: '530 Partridge Ct, Marion, Ia 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 88,
    name: 'Mary Hindman',
    email: 'tap.mkh@prodigy.net',
    cellPhone: '319-360-4127',
    homePhone: '',
    address: '181 Braybrook SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 89,
    name: 'Judith Parks',
    email: 'joydwight@gmail.com',
    cellPhone: '319-366-6889',
    homePhone: '319-366-6889',
    address: '1900 Grande Ave SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Leadership'
  },
  {
    id: 90,
    name: 'David Parks',
    email: '',
    cellPhone: '',
    homePhone: '',
    address: '',
    photo: '',
    category: 'Community'
  },
  {
    id: 91,
    name: 'Jean Parks',
    email: '',
    cellPhone: '',
    homePhone: '',
    address: '',
    photo: '',
    category: 'Community'
  },
  {
    id: 92,
    name: 'Carol Paul',
    email: 'carolpaul54@gmail.com',
    cellPhone: '319-538-2102',
    homePhone: '319- 538-2102',
    address: '1400 2nd Ave SE #508, Cedar Rapids, Ia 52403',
    photo: 'https://lh3.googleusercontent.com/d/1i6NGwqFOTfiEmY1RlNeBdzr-x-LPri_h',
    category: 'Community'
  },
  {
    id: 93,
    name: 'John Prideg',
    email: '',
    cellPhone: '',
    homePhone: '319-396-2539',
    address: '3901 Tarpy Dr SW, Cedar Rapids, Ia 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 94,
    name: 'Kris Prideg',
    email: '',
    cellPhone: '',
    homePhone: '319-396-2539',
    address: '3901 Tarpy Dr SW, Cedar Rapids, Ia 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 95,
    name: 'Boyd Printy',
    email: 'bdprinty@hotmail.com',
    cellPhone: '319-721-7658',
    homePhone: '319-721-7657',
    address: '211 26th Street Drive SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 96,
    name: 'Katherine Printy',
    email: 'klprinty@hotmail.com',
    cellPhone: '319-721-7657',
    homePhone: '319-721-7657',
    address: '211 26th Street Drive SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 97,
    name: 'Jeffrey Printy',
    email: '',
    cellPhone: '',
    homePhone: '',
    address: '2810 23rd Avenue, Marion, Ia 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 98,
    name: 'Kelly Printy',
    email: '',
    cellPhone: '',
    homePhone: '',
    address: '2810 23rd Avenue, Marion, Ia 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 99,
    name: 'Roland Raim',
    email: 'raim3@mchsi.com',
    cellPhone: '',
    homePhone: '319-377-7922',
    address: '3505 English Glen Ave, Marion, Ia 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 100,
    name: 'Nancy Raim',
    email: 'raim3@mchsi.com',
    cellPhone: '',
    homePhone: '319-721-2599',
    address: '3505 English Glen Ave, Marion, Ia 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 101,
    name: 'Pamela Dircks',
    email: 'pkdcreations@gmail.com',
    cellPhone: '319-360-5107',
    homePhone: '319-377-5105',
    address: '2500 Northview Drive, Marion, IA 52302',
    photo: 'https://lh3.googleusercontent.com/d/1D0KglBpTSIjT4qkFBTfJDWmnQ8JE1RzP',
    category: 'Community'
  },
  {
    id: 102,
    name: 'Ruth Roberts',
    email: '',
    cellPhone: '',
    homePhone: '319-373-1246',
    address: '830 Edward Court SE  Unit 118, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 103,
    name: 'Rick Robertson',
    email: 'rrobertson@imonmail.com',
    cellPhone: '',
    homePhone: '319-848-2177',
    address: '2517 31st Street SW, Cedar Rapids, Ia 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 104,
    name: 'Christine Robertson',
    email: '',
    cellPhone: '319-521-4998',
    homePhone: '319-848-2177',
    address: '2517 31st Street SW, Cedar Rapids, Ia 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 105,
    name: 'Gerald Schaub',
    email: 'gdschaub@aol.com',
    cellPhone: '319-540-2383',
    homePhone: '319-550-6144',
    address: '3229 Stone Court, Marion, Ia 52302-9433',
    photo: '',
    category: 'Community'
  },
  {
    id: 106,
    name: 'Carol Schaub',
    email: 'gdschaub@aol.com',
    cellPhone: '319-361-3161',
    homePhone: '319-550-6144',
    address: '3229 Stone Court, Marion, Ia 52302-9433',
    photo: '',
    category: 'Community'
  },
  {
    id: 107,
    name: 'Douglas Schumacher',
    email: 'dschumacher11@mchsi.com',
    cellPhone: '319-360-3663',
    homePhone: '319-366-3649',
    address: '136 Red Fox Rd SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 108,
    name: 'Jane Schumacher',
    email: 'dschumacher11@mchsi.com',
    cellPhone: '319-360-8621',
    homePhone: '319-366-3649',
    address: '136 Red Fox Rd SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 109,
    name: 'Peter Seyfer',
    email: '',
    cellPhone: '',
    homePhone: '',
    address: '159 Red Fox Rd SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 110,
    name: 'Joy Seyfer',
    email: '',
    cellPhone: '',
    homePhone: '',
    address: '159 Red Fox Rd SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 111,
    name: 'Maria Shebetka',
    email: 'crladybug77@gmail.com',
    cellPhone: '319-551-4902',
    homePhone: '',
    address: '1685 Highview Drive, Marion, Ia 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 112,
    name: 'Marvin Smith',
    email: '',
    cellPhone: '319-558-6084',
    homePhone: '',
    address: '730 Knoll St SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 113,
    name: 'Janice Smith',
    email: 'jipster21@yahoo.com',
    cellPhone: '319-558-6083',
    homePhone: '',
    address: '730 Knoll St SE, Cedar Rapids, Ia 52403',
    photo: 'https://lh3.googleusercontent.com/d/1f2BuRsYGwiRmhL13Ava-OEavaEIpef-Q',
    category: 'Community'
  },
  {
    id: 114,
    name: 'Stephanie Smith',
    email: 'ssmith@asac.us',
    cellPhone: '',
    homePhone: '319-310-5744',
    address: '108 Cynthia St SW, Cedar Rapids, IA 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 115,
    name: 'Joseph Snitker',
    email: '',
    cellPhone: '',
    homePhone: '319-373-6067',
    address: '750 Edinburgh Avenue, Marion, Ia 52302-5618',
    photo: '',
    category: 'Community'
  },
  {
    id: 116,
    name: 'Andrea Taylor',
    email: 'alynnta@aol.com',
    cellPhone: '',
    homePhone: '319-350-9948',
    address: '302 B Avenue, Hiawatha, IA 52233-1508',
    photo: '',
    category: 'Community'
  },
  {
    id: 117,
    name: 'Debra St. John',
    email: 'debstjohn50@gmail.com',
    cellPhone: '319-310-6116',
    homePhone: '319-310-6116',
    address: '1230 English Ln NE #205, Cedar Rapids, IA 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 118,
    name: 'Paul Taylor',
    email: 'paul.allen.taylor@gmail.com',
    cellPhone: '319-310-5765',
    homePhone: '',
    address: '2413 DeSoto SW, Cedar Rapids, Ia 52404',
    photo: 'https://lh3.googleusercontent.com/d/1ZbxnhtitgDqQmivSM9SZvtcP4023NVTx',
    category: 'Leadership'
  },
  {
    id: 119,
    name: 'Larry Taylor',
    email: 'lot5511@gmail.com',
    cellPhone: '319-270-1834',
    homePhone: '319-393-0844',
    address: '5511 Antler Drive, Cedar Rapids, Ia 52411',
    photo: 'https://lh3.googleusercontent.com/d/1uXi46O0jTlXv5Ti49kJLoyM5BJTFsZ43',
    category: 'Community'
  },
  {
    id: 120,
    name: 'Barbara Taylor',
    email: 'barbscitch@mchsi.com',
    cellPhone: '319-270-5777',
    homePhone: '319-393-0844',
    address: '5511 Antler Drive, CEDAR RAPIDS, IA 52411',
    photo: 'https://lh3.googleusercontent.com/d/1fV_U9qOTzjcy1zhjM9nGj1ASiBmORwZf',
    category: 'Leadership'
  },
  {
    id: 121,
    name: 'Diana Tellier',
    email: '',
    cellPhone: '319-389-2544',
    homePhone: '319-396-4899',
    address: '3341 Dunham Dr SW, Cedar Rapids, Ia 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 122,
    name: 'Brian Westphalen',
    email: 'bmwestphalen@aol.com',
    cellPhone: '319-431-6589',
    homePhone: '319-363-9881',
    address: '324 Crescent St SE, Cedar Rapids, Ia 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 123,
    name: 'Michael Woode',
    email: 'mandmwoode@hotmail.com',
    cellPhone: '319-270-3903',
    homePhone: '',
    address: '720 S 22nd Street, Marion, Ia 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 124,
    name: 'Michelle Woode',
    email: 'mandmwoode@hotmail.com',
    cellPhone: '319-329-6236',
    homePhone: '',
    address: '720 S 22nd Street, Marion, Ia 52302',
    photo: 'https://lh3.googleusercontent.com/d/1POXnMaXV-AIxeRUciw9K17lJtdmHssPd',
    category: 'Leadership'
  },
  {
    id: 125,
    name: 'Mark Wooff',
    email: '',
    cellPhone: '',
    homePhone: '319-377-8651',
    address: '1862 Hunters Creek Way, Marion, Ia 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 126,
    name: 'Julie Wooff',
    email: 'm.jwooff.schaub@mchsi.com',
    cellPhone: '',
    homePhone: '319-377-8651',
    address: '1862 Hunters Creek Way, Marion, Ia 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 127,
    name: 'William Yeisley',
    email: 'hcyeisleyharriet@outlook.com',
    cellPhone: '319-560-1079',
    homePhone: '319-362-2732',
    address: '4425 Westchester Dr NE, Unit A, Cedar Rapids, Ia 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 128,
    name: 'Harriet Yeisley',
    email: 'hcyeisleyharriet@outlook.com',
    cellPhone: '',
    homePhone: '319-362-2732',
    address: 'Hiawatha Care Centerm 405 N 15th Avenue, Hiawatha, IA 52233',
    photo: '',
    category: 'Community'
  },
  {
    id: 129,
    name: 'Joyce Vogt',
    email: 'joycerhvogt@gmail.com',
    cellPhone: '319-360-4069',
    homePhone: '',
    address: '1650 Koehler Drive NW #212, Cedar Rapids, IA 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 130,
    name: 'Corey Baker',
    email: 'subtlechange@mchsi.com',
    cellPhone: '319-929-5962',
    homePhone: '319-861-2958',
    address: '3844 Clark Road   SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 131,
    name: 'Kathy Baker',
    email: 'kjb@onenoteguitar.com',
    cellPhone: '319-929-5960',
    homePhone: '319-861-2958',
    address: '3844 Clark Road   SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 132,
    name: 'Patricia Davison',
    email: 'laughalot1234567@aol.com',
    cellPhone: '',
    homePhone: '319-329-9208',
    address: '3212 1st Ave NW, Cedar Rapids, IA 52405',
    photo: '',
    category: 'Community'
  },
  {
    id: 133,
    name: 'Daniel Perez',
    email: 'daniel.perez2@wellsfargo.com',
    cellPhone: '',
    homePhone: '319-432-4115',
    address: '4529 Adams Ct NE, Cedar Rapids, IA 52411',
    photo: '',
    category: 'Community'
  },
  {
    id: 134,
    name: 'Jenna Perez',
    email: 'jenna.perez1@gmail.com',
    cellPhone: '',
    homePhone: '319-432-4115',
    address: '4529 Adams Ct NE, Cedar Rapids, IA 52411',
    photo: '',
    category: 'Community'
  },
  {
    id: 135,
    name: 'James Moriarty',
    email: 'james.moriarty4@gmail.com',
    cellPhone: '641-781-8867',
    homePhone: '641-781-8868',
    address: '6912 Surrey Drive NE, Cedar Rapids, IA 52402',
    photo: 'https://lh3.googleusercontent.com/d/17gQiTxe2Owk7-PgetF2_zMeh4tFSlrIW',
    category: 'Community'
  },
  {
    id: 136,
    name: 'Dawn Moriarty',
    email: 'DAWNLIN.MORIARTY@GMAIL.COM',
    cellPhone: '641-781-8868',
    homePhone: '641-781-8868',
    address: '6912 Surrey Drive NE, Cedar Rapids, IA 52402',
    photo: 'https://lh3.googleusercontent.com/d/1c_6P3XpZyRRhfRfW2bKhk8agocuPj1y5',
    category: 'Community'
  },
  {
    id: 137,
    name: 'Gary Hebl-Benser',
    email: 'gary.benser@gmail.com',
    cellPhone: '319-533-4199',
    homePhone: '319-533-4199',
    address: '111 E Lemon Street, West Branch, IA 52358',
    photo: 'https://lh3.googleusercontent.com/d/1cVE-OblJEGmZ-DvM9MloR2ahqo6CDRcT',
    category: 'Community'
  },
  {
    id: 138,
    name: 'Kris Williams',
    email: '',
    cellPhone: '',
    homePhone: '319-582-1639',
    address: '4132 Lexington Dr NE Unit D, Cedar Rapids, IA 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 139,
    name: 'Kylisha Williams',
    email: '',
    cellPhone: '',
    homePhone: '319-582-1639',
    address: '4132 Lexington Dr NE Unit D, Cedar Rapids, IA 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 140,
    name: 'Joan Runge',
    email: 'DJRUNG@mchsi.com',
    cellPhone: '',
    homePhone: '319-550-4607',
    address: '4693 Mallard Court, Marion, IA 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 141,
    name: 'Matt Rood',
    email: '',
    cellPhone: '',
    homePhone: '(319) 389-6288',
    address: '1313 Burch Ave NW, Cedar Rapids, IA 52405',
    photo: '',
    category: 'Community'
  },
  {
    id: 142,
    name: 'Clare Rood',
    email: '',
    cellPhone: '',
    homePhone: '(319) 389-6288',
    address: '1313 Burch Ave NW, Cedar Rapids, IA 52405',
    photo: '',
    category: 'Community'
  },
  {
    id: 143,
    name: 'Geraldine Slaybaugh',
    email: 'geribobs@imonmail.com',
    cellPhone: '',
    homePhone: '319-364-6240',
    address: '740 25th Street NE, Cedar Rapids, IA 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 144,
    name: 'Heidi Becker',
    email: 'hculver9@gmail.com',
    cellPhone: '319-929-3893',
    homePhone: '319-929-3893',
    address: '820 71st St NE, Cedar Rapids, IA 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 145,
    name: 'Travis Becker',
    email: 'travisbecker23@gmail.com',
    cellPhone: '319-415-3321',
    homePhone: '319-929-3893',
    address: '820 71st St NE, Cedar Rapids, IA 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 146,
    name: 'Les (Lester) Bailey',
    email: 'lcbailey65@hotmail.com',
    cellPhone: '319-481-1044',
    homePhone: '319-550-3611',
    address: '2605 1st Avenue, Marion, IA 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 147,
    name: 'Sue Keller',
    email: 'smallcat@centurylink.net',
    cellPhone: '319-321-0203',
    homePhone: '319-393-3402',
    address: '4500 Deer View Rd, Cedar Rapids, IA 52411',
    photo: '',
    category: 'Community'
  },
  {
    id: 148,
    name: 'Ed Keller',
    email: 'aekeller@centurylink.net',
    cellPhone: '',
    homePhone: '319-393-3402',
    address: '4500 Deer View Rd, Cedar Rapids, IA 52411',
    photo: '',
    category: 'Community'
  },
  {
    id: 149,
    name: 'Darwin Plagge',
    email: 'darwinplagge@hotmail.com',
    cellPhone: '',
    homePhone: '319-390-4487',
    address: '2931 6th St. SW, Apt. #1, Cedar Rapids, IA 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 150,
    name: 'Derek Plagge',
    email: 'plagge.derek@gmail.com',
    cellPhone: '319-431-3939',
    homePhone: '319-390-4487',
    address: '2931 6th St. SW, Apt. #1, Cedar Rapids, IA 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 151,
    name: 'Carrie Wickham',
    email: 'carrie.wickham@gmail.com',
    cellPhone: '',
    homePhone: '319-693-2081',
    address: '1601 - 24th St NW, Cedar Rapids, IA 52405',
    photo: '',
    category: 'Community'
  },
  {
    id: 152,
    name: 'Charles Russell',
    email: 'crussell617@gmail.com',
    cellPhone: '319-538-2167',
    homePhone: '319-550-6907',
    address: '6862 Spear Point Court, Marion, IA 52302',
    photo: '',
    category: 'Leadership'
  },
  {
    id: 153,
    name: 'Susan Russell',
    email: 'srussell664@gmail.com',
    cellPhone: '319-538-2168',
    homePhone: '319-550-6907',
    address: '6862 Spear Point Court, Marion, IA 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 154,
    name: 'Al Boettger',
    email: 'allan-boettger@uiowa.edu',
    cellPhone: '',
    homePhone: '',
    address: '101 Bogie Hills Drive, Columbia, MO 65201',
    photo: '',
    category: 'Community'
  },
  {
    id: 155,
    name: 'Jen Boettger',
    email: 'jen.boettger@gmail.com',
    cellPhone: '319-721-7312',
    homePhone: '',
    address: '101 Bogie Hills Drive, Columbia, MO 65201',
    photo: '',
    category: 'Community'
  },
  {
    id: 156,
    name: 'Brian Allen',
    email: 'kristiallensmile@gmail.com',
    cellPhone: '',
    homePhone: '319-431-4287',
    address: '1411 A Avenue NW, Cedar Rapids, IA 52405',
    photo: '',
    category: 'Community'
  },
  {
    id: 157,
    name: 'Kristi Allen',
    email: 'kristiallensmile@gmail.com',
    cellPhone: '',
    homePhone: '319-431-4287',
    address: '1411 A Avenue NW, Cedar Rapids, IA 52405',
    photo: '',
    category: 'Community'
  },
  {
    id: 158,
    name: 'Meghan Riden',
    email: 'penwoman8@yahoo.com',
    cellPhone: '',
    homePhone: '319-350-8994',
    address: '428 Memorial Drive SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 159,
    name: 'Dustin Riden',
    email: '',
    cellPhone: '',
    homePhone: '319-350-8994',
    address: '428 Memorial Drive SE, Cedar Rapids, IA 52403',
    photo: 'https://lh3.googleusercontent.com/d/1ams9Gp003VgJdKbE8K0kSk25N0YmVeL7',
    category: 'Community'
  },
  {
    id: 160,
    name: 'Norma Hughes',
    email: 'nghughes7@gmail.com',
    cellPhone: '',
    homePhone: '563-590-6701',
    address: '590 Telluride Trail, Marion, IA 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 161,
    name: 'Betty King',
    email: '1420dreamsinc@gmail.com',
    cellPhone: '319-533-9075',
    homePhone: '319-533-9075',
    address: '2042 Linn Blvd SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 162,
    name: 'Timothy Hofferber',
    email: 'tim.hofferber@gmail.com',
    cellPhone: '319-531-0675',
    homePhone: '319-531-0675',
    address: '4407 Adams Ct NE, Cedar Rapids, IA 52411',
    photo: '',
    category: 'Community'
  },
  {
    id: 163,
    name: 'Carli Hofferber',
    email: 'hofferbers@gmail.com',
    cellPhone: '563-581-3837',
    homePhone: '319-531-0675',
    address: '4407 Adams Ct NE, Cedar Rapids, IA 52411',
    photo: '',
    category: 'Community'
  },
  {
    id: 164,
    name: 'Renee Miller',
    email: 'rsmiller@imonmail.com',
    cellPhone: '319-540-3552',
    homePhone: '319-540-3552',
    address: '7300 1st Avenue NW, Cedar Rapids, IA 52405',
    photo: '',
    category: 'Community'
  },
  {
    id: 165,
    name: 'Scott Miller',
    email: 'rsmiller@imonmail.com',
    cellPhone: '319-540-3754',
    homePhone: '319-540-3552',
    address: '7300 1st Avenue NW, Cedar Rapids, IA 52405',
    photo: '',
    category: 'Community'
  },
  {
    id: 166,
    name: 'Al Johnston',
    email: '',
    cellPhone: '319-310-6075',
    homePhone: '',
    address: '409 Cherry Hil Rd NW, Cedar Rapids, IA 52405',
    photo: '',
    category: 'Community'
  },
  {
    id: 167,
    name: 'Mary Lou Peters',
    email: 'mlpetersia@gmail.com',
    cellPhone: '',
    homePhone: '515-571-0866',
    address: '1650 Koehler Dr NW #234, Cedar Rapids, IA 52405-1578',
    photo: '',
    category: 'Community'
  },
  {
    id: 168,
    name: 'Anne Christensen',
    email: '',
    cellPhone: '',
    homePhone: '319-826-6337',
    address: '4500 Snowgoose Court, Marion, IA 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 169,
    name: 'Cherryl Moon Thomason',
    email: 'cherron@mchsi.com',
    cellPhone: '319-329-5089',
    homePhone: '319-329-5089',
    address: '150 Thompson Drive SE #308, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 170,
    name: 'Mike Murrell',
    email: '4 murrells@gmail.com',
    cellPhone: '319-640-5192',
    homePhone: '319-640-5198',
    address: '2270 Heritage Green Drive, Hiawatha, IA 52233',
    photo: '',
    category: 'Community'
  },
  {
    id: 171,
    name: 'Deb Murrell',
    email: '4murrells@gmail.com',
    cellPhone: '319-640-5198',
    homePhone: '319-640-5198',
    address: '2270 Heritage Green Drive, Hiawatha, IA 52233',
    photo: '',
    category: 'Community'
  },
  {
    id: 172,
    name: 'Patricia Myers',
    email: 'patmyers1@gmail.com',
    cellPhone: '319-621-6833',
    homePhone: '319-621-6833',
    address: '168 Thompson Drive SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 173,
    name: 'Biondo Lujulika',
    email: '',
    cellPhone: '319-389-5864',
    homePhone: '319-538-2808',
    address: '1533 E Ave NW, Cedar Rapids, IA 52405',
    photo: '',
    category: 'Community'
  },
  {
    id: 174,
    name: 'Shukrani Thahe',
    email: 'joelbyondo@gmail.com',
    cellPhone: '319-538-2808',
    homePhone: '319-538-2808',
    address: '1533 E Ave NW, Cedar Rapids, IA 52405',
    photo: '',
    category: 'Community'
  },
  {
    id: 175,
    name: 'Tyler Culver',
    email: 'tyculv@gmail.com',
    cellPhone: '',
    homePhone: '319-389-7553',
    address: '1181 Hickory Ridge Drive, Marion, IA 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 176,
    name: 'Kelsey Culver',
    email: '',
    cellPhone: '',
    homePhone: '319-389-7553',
    address: '1181 Hickory Ridge Drive, Marion, IA 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 177,
    name: 'Kent Ryan',
    email: 'kryan@cr.k12.ia.us',
    cellPhone: '515-210-7551',
    homePhone: '515-210-7551',
    address: '2521 10th Ave SW, Cedar Rapids, IA 52404',
    photo: 'https://lh3.googleusercontent.com/d/12vkE2t0xkdWlZkyurmhWoM_3Z8-hQHZH',
    category: 'Leadership'
  },
  {
    id: 178,
    name: 'Halli Sanford-Ryan',
    email: 'hksryan@live.com',
    cellPhone: '515-210-9649',
    homePhone: '515-210-7551',
    address: '2521 10th Ave SW, Cedar Rapids, IA 52404',
    photo: 'https://lh3.googleusercontent.com/d/12vkE2t0xkdWlZkyurmhWoM_3Z8-hQHZH',
    category: 'Leadership'
  },
  {
    id: 179,
    name: 'Tracie Purvis',
    email: 'tracslay@aol.com',
    cellPhone: '',
    homePhone: '319-573-8906',
    address: '2832 Westwood Drive NW, Cedar Rapids, IA 52405',
    photo: '',
    category: 'Community'
  },
  {
    id: 180,
    name: 'David Sherwood',
    email: 'sherwoodda@hotmail.com',
    cellPhone: '760-681-6007',
    homePhone: '319-365-0750',
    address: '2404 Grande Avenue SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 181,
    name: 'Noralee Sherwood',
    email: 'poodleeye@gmail.com',
    cellPhone: '',
    homePhone: '319-365-0750',
    address: '2404 Grande Avenue SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 182,
    name: 'James Evans',
    email: 'mv67wiu71@gmail.com',
    cellPhone: '319-310-2897',
    homePhone: '319-310-2896',
    address: '313 2nd Avenue SW, Mount Vernon, IA 52314',
    photo: '',
    category: 'Community'
  },
  {
    id: 183,
    name: 'Mary Evans',
    email: 'marye1840@gmail.com',
    cellPhone: '',
    homePhone: '319-310-2896',
    address: '313 2nd Avenue SW, Mount Vernon, IA 52314',
    photo: '',
    category: 'Community'
  },
  {
    id: 184,
    name: 'Art Hackett',
    email: 'arthackett@gmail.com',
    cellPhone: '',
    homePhone: '',
    address: '2004 C Street SW, Cedar Rapids, IA 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 185,
    name: 'Mark Johnson',
    email: 'mrmarkljohnson@gmail.com',
    cellPhone: '319-651-3923',
    homePhone: '319-651-3923',
    address: '311 25th Street Dr SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 186,
    name: 'Rebecca Mumaw',
    email: 'rsmumaw@gmail.com',
    cellPhone: '319-651-4941',
    homePhone: '319-651-3923',
    address: '311 25th Street Dr SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 187,
    name: 'Curtis Miner',
    email: 'revcurt55@gmail.com',
    cellPhone: '937-869-4483',
    homePhone: '319-826-3134',
    address: '2302 Hoosier St SW, Cedar Rapids, IA 52404',
    photo: 'https://lh3.googleusercontent.com/d/1s07S6w77cHz40Wp7aZKgDfjypUXpo9Sc',
    category: 'Staff'
  },
  {
    id: 188,
    name: 'Linda Miner',
    email: 'linderbehr@yahoo.com',
    cellPhone: '937-926-2163',
    homePhone: '319-826-3134',
    address: '2302 Hoosier St SW, Cedar Rapids, IA 52404',
    photo: 'https://lh3.googleusercontent.com/d/1otZ4wwzA0TRdqkoH4PozpbrJ5H5AcSdq',
    category: 'Leadership'
  },
  {
    id: 189,
    name: 'Jim Russell',
    email: 'jarclu@hotmail.com',
    cellPhone: '319-360-4152',
    homePhone: '319-364-3392',
    address: '435 Cottage Grove Ave SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 190,
    name: 'Mary Russell',
    email: '',
    cellPhone: '',
    homePhone: '319-364-3392',
    address: '435 Cottage Grove Ave SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 191,
    name: 'Mallory Williams',
    email: 'Mallory_Williams@yahoo.com',
    cellPhone: '',
    homePhone: '319-360-4565',
    address: '3526 White Oak Rd SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 192,
    name: 'Jim Wooldridge',
    email: 'wooldridge.james70@gmail.com',
    cellPhone: '',
    homePhone: '319-364-4545',
    address: '3950 Cottage Grove Hill Rd SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 193,
    name: 'Deb Wooldridge',
    email: 'wooldridge.deborah@gmail.com',
    cellPhone: '319-651-1504',
    homePhone: '',
    address: '3950 Cottage Grove Hill Rd SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 194,
    name: 'Sherri Reihle',
    email: 'sareihle@gmail.com',
    cellPhone: '319-899-3621',
    homePhone: '319-899-3621',
    address: '3526 Vaughn Lane, Marion, IA 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 195,
    name: 'Jeff Reihle',
    email: 'jgr1257@gmail.com',
    cellPhone: '319-899-3619',
    homePhone: '319-899-3621',
    address: '3526 Vaughn Lane, Marion, IA 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 196,
    name: 'Stephanie Quackenbush',
    email: 'SATBQ1@gmail.com',
    cellPhone: '',
    homePhone: '',
    address: '2033 Forest Drive SE, Cedar Rapids, IA 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 197,
    name: 'Jon Remington',
    email: 'jonremington22@gmail.com',
    cellPhone: '319-360-9967',
    homePhone: '319-366-6048',
    address: '3016 2nd Ave SW, Cedar Rapids, IA 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 198,
    name: 'Mary Remington',
    email: 'mereming@gmail.com',
    cellPhone: '',
    homePhone: '319-366-6048',
    address: '3016 2nd Ave SW, Cedar Rapids, IA 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 199,
    name: 'John Tremain',
    email: 'gpajack504@gmail.com',
    cellPhone: '',
    homePhone: '641-691-0829',
    address: '1845 28th Avenue, Marion, IA 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 200,
    name: 'Theresa Tremain',
    email: 'omaterryt@gmail.com',
    cellPhone: '',
    homePhone: '641-691-0829',
    address: '1845 28th Avenue, Marion, IA 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 201,
    name: 'Katherine Detlefsen',
    email: 'katherine.layher@gmail.com',
    cellPhone: '636-667-2580',
    homePhone: '',
    address: '1427 Center Point Rd NE #7, Cedar Rapids, IA 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 202,
    name: 'Ryan Russell',
    email: 'rsruss6399@gmail.com',
    cellPhone: '319-270-6846',
    homePhone: '319-270-6846',
    address: '1322 O Avenue NE, Cedar Rapids, IA 52402',
    photo: '',
    category: 'Leadership'
  },
  {
    id: 203,
    name: 'Lori Russell',
    email: '',
    cellPhone: '',
    homePhone: '319-270-6846',
    address: '1322 O Avenue NE, Cedar Rapids, IA 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 204,
    name: 'Susan Hodin',
    email: 'susanhodin@yahoo.com',
    cellPhone: '',
    homePhone: '303-913-3540',
    address: '6126 Rockwell Drive NE #210, Cedar Rapids, IA 52402-4782',
    photo: '',
    category: 'Community'
  },
  {
    id: 205,
    name: 'Myron Williams',
    email: 'mfwilson@q.com',
    cellPhone: '319-538-6172',
    homePhone: '319-396-4747',
    address: '1309 Brendel Hill Drive NW, Cedar Rapids, IA 52405',
    photo: '',
    category: 'Leadership'
  },
  {
    id: 206,
    name: 'Todd O\'Rourke',
    email: 'mrtoddorourke@yahoo.com',
    cellPhone: '',
    homePhone: '720-589-6897',
    address: '4010 Windfall Dr NW, Cedar Rapids, IA 52405',
    photo: '',
    category: 'Community'
  },
  {
    id: 207,
    name: 'Tim Sinclair',
    email: 'mrtimsinclair@yahoo.com',
    cellPhone: '303-993-8603',
    homePhone: '720-589-6897',
    address: '4010 Windfall Dr NW, Cedar Rapids, IA 52405',
    photo: '',
    category: 'Community'
  },
  {
    id: 208,
    name: 'Mark Schile',
    email: 'mark.schile@gmail.com',
    cellPhone: '319-743-5899',
    homePhone: '',
    address: '4392 Derby Drive, Marion, IA 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 209,
    name: 'Cindy Schile',
    email: 'cindy.schile@gmail.com',
    cellPhone: '319-743-5890',
    homePhone: '',
    address: '4392 Derby Drive, Marion, IA 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 210,
    name: 'Mona Burns',
    email: '',
    cellPhone: '',
    homePhone: '319-481-7319',
    address: '345 Marion Blvd #218, Marion, IA 52302',
    photo: '',
    category: 'Community'
  },
  {
    id: 211,
    name: 'Kendra Hanzlik',
    email: 'klhmom@yahoo.com',
    cellPhone: '319-329-2210',
    homePhone: '319-329-2210',
    address: '4531 33rd Ave SW, Cedar Rapids, IA 52404',
    photo: 'https://lh3.googleusercontent.com/d/1RLgxs3V2J3dl3w9PgTrUL3qAcxr2Z1lq',
    category: 'Community'
  },
  {
    id: 212,
    name: 'Carri Koch',
    email: 'candbk2@gmail.com',
    cellPhone: '',
    homePhone: '319-329-6075',
    address: '3705 Royal Drive SW, Cedar Rapids, IA 52404',
    photo: 'https://lh3.googleusercontent.com/d/1Anw54vGvi99TeAZCIpz-Dpgul3r9IzF7',
    category: 'Community'
  },
  {
    id: 213,
    name: 'Tom Kluth',
    email: '',
    cellPhone: '319-361-1758',
    homePhone: '319-361-1758',
    address: '1704 Bobcat Dr NW, Cedar Rapids, IA 52405',
    photo: 'https://lh3.googleusercontent.com/d/14iwYiIBFopcQRR12Csyc-viS65U9wMxQ',
    category: 'Community'
  },
  {
    id: 214,
    name: 'Yufan Kluth',
    email: 'Yufan9898@hotmail.com',
    cellPhone: '319-361-1758',
    homePhone: '',
    address: '1704 Bobcat Dr NW, Cedar Rapids, IA 52405',
    photo: 'https://lh3.googleusercontent.com/d/14iwYiIBFopcQRR12Csyc-viS65U9wMxQ',
    category: 'Community'
  },
  {
    id: 215,
    name: 'Todd Jamison',
    email: 'todd.jamison@gmail.com',
    cellPhone: '308-430-2679',
    homePhone: '',
    address: '7107 Prairie Heights Dr SW, Cedar Rapids, IA 52404',
    photo: 'https://lh3.googleusercontent.com/d/1O1Pw2w1d_FrAo1slJBMUjvFREYSq45Av',
    category: 'Community'
  },
  {
    id: 216,
    name: 'Wendy Jamison',
    email: 'Wjamison42@gmail.com',
    cellPhone: '308-430-5632',
    homePhone: '',
    address: '7107 Prairie Heights Drive SW, Cedar Rapids, IA 52404',
    photo: 'https://lh3.googleusercontent.com/d/1gAK0XYKZIrnXOsASd8urep0QmEL8uHOF',
    category: 'Community'
  },
  {
    id: 217,
    name: 'BJ Franklin',
    email: 'bjfranklin1231@gmail.com',
    cellPhone: '',
    homePhone: '',
    address: '',
    photo: '',
    category: 'Community'
  },
  {
    id: 218,
    name: 'Rob Franklin',
    email: 'bjfranklin1231@gmail.com',
    cellPhone: '',
    homePhone: '',
    address: '',
    photo: '',
    category: 'Community'
  },
  {
    id: 219,
    name: 'Janet Satern',
    email: 'noahandjanetsatern@gmail.com',
    cellPhone: '563-419-8501',
    homePhone: '',
    address: '1330 Elmhurst Drive NE, Cedar Rapids, Iowa 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 220,
    name: 'Noah Satern',
    email: 'noahandjanetsatern@gmail.com',
    cellPhone: '563-419-8501',
    homePhone: '',
    address: '1330 Elmhurst Drive NE, Cedar Rapids, Iowa 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 221,
    name: 'Peter Quackenbush',
    email: '',
    cellPhone: '',
    homePhone: '',
    address: '',
    photo: '',
    category: 'Community'
  },
  {
    id: 222,
    name: 'Melanie VanWeelden',
    email: 'melanie@firstchurchcr.org',
    cellPhone: '319-693-0811',
    homePhone: '319-693-0811',
    address: '5200 Broadlawn Dr SE, Cedar Rapids, IA 52403',
    photo: 'https://lh3.googleusercontent.com/d/1OkIdr26sRxhg4hvPdYkMKqM2PuyDHk1H',
    category: 'Staff'
  },
  {
    id: 223,
    name: 'Jazmin Williams',
    email: 'jazw291@gmail.com',
    cellPhone: '319-550-0598',
    homePhone: '',
    address: '1130 Center Point Road NE #37, Cedar Rapids, IA 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 224,
    name: 'David Kind',
    email: 'thedavidkind@gmail.com',
    cellPhone: '319-206-8934',
    homePhone: '',
    address: '1214 M Street SW, Cedar Rapids, Iowa 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 225,
    name: 'Travis Clark',
    email: 'clarktravis12@yahoo.com',
    cellPhone: '',
    homePhone: '',
    address: '1021 3rd Avenue SE, Cedar Rapids, Iowa 52403',
    photo: '',
    category: 'Community'
  },
  {
    id: 226,
    name: 'David Gearhart',
    email: 'dagearh@gmail.com',
    cellPhone: '319-270-4918',
    homePhone: '',
    address: '727 Winterberry Pl NE, Cedar Rapids, Iowa 52402',
    photo: '',
    category: 'Community'
  },
  {
    id: 227,
    name: 'Kevin Winn',
    email: 'kwinn1234@gmail.com',
    cellPhone: '319-929-5720',
    homePhone: '',
    address: '3505 Fitzroy, Hiawatha, IA 52233',
    photo: '',
    category: 'Community'
  },
  {
    id: 228,
    name: 'Tammy Winn',
    email: '',
    cellPhone: '',
    homePhone: '',
    address: '3505 Fitzroy, Hiawatha, IA 52233',
    photo: '',
    category: 'Community'
  },
  {
    id: 229,
    name: 'Heather Basham-Balfour',
    email: 'heather.balfour1988@gmail.com',
    cellPhone: '217-370-2863',
    homePhone: '',
    address: '3000 J St SW, #2505, Cedar Rapids, IA 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 230,
    name: 'Amy Basham-Balfour',
    email: 'heather.balfour1988@gmail.com',
    cellPhone: '217-370-2863',
    homePhone: '',
    address: '3000 J St SW, #2505, Cedar Rapids, IA 52404',
    photo: '',
    category: 'Community'
  },
  {
    id: 231,
    name: 'Kathleen Battin',
    email: 'kbattin53@gmail.com',
    cellPhone: '319-270-0890',
    homePhone: '',
    address: '3180 English Glen Ct #7, Marion, Iowa 52302',
    photo: 'https://lh3.googleusercontent.com/d/1UO3u5yvqKHtVIeMd-X-9e2AF5Zftd0YX',
    category: 'Community'
  },
  {
    id: 232,
    name: 'Maxx Tone',
    email: 'maxine.tone@yahoo.com',
    cellPhone: '319-362-1926',
    homePhone: '',
    address: '2525 Blue Ridge Drive NE, Cedar Rapids, Iowa 52402',
    photo: 'https://lh3.googleusercontent.com/d/1E8M1n_zcPzsBMUj3wTtZD9sNtUo7JvzY',
    category: 'Community'
  },
  {
    id: 233,
    name: 'Michelle Fitzgerald',
    email: 'wonderwomanrealtor@gmail.com',
    cellPhone: '319-929-4200',
    homePhone: '',
    address: '570 Driftwood Lane, Atkins, Iowa 52206',
    photo: '',
    category: 'Community'
  },
  {
    id: 234,
    name: 'Brooke Spicer',
    email: 'office@firstchurchcr.org',
    cellPhone: '3193621926',
    homePhone: '',
    address: '361 17th St SE, Cedar Rapids, IA 52403',
    photo: 'https://lh3.googleusercontent.com/d/1_e3BvwrOC1I6C-woBU21dFF6Yx_mai0r',
    category: 'Staff'
  },
  {
    id: 235,
    name: 'Iris Strong',
    email: 'iris@firstchurchcr.org',
    cellPhone: '31992022685',
    homePhone: '',
    address: '362 17th St SE, Cedar Rapids, IA 52404',
    photo: 'https://lh3.googleusercontent.com/d/1XRGb25K2Qy90MfWXzf-_3FFSHMR-WzH3',
    category: 'Staff'
  },
  {
    id: 236,
    name: 'Gerry Kreitzer',
    email: '',
    cellPhone: '',
    homePhone: '',
    address: '',
    photo: 'https://lh3.googleusercontent.com/d/1UvpgsXYrLu9aQZuwb7sndnydu_l4Socw',
    category: 'Community'
  }
];

const styles = {
  appContainer: { minHeight: '100vh', backgroundColor: '#FAF8F5', fontFamily: '"Crimson Pro", Georgia, serif', position: 'relative', maxWidth: '430px', margin: '0 auto', boxShadow: '0 0 60px rgba(0,0,0,0.1)' },
  mainContent: { paddingBottom: '80px', position: 'relative', zIndex: 1 },
  heroSection: { height: '280px', background: 'linear-gradient(135deg, #4C7273 0%, #2D4A4B 50%, #1a3234 100%)', position: 'relative', overflow: 'hidden' },
  heroOverlay: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 100%)', padding: '20px' },
  logoContainer: { marginBottom: '12px' },
  heroLogo: { width: '80px', height: '80px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' },
  churchName: { fontSize: '32px', fontWeight: '600', color: '#FFFFFF', margin: '0', textAlign: 'center', letterSpacing: '1px', textShadow: '0 2px 15px rgba(0,0,0,0.3)' },
  churchSubtitle: { fontSize: '18px', fontWeight: '400', color: '#E8DFD0', margin: '4px 0 0 0', textAlign: 'center', letterSpacing: '2px', textTransform: 'uppercase' },
  tagline: { fontSize: '14px', color: '#B8C9CA', margin: '12px 0 0 0', letterSpacing: '1px' },
  welcomeCard: { margin: '-30px 20px 20px 20px', padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', position: 'relative', zIndex: 2 },
  welcomeText: { fontSize: '17px', color: '#5A5A5A', textAlign: 'center', margin: 0, lineHeight: '1.6' },
  quickActions: { display: 'flex', justifyContent: 'center', gap: '16px', padding: '0 20px 24px 20px' },
  actionButton: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '20px 24px', backgroundColor: '#FFFFFF', border: '2px solid #E8E4DE', borderRadius: '16px', cursor: 'pointer', textDecoration: 'none', flex: 1, maxWidth: '110px' },
  actionIcon: { fontSize: '28px' },
  actionLabel: { fontSize: '14px', fontWeight: '600', color: '#4C7273', fontFamily: '"Crimson Pro", Georgia, serif' },
  infoSection: { padding: '0 20px 24px 20px', display: 'flex', flexDirection: 'column', gap: '12px' },
  infoCard: { padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', borderLeft: '4px solid #8B5A2B' },
  infoTitle: { fontSize: '14px', fontWeight: '600', color: '#8B5A2B', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '1px' },
  infoText: { fontSize: '16px', color: '#3A3A3A', margin: '0', lineHeight: '1.5' },
  infoTextSmall: { fontSize: '14px', color: '#777', margin: '4px 0 0 0' },
  emailLink: { fontSize: '15px', color: '#4C7273', textDecoration: 'none' },
  valuesSection: { padding: '24px 20px 32px 20px', backgroundColor: '#F0EBE3' },
  valuesSectionTitle: { fontSize: '14px', fontWeight: '600', color: '#8B5A2B', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', margin: '0 0 16px 0' },
  valuesGrid: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' },
  valueChip: { padding: '10px 18px', backgroundColor: '#4C7273', color: '#FFFFFF', borderRadius: '24px', fontSize: '14px', fontWeight: '500' },
  loginContainer: { padding: '0' },
  loginHeader: { padding: '40px 20px 32px 20px', background: 'linear-gradient(135deg, #4C7273 0%, #2D4A4B 100%)', textAlign: 'center' },
  loginTitle: { fontSize: '28px', fontWeight: '600', color: '#FFFFFF', margin: '0' },
  loginSubtitle: { fontSize: '15px', color: '#B8C9CA', margin: '8px 0 0 0' },
  loginCard: { margin: '-20px 20px 20px 20px', padding: '32px 24px', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', position: 'relative', zIndex: 2, textAlign: 'center' },
  lockIcon: { fontSize: '48px', marginBottom: '16px' },
  loginCardTitle: { fontSize: '22px', fontWeight: '600', color: '#2D2D2D', margin: '0 0 8px 0' },
  loginCardText: { fontSize: '15px', color: '#666', margin: '0 0 24px 0', lineHeight: '1.5' },
  passwordInputField: { width: '100%', padding: '16px', fontSize: '18px', border: '2px solid #E8E4DE', borderRadius: '10px', boxSizing: 'border-box', fontFamily: '"Crimson Pro", Georgia, serif', textAlign: 'center', outline: 'none' },
  loginError: { color: '#D32F2F', fontSize: '14px', margin: '12px 0 0 0' },
  loginButton: { width: '100%', padding: '16px', backgroundColor: '#4C7273', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '16px', fontFamily: '"Crimson Pro", Georgia, serif' },
  loginHelp: { fontSize: '13px', color: '#999', margin: '20px 0 0 0' },
  directoryHeader: { padding: '32px 20px 24px 20px', background: 'linear-gradient(135deg, #4C7273 0%, #2D4A4B 100%)', textAlign: 'center', position: 'relative' },
  directoryTitle: { fontSize: '28px', fontWeight: '600', color: '#FFFFFF', margin: '0' },
  directorySubtitle: { fontSize: '15px', color: '#B8C9CA', margin: '8px 0 0 0' },
  logoutButton: { position: 'absolute', top: '16px', right: '16px', padding: '8px 12px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontFamily: '"Crimson Pro", Georgia, serif' },
  searchContainer: { margin: '-20px 20px 20px 20px', position: 'relative', zIndex: 2 },
  searchInput: { width: '100%', padding: '16px 48px 16px 20px', fontSize: '16px', border: 'none', borderRadius: '12px', backgroundColor: '#FFFFFF', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', boxSizing: 'border-box', fontFamily: '"Crimson Pro", Georgia, serif', outline: 'none' },
  clearSearch: { position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', fontSize: '18px', color: '#999', cursor: 'pointer', padding: '4px' },
  directoryList: { padding: '0 20px 20px 20px' },
  categorySection: { marginBottom: '24px' },
  categoryTitle: { fontSize: '13px', fontWeight: '700', color: '#8B5A2B', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 12px 0', paddingBottom: '8px', borderBottom: '2px solid #E8E4DE' },
  peopleGrid: { display: 'flex', flexDirection: 'column', gap: '10px' },
  personCard: { display: 'flex', alignItems: 'center', gap: '16px', padding: '14px', backgroundColor: '#FFFFFF', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  personPhoto: { width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #E8DFD0' },
  personInitials: { width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#4C7273', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '18px', fontWeight: '600', flexShrink: 0 },
  personInfo: { flex: 1 },
  personName: { fontSize: '17px', fontWeight: '600', color: '#2D2D2D', margin: '0' },
  noResults: { textAlign: 'center', padding: '40px 20px', color: '#666' },
  clearSearchButton: { marginTop: '16px', padding: '12px 24px', backgroundColor: '#4C7273', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', fontFamily: '"Crimson Pro", Georgia, serif' },
  modalOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' },
  modalContent: { backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '340px', textAlign: 'center', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '80vh', overflowY: 'auto' },
  modalClose: { position: 'absolute', top: '16px', right: '16px', background: '#F5F5F5', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', color: '#666' },
  modalPhoto: { width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #E8DFD0', marginBottom: '16px' },
  modalInitials: { width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#4C7273', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '48px', fontWeight: '600', margin: '0 auto 16px auto' },
  modalName: { fontSize: '24px', fontWeight: '600', color: '#2D2D2D', margin: '0' },
  modalCategory: { fontSize: '14px', color: '#4C7273', margin: '8px 0 16px 0', textTransform: 'uppercase', letterSpacing: '1px' },
  modalContactInfo: { textAlign: 'left', marginBottom: '20px', padding: '16px', backgroundColor: '#F9F9F9', borderRadius: '12px' },
  contactRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid #EEE' },
  contactLabel: { fontSize: '13px', color: '#888', fontWeight: '600', textTransform: 'uppercase', flexShrink: 0 },
  contactValue: { fontSize: '15px', color: '#4C7273', textDecoration: 'none', textAlign: 'right', marginLeft: '12px', wordBreak: 'break-word' },
  modalActions: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' },
  modalButton: { display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 24px', backgroundColor: '#4C7273', color: '#FFFFFF', borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: '500', fontFamily: '"Crimson Pro", Georgia, serif' },
  giveHeader: { padding: '40px 20px 32px 20px', background: 'linear-gradient(135deg, #8B5A2B 0%, #6B4423 100%)', textAlign: 'center' },
  giveIconLarge: { fontSize: '48px', marginBottom: '12px' },
  giveTitle: { fontSize: '28px', fontWeight: '600', color: '#FFFFFF', margin: '0' },
  giveSubtitle: { fontSize: '16px', color: '#E8DFD0', margin: '12px 0 0 0', lineHeight: '1.5' },
  giveCard: { margin: '-20px 20px 24px 20px', padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', position: 'relative', zIndex: 2 },
  giveQuote: { fontSize: '17px', color: '#5A5A5A', fontStyle: 'italic', lineHeight: '1.7', margin: '0', textAlign: 'center' },
  giveReference: { fontSize: '14px', color: '#8B5A2B', textAlign: 'center', margin: '16px 0 0 0', fontWeight: '600' },
  giveButton: { display: 'block', margin: '0 20px 32px 20px', padding: '20px', backgroundColor: '#4C7273', color: '#FFFFFF', textAlign: 'center', borderRadius: '14px', textDecoration: 'none', fontSize: '18px', fontWeight: '600', fontFamily: '"Crimson Pro", Georgia, serif', boxShadow: '0 4px 16px rgba(76,114,115,0.3)' },
  giveOptions: { padding: '0 20px 32px 20px' },
  giveOptionsTitle: { fontSize: '13px', fontWeight: '700', color: '#8B5A2B', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 16px 0' },
  giveOption: { display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', marginBottom: '12px' },
  giveOptionIcon: { fontSize: '24px' },
  giveOptionLabel: { fontSize: '16px', fontWeight: '600', color: '#2D2D2D', margin: '0' },
  giveOptionText: { fontSize: '14px', color: '#777', margin: '4px 0 0 0' },
  bottomNav: { position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', display: 'flex', backgroundColor: '#FFFFFF', borderTop: '1px solid #E8E4DE', padding: '8px 0 12px 0', zIndex: 50, boxShadow: '0 -4px 20px rgba(0,0,0,0.05)' },
  navButton: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '8px', background: 'none', border: 'none', cursor: 'pointer' },
  navIcon: { fontSize: '24px' },
  navLabel: { fontSize: '11px', fontWeight: '600', color: '#777', fontFamily: '"Crimson Pro", Georgia, serif' },
};

const ChurchApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDirectoryAuthenticated, setIsDirectoryAuthenticated] = useState(false);
  const [directoryPassword, setDirectoryPassword] = useState('');
  const [directoryPasswordError, setDirectoryPasswordError] = useState('');
  const [failedPhotos, setFailedPhotos] = useState({});

  useEffect(() => {
    const sessionData = localStorage.getItem('fcucc_directory_session');
    if (sessionData) {
      try {
        const { authenticated, expiry } = JSON.parse(sessionData);
        if (authenticated && (expiry === 0 || new Date().getTime() < expiry)) {
          setIsDirectoryAuthenticated(true);
        }
      } catch (e) {
        localStorage.removeItem('fcucc_directory_session');
      }
    }
  }, []);

  const handleDirectoryLogin = () => {
    if (directoryPassword === SECURITY.directoryPassword) {
      setIsDirectoryAuthenticated(true);
      setDirectoryPasswordError('');
      setDirectoryPassword('');
      localStorage.setItem('fcucc_directory_session', JSON.stringify({ authenticated: true, expiry: 0 }));
    } else {
      setDirectoryPasswordError('Incorrect password. Please try again.');
    }
  };

  const handleDirectoryLogout = () => {
    setIsDirectoryAuthenticated(false);
    localStorage.removeItem('fcucc_directory_session');
    setActiveTab('home');
  };

  const handlePhotoError = (personId) => {
    setFailedPhotos(prev => ({ ...prev, [personId]: true }));
  };

  const filteredDirectory = useMemo(() => {
    return DIRECTORY_DATA.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (person.email && person.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const groupedDirectory = useMemo(() => {
    return filteredDirectory.reduce((acc, person) => {
      if (!acc[person.category]) acc[person.category] = [];
      acc[person.category].push(person);
      return acc;
    }, {});
  }, [filteredDirectory]);

  const categoryOrder = ['Staff', 'Leadership', 'Community'];
  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const PersonPhoto = ({ person, size = 56, fontSize = 18 }) => {
    const showInitials = !person.photo || failedPhotos[person.id];
    
    if (showInitials) {
      return (
        <div style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: '#4C7273',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontSize: fontSize,
          fontWeight: '600',
          flexShrink: 0,
          border: size > 60 ? '4px solid #E8DFD0' : '3px solid #E8DFD0',
        }}>
          {getInitials(person.name)}
        </div>
      );
    }
    
    return (
      <img 
        src={person.photo} 
        alt={person.name}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          border: size > 60 ? '4px solid #E8DFD0' : '3px solid #E8DFD0',
          flexShrink: 0,
        }}
        onError={() => handlePhotoError(person.id)}
        referrerPolicy="no-referrer"
      />
    );
  };

  let content;
  
  if (activeTab === 'home') {
    content = (
      <div>
        <div style={styles.heroSection}>
          <div style={styles.heroOverlay}>
            <div style={styles.logoContainer}>
              <img src="/icons/icon-192.png" alt="FCUCC" style={styles.heroLogo} />
            </div>
            <h1 style={styles.churchName}>{CONFIG.churchName}</h1>
            <h2 style={styles.churchSubtitle}>{CONFIG.churchSubtitle}</h2>
            <p style={styles.tagline}>{CONFIG.location}</p>
          </div>
        </div>
        <div style={styles.welcomeCard}>
          <p style={styles.welcomeText}><em>"{CONFIG.welcomeMessage}"</em></p>
        </div>
        <div style={styles.quickActions}>
          <button style={styles.actionButton} onClick={() => setActiveTab('directory')}>
            <div style={styles.actionIcon}>👥</div>
            <span style={styles.actionLabel}>Directory</span>
          </button>
          <a href={CONFIG.givingUrl} target="_blank" rel="noopener noreferrer" style={styles.actionButton}>
            <div style={styles.actionIcon}>💝</div>
            <span style={styles.actionLabel}>Give</span>
          </a>
          <a href={CONFIG.calendarUrl} target="_blank" rel="noopener noreferrer" style={styles.actionButton}>
            <div style={styles.actionIcon}>📅</div>
            <span style={styles.actionLabel}>Calendar</span>
          </a>
        </div>
        <div style={styles.infoSection}>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>📍 Visit Us</h3>
            <p style={styles.infoText}>{CONFIG.address}</p>
          </div>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>📞 Contact</h3>
            <p style={styles.infoText}>{CONFIG.phone}</p>
            <a href={`mailto:${CONFIG.email}`} style={styles.emailLink}>{CONFIG.email}</a>
          </div>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>⛪ Worship</h3>
            <p style={styles.infoText}>{CONFIG.worshipTime}</p>
            <p style={styles.infoTextSmall}>In-Person & Online</p>
          </div>
        </div>
        <div style={styles.valuesSection}>
          <h3 style={styles.valuesSectionTitle}>Our Values</h3>
          <div style={styles.valuesGrid}>
            <div style={styles.valueChip}>Open & Affirming</div>
            <div style={styles.valueChip}>Inclusive Worship</div>
            <div style={styles.valueChip}>Community</div>
            <div style={styles.valueChip}>Service</div>
          </div>
        </div>
      </div>
    );
  } else if (activeTab === 'directory' && !isDirectoryAuthenticated) {
    content = (
      <div style={styles.loginContainer}>
        <div style={styles.loginHeader}>
          <h2 style={styles.loginTitle}>Church Directory</h2>
          <p style={styles.loginSubtitle}>Members Only Access</p>
        </div>
        <div style={styles.loginCard}>
          <div style={styles.lockIcon}>🔒</div>
          <h3 style={styles.loginCardTitle}>Enter Directory Password</h3>
          <p style={styles.loginCardText}>The directory contains private contact information and is protected for member privacy.</p>
          <input 
            type="password" 
            placeholder="Enter password..." 
            value={directoryPassword} 
            onChange={(e) => setDirectoryPassword(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleDirectoryLogin()} 
            style={styles.passwordInputField}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {directoryPasswordError && <p style={styles.loginError}>{directoryPasswordError}</p>}
          <button style={styles.loginButton} onClick={handleDirectoryLogin}>Access Directory</button>
          <p style={styles.loginHelp}>Don't have the password? Contact the church office.</p>
        </div>
      </div>
    );
  } else if (activeTab === 'directory' && isDirectoryAuthenticated) {
    content = (
      <div>
        <div style={styles.directoryHeader}>
          <h2 style={styles.directoryTitle}>Church Directory</h2>
          <p style={styles.directorySubtitle}>{filteredDirectory.length} members</p>
          <button style={styles.logoutButton} onClick={handleDirectoryLogout}>🔓 Log Out</button>
        </div>
        <div style={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={styles.searchInput}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {searchTerm && <button onClick={() => setSearchTerm('')} style={styles.clearSearch}>✕</button>}
        </div>
        <div style={styles.directoryList}>
          {categoryOrder.map(category => {
            const people = groupedDirectory[category];
            if (!people || people.length === 0) return null;
            return (
              <div key={category} style={styles.categorySection}>
                <h3 style={styles.categoryTitle}>{category}</h3>
                <div style={styles.peopleGrid}>
                  {people.map(person => (
                    <div key={person.id} style={styles.personCard} onClick={() => setSelectedPerson(person)}>
                      <PersonPhoto person={person} size={56} fontSize={18} />
                      <div style={styles.personInfo}>
                        <h4 style={styles.personName}>{person.name}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {filteredDirectory.length === 0 && (
            <div style={styles.noResults}>
              <p>No results found for "{searchTerm}"</p>
              <button style={styles.clearSearchButton} onClick={() => setSearchTerm('')}>Clear Search</button>
            </div>
          )}
        </div>
        {selectedPerson && (
          <div style={styles.modalOverlay} onClick={() => setSelectedPerson(null)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button style={styles.modalClose} onClick={() => setSelectedPerson(null)}>✕</button>
              <PersonPhoto person={selectedPerson} size={120} fontSize={48} />
              <h3 style={styles.modalName}>{selectedPerson.name}</h3>
              <p style={styles.modalCategory}>{selectedPerson.category}</p>
              <div style={styles.modalContactInfo}>
                {selectedPerson.email && <div style={styles.contactRow}><span style={styles.contactLabel}>Email</span><a href={`mailto:${selectedPerson.email}`} style={styles.contactValue}>{selectedPerson.email}</a></div>}
                {selectedPerson.cellPhone && <div style={styles.contactRow}><span style={styles.contactLabel}>Cell</span><a href={`tel:${selectedPerson.cellPhone}`} style={styles.contactValue}>{selectedPerson.cellPhone}</a></div>}
                {selectedPerson.homePhone && <div style={styles.contactRow}><span style={styles.contactLabel}>Home</span><a href={`tel:${selectedPerson.homePhone}`} style={styles.contactValue}>{selectedPerson.homePhone}</a></div>}
                {selectedPerson.address && <div style={styles.contactRow}><span style={styles.contactLabel}>Address</span><span style={styles.contactValue}>{selectedPerson.address}</span></div>}
              </div>
              <div style={styles.modalActions}>
                {selectedPerson.email && <a href={`mailto:${selectedPerson.email}`} style={styles.modalButton}><span>✉️</span> Email</a>}
                {(selectedPerson.cellPhone || selectedPerson.homePhone) && <a href={`tel:${selectedPerson.cellPhone || selectedPerson.homePhone}`} style={styles.modalButton}><span>📞</span> Call</a>}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else if (activeTab === 'give') {
    content = (
      <div>
        <div style={styles.giveHeader}>
          <div style={styles.giveIconLarge}>💝</div>
          <h2 style={styles.giveTitle}>Support Our Ministry</h2>
          <p style={styles.giveSubtitle}>Your generosity makes a difference in our community and beyond.</p>
        </div>
        <div style={styles.giveCard}>
          <p style={styles.giveQuote}>"But who am I, and who are my people, that we should be able to give as generously as this? Everything comes from you, and we have given you only what comes from your hand."</p>
          <p style={styles.giveReference}>— 1 Chronicles 29:14</p>
        </div>
        <a href={CONFIG.givingUrl} target="_blank" rel="noopener noreferrer" style={styles.giveButton}>Give Online with Givelify</a>
        <div style={styles.giveOptions}>
          <h3 style={styles.giveOptionsTitle}>Other Ways to Give</h3>
          <div style={styles.giveOption}>
            <span style={styles.giveOptionIcon}>🏛️</span>
            <div><h4 style={styles.giveOptionLabel}>In Person</h4><p style={styles.giveOptionText}>During Sunday worship</p></div>
          </div>
          <div style={styles.giveOption}>
            <span style={styles.giveOptionIcon}>✉️</span>
            <div><h4 style={styles.giveOptionLabel}>By Mail</h4><p style={styles.giveOptionText}>{CONFIG.address}</p></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.appContainer}>
      <div style={styles.mainContent}>{content}</div>
      <nav style={styles.bottomNav}>
        <button style={styles.navButton} onClick={() => setActiveTab('home')}>
          <span style={styles.navIcon}>🏠</span>
          <span style={{...styles.navLabel, color: activeTab === 'home' ? '#4C7273' : '#777'}}>Home</span>
        </button>
        <button style={styles.navButton} onClick={() => setActiveTab('directory')}>
          <span style={styles.navIcon}>👥</span>
          <span style={{...styles.navLabel, color: activeTab === 'directory' ? '#4C7273' : '#777'}}>Directory</span>
        </button>
        <button style={styles.navButton} onClick={() => setActiveTab('give')}>
          <span style={styles.navIcon}>💝</span>
          <span style={{...styles.navLabel, color: activeTab === 'give' ? '#4C7273' : '#777'}}>Give</span>
        </button>
      </nav>
    </div>
  );
};

export default ChurchApp;
