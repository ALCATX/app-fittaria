'use client';

import { useState } from 'react';
import { UserProfile, UserStats, DailyProgress } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Community from '@/components/Community';
import Challenges from '@/components/Challenges';
import Nutrition from '@/components/Nutrition';
import ActivityTracker from '@/components/ActivityTracker';
import AdminPanel from '@/components/AdminPanel';
import { 
  Target, 
  TrendingDown, 
  TrendingUp, 
  Calendar, 
  Flame, 
  Droplets, 
  Dumbbell,
  Camera,
  Users,
  Trophy,
  Settings,
  LogOut,
  Bell,
  Store,
  Route,
  Shield
} from 'lucide-react';
import { Language, useTranslation } from '@/lib/i18n';

interface DashboardProps {
  profile: UserProfile;
  stats: UserStats;
  dailyProgress: DailyProgress;
  motivationalMessage: string;
  userLevel: { level: number; name: string; color: string };
  fitCoins: number;
  currentXP: number;
  language: Language;
}

export default function Dashboard({ 
  profile, 
  stats, 
  dailyProgress, 
  motivationalMessage,
  userLevel,
  fitCoins,
  currentXP,
  language 
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAdmin, setIsAdmin] = useState(false); // Simular permissão de admin
  
  const t = useTranslation(language);
  
  const progressToGoal = Math.abs((profile.currentWeight - profile.targetWeight) / (profile.currentWeight - profile.targetWeight)) * 100;
  const calorieProgress = (dailyProgress.caloriesConsumed / stats.dailyCalories) * 100;
  const waterProgress = (dailyProgress.waterIntake / 2000) * 100; // Meta de 2L

  const getGoalIcon = () => {
    switch (profile.goal) {
      case 'lose_weight':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case 'gain_muscle':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      default:
        return <Target className="w-5 h-5 text-blue-500" />;
    }
  };

  const getGoalText = () => {
    switch (profile.goal) {
      case 'lose_weight':
        return 'Emagrecimento';
      case 'gain_muscle':
        return 'Ganho de Massa';
      default:
        return 'Manutenção';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('fittar-user');
    localStorage.removeItem('fittar-profile');
    localStorage.removeItem('fittar-following');
    window.location.reload();
  };

  // Simular verificação de admin (em produção seria baseado no perfil do usuário)
  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-white">F</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t.appName}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" style={{ backgroundColor: userLevel.color, color: 'white' }}>
                  {userLevel.name}
                </Badge>
                <span className="text-sm font-medium">{currentXP} XP</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">F</span>
                </div>
                <span className="text-sm font-medium">{fitCoins}</span>
              </div>

              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>

              {/* Admin Toggle Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleAdminMode}
                className={isAdmin ? 'bg-red-100 text-red-700' : ''}
              >
                <Shield className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className={`grid w-full ${isAdmin ? 'grid-cols-7' : 'grid-cols-6'} bg-transparent`}>
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="activities" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
                Atividades
              </TabsTrigger>
              <TabsTrigger value="community" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
                Comunidade
              </TabsTrigger>
              <TabsTrigger value="challenges" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
                Desafios
              </TabsTrigger>
              <TabsTrigger value="nutrition" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
                Nutrição
              </TabsTrigger>
              <TabsTrigger value="premium" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
                Premium
              </TabsTrigger>
              {isAdmin && (
                <TabsTrigger value="admin" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                  Admin
                </TabsTrigger>
              )}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {t.welcome}, {profile.name}! 👋
              </h2>
              <p className="text-lg text-indigo-600 font-medium">
                {motivationalMessage}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Peso Atual</p>
                      <p className="text-2xl font-bold text-gray-900">{profile.currentWeight}kg</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">IMC</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.bmi}</p>
                      <p className="text-xs text-gray-500">{stats.bmiCategory}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Meta Semanal</p>
                      <p className="text-2xl font-bold text-gray-900">{Math.abs(stats.weeklyGoal)}kg</p>
                      <p className="text-xs text-gray-500">por semana</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tempo Estimado</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.estimatedTimeToGoal}</p>
                      <p className="text-xs text-gray-500">semanas</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Daily Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    Progresso Diário - Calorias
                  </CardTitle>
                  <CardDescription>
                    {dailyProgress.caloriesConsumed} / {stats.dailyCalories} kcal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={calorieProgress} className="mb-4" />
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-medium text-red-600">{stats.dailyProtein}g</p>
                      <p className="text-gray-500">Proteína</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-yellow-600">{stats.dailyCarbs}g</p>
                      <p className="text-gray-500">Carboidratos</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-blue-600">{stats.dailyFats}g</p>
                      <p className="text-gray-500">Gorduras</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    Hidratação
                  </CardTitle>
                  <CardDescription>
                    {dailyProgress.waterIntake}ml / 2000ml
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={waterProgress} className="mb-4" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Meta diária: 2L</span>
                    <Button variant="outline" size="sm">
                      + 250ml
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Dumbbell className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Treino do Dia</h3>
                  <p className="text-sm text-gray-600 mb-4">Exercícios personalizados para {getGoalText().toLowerCase()}</p>
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700">
                    Começar Treino
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveTab('activities')}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Route className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Rastrear Atividade</h3>
                  <p className="text-sm text-gray-600 mb-4">Registre suas caminhadas e corridas</p>
                  <Button variant="outline" className="w-full">
                    Começar
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Reconhecer Alimento</h3>
                  <p className="text-sm text-gray-600 mb-4">Tire uma foto e descubra as calorias</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab('nutrition')}
                  >
                    Abrir Câmera
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveTab('community')}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Comunidade</h3>
                  <p className="text-sm text-gray-600 mb-4">Conecte-se com outros usuários</p>
                  <Button variant="outline" className="w-full">
                    Explorar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities">
            <ActivityTracker language={language} />
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community">
            <Community />
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges">
            <Challenges />
          </TabsContent>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition">
            <Nutrition />
          </TabsContent>

          {/* Premium Tab */}
          <TabsContent value="premium" className="space-y-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fittar Premium</h3>
              <p className="text-gray-600 mb-6">
                Desbloqueie recursos exclusivos, IA personalizada e muito mais!
              </p>
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                Em breve
              </Button>
            </div>
          </TabsContent>

          {/* Admin Tab */}
          {isAdmin && (
            <TabsContent value="admin">
              <AdminPanel language={language} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}