import { UserProfile, UserStats, USER_LEVELS } from './types';

// Cálculos de saúde e fitness
export function calculateBMI(weight: number, height: number): number {
  return Number((weight / Math.pow(height / 100, 2)).toFixed(1));
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Abaixo do peso';
  if (bmi < 25) return 'Peso normal';
  if (bmi < 30) return 'Sobrepeso';
  return 'Obesidade';
}

export function calculateWeeklyGoal(current: number, target: number, goal: string): number {
  const difference = target - current;
  
  if (goal === 'lose_weight') {
    return Math.max(-1, Math.min(-0.5, difference / 12)); // 0.5-1kg por semana
  } else if (goal === 'gain_muscle') {
    return Math.max(0.2, Math.min(0.5, difference / 20)); // 0.2-0.5kg por semana
  }
  return 0; // manter peso
}

export function estimateTimeToGoal(current: number, target: number, weeklyGoal: number): number {
  if (weeklyGoal === 0) return 0;
  return Math.ceil(Math.abs(target - current) / Math.abs(weeklyGoal));
}

export function calculateDailyCalories(
  weight: number,
  height: number,
  age: number,
  gender: string,
  activityLevel: string,
  goal: string
): number {
  // Fórmula de Harris-Benedict revisada
  let bmr: number;
  
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  // Fator de atividade
  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    intense: 1.725
  };

  const tdee = bmr * activityFactors[activityLevel as keyof typeof activityFactors];

  // Ajuste para objetivo
  if (goal === 'lose_weight') {
    return Math.round(tdee - 500); // Déficit de 500 calorias
  } else if (goal === 'gain_muscle') {
    return Math.round(tdee + 300); // Superávit de 300 calorias
  }
  
  return Math.round(tdee);
}

export function calculateMacros(calories: number, goal: string) {
  let proteinRatio, carbRatio, fatRatio;

  if (goal === 'lose_weight') {
    proteinRatio = 0.35; // 35% proteína
    carbRatio = 0.35;    // 35% carboidratos
    fatRatio = 0.30;     // 30% gorduras
  } else if (goal === 'gain_muscle') {
    proteinRatio = 0.30; // 30% proteína
    carbRatio = 0.45;    // 45% carboidratos
    fatRatio = 0.25;     // 25% gorduras
  } else {
    proteinRatio = 0.25; // 25% proteína
    carbRatio = 0.50;    // 50% carboidratos
    fatRatio = 0.25;     // 25% gorduras
  }

  return {
    protein: Math.round((calories * proteinRatio) / 4), // 4 cal/g
    carbs: Math.round((calories * carbRatio) / 4),      // 4 cal/g
    fats: Math.round((calories * fatRatio) / 9)         // 9 cal/g
  };
}

export function generateUserStats(profile: UserProfile): UserStats {
  const bmi = calculateBMI(profile.currentWeight, profile.height);
  const weeklyGoal = calculateWeeklyGoal(profile.currentWeight, profile.targetWeight, profile.goal);
  const estimatedTime = estimateTimeToGoal(profile.currentWeight, profile.targetWeight, weeklyGoal);
  const dailyCalories = calculateDailyCalories(
    profile.currentWeight,
    profile.height,
    profile.age,
    profile.gender,
    profile.activityLevel,
    profile.goal
  );
  const macros = calculateMacros(dailyCalories, profile.goal);

  return {
    bmi,
    bmiCategory: getBMICategory(bmi),
    weeklyGoal,
    estimatedTimeToGoal: estimatedTime,
    dailyCalories,
    dailyProtein: macros.protein,
    dailyCarbs: macros.carbs,
    dailyFats: macros.fats
  };
}

export function getUserLevel(xp: number) {
  return USER_LEVELS.find(level => xp >= level.minXP && xp <= level.maxXP) || USER_LEVELS[0];
}

export function getMotivationalMessage(goal: string): string {
  const messages = {
    lose_weight: [
      "Cada passo te aproxima do seu objetivo! 💪",
      "Você é mais forte que suas desculpas! 🔥",
      "O progresso, não a perfeição, é o objetivo! ⭐",
      "Seu futuro eu agradece seus esforços hoje! 🌟"
    ],
    gain_muscle: [
      "Músculos são construídos com consistência! 💪",
      "Cada treino é um investimento em você! 🏋️",
      "Força não vem do que você pode fazer, mas de superar o que pensava que não podia! 🔥",
      "Seu corpo pode aguentar. É sua mente que você precisa convencer! 🧠"
    ],
    maintain: [
      "Manter é tão importante quanto conquistar! ⚖️",
      "Consistência é a chave do sucesso! 🗝️",
      "Você já chegou longe, continue assim! 🌟",
      "Equilíbrio é a verdadeira conquista! ⚡"
    ]
  };

  const goalMessages = messages[goal as keyof typeof messages] || messages.maintain;
  return goalMessages[Math.floor(Math.random() * goalMessages.length)];
}