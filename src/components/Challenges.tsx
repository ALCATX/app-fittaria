'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Trophy, 
  Target, 
  Calendar, 
  Clock, 
  Flame, 
  Droplets, 
  Dumbbell,
  Apple,
  Award,
  Star,
  CheckCircle,
  Timer,
  Users,
  Camera,
  Video,
  Upload,
  Play,
  Image
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  category: 'workout' | 'nutrition' | 'hydration' | 'social' | 'general';
  reward: number; // FitCoins
  xpReward: number;
  duration: string;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  participants?: number;
  timeLeft?: string;
  icon: string;
  requiresProof: boolean; // Nova propriedade para exigir foto/vídeo
  proofType: 'photo' | 'video' | 'both'; // Tipo de prova necessária
}

interface UserAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface ChallengeProof {
  id: string;
  challengeId: string;
  type: 'photo' | 'video';
  url: string;
  uploadedAt: Date;
}

export default function Challenges() {
  const [activeTab, setActiveTab] = useState('daily');
  const [userFitCoins, setUserFitCoins] = useState(150);
  const [userXP, setUserXP] = useState(1250);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [uploadedProofs, setUploadedProofs] = useState<ChallengeProof[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Desafios atualizados com requisito de prova
  const challenges: Challenge[] = [
    // Desafios Diários
    {
      id: 'daily-1',
      title: 'Hidratação Completa',
      description: 'Beba pelo menos 2 litros de água hoje e poste uma foto do seu copo/garrafa',
      type: 'daily',
      category: 'hydration',
      reward: 10,
      xpReward: 25,
      duration: '1 dia',
      progress: 1200,
      maxProgress: 2000,
      isCompleted: false,
      difficulty: 'easy',
      timeLeft: '14h 32m',
      icon: '💧',
      requiresProof: true,
      proofType: 'photo'
    },
    {
      id: 'daily-2',
      title: 'Treino Completo',
      description: 'Complete seu treino diário de 30 minutos e grave um vídeo de 15 segundos fazendo o exercício',
      type: 'daily',
      category: 'workout',
      reward: 15,
      xpReward: 50,
      duration: '1 dia',
      progress: 0,
      maxProgress: 1,
      isCompleted: false,
      difficulty: 'medium',
      timeLeft: '14h 32m',
      icon: '🏋️',
      requiresProof: true,
      proofType: 'video'
    },
    {
      id: 'daily-3',
      title: 'Refeição Saudável',
      description: 'Prepare uma refeição saudável e poste uma foto do prato',
      type: 'daily',
      category: 'nutrition',
      reward: 12,
      xpReward: 30,
      duration: '1 dia',
      progress: 0,
      maxProgress: 1,
      isCompleted: false,
      difficulty: 'easy',
      timeLeft: '14h 32m',
      icon: '🥗',
      requiresProof: true,
      proofType: 'photo'
    },

    // Desafios Semanais
    {
      id: 'weekly-1',
      title: 'Guerreiro da Semana',
      description: 'Treine 5 dias nesta semana e poste um vídeo de cada treino',
      type: 'weekly',
      category: 'workout',
      reward: 50,
      xpReward: 150,
      duration: '7 dias',
      progress: 2,
      maxProgress: 5,
      isCompleted: false,
      difficulty: 'medium',
      participants: 1247,
      timeLeft: '4d 12h',
      icon: '⚔️',
      requiresProof: true,
      proofType: 'video'
    },
    {
      id: 'weekly-2',
      title: 'Chef Fitness',
      description: 'Prepare 7 refeições saudáveis diferentes e poste fotos de cada uma',
      type: 'weekly',
      category: 'nutrition',
      reward: 40,
      xpReward: 120,
      duration: '7 dias',
      progress: 4,
      maxProgress: 7,
      isCompleted: false,
      difficulty: 'hard',
      participants: 892,
      timeLeft: '4d 12h',
      icon: '👨‍🍳',
      requiresProof: true,
      proofType: 'photo'
    },

    // Desafios Mensais
    {
      id: 'monthly-1',
      title: 'Transformação Total',
      description: 'Complete 20 treinos neste mês e poste foto/vídeo de cada sessão',
      type: 'monthly',
      category: 'workout',
      reward: 200,
      xpReward: 500,
      duration: '30 dias',
      progress: 8,
      maxProgress: 20,
      isCompleted: false,
      difficulty: 'hard',
      participants: 3456,
      timeLeft: '18d 5h',
      icon: '🔥',
      requiresProof: true,
      proofType: 'both'
    },
    {
      id: 'monthly-2',
      title: 'Jornada Nutricional',
      description: 'Documente sua alimentação por 30 dias com fotos de todas as refeições',
      type: 'monthly',
      category: 'nutrition',
      reward: 150,
      xpReward: 400,
      duration: '30 dias',
      progress: 15,
      maxProgress: 30,
      isCompleted: false,
      difficulty: 'hard',
      participants: 2134,
      timeLeft: '18d 5h',
      icon: '📸',
      requiresProof: true,
      proofType: 'photo'
    },

    // Desafios Especiais
    {
      id: 'special-1',
      title: 'Desafio de Ano Novo',
      description: 'Mantenha sua rotina fitness por 21 dias consecutivos com evidências diárias',
      type: 'special',
      category: 'general',
      reward: 500,
      xpReward: 1000,
      duration: '21 dias',
      progress: 7,
      maxProgress: 21,
      isCompleted: false,
      difficulty: 'hard',
      participants: 15678,
      timeLeft: '14d 8h',
      icon: '🎯',
      requiresProof: true,
      proofType: 'both'
    }
  ];

  // Conquistas do usuário
  const userAchievements: UserAchievement[] = [
    {
      id: '1',
      title: 'Primeiro Passo',
      description: 'Complete seu primeiro treino',
      icon: '👟',
      unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Hidratado',
      description: 'Beba 2L de água por 3 dias consecutivos',
      icon: '💧',
      unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      rarity: 'common'
    },
    {
      id: '3',
      title: 'Dedicado',
      description: 'Complete 10 treinos',
      icon: '🏆',
      unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      rarity: 'rare'
    },
    {
      id: '4',
      title: 'Influenciador Fitness',
      description: 'Poste 50 fotos/vídeos de treinos',
      icon: '📱',
      unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      rarity: 'epic'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const handleFileUpload = async (challengeId: string, file: File, type: 'photo' | 'video') => {
    setIsUploading(true);
    
    // Simular upload (em produção, seria enviado para servidor)
    setTimeout(() => {
      const newProof: ChallengeProof = {
        id: Date.now().toString(),
        challengeId,
        type,
        url: URL.createObjectURL(file),
        uploadedAt: new Date()
      };
      
      setUploadedProofs(prev => [...prev, newProof]);
      setIsUploading(false);
      
      // Atualizar progresso do desafio
      const challenge = challenges.find(c => c.id === challengeId);
      if (challenge) {
        challenge.progress = Math.min(challenge.progress + 1, challenge.maxProgress);
        if (challenge.progress >= challenge.maxProgress) {
          challenge.isCompleted = true;
          setUserFitCoins(prev => prev + challenge.reward);
          setUserXP(prev => prev + challenge.xpReward);
        }
      }
    }, 2000);
  };

  const handleCompleteChallenge = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge && !challenge.isCompleted) {
      if (challenge.requiresProof) {
        setSelectedChallenge(challenge);
      } else {
        setUserFitCoins(prev => prev + challenge.reward);
        setUserXP(prev => prev + challenge.xpReward);
        challenge.isCompleted = true;
        challenge.progress = challenge.maxProgress;
      }
    }
  };

  const filterChallenges = (type: string) => {
    return challenges.filter(challenge => challenge.type === type);
  };

  const getProofIcon = (proofType: string) => {
    switch (proofType) {
      case 'photo': return <Camera className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'both': return <Image className="w-4 h-4" />;
      default: return <Upload className="w-4 h-4" />;
    }
  };

  const getProofText = (proofType: string) => {
    switch (proofType) {
      case 'photo': return 'Foto necessária';
      case 'video': return 'Vídeo necessário';
      case 'both': return 'Foto ou vídeo';
      default: return 'Prova necessária';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Desafios & Conquistas</h1>
        <p className="text-gray-600">Complete desafios, poste evidências, ganhe FitCoins e desbloqueie conquistas</p>
      </div>

      {/* Stats do Usuário */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">FitCoins</p>
                <p className="text-3xl font-bold text-orange-600">{userFitCoins}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🪙</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">XP Total</p>
                <p className="text-3xl font-bold text-purple-600">{userXP}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conquistas</p>
                <p className="text-3xl font-bold text-emerald-600">{userAchievements.length}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="daily">Diários</TabsTrigger>
          <TabsTrigger value="weekly">Semanais</TabsTrigger>
          <TabsTrigger value="monthly">Mensais</TabsTrigger>
          <TabsTrigger value="special">Especiais</TabsTrigger>
          <TabsTrigger value="achievements">Conquistas</TabsTrigger>
        </TabsList>

        {/* Desafios Diários */}
        <TabsContent value="daily" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterChallenges('daily').map((challenge) => (
              <Card key={challenge.id} className={`hover:shadow-lg transition-shadow ${challenge.isCompleted ? 'border-green-200 bg-green-50' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{challenge.icon}</span>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty === 'easy' ? 'Fácil' : 
                         challenge.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                      </Badge>
                    </div>
                    {challenge.isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                  
                  {/* Indicador de prova necessária */}
                  {challenge.requiresProof && (
                    <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit">
                      {getProofIcon(challenge.proofType)}
                      <span>{getProofText(challenge.proofType)}</span>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent>
                  {/* Progresso */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progresso</span>
                      <span>{challenge.progress}/{challenge.maxProgress}</span>
                    </div>
                    <Progress 
                      value={(challenge.progress / challenge.maxProgress) * 100} 
                      className="h-2"
                    />
                  </div>

                  {/* Recompensas */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <span className="text-orange-500">🪙</span>
                        {challenge.reward}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-purple-500" />
                        {challenge.xpReward} XP
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Timer className="w-4 h-4" />
                      {challenge.timeLeft}
                    </div>
                  </div>

                  {/* Botão de Ação */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full"
                        variant={challenge.isCompleted ? "secondary" : "default"}
                        disabled={challenge.isCompleted}
                        onClick={() => handleCompleteChallenge(challenge.id)}
                      >
                        {challenge.isCompleted ? 'Concluído!' : challenge.requiresProof ? 'Enviar Prova' : 'Participar'}
                      </Button>
                    </DialogTrigger>
                    
                    {challenge.requiresProof && selectedChallenge?.id === challenge.id && (
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Enviar Prova do Desafio</DialogTitle>
                          <DialogDescription>
                            {challenge.title} - {getProofText(challenge.proofType)}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          {(challenge.proofType === 'photo' || challenge.proofType === 'both') && (
                            <div>
                              <label className="block text-sm font-medium mb-2">Enviar Foto</label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(challenge.id, file, 'photo');
                                }}
                                className="w-full p-2 border rounded-lg"
                                disabled={isUploading}
                              />
                            </div>
                          )}
                          
                          {(challenge.proofType === 'video' || challenge.proofType === 'both') && (
                            <div>
                              <label className="block text-sm font-medium mb-2">Enviar Vídeo</label>
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(challenge.id, file, 'video');
                                }}
                                className="w-full p-2 border rounded-lg"
                                disabled={isUploading}
                              />
                            </div>
                          )}
                          
                          {isUploading && (
                            <div className="text-center py-4">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                              <p className="text-sm text-gray-600 mt-2">Enviando...</p>
                            </div>
                          )}
                          
                          {/* Mostrar provas já enviadas */}
                          {uploadedProofs.filter(p => p.challengeId === challenge.id).map((proof) => (
                            <div key={proof.id} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                              {proof.type === 'photo' ? <Camera className="w-4 h-4 text-green-600" /> : <Video className="w-4 h-4 text-green-600" />}
                              <span className="text-sm text-green-700">
                                {proof.type === 'photo' ? 'Foto' : 'Vídeo'} enviado com sucesso!
                              </span>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Desafios Semanais */}
        <TabsContent value="weekly" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filterChallenges('weekly').map((challenge) => (
              <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{challenge.icon}</span>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty === 'easy' ? 'Fácil' : 
                         challenge.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      {challenge.participants?.toLocaleString()}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                  
                  {challenge.requiresProof && (
                    <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit">
                      {getProofIcon(challenge.proofType)}
                      <span>{getProofText(challenge.proofType)}</span>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progresso</span>
                      <span>{challenge.progress}/{challenge.maxProgress}</span>
                    </div>
                    <Progress 
                      value={(challenge.progress / challenge.maxProgress) * 100} 
                      className="h-3"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-orange-600 font-medium">
                        <span>🪙</span>
                        {challenge.reward}
                      </span>
                      <span className="flex items-center gap-1 text-purple-600 font-medium">
                        <Star className="w-4 h-4" />
                        {challenge.xpReward} XP
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Timer className="w-4 h-4" />
                      {challenge.timeLeft}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700">
                    {challenge.requiresProof ? 'Enviar Prova' : 'Participar do Desafio'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Desafios Mensais */}
        <TabsContent value="monthly" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filterChallenges('monthly').map((challenge) => (
              <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{challenge.icon}</span>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty === 'easy' ? 'Fácil' : 
                         challenge.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      {challenge.participants?.toLocaleString()}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                  
                  {challenge.requiresProof && (
                    <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit">
                      {getProofIcon(challenge.proofType)}
                      <span>{getProofText(challenge.proofType)}</span>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progresso</span>
                      <span>{challenge.progress}/{challenge.maxProgress}</span>
                    </div>
                    <Progress 
                      value={(challenge.progress / challenge.maxProgress) * 100} 
                      className="h-3"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-orange-600 font-bold text-lg">
                        <span>🪙</span>
                        {challenge.reward}
                      </span>
                      <span className="flex items-center gap-1 text-purple-600 font-bold text-lg">
                        <Star className="w-5 h-5" />
                        {challenge.xpReward} XP
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Timer className="w-4 h-4" />
                      {challenge.timeLeft}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                    {challenge.requiresProof ? 'Enviar Prova' : 'Participar do Desafio'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Desafios Especiais */}
        <TabsContent value="special" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {filterChallenges('special').map((challenge) => (
              <Card key={challenge.id} className="hover:shadow-lg transition-shadow border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{challenge.icon}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                            ESPECIAL
                          </Badge>
                          <Badge className={getDifficultyColor(challenge.difficulty)}>
                            {challenge.difficulty === 'hard' ? 'Difícil' : challenge.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl">{challenge.title}</CardTitle>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                        <Users className="w-4 h-4" />
                        {challenge.participants?.toLocaleString()} participantes
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Timer className="w-4 h-4" />
                        {challenge.timeLeft}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base">{challenge.description}</CardDescription>
                  
                  {challenge.requiresProof && (
                    <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit">
                      {getProofIcon(challenge.proofType)}
                      <span>{getProofText(challenge.proofType)}</span>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Progresso</span>
                      <span className="font-medium">{challenge.progress}/{challenge.maxProgress} dias</span>
                    </div>
                    <Progress 
                      value={(challenge.progress / challenge.maxProgress) * 100} 
                      className="h-4"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-6">
                      <span className="flex items-center gap-2 text-orange-600 font-bold text-xl">
                        <span className="text-2xl">🪙</span>
                        {challenge.reward}
                      </span>
                      <span className="flex items-center gap-2 text-purple-600 font-bold text-xl">
                        <Star className="w-6 h-6" />
                        {challenge.xpReward} XP
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3">
                    🏆 {challenge.requiresProof ? 'Enviar Prova do Desafio' : 'Participar do Desafio Especial'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Conquistas */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userAchievements.map((achievement) => (
              <Card key={achievement.id} className={`hover:shadow-lg transition-shadow border-2 ${getRarityColor(achievement.rarity)}`}>
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{achievement.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                  <Badge className={`${
                    achievement.rarity === 'common' ? 'bg-gray-200 text-gray-800' :
                    achievement.rarity === 'rare' ? 'bg-blue-200 text-blue-800' :
                    achievement.rarity === 'epic' ? 'bg-purple-200 text-purple-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                    {achievement.rarity === 'common' ? 'Comum' :
                     achievement.rarity === 'rare' ? 'Raro' :
                     achievement.rarity === 'epic' ? 'Épico' : 'Lendário'}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-2">
                    Desbloqueado em {achievement.unlockedAt.toLocaleDateString('pt-BR')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}