'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  Square, 
  MapPin, 
  Clock, 
  Zap, 
  Target,
  Share2,
  Trophy,
  TrendingUp,
  Calendar,
  Route
} from 'lucide-react';
import { Language, useTranslation } from '@/lib/i18n';

interface ActivityTrackerProps {
  language: Language;
}

interface Activity {
  id: string;
  type: 'walking' | 'running';
  distance: number; // em km
  duration: number; // em minutos
  calories: number;
  pace: string; // min/km
  date: string;
  shared: boolean;
}

export default function ActivityTracker({ language }: ActivityTrackerProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activityType, setActivityType] = useState<'walking' | 'running'>('walking');
  const [currentDistance, setCurrentDistance] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activeTab, setActiveTab] = useState('tracker');
  
  const t = useTranslation(language);

  // Simular timer quando está rastreando
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTracking && !isPaused) {
      interval = setInterval(() => {
        setCurrentDuration(prev => prev + 1);
        // Simular distância baseada no tipo de atividade
        const speedPerSecond = activityType === 'running' ? 0.002 : 0.001; // km/s aproximado
        setCurrentDistance(prev => prev + speedPerSecond);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTracking, isPaused, activityType]);

  // Carregar atividades salvas
  useEffect(() => {
    const savedActivities = localStorage.getItem('fittar-activities');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
  }, []);

  const startTracking = () => {
    setIsTracking(true);
    setIsPaused(false);
    setCurrentDistance(0);
    setCurrentDuration(0);
  };

  const pauseTracking = () => {
    setIsPaused(!isPaused);
  };

  const stopTracking = () => {
    if (currentDistance > 0 && currentDuration > 0) {
      const calories = calculateCalories(currentDistance, currentDuration, activityType);
      const pace = calculatePace(currentDistance, currentDuration);
      
      const newActivity: Activity = {
        id: Date.now().toString(),
        type: activityType,
        distance: Number(currentDistance.toFixed(2)),
        duration: currentDuration,
        calories,
        pace,
        date: new Date().toISOString(),
        shared: false
      };

      const updatedActivities = [newActivity, ...activities];
      setActivities(updatedActivities);
      localStorage.setItem('fittar-activities', JSON.stringify(updatedActivities));
    }

    setIsTracking(false);
    setIsPaused(false);
    setCurrentDistance(0);
    setCurrentDuration(0);
  };

  const calculateCalories = (distance: number, duration: number, type: 'walking' | 'running'): number => {
    // Cálculo aproximado de calorias
    const baseCaloriesPerKm = type === 'running' ? 70 : 50;
    return Math.round(distance * baseCaloriesPerKm);
  };

  const calculatePace = (distance: number, duration: number): string => {
    if (distance === 0) return '0:00';
    const paceInMinutes = duration / distance;
    const minutes = Math.floor(paceInMinutes);
    const seconds = Math.round((paceInMinutes - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const shareActivity = (activity: Activity) => {
    const message = `🏃‍♂️ Acabei de completar uma ${activity.type === 'running' ? 'corrida' : 'caminhada'} incrível!\n\n📏 Distância: ${activity.distance}km\n⏱️ Tempo: ${formatDuration(activity.duration * 60)}\n🔥 Calorias: ${activity.calories} kcal\n⚡ Ritmo: ${activity.pace}/km\n\n#FittarIA #Fitness #${activity.type === 'running' ? 'Corrida' : 'Caminhada'}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Minha atividade no Fittar IA',
        text: message
      });
    } else {
      navigator.clipboard.writeText(message);
      alert('Atividade copiada para a área de transferência!');
    }

    // Marcar como compartilhada
    const updatedActivities = activities.map(a => 
      a.id === activity.id ? { ...a, shared: true } : a
    );
    setActivities(updatedActivities);
    localStorage.setItem('fittar-activities', JSON.stringify(updatedActivities));
  };

  const totalDistance = activities.reduce((sum, activity) => sum + activity.distance, 0);
  const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0);
  const totalCalories = activities.reduce((sum, activity) => sum + activity.calories, 0);

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tracker">Rastreador</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
        </TabsList>

        {/* Tracker Tab */}
        <TabsContent value="tracker" className="space-y-6">
          {/* Activity Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="w-5 h-5" />
                Tipo de Atividade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={activityType === 'walking' ? 'default' : 'outline'}
                  onClick={() => setActivityType('walking')}
                  disabled={isTracking}
                  className="h-16 flex flex-col gap-2"
                >
                  <span className="text-2xl">🚶‍♂️</span>
                  <span>Caminhada</span>
                </Button>
                <Button
                  variant={activityType === 'running' ? 'default' : 'outline'}
                  onClick={() => setActivityType('running')}
                  disabled={isTracking}
                  className="h-16 flex flex-col gap-2"
                >
                  <span className="text-2xl">🏃‍♂️</span>
                  <span>Corrida</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Current Activity Display */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Atividade Atual
              </CardTitle>
              <CardDescription>
                {isTracking 
                  ? `${activityType === 'running' ? 'Correndo' : 'Caminhando'}${isPaused ? ' (Pausado)' : ''}` 
                  : 'Pronto para começar'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stats Display */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {currentDistance.toFixed(2)}
                  </div>
                  <div className="text-sm text-blue-600">km</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {formatDuration(currentDuration)}
                  </div>
                  <div className="text-sm text-green-600">tempo</div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {calculateCalories(currentDistance, currentDuration, activityType)}
                  </div>
                  <div className="text-sm text-orange-600">kcal</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {calculatePace(currentDistance, currentDuration)}
                  </div>
                  <div className="text-sm text-purple-600">min/km</div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex justify-center gap-4">
                {!isTracking ? (
                  <Button
                    onClick={startTracking}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Iniciar
                  </Button>
                ) : (
                  <div className="flex gap-4">
                    <Button
                      onClick={pauseTracking}
                      variant="outline"
                      size="lg"
                      className="px-8"
                    >
                      {isPaused ? (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Continuar
                        </>
                      ) : (
                        <>
                          <Pause className="w-5 h-5 mr-2" />
                          Pausar
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={stopTracking}
                      variant="destructive"
                      size="lg"
                      className="px-8"
                    >
                      <Square className="w-5 h-5 mr-2" />
                      Finalizar
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Histórico de Atividades
              </CardTitle>
              <CardDescription>
                {activities.length} atividades registradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <div className="text-center py-8">
                  <Route className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma atividade registrada ainda</p>
                  <p className="text-sm text-gray-400">Comece sua primeira atividade no rastreador!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <Card key={activity.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">
                              {activity.type === 'running' ? '🏃‍♂️' : '🚶‍♂️'}
                            </span>
                            <div>
                              <h4 className="font-semibold capitalize">
                                {activity.type === 'running' ? 'Corrida' : 'Caminhada'}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {new Date(activity.date).toLocaleDateString('pt-BR')} às{' '}
                                {new Date(activity.date).toLocaleTimeString('pt-BR', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {activity.shared && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                Compartilhado
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => shareActivity(activity)}
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span>{activity.distance}km</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-500" />
                            <span>{formatDuration(activity.duration * 60)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-orange-500" />
                            <span>{activity.calories} kcal</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-purple-500" />
                            <span>{activity.pace}/km</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Distância Total</p>
                    <p className="text-2xl font-bold text-blue-600">{totalDistance.toFixed(1)}km</p>
                  </div>
                  <MapPin className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tempo Total</p>
                    <p className="text-2xl font-bold text-green-600">
                      {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Calorias Queimadas</p>
                    <p className="text-2xl font-bold text-orange-600">{totalCalories}</p>
                  </div>
                  <Zap className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Resumo por Tipo de Atividade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    🚶‍♂️ Caminhadas
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Atividades:</span>
                      <span className="font-medium">
                        {activities.filter(a => a.type === 'walking').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Distância:</span>
                      <span className="font-medium">
                        {activities
                          .filter(a => a.type === 'walking')
                          .reduce((sum, a) => sum + a.distance, 0)
                          .toFixed(1)}km
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Calorias:</span>
                      <span className="font-medium">
                        {activities
                          .filter(a => a.type === 'walking')
                          .reduce((sum, a) => sum + a.calories, 0)} kcal
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    🏃‍♂️ Corridas
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Atividades:</span>
                      <span className="font-medium">
                        {activities.filter(a => a.type === 'running').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Distância:</span>
                      <span className="font-medium">
                        {activities
                          .filter(a => a.type === 'running')
                          .reduce((sum, a) => sum + a.distance, 0)
                          .toFixed(1)}km
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Calorias:</span>
                      <span className="font-medium">
                        {activities
                          .filter(a => a.type === 'running')
                          .reduce((sum, a) => sum + a.calories, 0)} kcal
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}