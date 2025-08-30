import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import heroAiImage from '@/assets/hero-ai-assistant.jpg';
import hardwareRepairImage from '@/assets/hardware-repair.jpg';
import softwareDiagnosticsImage from '@/assets/software-diagnostics.jpg';
import networkSolutionsImage from '@/assets/network-solutions.jpg';
import securityProtectionImage from '@/assets/security-protection.jpg';
import performanceOptimizationImage from '@/assets/performance-optimization.jpg';

// Default slides in case database is not available
const defaultSlides = [
  {
    id: 1,
    image_url: heroAiImage,
    title: 'AI-Powered Tech Support',
    subtitle: 'Get Instant Solutions',  
    description: 'Our intelligent assistant analyzes your tech problems and provides step-by-step solutions with 98% accuracy rate',
    button_text: 'Start Chat',
    button_link: '/chat',
    icon: '🤖',
    bg_gradient: 'from-blue-600/20 to-purple-600/20'
  },
  {
    id: 2,
    image_url: hardwareRepairImage,
    title: 'Hardware Solutions',
    subtitle: 'Fix Any Hardware Issue',
    description: 'Complete guides for diagnosing and fixing computer hardware problems with real solutions',
    button_text: 'Hardware Fixes',
    button_link: '/hardware',
    icon: '🔧',
    bg_gradient: 'from-green-600/20 to-blue-600/20'
  },
  {
    id: 3,
    image_url: softwareDiagnosticsImage,
    title: 'Software Troubleshooting',
    subtitle: 'Fix System Issues',
    description: 'Resolve Windows errors, crashes, and performance problems with expert solutions',
    button_text: 'Software Fixes',
    button_link: '/software',
    icon: '💻',
    bg_gradient: 'from-purple-600/20 to-pink-600/20'
  },
  {
    id: 4,
    image_url: networkSolutionsImage,
    title: 'Network Solutions',
    subtitle: 'Stay Connected',
    description: 'Fix internet, WiFi, and connectivity issues with comprehensive network guides',
    button_text: 'Network Fixes',
    button_link: '/network',
    icon: '📡',
    bg_gradient: 'from-teal-600/20 to-cyan-600/20'
  },
  {
    id: 5,
    image_url: securityProtectionImage,
    title: 'Security Protection',
    subtitle: 'Stay Safe',
    description: 'Remove malware, secure your system, and prevent cyber attacks with expert security guides',
    button_text: 'Security Fixes',
    button_link: '/security',
    icon: '🛡️',
    bg_gradient: 'from-red-600/20 to-orange-600/20'
  }
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slides, setSlides] = useState(defaultSlides);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image_url})` }}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg_gradient}`} />
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl text-white">
                <div className="text-6xl mb-6 animate-bounce">{slide.icon}</div>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-200">
                  {slide.subtitle}
                </h2>
                <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl">
                  {slide.description}
                </p>
                <Button 
                  size="lg" 
                  className="btn-hero text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform"
                  onClick={() => window.location.href = slide.button_link}
                >
                  {slide.button_text}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 z-20">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </section>
  );
};