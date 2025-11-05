'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Trophy, 
  Palette,
  Globe,
  Save,
  Eye,
  Edit,
  Trash2,
  Plus,
  Upload
} from 'lucide-react';
import { Language, useTranslation } from '@/lib/i18n';

interface AdminPanelProps {
  language: Language;
}

export default function AdminPanel({ language }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [appName, setAppName] = useState('Fittar IA');
  const [appDescription, setAppDescription] = useState('Seu personal trainer com inteligência artificial');
  const [primaryColor, setPrimaryColor] = useState('#6366F1');
  const [secondaryColor, setSecondaryColor] = useState('#10B981');
  
  const t = useTranslation(language);

  const handleSaveSettings = () => {
    // Salvar configurações no localStorage ou backend
    const settings = {
      appName,
      appDescription,
      primaryColor,
      secondaryColor,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('fittar-admin-settings', JSON.stringify(settings));
    alert('Configurações salvas com sucesso!');
  };

  const mockStats = {
    totalUsers: 15420,
    activeUsers: 8934,
    totalWorkouts: 45678,
    totalChallenges: 156,
    totalPosts: 2341
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Painel Administrativo
              </h1>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Admin
            </Badge>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6 bg-transparent">
              <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
                Usuários
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
                Conteúdo
              </TabsTrigger>
              <TabsTrigger value="challenges" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
                Desafios
              </TabsTrigger>
              <TabsTrigger value="appearance" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
                Aparência
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
                Configurações
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.totalUsers.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.activeUsers.toLocaleString()}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Treinos</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.totalWorkouts.toLocaleString()}</p>
                    </div>
                    <Trophy className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Posts da Comunidade</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.totalPosts.toLocaleString()}</p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Últimas ações no aplicativo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Novo usuário registrado: João Silva</span>
                    <span className="text-xs text-gray-500 ml-auto">2 min atrás</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Desafio "30 dias de caminhada" completado por Maria</span>
                    <span className="text-xs text-gray-500 ml-auto">5 min atrás</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Nova postagem na comunidade sobre nutrição</span>
                    <span className="text-xs text-gray-500 ml-auto">12 min atrás</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Usuários</CardTitle>
                <CardDescription>Visualize e gerencie todos os usuários do aplicativo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Input placeholder="Buscar usuários..." className="max-w-sm" />
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Usuário
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left p-3 font-medium">Nome</th>
                          <th className="text-left p-3 font-medium">Email</th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-left p-3 font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-3">João Silva</td>
                          <td className="p-3">joao@email.com</td>
                          <td className="p-3">
                            <Badge variant="secondary" className="bg-green-100 text-green-700">Ativo</Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3">Maria Santos</td>
                          <td className="p-3">maria@email.com</td>
                          <td className="p-3">
                            <Badge variant="secondary" className="bg-green-100 text-green-700">Ativo</Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Conteúdo</CardTitle>
                <CardDescription>Crie e edite exercícios, planos alimentares e conteúdo educativo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Trophy className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Exercícios</h3>
                      <p className="text-sm text-gray-600 mb-4">Gerencie biblioteca de exercícios</p>
                      <Button variant="outline" className="w-full">
                        Gerenciar
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <MessageSquare className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Planos Alimentares</h3>
                      <p className="text-sm text-gray-600 mb-4">Crie planos de nutrição</p>
                      <Button variant="outline" className="w-full">
                        Gerenciar
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Conteúdo Educativo</h3>
                      <p className="text-sm text-gray-600 mb-4">Artigos e dicas de saúde</p>
                      <Button variant="outline" className="w-full">
                        Gerenciar
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Desafios</CardTitle>
                <CardDescription>Crie e gerencie desafios para motivar os usuários</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Desafios Ativos</h3>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Desafio
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">30 Dias de Caminhada</h4>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">Ativo</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Caminhe pelo menos 30 minutos por dia durante 30 dias</p>
                        <div className="flex justify-between text-sm">
                          <span>Participantes: 1,234</span>
                          <span>Recompensa: 500 FitCoins</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">Desafio de Hidratação</h4>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">Ativo</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Beba 2L de água por dia durante 7 dias</p>
                        <div className="flex justify-between text-sm">
                          <span>Participantes: 856</span>
                          <span>Recompensa: 200 FitCoins</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalizar Aparência</CardTitle>
                <CardDescription>Customize a aparência do aplicativo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="app-name">Nome do Aplicativo</Label>
                      <Input
                        id="app-name"
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                        placeholder="Nome do app"
                      />
                    </div>

                    <div>
                      <Label htmlFor="app-description">Descrição</Label>
                      <Textarea
                        id="app-description"
                        value={appDescription}
                        onChange={(e) => setAppDescription(e.target.value)}
                        placeholder="Descrição do app"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="primary-color">Cor Primária</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primary-color"
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-16 h-10"
                        />
                        <Input
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          placeholder="#6366F1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="secondary-color">Cor Secundária</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondary-color"
                          type="color"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="w-16 h-10"
                        />
                        <Input
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          placeholder="#10B981"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleSaveSettings}>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>Configure as funcionalidades do aplicativo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Notificações</h4>
                      <p className="text-sm text-gray-600 mb-4">Configure as notificações push</p>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Backup de Dados</h4>
                      <p className="text-sm text-gray-600 mb-4">Faça backup dos dados dos usuários</p>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Fazer Backup
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Idiomas</h4>
                      <p className="text-sm text-gray-600 mb-4">Gerencie idiomas disponíveis</p>
                      <Button variant="outline" size="sm">
                        <Globe className="w-4 h-4 mr-2" />
                        Gerenciar
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Integrações</h4>
                      <p className="text-sm text-gray-600 mb-4">Configure integrações externas</p>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}