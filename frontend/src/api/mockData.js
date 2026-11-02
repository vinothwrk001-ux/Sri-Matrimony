// Sri Matrimony High-Fidelity Mock & Offline Fallback Data Engine
// Ensures 100% platform uptime, zero 502 Bad Gateway errors, and instant local demo experience.

export const mockBootstrap = {
  success: true,
  isDemoMode: true,
  config: {
    brandName: 'Sri Matrimony',
    tagline: 'Trusted Tamil Matrimony',
    taglineTamil: 'நம்பகமான தமிழ் மேட்ரிமோனி',
    contactPhone: '+91 98400 12345',
    contactWhatsApp: '+91 98400 12345',
    contactEmail: 'support@srimatrimony.com',
    officeAddress: 'No. 42, Anna Salai, T. Nagar, Chennai, Tamil Nadu - 600017',
    razorpayKeyId: 'rzp_test_srimatrimony_demo',
    features: {
      otpVerification: true,
      horoscopeUpload: true,
      instantChat: true,
      verifiedBadges: true,
    },
  },
  plans: [
    {
      _id: 'plan_free',
      code: 'free',
      name: 'Free Sanctuary',
      nameTamil: 'இலவச திட்டம்',
      price: 0,
      originalPrice: 0,
      durationDays: 365,
      durationLabel: 'Free Forever',
      durationLabelTamil: 'எப்போதும் இலவசம்',
      contactViewsLimit: 0,
      interestRequestsLimit: 5,
      messagingCreditsLimit: 0,
      badge: null,
      isPopular: false,
      color: '#4B1718',
      displayOrder: 1,
      features: [
        'Basic Profile Creation & Photo Gallery',
        'Search All Verified Profiles',
        'Send 5 Express Interest Requests',
        'Basic Compatibility Indicators',
        'Standard Email Support',
      ],
      featuresTamil: [
        'அடிப்படை சுயவிவர உருவாக்கம்',
        'சரிபார்க்கப்பட்ட வரன்களை தேடுதல்',
        '5 விருப்பக் கோரிக்கைகள் (Express Interest)',
        'அடிப்படை பொருத்த மதிப்பீடு',
        'மின்னஞ்சல் வாடிக்கையாளர் ஆதரவு',
      ],
    },
    {
      _id: 'plan_std',
      code: 'standard',
      name: 'Standard Heritage',
      nameTamil: 'ஸ்டாண்டர்ட் திட்டம்',
      price: 999,
      originalPrice: 1499,
      durationDays: 90,
      durationLabel: '3 Months',
      durationLabelTamil: '3 மாதங்கள்',
      contactViewsLimit: 10,
      interestRequestsLimit: 15,
      messagingCreditsLimit: 10,
      badge: 'POPULAR CHOICE',
      isPopular: true,
      color: '#D7AD4A',
      displayOrder: 2,
      features: [
        '10 Verified Direct Contact Number Reveals',
        '15 Express Interest Requests with Notifications',
        '10 Direct In-App Messaging Conversations',
        'Profile Highlighted in Bride/Groom Feed',
        'Detailed Horoscope & Nakshatra Matching View',
        '3 Months Full Platform Membership',
      ],
      featuresTamil: [
        '10 சரிபார்க்கப்பட்ட தொலைபேசி எண்கள் அணுகல்',
        '15 விருப்பக் கோரிக்கைகள் (Express Interest)',
        '10 நேரடி செய்தியிடல் உரையாடல்கள்',
        'சுயவிவர முன்னுரிமை தோற்றம்',
        'முழுமையான ஜாதகப் பொருத்தம்',
        '3 மாதங்கள் முழு உறுப்பினர் உரிமை',
      ],
    },
    {
      _id: 'plan_prem',
      code: 'premium',
      name: 'Royal Premium',
      nameTamil: 'பிரீமியம் திட்டம்',
      price: 1999,
      originalPrice: 2999,
      durationDays: 180,
      durationLabel: '6 Months',
      durationLabelTamil: '6 மாதங்கள்',
      contactViewsLimit: 25,
      interestRequestsLimit: 30,
      messagingCreditsLimit: 25,
      badge: 'RECOMMENDED',
      isPopular: false,
      color: '#682526',
      displayOrder: 3,
      features: [
        '25 Verified Direct Contact Number Reveals',
        '30 Express Interest Requests with Priority Alerts',
        '25 Direct In-App Messaging Conversations',
        'VIP Verified Gold Badge on Profile',
        'Instant WhatsApp Share for Profiles',
        'Priority Phone & WhatsApp Relationship Manager Support',
        '6 Months Complete Validity',
      ],
      featuresTamil: [
        '25 சரிபார்க்கப்பட்ட தொலைபேசி எண்கள்',
        '30 முன்னுரிமை விருப்பக் கோரிக்கைகள்',
        '25 நேரடி செய்தியிடல் உரையாடல்கள்',
        'விஐபி தங்க பேட்ஜ் அங்கீகாரம்',
        'வாட்ஸ்அப் பகிர்வு வசதி',
        'முன்னுரிமை வாடிக்கையாளர் மேலாளர் சேவை',
        '6 மாதங்கள் முழு செல்லுபடி',
      ],
    },
    {
      _id: 'plan_plat',
      code: 'platinum',
      name: 'Platinum Elite VIP',
      nameTamil: 'பிளாட்டினம் எலைட் விஐபி',
      price: 3499,
      originalPrice: 4999,
      durationDays: 365,
      durationLabel: '12 Months',
      durationLabelTamil: '12 மாதங்கள்',
      contactViewsLimit: 50,
      interestRequestsLimit: 50,
      messagingCreditsLimit: 50,
      badge: 'VIP ACCESS',
      isPopular: false,
      color: '#351011',
      displayOrder: 4,
      features: [
        '50 Verified Direct Contact Number Reveals',
        '50 Express Interest Requests with Guaranteed Follow-up',
        '50 Direct In-App Messaging Conversations',
        'Top-Tier Profile Placement Across Search & Carousels',
        'Dedicated Personal Matrimony Matchmaker Consultant',
        'Background Verified Government ID Badge',
        '1 Full Year Complete VIP Sanctuary Access',
      ],
      featuresTamil: [
        '50 சரிபார்க்கப்பட்ட தொடர்பு எண்கள்',
        '50 விருப்பக் கோரிக்கைகள்',
        '50 நேரடி செய்திகள்',
        'தேடல் முடிவுகளில் முதன்மை இடம்',
        'தனிப்பட்ட மேட்ரிமோனி மேட்ச்மேக்கர் சேவை',
        'அரசு அடையாள அட்டை சரிபார்ப்பு பேட்ஜ்',
        '1 முழு ஆண்டு விஐபி உறுப்பினர் உரிமை',
      ],
    },
  ],
  stats: {
    totalMembers: 1250,
    brides: 650,
    grooms: 600,
    verifiedProfiles: 1100,
    happyMarriages: 850,
  },
  user: null,
};

export const mockBrides = [
  {
    _id: 'b1',
    user: 'u_b1',
    profileId: 'SM-B101',
    fullName: 'Priya Sundaram',
    gender: 'Bride',
    age: 25,
    height: "5 ft 4 in / 162 cm",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Mudaliar',
    subcaste: 'Arcot Mudaliar',
    gothram: 'Siva',
    dosham: 'No Dosham',
    raasi: 'Rishabam',
    nakshatram: 'Rohini',
    education: 'B.E. Computer Science (CEG Anna University)',
    occupation: 'Senior Software Engineer',
    company: 'TCS Siruseri',
    annualIncome: '12 - 15 Lakhs P.A.',
    workLocation: 'Chennai, Tamil Nadu',
    nativeLocation: 'Vellore, Tamil Nadu',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
        isPrimary: true,
      },
    ],
    aboutMe: 'Warm, ambitious, and deeply connected to traditional Tamil culture. Enjoy Carnatic music, reading, and weekend family get-togethers.',
    isVerified: true,
    verificationBadge: 'ID & Phone Verified',
    fatherOccupation: 'Retired Government Officer',
    motherOccupation: 'Homemaker',
    familyType: 'Nuclear Family',
    familyStatus: 'Upper Middle Class',
    foodHabits: 'Vegetarian',
    completionPercentage: 92,
    createdAt: '2026-03-15T10:00:00.000Z',
  },
  {
    _id: 'b2',
    user: 'u_b2',
    profileId: 'SM-B102',
    fullName: 'Dr. Deepa Krishnan',
    gender: 'Bride',
    age: 26,
    height: "5 ft 3 in / 160 cm",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Brahmin Iyer',
    subcaste: 'Vadama',
    gothram: 'Koushika',
    dosham: 'No Dosham',
    raasi: 'Kanni',
    nakshatram: 'Hastham',
    education: 'MBBS, MD Pediatrics (Madras Medical College)',
    occupation: 'Pediatrician',
    company: 'Apollo Speciality Hospitals',
    annualIncome: '18 - 22 Lakhs P.A.',
    workLocation: 'Madurai, Tamil Nadu',
    nativeLocation: 'Tirunelveli, Tamil Nadu',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
        isPrimary: true,
      },
    ],
    aboutMe: 'Dedicated pediatrician with a compassionate heart. Love classical Bharatanatyam and spending quality moments with grandparents.',
    isVerified: true,
    verificationBadge: 'Medical Professional Verified',
    fatherOccupation: 'Civil Engineer (PWD)',
    motherOccupation: 'School Principal',
    familyType: 'Nuclear Family',
    familyStatus: 'Affluent',
    foodHabits: 'Vegetarian',
    completionPercentage: 96,
    createdAt: '2026-03-20T11:30:00.000Z',
  },
  {
    _id: 'b3',
    user: 'u_b3',
    profileId: 'SM-B103',
    fullName: 'Ananya Ramasamy',
    gender: 'Bride',
    age: 24,
    height: "5 ft 5 in / 165 cm",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Kongu Vellalar',
    subcaste: 'Peria Vellalar',
    gothram: 'Semban',
    dosham: 'No Dosham',
    raasi: 'Thulam',
    nakshatram: 'Swathi',
    education: 'B.Tech Fashion Technology + MBA (PSG Tech)',
    occupation: 'Lead Textile Designer & Merchandiser',
    company: 'Tirupur Apparel Exports',
    annualIncome: '10 - 12 Lakhs P.A.',
    workLocation: 'Coimbatore, Tamil Nadu',
    nativeLocation: 'Erode, Tamil Nadu',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        isPrimary: true,
      },
    ],
    aboutMe: 'Creative mind with roots in Coimbatore agricultural heritage. Believes in mutual respect and maintaining harmonious relations.',
    isVerified: true,
    verificationBadge: 'ID Verified',
    fatherOccupation: 'Agro Industrialist & Exporter',
    motherOccupation: 'Homemaker',
    familyType: 'Joint Family',
    familyStatus: 'Affluent',
    foodHabits: 'Non-Vegetarian',
    completionPercentage: 90,
    createdAt: '2026-03-22T09:15:00.000Z',
  },
  {
    _id: 'b4',
    user: 'u_b4',
    profileId: 'SM-B104',
    fullName: 'Meenakshi Natarajan',
    gender: 'Bride',
    age: 27,
    height: "5 ft 4 in / 163 cm",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Chettiar',
    subcaste: 'Nattukottai Chettiar',
    gothram: 'Ilaiyathangudi',
    dosham: 'No Dosham',
    raasi: 'Meenam',
    nakshatram: 'Revathi',
    education: 'Chartered Accountant (ICAI) & B.Com',
    occupation: 'Assistant Vice President (Finance)',
    company: 'Standard Chartered Global Business',
    annualIncome: '22 - 25 Lakhs P.A.',
    workLocation: 'Chennai, Tamil Nadu',
    nativeLocation: 'Karaikudi, Tamil Nadu',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
        isPrimary: true,
      },
    ],
    aboutMe: 'Proud of our Chettinad architecture and culinary culture. Seeking an ambitious and caring life partner.',
    isVerified: true,
    verificationBadge: 'CA Verified',
    fatherOccupation: 'Auditor & Tax Consultant',
    motherOccupation: 'Government College Lecturer',
    familyType: 'Nuclear Family',
    familyStatus: 'Upper Middle Class',
    foodHabits: 'Vegetarian',
    completionPercentage: 94,
    createdAt: '2026-03-25T14:45:00.000Z',
  },
  {
    _id: 'b5',
    user: 'u_b5',
    profileId: 'SM-B105',
    fullName: 'Kavitha Balasubramanian',
    gender: 'Bride',
    age: 26,
    height: "5 ft 6 in / 168 cm",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Naidu',
    subcaste: 'Kamma Naidu',
    gothram: 'Janakula',
    dosham: 'Sevvai Dosham (Mild)',
    raasi: 'Dhanusu',
    nakshatram: 'Moolam',
    education: 'M.Sc Data Science & AI',
    occupation: 'Machine Learning Specialist',
    company: 'Amazon Development Centre',
    annualIncome: '20 - 24 Lakhs P.A.',
    workLocation: 'Chennai / Bangalore',
    nativeLocation: 'Coimbatore, Tamil Nadu',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
        isPrimary: true,
      },
    ],
    aboutMe: 'Passionate about artificial intelligence and badminton. Friendly, communicative, and fond of south Indian filter coffee.',
    isVerified: true,
    verificationBadge: 'Work & ID Verified',
    fatherOccupation: 'Bank Branch Manager (Canara Bank)',
    motherOccupation: 'Homemaker',
    familyType: 'Nuclear Family',
    familyStatus: 'Upper Middle Class',
    foodHabits: 'Non-Vegetarian',
    completionPercentage: 88,
    createdAt: '2026-03-27T16:20:00.000Z',
  },
  {
    _id: 'b6',
    user: 'u_b6',
    profileId: 'SM-B106',
    fullName: 'Shreya Chandrasekar',
    gender: 'Bride',
    age: 25,
    height: "5 ft 3 in / 160 cm",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Pillai',
    subcaste: 'Saiva Pillai',
    gothram: 'Agasthya',
    dosham: 'No Dosham',
    raasi: 'Simmam',
    nakshatram: 'Magam',
    education: 'B.Arch (School of Architecture and Planning, Anna Univ)',
    occupation: 'Senior Heritage Architect',
    company: 'Studio Tamilagam Designs',
    annualIncome: '14 - 16 Lakhs P.A.',
    workLocation: 'Trichy / Chennai',
    nativeLocation: 'Thanjavur, Tamil Nadu',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
        isPrimary: true,
      },
    ],
    aboutMe: 'Preserving historical temple towns and vernacular home designs. Value vegetarian lifestyle and spiritual growth.',
    isVerified: true,
    verificationBadge: 'Government Architect Verified',
    fatherOccupation: 'Executive Engineer (TNEB, Retd)',
    motherOccupation: 'Classical Music Teacher',
    familyType: 'Nuclear Family',
    familyStatus: 'Upper Middle Class',
    foodHabits: 'Vegetarian',
    completionPercentage: 91,
    createdAt: '2026-03-28T08:10:00.000Z',
  },
  {
    _id: 'b7',
    user: 'u_b7',
    profileId: 'SM-B107',
    fullName: 'Divya Narayanan',
    gender: 'Bride',
    age: 28,
    height: "5 ft 4 in / 162 cm",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Brahmin Iyengar',
    subcaste: 'Vadakalai',
    gothram: 'Bharadwaja',
    dosham: 'No Dosham',
    raasi: 'Mesham',
    nakshatram: 'Ashwini',
    education: 'M.Tech Microelectronics (IIT Madras)',
    occupation: 'Lead Chip Verification Engineer',
    company: 'Qualcomm India',
    annualIncome: '28 - 32 Lakhs P.A.',
    workLocation: 'Chennai, Tamil Nadu',
    nativeLocation: 'Srirangam, Tamil Nadu',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
        isPrimary: true,
      },
    ],
    aboutMe: 'Grounded in Divya Desam traditions while working at cutting-edge tech. Enjoy playing veena and cycling along ECR.',
    isVerified: true,
    verificationBadge: 'IIT Alumni Verified',
    fatherOccupation: 'Professor of Mathematics (Retd)',
    motherOccupation: 'Sanskrit Scholar & Homemaker',
    familyType: 'Nuclear Family',
    familyStatus: 'Affluent',
    foodHabits: 'Vegetarian',
    completionPercentage: 95,
    createdAt: '2026-03-29T12:00:00.000Z',
  },
  {
    _id: 'b8',
    user: 'u_b8',
    profileId: 'SM-B108',
    fullName: 'Archana Thiagarajan',
    gender: 'Bride',
    age: 26,
    height: "5 ft 5 in / 165 cm",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Vanniyar',
    subcaste: 'Padayachi',
    gothram: 'Vashishta',
    dosham: 'No Dosham',
    raasi: 'Viruchigam',
    nakshatram: 'Anusham',
    education: 'B.E. ECE + MBA (Anna University)',
    occupation: 'Senior Human Resources Specialist',
    company: 'Zoho Corporation',
    annualIncome: '12 - 14 Lakhs P.A.',
    workLocation: 'Tenkasi / Chennai',
    nativeLocation: 'Salem, Tamil Nadu',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
        isPrimary: true,
      },
    ],
    aboutMe: 'People person who loves organizing community cultural festivals. Seeking an understanding life partner who appreciates close family ties.',
    isVerified: true,
    verificationBadge: 'Zoho Employee Verified',
    fatherOccupation: 'Agricultural Landholder',
    motherOccupation: 'Headmistress',
    familyType: 'Nuclear Family',
    familyStatus: 'Upper Middle Class',
    foodHabits: 'Non-Vegetarian',
    completionPercentage: 89,
    createdAt: '2026-03-30T10:20:00.000Z',
  },
];

export const mockGrooms = [
  {
    _id: 'g1',
    user: 'u_g1',
    profileId: 'SM-G201',
    fullName: 'Karthik Subramanian',
    gender: 'Groom',
    age: 28,
    height: "5 ft 11 in / 180 cm",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Brahmin Iyer',
    subcaste: 'Vadama',
    gothram: 'Kashyapa',
    dosham: 'No Dosham',
    raasi: 'Kumbam',
    nakshatram: 'Sadhayam',
    education: 'B.E. Computer Science + M.S. (BITS Pilani)',
    occupation: 'Senior Staff Software Engineer',
    company: 'Microsoft India IDC',
    annualIncome: '35 - 40 Lakhs P.A.',
    workLocation: 'Chennai, Tamil Nadu',
    nativeLocation: 'Thanjavur, Tamil Nadu',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
        isPrimary: true,
      },
    ],
    aboutMe: 'Techie at heart, classical music enthusiast, and avid traveler. Looking for an educated, caring companion who values family traditions.',
    isVerified: true,
    verificationBadge: 'Verified Professional & ID',
    fatherOccupation: 'General Manager (BHEL, Retd)',
    motherOccupation: 'Homemaker',
    familyType: 'Nuclear Family',
    familyStatus: 'Affluent',
    foodHabits: 'Vegetarian',
    completionPercentage: 94,
    createdAt: '2026-03-14T08:00:00.000Z',
  },
  {
    _id: 'g2',
    user: 'u_g2',
    profileId: 'SM-G202',
    fullName: 'Vigneshwaran Mudaliar',
    gender: 'Groom',
    age: 29,
    height: "5 ft 10 in / 178 cm",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Mudaliar',
    subcaste: 'Saiva Mudaliar',
    gothram: 'Siva',
    dosham: 'No Dosham',
    raasi: 'Midhunam',
    nakshatram: 'Thiruvathirai',
    education: 'B.Tech + MBA (IIM Kozhikode)',
    occupation: 'Senior Product Manager',
    company: 'Flipkart Commerce Cloud',
    annualIncome: '28 - 32 Lakhs P.A.',
    workLocation: 'Bangalore / Chennai',
    nativeLocation: 'Kanchipuram, Tamil Nadu',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
        isPrimary: true,
      },
    ],
    aboutMe: 'Balanced professional with respect for elders, warm heart, and passion for startup innovations and long road trips.',
    isVerified: true,
    verificationBadge: 'IIM Alumni Verified',
    fatherOccupation: 'Senior Advocate (Madras High Court)',
    motherOccupation: 'College Professor',
    familyType: 'Nuclear Family',
    familyStatus: 'Affluent',
    foodHabits: 'Non-Vegetarian',
    completionPercentage: 92,
    createdAt: '2026-03-18T10:45:00.000Z',
  },
  {
    _id: 'g3',
    user: 'u_g3',
    profileId: 'SM-G203',
    fullName: 'Saravanan Chettiar',
    gender: 'Groom',
    age: 30,
    height: "5 ft 9 in / 175 cm",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Chettiar',
    subcaste: 'Nattukottai Chettiar',
    gothram: 'Nemam',
    dosham: 'No Dosham',
    raasi: 'Kadagam',
    nakshatram: 'Poosam',
    education: 'B.E. Mechanical Engineering',
    occupation: 'Managing Director & Partner',
    company: 'Chettinad Precision Components',
    annualIncome: '45 - 50 Lakhs P.A.',
    workLocation: 'Madurai / Karaikudi',
    nativeLocation: 'Karaikudi, Tamil Nadu',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
        isPrimary: true,
      },
    ],
    aboutMe: 'Entrepreneur managing an engineering exports enterprise. Traditional upbringing, fond of Tamil music and temple architecture.',
    isVerified: true,
    verificationBadge: 'Business & ID Verified',
    fatherOccupation: 'Industrialist',
    motherOccupation: 'Homemaker',
    familyType: 'Joint Family',
    familyStatus: 'Affluent',
    foodHabits: 'Vegetarian',
    completionPercentage: 90,
    createdAt: '2026-03-21T14:15:00.000Z',
  },
  {
    _id: 'g4',
    user: 'u_g4',
    profileId: 'SM-G204',
    fullName: 'Arvind Swaminathan',
    gender: 'Groom',
    age: 28,
    height: "6 ft 0 in / 183 cm",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Kongu Vellalar',
    subcaste: 'Vellalar',
    gothram: 'Kannan',
    dosham: 'No Dosham',
    raasi: 'Kanni',
    nakshatram: 'Chithirai',
    education: 'M.S. Industrial Automation (TU Munich)',
    occupation: 'Engineering Lead',
    company: 'Siemens Healthineers',
    annualIncome: '30 - 35 Lakhs P.A.',
    workLocation: 'Chennai / Coimbatore',
    nativeLocation: 'Pollachi, Tamil Nadu',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
        isPrimary: true,
      },
    ],
    aboutMe: 'Automotive and robotics engineer. Fitness enthusiast, respectful of our cultural heritage and eager to build a warm family life.',
    isVerified: true,
    verificationBadge: 'Global Degree Verified',
    fatherOccupation: 'Coffee Planter & Businessman',
    motherOccupation: 'Homemaker',
    familyType: 'Nuclear Family',
    familyStatus: 'Affluent',
    foodHabits: 'Non-Vegetarian',
    completionPercentage: 93,
    createdAt: '2026-03-24T09:30:00.000Z',
  },
  {
    _id: 'g5',
    user: 'u_g5',
    profileId: 'SM-G205',
    fullName: 'Praveen Rajagopal',
    gender: 'Groom',
    age: 29,
    height: "5 ft 10 in / 178 cm",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Naidu',
    subcaste: 'Balija Naidu',
    gothram: 'Achuta',
    dosham: 'No Dosham',
    raasi: 'Thulam',
    nakshatram: 'Visakam',
    education: 'B.Tech IT + M.B.A. FinTech',
    occupation: 'Principal Architect (Cloud & Security)',
    company: 'Freshworks Inc.',
    annualIncome: '32 - 36 Lakhs P.A.',
    workLocation: 'Chennai, Tamil Nadu',
    nativeLocation: 'Salem, Tamil Nadu',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        isPrimary: true,
      },
    ],
    aboutMe: 'Calm, thoughtful, and tech savvy. Enjoys tennis, Carnatic fusion music, and weekend coffee conversations.',
    isVerified: true,
    verificationBadge: 'Official Verified',
    fatherOccupation: 'Executive Engineer (PWD, Retd)',
    motherOccupation: 'Bank Officer (SBI, Retd)',
    familyType: 'Nuclear Family',
    familyStatus: 'Upper Middle Class',
    foodHabits: 'Vegetarian',
    completionPercentage: 91,
    createdAt: '2026-03-26T15:00:00.000Z',
  },
  {
    _id: 'g6',
    user: 'u_g6',
    profileId: 'SM-G206',
    fullName: 'Senthil Nathan',
    gender: 'Groom',
    age: 31,
    height: "5 ft 8 in / 173 cm",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Pillai',
    subcaste: 'Karuneegar',
    gothram: 'Bhrigu',
    dosham: 'No Dosham',
    raasi: 'Meenam',
    nakshatram: 'Uthirattathi',
    education: 'Chartered Accountant (FCA)',
    occupation: 'Senior Partner',
    company: 'Nathan & Sundaram Associates',
    annualIncome: '38 - 42 Lakhs P.A.',
    workLocation: 'Chennai / Tirunelveli',
    nativeLocation: 'Tirunelveli, Tamil Nadu',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
        isPrimary: true,
      },
    ],
    aboutMe: 'Independent practice auditor who cherishes South Tamil Nadu traditions and ethical business values.',
    isVerified: true,
    verificationBadge: 'CA Verified Member',
    fatherOccupation: 'Senior Auditor',
    motherOccupation: 'Homemaker',
    familyType: 'Joint Family',
    familyStatus: 'Upper Middle Class',
    foodHabits: 'Vegetarian',
    completionPercentage: 95,
    createdAt: '2026-03-27T11:20:00.000Z',
  },
  {
    _id: 'g7',
    user: 'u_g7',
    profileId: 'SM-G207',
    fullName: 'Dr. Vijay Raghavan',
    gender: 'Groom',
    age: 30,
    height: "5 ft 11 in / 180 cm",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Brahmin Iyengar',
    subcaste: 'Thenkalai',
    gothram: 'Srivatsa',
    dosham: 'No Dosham',
    raasi: 'Dhanusu',
    nakshatram: 'Uthiradam',
    education: 'MBBS, MS Orthopaedics (CMC Vellore)',
    occupation: 'Consultant Orthopaedic Surgeon',
    company: 'MIOT International Hospitals',
    annualIncome: '30 - 35 Lakhs P.A.',
    workLocation: 'Chennai, Tamil Nadu',
    nativeLocation: 'Vellore, Tamil Nadu',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
        isPrimary: true,
      },
    ],
    aboutMe: 'Dedicated surgeon with deep reverence for family blessings. Love swimming, reading historical biographies, and temple visits.',
    isVerified: true,
    verificationBadge: 'Doctor Verified',
    fatherOccupation: 'Dean of Medical Faculty (Retd)',
    motherOccupation: 'Paediatrician',
    familyType: 'Nuclear Family',
    familyStatus: 'Affluent',
    foodHabits: 'Vegetarian',
    completionPercentage: 96,
    createdAt: '2026-03-28T16:50:00.000Z',
  },
  {
    _id: 'g8',
    user: 'u_g8',
    profileId: 'SM-G208',
    fullName: 'Gautham Venkataraman',
    gender: 'Groom',
    age: 27,
    height: "5 ft 10 in / 178 cm",
    maritalStatus: 'Never Married',
    motherTongue: 'Tamil',
    religion: 'Hindu',
    caste: 'Vanniyar',
    subcaste: 'Gounder',
    gothram: 'Shiva',
    dosham: 'No Dosham',
    raasi: 'Rishabam',
    nakshatram: 'Krithigai',
    education: 'B.E. Mech + M.S. Supply Chain Management',
    occupation: 'Director of Logistics Strategy',
    company: 'TVS Logistics Services',
    annualIncome: '24 - 28 Lakhs P.A.',
    workLocation: 'Chennai / Madurai',
    nativeLocation: 'Madurai, Tamil Nadu',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
        isPrimary: true,
      },
    ],
    aboutMe: 'Dynamic supply chain strategist with strong family values. Believe in supporting partner’s aspirations in every walk of life.',
    isVerified: true,
    verificationBadge: 'ID Verified',
    fatherOccupation: 'Transport Enterprise Owner',
    motherOccupation: 'Homemaker',
    familyType: 'Joint Family',
    familyStatus: 'Upper Middle Class',
    foodHabits: 'Non-Vegetarian',
    completionPercentage: 90,
    createdAt: '2026-03-29T14:30:00.000Z',
  },
];

export const mockStories = [
  {
    _id: 'story_1',
    groomName: 'Raghavan Sundararajan',
    brideName: 'Soundarya Natarajan',
    marriageDate: '2025-11-24',
    location: 'Mylapore, Chennai',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    story: 'We met through Sri Matrimony in March 2025. Both our families found mutual alignment in traditions, values, and horoscope matching. The verified profile gave our parents the peace of mind they needed.',
    storyTamil: 'ஸ்ரீ மேட்ரிமோனி மூலமாக நாங்கள் சந்தித்தோம். இரு குடும்பங்களின் பண்பாடும் ஜாதகப் பொருத்தமும் அருமையாக அமைந்தது. நம்பகமான சுயவிவரங்கள் எங்கள் பெற்றோருக்கு முழு மனநிறைவை தந்தன.',
  },
  {
    _id: 'story_2',
    groomName: 'Kavin Kumar',
    brideName: 'Nandhini Devi',
    marriageDate: '2026-01-18',
    location: 'Coimbatore, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    story: 'Sri Matrimony’s verified profile system gave our parents complete confidence. We spoke, discovered shared aspirations for our careers, and tied the knot in our ancestral temple in Coimbatore.',
    storyTamil: 'சரிபார்க்கப்பட்ட வரன்கள் எங்கள் பெற்றோருக்கு மிகுந்த நம்பிக்கையைத் தந்தன. இருமனம் இணைந்து திருமண பந்தத்தில் இணைந்தோம்.',
  },
  {
    _id: 'story_3',
    groomName: 'Sridhar Venkatesh',
    brideName: 'Vidhya Ramachandran',
    marriageDate: '2026-02-14',
    location: 'Madurai, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    story: 'Finding a partner within our cultural community who also shared progressive lifestyle thoughts felt like a blessing. The horoscope consultation feature was exceptionally accurate.',
    storyTamil: 'எங்கள் பாரம்பரிய பின்னணியிலும் நவீன சிந்தனையிலும் ஒத்த துணையை ஸ்ரீ மேட்ரிமோனியில் கண்டறிந்தோம்.',
  },
  {
    _id: 'story_4',
    groomName: 'Ganesh Ramamurthy',
    brideName: 'Harini Balakrishnan',
    marriageDate: '2026-03-05',
    location: 'Trichy, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    story: 'Direct messaging and verified contacts made our conversation respectful and family-oriented from day one. Grateful to the Sri Matrimony team!',
    storyTamil: 'நேரடி செய்தியிடல் மற்றும் சரிபார்க்கப்பட்ட தொடர்பு எண்கள் ஆரம்பத்திலிருந்தே எங்கள் குடும்பங்களுக்கு மிகுந்த வசதியாக அமைந்தது.',
  },
];

export const mockUsers = {
  'priya@gmail.com': {
    token: 'mock_jwt_token_priya_2026',
    user: {
      _id: 'u_b1',
      fullName: 'Priya Sundaram',
      email: 'priya@gmail.com',
      mobile: '+91 98401 11221',
      gender: 'Bride',
      role: 'member',
      profileId: 'SM-B101',
      isVerified: true,
      activeMembership: {
        planCode: 'standard',
        planName: 'Standard Heritage',
        expiresAt: '2026-12-31T23:59:59.000Z',
        contactViewsRemaining: 10,
        interestRequestsRemaining: 15,
        messagingCreditsRemaining: 10,
      },
    },
    profile: mockBrides[0],
  },
  'karthik@gmail.com': {
    token: 'mock_jwt_token_karthik_2026',
    user: {
      _id: 'u_g1',
      fullName: 'Karthik Subramanian',
      email: 'karthik@gmail.com',
      mobile: '+91 98407 77887',
      gender: 'Groom',
      role: 'member',
      profileId: 'SM-G201',
      isVerified: true,
      activeMembership: {
        planCode: 'premium',
        planName: 'Royal Premium',
        expiresAt: '2026-12-31T23:59:59.000Z',
        contactViewsRemaining: 25,
        interestRequestsRemaining: 30,
        messagingCreditsRemaining: 25,
      },
    },
    profile: mockGrooms[0],
  },
  'admin@srimatrimony.com': {
    token: 'mock_jwt_token_admin_2026',
    user: {
      _id: 'u_admin',
      fullName: 'Sri Matrimony Super Admin',
      email: 'admin@srimatrimony.com',
      mobile: '+91 98400 00001',
      gender: 'Groom',
      role: 'admin',
      profileId: 'SM-ADMIN-01',
      isVerified: true,
      activeMembership: {
        planCode: 'platinum',
        planName: 'Platinum VIP Admin',
        expiresAt: '2030-12-31T23:59:59.000Z',
        contactViewsRemaining: 9999,
        interestRequestsRemaining: 9999,
        messagingCreditsRemaining: 9999,
      },
    },
    profile: mockGrooms[0],
  },
};

// Route-level Mock Dispatcher
export function getMockResponse(rawUrl = '', method = 'GET', requestData = null) {
  const url = rawUrl.replace(/^\/api/, '');
  const cleanUrl = url.split('?')[0];

  // 1. App Bootstrap
  if (cleanUrl === '/app/bootstrap') {
    return { ...mockBootstrap };
  }

  // 2. Health Check
  if (cleanUrl === '/health') {
    return {
      status: 'ok',
      service: 'Sri Matrimony (Simulated Mock Engine)',
      database: 'connected (in-memory demo mode)',
      timestamp: new Date().toISOString(),
    };
  }

  // 3. Newly Joined Brides Carousel
  if (cleanUrl === '/matches/brides') {
    return { success: true, count: mockBrides.length, profiles: mockBrides };
  }

  // 4. Newly Joined Grooms Carousel
  if (cleanUrl === '/matches/grooms') {
    return { success: true, count: mockGrooms.length, profiles: mockGrooms };
  }

  // 5. Recently Joined Members
  if (cleanUrl === '/matches/recent') {
    const combined = [
      mockBrides[0],
      mockGrooms[0],
      mockBrides[1],
      mockGrooms[1],
      mockBrides[2],
      mockGrooms[2],
      mockBrides[3],
      mockGrooms[3],
      mockBrides[4],
      mockGrooms[4],
    ];
    return { success: true, count: combined.length, profiles: combined };
  }

  // 6. 100% Verified Profiles Showcase
  if (cleanUrl === '/matches/verified') {
    const verified = [...mockBrides.slice(0, 4), ...mockGrooms.slice(0, 4)];
    return { success: true, count: verified.length, profiles: verified };
  }

  // 7. Recommended Matches (for logged-in member)
  if (cleanUrl === '/matches/recommended') {
    const recommended = [...mockBrides.slice(0, 4), ...mockGrooms.slice(0, 4)].map((p, idx) => ({
      ...p,
      compatibilityScore: 92 - idx * 3,
      compatibilityReasons: ['Same Cultural Tradition', 'Optimal Age Alignment', 'Complementary Careers'],
    }));
    return { success: true, count: recommended.length, profiles: recommended };
  }

  // 8. Success Stories
  if (cleanUrl === '/stories') {
    return { success: true, count: mockStories.length, stories: mockStories };
  }

  // 9. Membership Plans
  if (cleanUrl === '/plans') {
    return { success: true, count: mockBootstrap.plans.length, plans: mockBootstrap.plans };
  }

  // 10. Search Profiles
  if (cleanUrl === '/search') {
    const all = [...mockBrides, ...mockGrooms];
    return {
      success: true,
      count: all.length,
      totalCount: all.length,
      page: 1,
      totalPages: 1,
      profiles: all,
    };
  }

  // 11. Single Profile Details: /profiles/:id
  if (cleanUrl.startsWith('/profiles/')) {
    const id = cleanUrl.replace('/profiles/', '');
    const all = [...mockBrides, ...mockGrooms];
    const found = all.find((p) => p._id === id || p.profileId === id || p.user === id) || all[0];
    return { success: true, profile: found };
  }

  // 12. Authentication: Login
  if (cleanUrl === '/auth/login') {
    const identifier = requestData?.identifier?.toLowerCase() || '';
    if (mockUsers[identifier]) {
      return { success: true, ...mockUsers[identifier] };
    }
    // Default fallback user for any demo login
    return {
      success: true,
      token: 'mock_jwt_token_demo_user',
      user: mockUsers['priya@gmail.com'].user,
      profile: mockUsers['priya@gmail.com'].profile,
    };
  }

  // 13. Authentication: Register
  if (cleanUrl === '/auth/register' && method.toUpperCase() === 'POST') {
    return {
      success: true,
      token: 'mock_jwt_token_registered_user',
      user: {
        _id: 'u_new',
        fullName: requestData?.fullName || 'Tamil Member',
        email: requestData?.email || 'member@srimatrimony.com',
        mobile: requestData?.mobile || '+91 98400 99999',
        gender: requestData?.gender || 'Bride',
        role: 'member',
        profileId: 'SM-M999',
        isVerified: false,
        activeMembership: {
          planCode: 'free',
          planName: 'Free Sanctuary',
          contactViewsRemaining: 0,
          interestRequestsRemaining: 5,
          messagingCreditsRemaining: 0,
        },
      },
      profile: mockBrides[0],
    };
  }

  // 14. Authentication: Current Session (/auth/me)
  if (cleanUrl === '/auth/me') {
    const defaultUser = mockUsers['priya@gmail.com'];
    return {
      success: true,
      user: defaultUser.user,
      profile: defaultUser.profile,
    };
  }

  // 15. Shortlists Toggle
  if (cleanUrl === '/shortlists/toggle') {
    return {
      success: true,
      isShortlisted: true,
      message: 'Profile added to your shortlisted sanctuary.',
    };
  }

  // 16. Express Interest Send
  if (cleanUrl === '/interests/send') {
    return {
      success: true,
      message: 'Your sacred interest has been graciously delivered to the member.',
    };
  }

  // 17. Contact Number Reveal
  if (cleanUrl === '/contact-views/reveal') {
    return {
      success: true,
      revealedContact: {
        mobile: '+91 98400 12345',
        email: 'member.verified@srimatrimony.com',
        parentContact: '+91 98400 54321',
      },
      remainingCredits: 9,
      message: 'Verified family contact numbers revealed successfully.',
    };
  }

  // 18. Payment Sandbox Activation
  if (cleanUrl === '/payments/mock-activate') {
    return {
      success: true,
      message: 'Plan activated successfully in Sandbox Demonstration mode.',
      activeMembership: {
        planCode: requestData?.planCode || 'standard',
        planName: 'Standard Heritage',
        expiresAt: '2026-12-31T23:59:59.000Z',
        contactViewsRemaining: 25,
        interestRequestsRemaining: 50,
        messagingCreditsRemaining: 25,
      },
    };
  }

  // 19. Public Inquiries
  if (cleanUrl === '/contact-inquiries') {
    return {
      success: true,
      message: 'Thank you! A dedicated matrimonial relationship manager will reach out shortly.',
    };
  }

  // 20. Admin metrics & members
  if (cleanUrl === '/admin/metrics') {
    return {
      success: true,
      metrics: {
        totalMembers: 1250,
        bridesCount: 650,
        groomsCount: 600,
        verifiedCount: 1100,
        activePaidMembers: 420,
        freeMembers: 830,
        totalRevenue: 648000,
      },
    };
  }

  if (cleanUrl === '/admin/members') {
    const all = [...mockBrides, ...mockGrooms];
    return { success: true, count: all.length, members: all };
  }

  if (cleanUrl === '/admin/payments') {
    return {
      success: true,
      payments: [
        {
          _id: 'pay_1',
          user: { fullName: 'Karthik Subramanian', email: 'karthik@gmail.com' },
          planCode: 'premium',
          amount: 1999,
          status: 'captured',
          createdAt: new Date().toISOString(),
        },
        {
          _id: 'pay_2',
          user: { fullName: 'Priya Sundaram', email: 'priya@gmail.com' },
          planCode: 'standard',
          amount: 999,
          status: 'captured',
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }

  if (cleanUrl === '/admin/inquiries') {
    return {
      success: true,
      inquiries: [
        {
          _id: 'inq_1',
          name: 'Sundararajan M',
          phone: '+91 98401 23456',
          email: 'sundar@gmail.com',
          subject: 'Looking for Brahmin Iyer Bride',
          message: 'Seeking suitable alliance for my son working in Google Chennai.',
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }

  return null;
}
