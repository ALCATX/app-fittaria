'use client'

import { useState, useEffect } from 'react'
import { Globe, Check } from 'lucide-react'
import { Language, useTranslation, detectBrowserLanguage } from '@/lib/i18n'

interface LanguageSelectorProps {
  onLanguageChange?: (language: Language) => void
}

const languages = [
  { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it' as Language, name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
  { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
]

export default function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('pt')
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslation(currentLanguage)

  useEffect(() => {
    // Detectar idioma do navegador na primeira visita
    const savedLanguage = localStorage.getItem('fittar-language') as Language
    const detectedLanguage = savedLanguage || detectBrowserLanguage()
    setCurrentLanguage(detectedLanguage)
  }, [])

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem('fittar-language', language)
    setIsOpen(false)
    onLanguageChange?.(language)
  }

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{currentLang.flag}</span>
        <span className="hidden sm:inline text-sm">{currentLang.name}</span>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
            <div className="py-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="flex-1 text-sm font-medium text-gray-700">
                    {language.name}
                  </span>
                  {currentLanguage === language.code && (
                    <Check className="w-4 h-4 text-indigo-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}