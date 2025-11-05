'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, MapPin, Timer, Activity, Menu, X } from 'lucide-react';

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('pt');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Traduções simples
  const translations = {
    pt: {
      appName: 'Fittar IA',
      welcome: 'Bem-vindo ao seu Personal Trainer com IA',
      walkingTracker: 'Rastreador de Atividades',
      start: 'Iniciar',
      pause: 'Pausar',
      reset: 'Resetar',
      time: 'Tempo',
      distance: 'Distância',
      pace: 'Ritmo',
      calories: 'Calorias',
      share: 'Compartilhar',
      adminPanel: 'Painel Admin',
      challenges: 'Desafios',
      language: 'Idioma',
      menu: 'Menu',
      installApp: 'Instalar App'
    },
    en: {
      appName: 'Fittar AI',
      welcome: 'Welcome to your AI Personal Trainer',
      walkingTracker: 'Activity Tracker',
      start: 'Start',
      pause: 'Pause',
      reset: 'Reset',
      time: 'Time',
      distance: 'Distance',
      pace: 'Pace',
      calories: 'Calories',
      share: 'Share',
      adminPanel: 'Admin Panel',
      challenges: 'Challenges',
      language: 'Language',
      menu: 'Menu',
      installApp: 'Install App'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(time => time + 1);
        // Simular distância (aproximadamente 5 km/h)
        setDistance(distance => distance + 0.0014);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculatePace = () => {
    if (distance === 0) return '0:00';
    const paceInSeconds = time / distance;
    const mins = Math.floor(paceInSeconds / 60);
    const secs = Math.floor(paceInSeconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateCalories = () => {
    // Estimativa simples: ~60 calorias por km
    return Math.floor(distance * 60);
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setDistance(0);
  };

  const handleShare = () => {
    const shareText = `Acabei de completar ${distance.toFixed(2)}km em ${formatTime(time)} no ${t.appName}! 🏃‍♂️💪`;
    if (navigator.share) {
      navigator.share({
        title: t.appName,
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Progresso copiado para a área de transferência!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Activity className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.appName}
              </h1>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              <select 
                value={currentLanguage} 
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pt">🇧🇷</option>
                <option value="en">🇺🇸</option>
              </select>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
              {t.adminPanel}
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
              {t.challenges}
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md font-medium">
              {t.installApp}
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-4xl mx-auto">
        {/* Welcome Section - Mobile Optimized */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
            {t.welcome}
          </h2>
          <p className="text-sm sm:text-lg text-gray-600">Transforme seu corpo com inteligência artificial</p>
        </div>

        {/* Walking/Running Tracker - Mobile First */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 mb-6 sm:mb-8">
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
              {t.walkingTracker}
            </h3>
          </div>

          {/* Stats Display - Mobile Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                <Timer className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm text-gray-600 mb-1">{t.time}</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-600">{formatTime(time)}</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-50 rounded-lg p-3 sm:p-4">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mx-auto mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm text-gray-600 mb-1">{t.distance}</p>
                <p className="text-lg sm:text-2xl font-bold text-purple-600">{distance.toFixed(2)} km</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-50 rounded-lg p-3 sm:p-4">
                <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 mx-auto mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm text-gray-600 mb-1">{t.pace}</p>
                <p className="text-lg sm:text-2xl font-bold text-indigo-600">{calculatePace()}/km</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-50 rounded-lg p-3 sm:p-4">
                <span className="text-xl sm:text-2xl mb-1 sm:mb-2 block">🔥</span>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">{t.calories}</p>
                <p className="text-lg sm:text-2xl font-bold text-orange-600">{calculateCalories()}</p>
              </div>
            </div>
          </div>

          {/* Control Buttons - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg w-full sm:w-auto"
              >
                <Play className="w-5 h-5" />
                <span>{t.start}</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg w-full sm:w-auto"
              >
                <Pause className="w-5 h-5" />
                <span>{t.pause}</span>
              </button>
            )}
            
            <button
              onClick={handleReset}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg w-full sm:w-auto"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{t.reset}</span>
            </button>
          </div>

          {/* Share Button - Mobile Full Width */}
          {(time > 0 || distance > 0) && (
            <div className="text-center">
              <button
                onClick={handleShare}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg w-full sm:w-auto"
              >
                {t.share}
              </button>
            </div>
          )}
        </div>

        {/* Quick Access Cards - Mobile Stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                <span className="text-lg sm:text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">{t.adminPanel}</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Gerencie usuários, conteúdo e configurações do app</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 w-full sm:w-auto">
              Acessar Painel
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                <span className="text-lg sm:text-2xl">🏆</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">{t.challenges}</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Participe de desafios e conquiste recompensas</p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 w-full sm:w-auto">
              Ver Desafios
            </button>
          </div>
        </div>

        {/* Install App Banner - Mobile Only */}
        <div className="mt-6 sm:hidden bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 text-white text-center">
          <h4 className="font-bold mb-2">📱 Instale o App</h4>
          <p className="text-sm mb-3">Adicione à tela inicial para acesso rápido</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold text-sm">
            {t.installApp}
          </button>
        </div>
      </div>

      {/* Bottom Safe Area for iOS */}
      <div className="h-safe-area-inset-bottom"></div>
    </div>
  );
}