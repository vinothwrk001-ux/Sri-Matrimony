/**
 * Intelligent Tamil Matrimony Compatibility Scoring Service
 * Calculates a weighted, transparent compatibility score between two profiles.
 */

const calculateCompatibility = (myProfile, partnerProfile) => {
  if (!myProfile || !partnerProfile) {
    return { score: 70, reasons: ['Common Tamil heritage and background'] };
  }

  let score = 0;
  const reasons = [];

  // 1. Age Compatibility (Max 25 points)
  const prefAgeMin = myProfile.partnerPreferences?.ageMin || 20;
  const prefAgeMax = myProfile.partnerPreferences?.ageMax || 40;
  const partnerAge = partnerProfile.age || 26;

  if (partnerAge >= prefAgeMin && partnerAge <= prefAgeMax) {
    score += 25;
    reasons.push(`Matches your preferred age criteria (${prefAgeMin}-${prefAgeMax} yrs)`);
  } else if (Math.abs(partnerAge - prefAgeMin) <= 2 || Math.abs(partnerAge - prefAgeMax) <= 2) {
    score += 15;
    reasons.push('Close to your preferred age bracket');
  } else {
    score += 5;
  }

  // 2. Religion & Community Background (Max 25 points)
  const myReligion = (myProfile.religion || '').toLowerCase();
  const partnerReligion = (partnerProfile.religion || '').toLowerCase();
  const myCaste = (myProfile.caste || '').toLowerCase();
  const partnerCaste = (partnerProfile.caste || '').toLowerCase();

  if (myReligion && myReligion === partnerReligion) {
    if (myCaste && partnerCaste && myCaste === partnerCaste) {
      score += 25;
      reasons.push(`Same cultural and community background (${partnerProfile.caste})`);
    } else if (myProfile.partnerPreferences?.casteNoBar) {
      score += 22;
      reasons.push(`Compatible spiritual and religious values (${partnerProfile.religion})`);
    } else {
      score += 18;
      reasons.push(`Shared religious traditions (${partnerProfile.religion})`);
    }
  } else {
    score += 8;
  }

  // 3. Education & Profession Compatibility (Max 20 points)
  const myEdu = (myProfile.education || '').toLowerCase();
  const partnerEdu = (partnerProfile.education || '').toLowerCase();
  
  const isEnggOrTech = (edu) => edu.includes('b.e') || edu.includes('b.tech') || edu.includes('mca') || edu.includes('m.s') || edu.includes('m.tech') || edu.includes('software');
  const isMedicalOrFinance = (edu) => edu.includes('mbbs') || edu.includes('bds') || edu.includes('ca') || edu.includes('mba');

  if (myEdu && partnerEdu && ((isEnggOrTech(myEdu) && isEnggOrTech(partnerEdu)) || (isMedicalOrFinance(myEdu) && isMedicalOrFinance(partnerEdu)))) {
    score += 20;
    reasons.push(`Complementary professional and educational status (${partnerProfile.education})`);
  } else if (partnerProfile.education) {
    score += 14;
    reasons.push(`Well qualified professional (${partnerProfile.education})`);
  } else {
    score += 10;
  }

  // 4. Location & Native Origin (Max 15 points)
  const myLoc = (myProfile.workLocation || '').toLowerCase();
  const partnerLoc = (partnerProfile.workLocation || '').toLowerCase();

  if (myLoc && partnerLoc && (myLoc.includes(partnerLoc) || partnerLoc.includes(myLoc) || (myLoc.includes('tamil nadu') && partnerLoc.includes('tamil nadu')))) {
    score += 15;
    reasons.push(`Convenient geographical proximity (${partnerProfile.workLocation})`);
  } else {
    score += 10;
    reasons.push('Open to mutual relocation preferences');
  }

  // 5. Lifestyle & Food Habits (Max 15 points)
  const myFood = (myProfile.foodHabits || '').toLowerCase();
  const partnerFood = (partnerProfile.foodHabits || '').toLowerCase();

  if (myFood && partnerFood && myFood === partnerFood) {
    score += 15;
    reasons.push(`Harmonious dietary preference (${partnerProfile.foodHabits})`);
  } else {
    score += 9;
    reasons.push('Balanced family lifestyle');
  }

  // Normalize final score between 65% and 98% for realistic positive encouragement
  const finalScore = Math.min(Math.max(score, 68), 98);

  return {
    score: finalScore,
    reasons: reasons.slice(0, 3),
  };
};

module.exports = {
  calculateCompatibility,
};
