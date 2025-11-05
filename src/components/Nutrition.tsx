'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Camera, 
  Calendar, 
  Clock, 
  Utensils, 
  Coffee,
  Sun,
  Sunset,
  Moon,
  ShoppingCart,
  Zap,
  Target,
  TrendingUp,
  Apple,
  Beef,
  Wheat,
  Droplets,
  Plus,
  Check,
  Star
} from 'lucide-react';

interface Meal {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  prepTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  image?: string;
}

interface DayMenu {
  day: string;
  date: string;
  meals: {
    breakfast: Meal;
    morningSnack: Meal;
    lunch: Meal;
    afternoonSnack: Meal;
    dinner: Meal;
  };
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

interface FoodRecognition {
  id: string;
  image: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  confidence: number;
  timestamp: Date;
}

export default function Nutrition() {
  const [activeTab, setActiveTab] = useState('weekly-menu');
  const [selectedDay, setSelectedDay] = useState('monday');
  const [recognizedFoods, setRecognizedFoods] = useState<FoodRecognition[]>([]);
  const [isRecognizing, setIsRecognizing] = useState(false);

  // Cardápio semanal completo
  const weeklyMenu: DayMenu[] = [
    {
      day: 'Segunda-feira',
      date: '2024-01-15',
      meals: {
        breakfast: {
          id: 'b1',
          name: 'Aveia com Frutas e Castanhas',
          description: 'Aveia integral com banana, morango, castanha-do-pará e mel',
          calories: 380,
          protein: 12,
          carbs: 58,
          fats: 14,
          ingredients: ['50g aveia em flocos', '1 banana média', '100g morango', '15g castanha-do-pará', '1 colher mel'],
          prepTime: 10,
          difficulty: 'easy'
        },
        morningSnack: {
          id: 'ms1',
          name: 'Iogurte Proteico',
          description: 'Iogurte grego natural com granola caseira',
          calories: 180,
          protein: 15,
          carbs: 20,
          fats: 5,
          ingredients: ['150g iogurte grego', '20g granola integral'],
          prepTime: 2,
          difficulty: 'easy'
        },
        lunch: {
          id: 'l1',
          name: 'Frango Grelhado com Quinoa',
          description: 'Peito de frango grelhado, quinoa, brócolis e cenoura refogados',
          calories: 520,
          protein: 45,
          carbs: 35,
          fats: 18,
          ingredients: ['150g peito de frango', '80g quinoa', '100g brócolis', '80g cenoura', 'temperos naturais'],
          prepTime: 25,
          difficulty: 'medium'
        },
        afternoonSnack: {
          id: 'as1',
          name: 'Mix de Oleaginosas',
          description: 'Castanhas, nozes e amêndoas com frutas secas',
          calories: 200,
          protein: 6,
          carbs: 12,
          fats: 16,
          ingredients: ['15g castanha-do-pará', '10g nozes', '10g amêndoas', '15g uvas passas'],
          prepTime: 1,
          difficulty: 'easy'
        },
        dinner: {
          id: 'd1',
          name: 'Salmão com Batata Doce',
          description: 'Salmão assado com batata doce e aspargos grelhados',
          calories: 450,
          protein: 35,
          carbs: 30,
          fats: 20,
          ingredients: ['120g salmão', '150g batata doce', '100g aspargos', 'azeite extra virgem'],
          prepTime: 30,
          difficulty: 'medium'
        }
      },
      totalCalories: 1730,
      totalProtein: 113,
      totalCarbs: 155,
      totalFats: 73
    },
    {
      day: 'Terça-feira',
      date: '2024-01-16',
      meals: {
        breakfast: {
          id: 'b2',
          name: 'Smoothie Proteico Verde',
          description: 'Smoothie com espinafre, banana, whey protein e leite de amêndoas',
          calories: 320,
          protein: 25,
          carbs: 35,
          fats: 8,
          ingredients: ['1 punhado espinafre', '1 banana', '30g whey protein', '200ml leite amêndoas'],
          prepTime: 5,
          difficulty: 'easy'
        },
        morningSnack: {
          id: 'ms2',
          name: 'Tapioca com Queijo',
          description: 'Tapioca integral com queijo cottage e tomate cereja',
          calories: 220,
          protein: 12,
          carbs: 28,
          fats: 8,
          ingredients: ['30g goma tapioca', '50g queijo cottage', '50g tomate cereja'],
          prepTime: 8,
          difficulty: 'easy'
        },
        lunch: {
          id: 'l2',
          name: 'Carne Magra com Arroz Integral',
          description: 'Patinho grelhado, arroz integral, feijão preto e salada verde',
          calories: 580,
          protein: 42,
          carbs: 48,
          fats: 20,
          ingredients: ['140g patinho', '60g arroz integral', '80g feijão preto', 'salada mista'],
          prepTime: 35,
          difficulty: 'medium'
        },
        afternoonSnack: {
          id: 'as2',
          name: 'Vitamina de Frutas',
          description: 'Vitamina com manga, maracujá e leite desnatado',
          calories: 180,
          protein: 8,
          carbs: 32,
          fats: 3,
          ingredients: ['100g manga', '1 maracujá', '150ml leite desnatado'],
          prepTime: 5,
          difficulty: 'easy'
        },
        dinner: {
          id: 'd2',
          name: 'Omelete de Legumes',
          description: 'Omelete com abobrinha, tomate, cebola e queijo light',
          calories: 280,
          protein: 20,
          carbs: 12,
          fats: 18,
          ingredients: ['3 ovos', '80g abobrinha', '50g tomate', '30g queijo light'],
          prepTime: 15,
          difficulty: 'easy'
        }
      },
      totalCalories: 1580,
      totalProtein: 107,
      totalCarbs: 155,
      totalFats: 57
    },
    // Adicionar mais dias da semana...
    {
      day: 'Quarta-feira',
      date: '2024-01-17',
      meals: {
        breakfast: {
          id: 'b3',
          name: 'Panqueca de Banana Fit',
          description: 'Panqueca de aveia com banana, canela e pasta de amendoim',
          calories: 350,
          protein: 18,
          carbs: 45,
          fats: 12,
          ingredients: ['40g aveia', '1 banana', '2 ovos', '10g pasta amendoim', 'canela'],
          prepTime: 12,
          difficulty: 'medium'
        },
        morningSnack: {
          id: 'ms3',
          name: 'Água de Coco com Chia',
          description: 'Água de coco natural com sementes de chia e limão',
          calories: 120,
          protein: 3,
          carbs: 18,
          fats: 4,
          ingredients: ['200ml água de coco', '15g chia', 'suco de 1/2 limão'],
          prepTime: 5,
          difficulty: 'easy'
        },
        lunch: {
          id: 'l3',
          name: 'Peixe com Legumes no Vapor',
          description: 'Tilápia no vapor com legumes coloridos e arroz de couve-flor',
          calories: 480,
          protein: 38,
          carbs: 25,
          fats: 22,
          ingredients: ['150g tilápia', '100g brócolis', '80g cenoura', '100g couve-flor'],
          prepTime: 20,
          difficulty: 'medium'
        },
        afternoonSnack: {
          id: 'as3',
          name: 'Abacate com Cacau',
          description: 'Creme de abacate com cacau em pó e stevia',
          calories: 240,
          protein: 4,
          carbs: 15,
          fats: 20,
          ingredients: ['1/2 abacate médio', '10g cacau em pó', 'stevia a gosto'],
          prepTime: 5,
          difficulty: 'easy'
        },
        dinner: {
          id: 'd3',
          name: 'Salada Completa com Grão-de-Bico',
          description: 'Salada verde com grão-de-bico, queijo feta e azeite',
          calories: 380,
          protein: 18,
          carbs: 32,
          fats: 22,
          ingredients: ['mix de folhas', '100g grão-de-bico', '40g queijo feta', 'azeite'],
          prepTime: 10,
          difficulty: 'easy'
        }
      },
      totalCalories: 1570,
      totalProtein: 81,
      totalCarbs: 135,
      totalFats: 80
    }
  ];

  // Lista de compras gerada automaticamente
  const generateShoppingList = () => {
    const ingredients = new Set<string>();
    weeklyMenu.forEach(day => {
      Object.values(day.meals).forEach(meal => {
        meal.ingredients.forEach(ingredient => ingredients.add(ingredient));
      });
    });
    return Array.from(ingredients).sort();
  };

  const shoppingList = generateShoppingList();

  const handleFoodRecognition = async (file: File) => {
    setIsRecognizing(true);
    
    // Simular reconhecimento de alimento (em produção, seria enviado para API de IA)
    setTimeout(() => {
      const mockRecognition: FoodRecognition = {
        id: Date.now().toString(),
        image: URL.createObjectURL(file),
        foodName: 'Prato de Frango Grelhado',
        calories: 420,
        protein: 35,
        carbs: 25,
        fats: 18,
        confidence: 92,
        timestamp: new Date()
      };
      
      setRecognizedFoods(prev => [mockRecognition, ...prev]);
      setIsRecognizing(false);
    }, 3000);
  };

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return <Coffee className="w-5 h-5 text-orange-500" />;
      case 'morningSnack': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'lunch': return <Utensils className="w-5 h-5 text-green-500" />;
      case 'afternoonSnack': return <Sunset className="w-5 h-5 text-orange-400" />;
      case 'dinner': return <Moon className="w-5 h-5 text-blue-500" />;
      default: return <Utensils className="w-5 h-5" />;
    }
  };

  const getMealName = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return 'Café da Manhã';
      case 'morningSnack': return 'Lanche da Manhã';
      case 'lunch': return 'Almoço';
      case 'afternoonSnack': return 'Lanche da Tarde';
      case 'dinner': return 'Jantar';
      default: return 'Refeição';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const selectedDayMenu = weeklyMenu.find(menu => 
    menu.day.toLowerCase().includes(selectedDay) || 
    selectedDay === 'monday' && menu.day === 'Segunda-feira' ||
    selectedDay === 'tuesday' && menu.day === 'Terça-feira' ||
    selectedDay === 'wednesday' && menu.day === 'Quarta-feira'
  ) || weeklyMenu[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nutrição Inteligente com IA</h1>
        <p className="text-gray-600">Cardápios personalizados, reconhecimento de alimentos e acompanhamento nutricional</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="weekly-menu">Cardápio Semanal</TabsTrigger>
          <TabsTrigger value="food-recognition">Reconhecer Alimento</TabsTrigger>
          <TabsTrigger value="shopping-list">Lista de Compras</TabsTrigger>
          <TabsTrigger value="nutrition-stats">Estatísticas</TabsTrigger>
        </TabsList>

        {/* Cardápio Semanal */}
        <TabsContent value="weekly-menu" className="space-y-6">
          {/* Seletor de Dias */}
          <div className="flex flex-wrap gap-2 mb-6">
            {weeklyMenu.map((dayMenu, index) => (
              <Button
                key={dayMenu.day}
                variant={selectedDay === ['monday', 'tuesday', 'wednesday'][index] ? 'default' : 'outline'}
                onClick={() => setSelectedDay(['monday', 'tuesday', 'wednesday'][index])}
                className="flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                {dayMenu.day}
              </Button>
            ))}
          </div>

          {/* Resumo Nutricional do Dia */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                Resumo Nutricional - {selectedDayMenu.day}
              </CardTitle>
              <CardDescription>{selectedDayMenu.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Zap className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-600">Calorias</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{selectedDayMenu.totalCalories}</p>
                  <p className="text-xs text-gray-500">kcal</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Beef className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-gray-600">Proteína</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600">{selectedDayMenu.totalProtein}g</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Wheat className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-600">Carboidratos</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600">{selectedDayMenu.totalCarbs}g</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-600">Gorduras</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{selectedDayMenu.totalFats}g</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refeições do Dia */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(selectedDayMenu.meals).map(([mealType, meal]) => (
              <Card key={meal.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getMealIcon(mealType)}
                      <CardTitle className="text-lg">{getMealName(mealType)}</CardTitle>
                    </div>
                    <Badge className={getDifficultyColor(meal.difficulty)}>
                      {meal.difficulty === 'easy' ? 'Fácil' : 
                       meal.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                    </Badge>
                  </div>
                  <CardDescription className="font-medium text-gray-900">{meal.name}</CardDescription>
                  <p className="text-sm text-gray-600">{meal.description}</p>
                </CardHeader>
                
                <CardContent>
                  {/* Informações Nutricionais */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Calorias:</span>
                      <span className="font-medium">{meal.calories} kcal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Proteína:</span>
                      <span className="font-medium">{meal.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Carboidratos:</span>
                      <span className="font-medium">{meal.carbs}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gorduras:</span>
                      <span className="font-medium">{meal.fats}g</span>
                    </div>
                  </div>

                  {/* Tempo de Preparo */}
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{meal.prepTime} min de preparo</span>
                  </div>

                  {/* Botão Ver Receita */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Ver Receita Completa
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{meal.name}</DialogTitle>
                        <DialogDescription>{meal.description}</DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Ingredientes:</h4>
                          <ul className="space-y-1">
                            {meal.ingredients.map((ingredient, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm">
                                <Check className="w-3 h-3 text-green-500" />
                                {ingredient}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Tempo de preparo:</span>
                            <p>{meal.prepTime} minutos</p>
                          </div>
                          <div>
                            <span className="font-medium">Dificuldade:</span>
                            <p className="capitalize">{meal.difficulty === 'easy' ? 'Fácil' : meal.difficulty === 'medium' ? 'Médio' : 'Difícil'}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reconhecimento de Alimentos */}
        <TabsContent value="food-recognition" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-600" />
                Reconhecer Alimento por Foto
              </CardTitle>
              <CardDescription>
                Tire uma foto do seu prato e descubra automaticamente as calorias e macronutrientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-12 h-12 text-emerald-600" />
                </div>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFoodRecognition(file);
                  }}
                  className="hidden"
                  id="food-photo"
                  disabled={isRecognizing}
                />
                
                <label
                  htmlFor="food-photo"
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg cursor-pointer hover:from-emerald-600 hover:to-emerald-700 transition-colors ${isRecognizing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isRecognizing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Analisando...
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4" />
                      Tirar Foto do Alimento
                    </>
                  )}
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Histórico de Reconhecimentos */}
          {recognizedFoods.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Alimentos Reconhecidos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recognizedFoods.map((food) => (
                  <Card key={food.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img 
                          src={food.image} 
                          alt={food.foodName}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{food.foodName}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">
                              {food.confidence}% confiança
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span>{food.calories} kcal</span>
                            <span>{food.protein}g proteína</span>
                            <span>{food.carbs}g carboidratos</span>
                            <span>{food.fats}g gorduras</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Lista de Compras */}
        <TabsContent value="shopping-list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-600" />
                Lista de Compras Semanal
              </CardTitle>
              <CardDescription>
                Lista gerada automaticamente baseada no seu cardápio da semana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {shoppingList.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Exportar Lista de Compras
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Estatísticas Nutricionais */}
        <TabsContent value="nutrition-stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Média Semanal</h3>
                <p className="text-2xl font-bold text-orange-600">1,627</p>
                <p className="text-sm text-gray-600">kcal/dia</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Beef className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Proteína Média</h3>
                <p className="text-2xl font-bold text-red-600">100g</p>
                <p className="text-sm text-gray-600">por dia</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Meta Atingida</h3>
                <p className="text-2xl font-bold text-green-600">85%</p>
                <p className="text-sm text-gray-600">dos dias</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Qualidade</h3>
                <p className="text-2xl font-bold text-yellow-600">9.2</p>
                <p className="text-sm text-gray-600">score nutricional</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Progresso Semanal</CardTitle>
              <CardDescription>Acompanhe seu desempenho nutricional ao longo da semana</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-600">Gráficos de progresso em breve...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}