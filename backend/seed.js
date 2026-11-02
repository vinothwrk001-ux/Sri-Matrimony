const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const connectDB = require('./config/db');
const User = require('./models/User');
const MatrimonyProfile = require('./models/MatrimonyProfile');
const MembershipPlan = require('./models/MembershipPlan');
const Membership = require('./models/Membership');
const SuccessStory = require('./models/SuccessStory');
const { WebsiteSetting } = require('./models/SupportModels');

const seedData = async () => {
  try {
    await connectDB();
    console.log('[Seed] Cleaning old database collections...');

    await Promise.all([
      User.deleteMany({}),
      MatrimonyProfile.deleteMany({}),
      MembershipPlan.deleteMany({}),
      Membership.deleteMany({}),
      SuccessStory.deleteMany({}),
      WebsiteSetting.deleteMany({}),
    ]);

    console.log('[Seed] Creating Membership Plans...');
    const plans = await MembershipPlan.insertMany([
      {
        code: 'free',
        name: 'Free Plan',
        nameTamil: 'இலவச திட்டம்',
        price: 0,
        originalPrice: 0,
        durationDays: 365,
        durationLabel: 'Free Forever',
        durationLabelTamil: 'எப்போதும் இலவசம்',
        contactViewsLimit: 0,
        interestRequestsLimit: 5,
        messagingCreditsLimit: 0,
        features: [
          'Basic Profile Creation',
          'Basic Dashboard Access',
          'Limited Profile Information',
          'Limited Daily Activity',
          'Standard Support'
        ],
        featuresTamil: [
          'அடிப்படை சுயவிவர உருவாக்கம்',
          'அடிப்படை டாஷ்போர்டு அணுகல்',
          'வரையறுக்கப்பட்ட சுயவிவரத் தகவல்',
          'வரையறுக்கப்பட்ட தினசரி செயல்பாடு',
          'வழக்கமான வாடிக்கையாளர் சேவை'
        ],
        isPopular: false,
        color: '#4B1718',
        displayOrder: 1,
      },
      {
        code: 'standard',
        name: 'Standard',
        nameTamil: 'ஸ்டாண்டர்ட் திட்டம்',
        price: 999,
        originalPrice: 1499,
        durationDays: 90,
        durationLabel: '3 Months',
        durationLabelTamil: '3 மாதங்கள்',
        contactViewsLimit: 10,
        interestRequestsLimit: 10,
        messagingCreditsLimit: 10,
        badge: 'POPULAR',
        isPopular: true,
        features: [
          '10 Verified Contact Views',
          '10 Express Interest Requests',
          '10 Direct Messaging Credits',
          'Profile Visibility Benefits',
          'Standard Membership Duration (3 Months)',
          'Horoscope Matching View'
        ],
        featuresTamil: [
          '10 சரிபார்க்கப்பட்ட தொடர்பு எண்கள்',
          '10 விருப்பக் கோரிக்கைகள் (Express Interest)',
          '10 நேரடி செய்திகள்',
          'மேம்பட்ட சுயவிவரத் தெரிவுநிலை',
          '3 மாதங்கள் செல்லுபடியாகும்',
          'ஜாதகப் பொருத்தம் பார்க்கும் வசதி'
        ],
        color: '#D7AD4A',
        displayOrder: 2,
      },
      {
        code: 'premium',
        name: 'Premium',
        nameTamil: 'பிரீமியம் திட்டம்',
        price: 1999,
        originalPrice: 2999,
        durationDays: 180,
        durationLabel: '6 Months',
        durationLabelTamil: '6 மாதங்கள்',
        contactViewsLimit: 20,
        interestRequestsLimit: 20,
        messagingCreditsLimit: 20,
        badge: 'RECOMMENDED',
        isPopular: false,
        features: [
          '20 Verified Contact Views',
          '20 Express Interest Requests',
          '20 Direct Messaging Credits',
          'Priority Profile Visibility in Search',
          'Premium Member Badge',
          '6 Months Extended Validity',
          'Priority Customer Support'
        ],
        featuresTamil: [
          '20 சரிபார்க்கப்பட்ட தொடர்பு எண்கள்',
          '20 விருப்பக் கோரிக்கைகள்',
          '20 நேரடி செய்திகள்',
          'தேடலில் முன்னுரிமை தெரிவுநிலை',
          'பிரீமியம் உறுப்பினர் பேட்ஜ்',
          '6 மாதங்கள் செல்லுபடியாகும்',
          'முன்னுரிமை வாடிக்கையாளர் சேவை'
        ],
        color: '#682526',
        displayOrder: 3,
      },
      {
        code: 'platinum',
        name: 'Platinum',
        nameTamil: 'பிளாட்டினம் திட்டம்',
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
        features: [
          '50 Verified Contact Views',
          '50 Express Interest Requests',
          '50 Direct Messaging Credits',
          'Top Tier Matchmaking Benefits',
          'Maximum Profile Visibility',
          'Dedicated Matrimony Relationship Advisor',
          '1 Full Year Complete Access'
        ],
        featuresTamil: [
          '50 சரிபார்க்கப்பட்ட தொடர்பு எண்கள்',
          '50 விருப்பக் கோரிக்கைகள்',
          '50 நேரடி செய்திகள்',
          'உயர் மட்ட பொருத்த பலன்கள்',
          'முழுமையான சுயவிவர முன்னுரிமை',
          'தனிப்பட்ட மேட்ரிமோனி மேனேஜர் உதவி',
          '1 முழு ஆண்டு முழு அணுகல்'
        ],
        color: '#351011',
        displayOrder: 4,
      }
    ]);

    const standardPlan = plans.find(p => p.code === 'standard');
    const freePlan = plans.find(p => p.code === 'free');
    const premiumPlan = plans.find(p => p.code === 'premium');

    console.log('[Seed] Creating Administrative User...');
    const adminUser = await User.create({
      fullName: 'Sri Matrimony Super Admin',
      email: 'admin@srimatrimony.com',
      mobile: '+91 98400 00001',
      password: 'Admin@1234',
      role: 'admin',
      gender: 'Groom',
      dateOfBirth: new Date('1988-05-15'),
      lookingFor: 'Bride',
      isVerified: true,
      profileId: 'SM-ADMIN-01',
      status: 'active',
    });

    console.log('[Seed] Creating Verified Brides & Grooms...');

    const sampleBrides = [
      {
        fullName: 'Priya Sundaram',
        email: 'priya@gmail.com',
        mobile: '+91 98401 11221',
        password: 'Priya@123',
        gender: 'Bride',
        age: 25,
        dateOfBirth: new Date('2001-04-12'),
        height: '5 ft 4 in / 162 cm',
        religion: 'Hindu',
        caste: 'Mudaliar',
        education: 'B.E. Computer Science',
        occupation: 'Senior Software Engineer',
        company: 'TCS Siruseri',
        annualIncome: '12 - 15 Lakhs P.A.',
        workLocation: 'Chennai, Tamil Nadu',
        photos: [{
          url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
          isPrimary: true,
        }],
        aboutMe: 'Warm, ambitious, and deeply connected to traditional Tamil culture. Enjoy Carnatic music, reading, and weekend family get-togethers.',
        isVerified: true,
        verificationBadge: 'ID & Phone Verified',
        fatherOccupation: 'Retired Government Officer',
        motherOccupation: 'Homemaker',
        familyType: 'Nuclear Family',
        foodHabits: 'Vegetarian',
      },
      {
        fullName: 'Deepa Krishnan',
        email: 'deepa.k@gmail.com',
        mobile: '+91 98402 22332',
        password: 'Deepa@123',
        gender: 'Bride',
        age: 26,
        dateOfBirth: new Date('2000-08-20'),
        height: '5 ft 3 in / 160 cm',
        religion: 'Hindu',
        caste: 'Brahmin Iyer',
        education: 'MBBS, MD Pediatrics',
        occupation: 'Pediatrician',
        company: 'Apollo Speciality Hospital',
        annualIncome: '18 - 22 Lakhs P.A.',
        workLocation: 'Madurai, Tamil Nadu',
        photos: [{
          url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
          isPrimary: true,
        }],
        aboutMe: 'Dedicated doctor with a passion for healing and children. Looking for a compassionate partner from a cultured Tamil family.',
        isVerified: true,
        verificationBadge: 'Doctor Verified',
        fatherOccupation: 'Civil Engineer (PWD)',
        motherOccupation: 'School Principal',
        familyType: 'Nuclear Family',
        foodHabits: 'Vegetarian',
      },
      {
        fullName: 'Ananya Ramasamy',
        email: 'ananya.r@gmail.com',
        mobile: '+91 98403 33443',
        password: 'Ananya@123',
        gender: 'Bride',
        age: 24,
        dateOfBirth: new Date('2002-01-10'),
        height: '5 ft 5 in / 165 cm',
        religion: 'Hindu',
        caste: 'Kongu Vellalar',
        education: 'B.Tech + MBA',
        occupation: 'Product Marketing Manager',
        company: 'Zoho Corporation',
        annualIncome: '10 - 14 Lakhs P.A.',
        workLocation: 'Coimbatore, Tamil Nadu',
        photos: [{
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
          isPrimary: true,
        }],
        aboutMe: 'Tech marketer hailing from Coimbatore. I love badminton, road trips, and modern Tamil poetry.',
        isVerified: true,
        verificationBadge: 'Official Verified',
        fatherOccupation: 'Textile Business Owner',
        motherOccupation: 'Homemaker',
        familyType: 'Joint Family',
        foodHabits: 'Non-Vegetarian',
      },
      {
        fullName: 'Meenakshi Natarajan',
        email: 'meenakshi.n@gmail.com',
        mobile: '+91 98404 44554',
        password: 'Meena@123',
        gender: 'Bride',
        age: 27,
        dateOfBirth: new Date('1999-11-05'),
        height: '5 ft 2 in / 157 cm',
        religion: 'Hindu',
        caste: 'Chettiar',
        education: 'Chartered Accountant (CA)',
        occupation: 'Assistant Vice President',
        company: 'HDFC Bank',
        annualIncome: '16 - 20 Lakhs P.A.',
        workLocation: 'Trichy, Tamil Nadu',
        photos: [{
          url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
          isPrimary: true,
        }],
        aboutMe: 'Practicing Chartered Accountant with values rooted in Chettinad heritage. Looking for an accomplished life partner.',
        isVerified: true,
        verificationBadge: 'CA Verified',
        fatherOccupation: 'Chartered Accountant',
        motherOccupation: 'Professor',
        familyType: 'Nuclear Family',
        foodHabits: 'Vegetarian',
      },
      {
        fullName: 'Keerthana Balaji',
        email: 'keerthana.b@gmail.com',
        mobile: '+91 98405 55665',
        password: 'Keerthi@123',
        gender: 'Bride',
        age: 25,
        dateOfBirth: new Date('2001-07-14'),
        height: '5 ft 4 in / 162 cm',
        religion: 'Hindu',
        caste: 'Nadar',
        education: 'M.S. Data Science',
        occupation: 'AI Research Scientist',
        company: 'Amazon India',
        annualIncome: '24 - 28 Lakhs P.A.',
        workLocation: 'Chennai, Tamil Nadu',
        photos: [{
          url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
          isPrimary: true,
        }],
        aboutMe: 'Curious researcher with love for technology, classical dance, and family ethics.',
        isVerified: true,
        verificationBadge: 'Official Verified',
        fatherOccupation: 'Ex-Bank Manager',
        motherOccupation: 'Homemaker',
        familyType: 'Nuclear Family',
        foodHabits: 'Non-Vegetarian',
      },
      {
        fullName: 'Divya Senthil',
        email: 'divya.s@gmail.com',
        mobile: '+91 98406 66776',
        password: 'Divya@123',
        gender: 'Bride',
        age: 26,
        dateOfBirth: new Date('2000-03-29'),
        height: '5 ft 6 in / 168 cm',
        religion: 'Hindu',
        caste: 'Vanniyar',
        education: 'B.Arch, M.Plan',
        occupation: 'Senior Urban Architect',
        company: 'Creative Spaces Design Studio',
        annualIncome: '12 - 15 Lakhs P.A.',
        workLocation: 'Salem, Tamil Nadu',
        photos: [{
          url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
          isPrimary: true,
        }],
        aboutMe: 'Architect who loves sustainable building and sketching Tamil temple motifs.',
        isVerified: true,
        verificationBadge: 'Govt ID Verified',
        fatherOccupation: 'Businessman',
        motherOccupation: 'Teacher',
        familyType: 'Nuclear Family',
        foodHabits: 'Non-Vegetarian',
      }
    ];

    const sampleGrooms = [
      {
        fullName: 'Karthik Subramanian',
        email: 'karthik@gmail.com',
        mobile: '+91 98407 77887',
        password: 'Karthik@123',
        gender: 'Groom',
        age: 28,
        dateOfBirth: new Date('1998-02-14'),
        height: '5 ft 11 in / 180 cm',
        religion: 'Hindu',
        caste: 'Brahmin Iyer',
        education: 'B.E. + M.S. (Bits Pilani)',
        occupation: 'Senior Staff Software Engineer',
        company: 'Microsoft India',
        annualIncome: '35 - 40 Lakhs P.A.',
        workLocation: 'Chennai, Tamil Nadu',
        photos: [{
          url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
          isPrimary: true,
        }],
        aboutMe: 'Techie at heart, classical music enthusiast, and avid traveler. Looking for an educated, caring companion who values family traditions.',
        isVerified: true,
        verificationBadge: 'Verified Professional',
        fatherOccupation: 'General Manager (BHEL, Retd)',
        motherOccupation: 'Homemaker',
        familyType: 'Nuclear Family',
        foodHabits: 'Vegetarian',
      },
      {
        fullName: 'Vigneshwaran Mudaliar',
        email: 'vignesh.m@gmail.com',
        mobile: '+91 98408 88998',
        password: 'Vignesh@123',
        gender: 'Groom',
        age: 29,
        dateOfBirth: new Date('1997-06-25'),
        height: '5 ft 10 in / 178 cm',
        religion: 'Hindu',
        caste: 'Mudaliar',
        education: 'B.Tech + MBA (IIM Kozhikode)',
        occupation: 'Senior Product Manager',
        company: 'Flipkart',
        annualIncome: '28 - 32 Lakhs P.A.',
        workLocation: 'Bangalore / Chennai',
        photos: [{
          url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
          isPrimary: true,
        }],
        aboutMe: 'Balanced professional with respect for elders, warm heart, and passion for startup innovations.',
        isVerified: true,
        verificationBadge: 'Official Verified',
        fatherOccupation: 'Senior Advocate (Madras High Court)',
        motherOccupation: 'Professor',
        familyType: 'Nuclear Family',
        foodHabits: 'Non-Vegetarian',
      },
      {
        fullName: 'Saravanan Chettiar',
        email: 'saravanan.c@gmail.com',
        mobile: '+91 98409 99009',
        password: 'Saravanan@123',
        gender: 'Groom',
        age: 30,
        dateOfBirth: new Date('1996-09-18'),
        height: '5 ft 9 in / 175 cm',
        religion: 'Hindu',
        caste: 'Chettiar',
        education: 'B.E. Mechanical',
        occupation: 'Managing Director',
        company: 'Chettinad Precision Components',
        annualIncome: '45 - 50 Lakhs P.A.',
        workLocation: 'Madurai / Karaikudi',
        photos: [{
          url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
          isPrimary: true,
        }],
        aboutMe: 'Entrepreneur managing an engineering exports enterprise. Traditional upbringing, fond of Tamil music and temple architecture.',
        isVerified: true,
        verificationBadge: 'Business Verified',
        fatherOccupation: 'Industrialist',
        motherOccupation: 'Homemaker',
        familyType: 'Joint Family',
        foodHabits: 'Vegetarian',
      },
      {
        fullName: 'Arvind Swaminathan',
        email: 'arvind.s@gmail.com',
        mobile: '+91 98410 10101',
        password: 'Arvind@123',
        gender: 'Groom',
        age: 28,
        dateOfBirth: new Date('1998-10-02'),
        height: '6 ft 0 in / 183 cm',
        religion: 'Hindu',
        caste: 'Brahmin Iyengar',
        education: 'Chartered Financial Analyst (CFA)',
        occupation: 'Investment Banker',
        company: 'Deloitte Financial Advisory',
        annualIncome: '26 - 30 Lakhs P.A.',
        workLocation: 'Chennai, Tamil Nadu',
        photos: [{
          url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
          isPrimary: true,
        }],
        aboutMe: 'Finance professional with deep appreciation for music and Tamil culture. Seeking a supportive life partner.',
        isVerified: true,
        verificationBadge: 'Official Verified',
        fatherOccupation: 'Senior Auditor',
        motherOccupation: 'Homemaker',
        familyType: 'Nuclear Family',
        foodHabits: 'Vegetarian',
      },
      {
        fullName: 'Muthukumar Nadar',
        email: 'muthu.n@gmail.com',
        mobile: '+91 98411 11211',
        password: 'Muthu@123',
        gender: 'Groom',
        age: 29,
        dateOfBirth: new Date('1997-12-11'),
        height: '5 ft 10 in / 178 cm',
        religion: 'Hindu',
        caste: 'Nadar',
        education: 'M.Tech Electronics',
        occupation: 'Hardware Chip Design Lead',
        company: 'Qualcomm India',
        annualIncome: '30 - 35 Lakhs P.A.',
        workLocation: 'Chennai / Coimbatore',
        photos: [{
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
          isPrimary: true,
        }],
        aboutMe: 'Semiconductor chip designer. Simple lifestyle, fitness enthusiast, and respectful of elders.',
        isVerified: true,
        verificationBadge: 'Govt ID Verified',
        fatherOccupation: 'Merchant Exporter',
        motherOccupation: 'Homemaker',
        familyType: 'Nuclear Family',
        foodHabits: 'Non-Vegetarian',
      },
      {
        fullName: 'Dr. Vijay Anand',
        email: 'vijay.anand@gmail.com',
        mobile: '+91 98412 12312',
        password: 'Vijay@123',
        gender: 'Groom',
        age: 31,
        dateOfBirth: new Date('1995-04-05'),
        height: '5 ft 8 in / 173 cm',
        religion: 'Hindu',
        caste: 'Kongu Vellalar',
        education: 'MBBS, MS General Surgery',
        occupation: 'Surgeon',
        company: 'Kauvery Hospital',
        annualIncome: '32 - 38 Lakhs P.A.',
        workLocation: 'Trichy / Chennai',
        photos: [{
          url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
          isPrimary: true,
        }],
        aboutMe: 'General surgeon devoted to public health and patient well-being. Looking for a doctor or professional partner.',
        isVerified: true,
        verificationBadge: 'Doctor Verified',
        fatherOccupation: 'Agricultural Landlord',
        motherOccupation: 'School Headmistress',
        familyType: 'Nuclear Family',
        foodHabits: 'Non-Vegetarian',
      }
    ];

    let brideCounter = 1001;
    for (const b of sampleBrides) {
      const u = await User.create({
        fullName: b.fullName,
        email: b.email,
        mobile: b.mobile,
        password: b.password,
        gender: 'Bride',
        dateOfBirth: b.dateOfBirth,
        lookingFor: 'Groom',
        profileId: `SM${brideCounter}`,
        isVerified: b.isVerified,
        isOtpVerified: true,
      });

      // Give Priya an active Standard paid plan so testing works right away!
      const planToAssign = b.email === 'priya@gmail.com' ? standardPlan : freePlan;
      const mem = await Membership.create({
        user: u._id,
        plan: planToAssign._id,
        planCode: planToAssign.code,
        startDate: new Date(),
        endDate: new Date(Date.now() + planToAssign.durationDays * 24 * 60 * 60 * 1000),
        status: 'active',
        totalContactViews: planToAssign.contactViewsLimit,
        remainingContactViews: planToAssign.contactViewsLimit,
        totalInterests: planToAssign.interestRequestsLimit,
        remainingInterests: planToAssign.interestRequestsLimit,
        totalMessages: planToAssign.messagingCreditsLimit,
        remainingMessages: planToAssign.messagingCreditsLimit,
      });

      u.activeMembership = mem._id;
      await u.save();

      await MatrimonyProfile.create({
        user: u._id,
        profileId: `SM${brideCounter}`,
        fullName: b.fullName,
        gender: 'Bride',
        dateOfBirth: b.dateOfBirth,
        age: b.age,
        height: b.height,
        maritalStatus: 'Never Married',
        motherTongue: 'Tamil',
        religion: b.religion,
        caste: b.caste,
        education: b.education,
        occupation: b.occupation,
        company: b.company,
        annualIncome: b.annualIncome,
        workLocation: b.workLocation,
        photos: b.photos,
        aboutMe: b.aboutMe,
        fatherOccupation: b.fatherOccupation,
        motherOccupation: b.motherOccupation,
        familyType: b.familyType,
        foodHabits: b.foodHabits,
        isVerified: b.isVerified,
        verificationBadge: b.verificationBadge,
        completionPercentage: 90,
      });

      brideCounter++;
    }

    let groomCounter = 2001;
    for (const g of sampleGrooms) {
      const u = await User.create({
        fullName: g.fullName,
        email: g.email,
        mobile: g.mobile,
        password: g.password,
        gender: 'Groom',
        dateOfBirth: g.dateOfBirth,
        lookingFor: 'Bride',
        profileId: `SM${groomCounter}`,
        isVerified: g.isVerified,
        isOtpVerified: true,
      });

      // Give Karthik an active Premium plan for demo testing
      const planToAssign = g.email === 'karthik@gmail.com' ? premiumPlan : freePlan;
      const mem = await Membership.create({
        user: u._id,
        plan: planToAssign._id,
        planCode: planToAssign.code,
        startDate: new Date(),
        endDate: new Date(Date.now() + planToAssign.durationDays * 24 * 60 * 60 * 1000),
        status: 'active',
        totalContactViews: planToAssign.contactViewsLimit,
        remainingContactViews: planToAssign.contactViewsLimit,
        totalInterests: planToAssign.interestRequestsLimit,
        remainingInterests: planToAssign.interestRequestsLimit,
        totalMessages: planToAssign.messagingCreditsLimit,
        remainingMessages: planToAssign.messagingCreditsLimit,
      });

      u.activeMembership = mem._id;
      await u.save();

      await MatrimonyProfile.create({
        user: u._id,
        profileId: `SM${groomCounter}`,
        fullName: g.fullName,
        gender: 'Groom',
        dateOfBirth: g.dateOfBirth,
        age: g.age,
        height: g.height,
        maritalStatus: 'Never Married',
        motherTongue: 'Tamil',
        religion: g.religion,
        caste: g.caste,
        education: g.education,
        occupation: g.occupation,
        company: g.company,
        annualIncome: g.annualIncome,
        workLocation: g.workLocation,
        photos: g.photos,
        aboutMe: g.aboutMe,
        fatherOccupation: g.fatherOccupation,
        motherOccupation: g.motherOccupation,
        familyType: g.familyType,
        foodHabits: g.foodHabits,
        isVerified: g.isVerified,
        verificationBadge: g.verificationBadge,
        completionPercentage: 95,
      });

      groomCounter++;
    }

    console.log('[Seed] Creating Authentic Tamil Success Stories...');
    await SuccessStory.insertMany([
      {
        groomName: 'Raghavan',
        brideName: 'Soundarya',
        marriageDate: new Date('2025-11-24'),
        location: 'Mylapore, Chennai',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
        story: 'We met through Sri Matrimony in March 2025. Both our families found mutual alignment in traditions, values, and horoscope matching. The platform made communication seamless and respectful.',
        storyTamil: 'ஸ்ரீ மேட்ரிமோனி மூலமாக நாங்கள் சந்தித்தோம். இரு குடும்பங்களின் பண்பாடும் ஜாதகப் பொருத்தமும் அருமையாக அமைந்தது. எங்கள் வாழ்க்கைப் பயணத்தை இனிதாகத் தொடங்க உதவிய ஸ்ரீ மேட்ரிமோனிக்கு நன்றி.',
        rating: 5,
        isFeatured: true,
        isApproved: true,
      },
      {
        groomName: 'Kavin Kumar',
        brideName: 'Nandhini Devi',
        marriageDate: new Date('2026-01-18'),
        location: 'Coimbatore, Tamil Nadu',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        story: 'Sri Matrimony’s verified profile system gave our parents complete confidence. We spoke, discovered shared aspirations for our careers, and tied the knot in our hometown temple.',
        storyTamil: 'சரிபார்க்கப்பட்ட சுயவிவரங்கள் எங்கள் பெற்றோருக்கு மிகுந்த நம்பிக்கையைத் தந்தன. இருமனம் இணைந்து திருமண பந்தத்தில் இணைந்தோம்.',
        rating: 5,
        isFeatured: true,
        isApproved: true,
      },
      {
        groomName: 'Sridhar',
        brideName: 'Vidhya',
        marriageDate: new Date('2026-02-14'),
        location: 'Madurai, Tamil Nadu',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        story: 'Finding a partner within our cultural community who also shared progressive lifestyle thoughts felt like a blessing. Thank you Sri Matrimony for making this dream wedding possible.',
        storyTamil: 'எங்கள் பாரம்பரிய பின்னணியிலும் நவீன சிந்தனையிலும் ஒத்த துணையை ஸ்ரீ மேட்ரிமோனியில் கண்டறிந்தோம்.',
        rating: 5,
        isFeatured: true,
        isApproved: true,
      }
    ]);

    console.log('[Seed] Done! Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedData();
