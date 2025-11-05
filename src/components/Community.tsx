'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Camera, 
  Video, 
  Users, 
  Search,
  Filter,
  TrendingUp,
  Award,
  CheckCircle
} from 'lucide-react';

interface CommunityUser {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  isVerified?: boolean;
  followers: number;
  following: number;
  level: string;
  levelColor: string;
}

interface CommunityPost {
  id: string;
  user: CommunityUser;
  content: string;
  image?: string;
  video?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  isLiked: boolean;
  tags: string[];
}

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  image: string;
  isJoined: boolean;
}

export default function Community() {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Conta oficial do FitConnect IA
  const officialAccount: CommunityUser = {
    id: 'fitconnect-official',
    name: 'FitConnect IA',
    username: '@fitconnectia',
    avatar: '🤖',
    isVerified: true,
    followers: 125000,
    following: 0,
    level: 'Diamante',
    levelColor: '#E5E7EB'
  };

  // Posts simulados
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      user: officialAccount,
      content: '🎉 Bem-vindos à comunidade FitConnect IA! Compartilhem suas conquistas, receitas saudáveis e motivem uns aos outros. Juntos somos mais fortes! 💪 #FitConnectFamily',
      likes: 2847,
      comments: 156,
      shares: 89,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      isLiked: false,
      tags: ['motivação', 'comunidade', 'boas-vindas']
    },
    {
      id: '2',
      user: {
        id: '2',
        name: 'Ana Silva',
        username: '@anafit',
        avatar: '👩‍🦰',
        followers: 1250,
        following: 890,
        level: 'Ouro',
        levelColor: '#F59E0B'
      },
      content: 'Acabei de completar meu treino de 45 minutos! 🏋️‍♀️ Quem mais treinou hoje? Vamos nos motivar! #TreinoCompleto #Determinação',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      likes: 89,
      comments: 23,
      shares: 12,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
      isLiked: true,
      tags: ['treino', 'motivação']
    },
    {
      id: '3',
      user: {
        id: '3',
        name: 'Carlos Mendes',
        username: '@carlosstrong',
        avatar: '👨‍💼',
        followers: 2100,
        following: 450,
        level: 'Platina',
        levelColor: '#8B5CF6'
      },
      content: 'Receita do dia: Smoothie proteico com banana, aveia e whey! 🥤 Perfeito pós-treino. Quem quer a receita completa?',
      image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop',
      likes: 156,
      comments: 34,
      shares: 28,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 horas atrás
      isLiked: false,
      tags: ['receita', 'proteína', 'pós-treino']
    }
  ]);

  // Grupos da comunidade
  const communityGroups: CommunityGroup[] = [
    {
      id: '1',
      name: 'Emagrecimento Saudável',
      description: 'Dicas, receitas e motivação para perder peso de forma saudável',
      members: 15420,
      category: 'Emagrecimento',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop',
      isJoined: true
    },
    {
      id: '2',
      name: 'Musculação e Hipertrofia',
      description: 'Treinos, suplementação e estratégias para ganho de massa',
      members: 23100,
      category: 'Hipertrofia',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=200&h=150&fit=crop',
      isJoined: false
    },
    {
      id: '3',
      name: 'Receitas Fitness',
      description: 'Compartilhe e descubra receitas saudáveis e saborosas',
      members: 31200,
      category: 'Nutrição',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=150&fit=crop',
      isJoined: true
    },
    {
      id: '4',
      name: 'Desafios FitConnect',
      description: 'Participe dos desafios oficiais e ganhe FitCoins',
      members: 8900,
      category: 'Desafios',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=150&fit=crop',
      isJoined: false
    }
  ];

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleNewPost = () => {
    if (!newPost.trim()) return;

    const currentUser: CommunityUser = {
      id: 'current-user',
      name: 'Você',
      username: '@voce',
      avatar: '👤',
      followers: 0,
      following: 1, // Seguindo a conta oficial
      level: 'Bronze',
      levelColor: '#CD7F32'
    };

    const post: CommunityPost = {
      id: Date.now().toString(),
      user: currentUser,
      content: newPost,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date(),
      isLiked: false,
      tags: []
    };

    setPosts(prev => [post, ...prev]);
    setNewPost('');
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    return `${Math.floor(diffInHours / 24)}d atrás`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Comunidade FitConnect</h1>
        <p className="text-gray-600">Conecte-se, inspire-se e transforme-se junto com nossa comunidade</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="groups">Grupos</TabsTrigger>
          <TabsTrigger value="challenges">Desafios</TabsTrigger>
          <TabsTrigger value="leaderboard">Ranking</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          {/* Criar Post */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback>👤</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Compartilhe sua jornada fitness..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Camera className="w-4 h-4 mr-2" />
                        Foto
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4 mr-2" />
                        Vídeo
                      </Button>
                    </div>
                    <Button 
                      onClick={handleNewPost}
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                      disabled={!newPost.trim()}
                    >
                      Publicar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  {/* Header do Post */}
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarFallback>{post.user.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{post.user.name}</h3>
                        {post.user.isVerified && (
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        )}
                        <Badge 
                          variant="secondary" 
                          style={{ backgroundColor: post.user.levelColor, color: 'white' }}
                          className="text-xs"
                        >
                          {post.user.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        {post.user.username} • {formatTimeAgo(post.timestamp)}
                      </p>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <p className="text-gray-900 mb-4">{post.content}</p>

                  {/* Imagem */}
                  {post.image && (
                    <div className="mb-4">
                      <img 
                        src={post.image} 
                        alt="Post" 
                        className="w-full rounded-lg max-h-96 object-cover"
                      />
                    </div>
                  )}

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-emerald-600">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Ações */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 transition-colors ${
                          post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </button>
                      
                      <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.comments}</span>
                      </button>
                      
                      <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span>{post.shares}</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          {/* Busca de Grupos */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar grupos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Grupos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img 
                      src={group.image} 
                      alt={group.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{group.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {group.members.toLocaleString()} membros
                        </span>
                        <Badge variant="outline">{group.category}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button 
                      className={`w-full ${
                        group.isJoined 
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                          : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
                      }`}
                    >
                      {group.isJoined ? 'Participando' : 'Participar'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Desafios em Desenvolvimento</h3>
            <p className="text-gray-600">
              Em breve você poderá participar de desafios incríveis e ganhar FitCoins!
            </p>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ranking em Desenvolvimento</h3>
            <p className="text-gray-600">
              Em breve você poderá ver o ranking dos usuários mais ativos da comunidade!
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}