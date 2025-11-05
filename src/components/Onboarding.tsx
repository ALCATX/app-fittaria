'use client';

import { useState } from 'react';
import { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, User, Target, Activity, Utensils } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const DIETARY_OPTIONS = [
  'Vegano', 'Vegetariano', 'Low Carb', 'Sem Lactose', 
  'Sem Glúten', 'Cetogênica', 'Mediterrânea', 'Flexitariano'
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    currentWeight: '',
    targetWeight: '',
    goal: '',
    activityLevel: '',
    dietaryPreferences: [] as string[]
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleDietaryChange = (option: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        dietaryPreferences: [...prev.dietaryPreferences, option]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        dietaryPreferences: prev.dietaryPreferences.filter(item => item !== option)
      }));
    }
  };

  const handleComplete = () => {
    const profile: UserProfile = {
      id: Date.now().toString(),
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender as 'male' | 'female' | 'other',
      height: parseInt(formData.height),
      currentWeight: parseFloat(formData.currentWeight),
      targetWeight: parseFloat(formData.targetWeight),
      goal: formData.goal as 'lose_weight' | 'gain_muscle' | 'maintain',
      activityLevel: formData.activityLevel as 'sedentary' | 'light' | 'moderate' | 'intense',
      dietaryPreferences: formData.dietaryPreferences,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    onComplete(profile);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.age && formData.gender;
      case 2:
        return formData.height && formData.currentWeight && formData.targetWeight;
      case 3:
        return formData.goal && formData.activityLevel;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              FitConnect IA
            </h1>
          </div>
          <CardTitle className="text-xl">Vamos personalizar sua jornada fitness!</CardTitle>
          <CardDescription>
            Etapa {step} de 4 - {step === 1 && "Informações básicas"}
            {step === 2 && "Medidas corporais"}
            {step === 3 && "Objetivos e atividade"}
            {step === 4 && "Preferências alimentares"}
          </CardDescription>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Etapa 1: Informações Básicas */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-semibold">Conte-nos sobre você</h3>
              </div>
              
              <div>
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Ex: 25"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Sexo</Label>
                  <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Etapa 2: Medidas Corporais */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-semibold">Suas medidas</h3>
              </div>

              <div>
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Ex: 175"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentWeight">Peso atual (kg)</Label>
                  <Input
                    id="currentWeight"
                    type="number"
                    step="0.1"
                    placeholder="Ex: 70.5"
                    value={formData.currentWeight}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentWeight: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="targetWeight">Peso desejado (kg)</Label>
                  <Input
                    id="targetWeight"
                    type="number"
                    step="0.1"
                    placeholder="Ex: 65.0"
                    value={formData.targetWeight}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetWeight: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Etapa 3: Objetivos e Atividade */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-semibold">Seu objetivo</h3>
              </div>

              <div>
                <Label>Qual é seu principal objetivo?</Label>
                <Select value={formData.goal} onValueChange={(value) => setFormData(prev => ({ ...prev, goal: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose_weight">Emagrecer</SelectItem>
                    <SelectItem value="gain_muscle">Ganhar massa muscular</SelectItem>
                    <SelectItem value="maintain">Manter a forma</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Nível de atividade física atual</Label>
                <Select value={formData.activityLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, activityLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentário (pouco ou nenhum exercício)</SelectItem>
                    <SelectItem value="light">Leve (exercício 1-3x por semana)</SelectItem>
                    <SelectItem value="moderate">Moderado (exercício 3-5x por semana)</SelectItem>
                    <SelectItem value="intense">Intenso (exercício 6-7x por semana)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Etapa 4: Preferências Alimentares */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-semibold">Preferências alimentares</h3>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Selecione suas preferências ou restrições alimentares (opcional):
              </p>

              <div className="grid grid-cols-2 gap-3">
                {DIETARY_OPTIONS.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={formData.dietaryPreferences.includes(option)}
                      onCheckedChange={(checked) => handleDietaryChange(option, checked as boolean)}
                    />
                    <Label htmlFor={option} className="text-sm">{option}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botões de Navegação */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Voltar
            </Button>

            {step < 4 ? (
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
              >
                Próximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
              >
                Começar jornada!
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}