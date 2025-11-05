// Tipos do FitConnect IA
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // cm
  currentWeight: number; // kg
  targetWeight: number; // kg
  goal: 'lose_weight' | 'gain_muscle' | 'maintain';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'intense';
  dietaryPreferences: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserStats {
  bmi: number;
  bmiCategory: string;
  weeklyGoal: number; // kg per week
  estimatedTimeToGoal: number; // weeks
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFats: number;
}

export interface DailyProgress {
  date: string;
  weight?: number;
  caloriesConsumed: number;
  caloriesBurned: number;
  waterIntake: number; // ml
  workoutCompleted: boolean;
  mealsLogged: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  reward: number; // FitCoins
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  progress: number; // 0-100%
}

export interface UserLevel {
  level: number;
  name: string;
  color: string;
  minXP: number;
  maxXP: number;
}

export const USER_LEVELS: UserLevel[] = [
  { level: 1, name: 'Bronze', color: '#CD7F32', minXP: 0, maxXP: 999 },
  { level: 2, name: 'Prata', color: '#C0C0C0', minXP: 1000, maxXP: 2999 },
  { level: 3, name: 'Ouro', color: '#FFD700', minXP: 3000, maxXP: 6999 },
  { level: 4, name: 'Platina', color: '#E5E4E2', minXP: 7000, maxXP: 14999 },
  { level: 5, name: 'Diamante', color: '#B9F2FF', minXP: 15000, maxXP: 999999 },
];