"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface ComponentProps {
  props: Record<string, any>;
  isSelected?: boolean;
  onSelect?: () => void;
}
// Componente de Vídeo
export const VideoComponent: React.FC<ComponentProps> = ({ props, isSelected, onSelect }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(props.muted || false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const toggleMute = () => {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
  return (
    <div 
      className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
      style={{ marginBottom: props.marginBottom }}
    >
      <video
        ref={videoRef}
        src={props.src}
        poster={props.poster}
        width={props.width}
        height={props.height}
        autoPlay={props.autoplay}
        controls={props.controls}
        muted={props.muted}
        loop={props.loop}
        className="rounded-lg"
        style={{ borderRadius: props.borderRadius }}
      />
      
      {/* Controles customizados se necessário */}
      {!props.controls && (
        <div className="absolute bottom-4 left-4 flex gap-2">
          <button
            onClick={togglePlay}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
            onClick={toggleMute}
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </div>
      )}
    </div>
  );
};
// Componente de Áudio
export const AudioComponent: React.FC<ComponentProps> = ({ props, isSelected, onSelect }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
  }, []);
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.play();
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      className={`p-4 rounded-lg ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ 
        backgroundColor: props.backgroundColor,
        marginBottom: props.marginBottom 
      }}
      <audio ref={audioRef} src={props.src} />
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="p-3 rounded-full"
          style={{ backgroundColor: props.accentColor, color: 'white' }}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{props.title}</h4>
          <p className="text-xs text-gray-600">{props.description}</p>
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-1">
              <div 
                className="h-1 rounded-full"
                style={{ 
                  backgroundColor: props.accentColor,
                  width: `${duration ? (currentTime / duration) * 100 : 0}%` 
                }}
              />
            </div>
            <span className="text-xs">{formatTime(duration)}</span>
          </div>
      </div>
// Componente de Carrossel
export const ImageCarouselComponent: React.FC<ComponentProps> = ({ props, isSelected, onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(props.autoplay);
    if (isAutoPlaying && props.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % props.images.length);
      }, props.autoplaySpeed);
      return () => clearInterval(interval);
  }, [isAutoPlaying, props.images.length, props.autoplaySpeed]);
  const goToPrevious = () => {
    setCurrentIndex((prev) => prev === 0 ? props.images.length - 1 : prev - 1);
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % props.images.length);
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(props.autoplay)}
      <div 
        className="relative overflow-hidden"
        style={{ 
          height: props.height,
          borderRadius: props.borderRadius 
        }}
      >
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          {props.images.map((image: any, index: number) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              {image.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                  <h3 className="font-semibold">{image.title}</h3>
                </div>
              )}
          ))}
        {/* Arrows */}
        {props.showArrows && props.images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              <ChevronRight className="w-5 h-5" />
          </>
        )}
        {/* Dots */}
        {props.showDots && props.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {props.images.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
            ))}
// Componente de Countdown
export const CountdownComponent: React.FC<ComponentProps> = ({ props, isSelected, onSelect }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
    const targetTime = new Date(props.targetDate).getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [props.targetDate]);
      className={`p-6 rounded-lg text-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        color: props.textColor,
        marginBottom: props.marginBottom,
        borderRadius: props.borderRadius 
      {props.title && (
        <h3 className="text-lg font-semibold mb-4">{props.title}</h3>
      <div className="flex justify-center gap-4">
        {props.showDays && (
          <div className="text-center">
            <div 
              className="text-3xl font-bold"
              style={{ fontSize: props.fontSize, color: props.accentColor }}
              {timeLeft.days.toString().padStart(2, '0')}
            <div className="text-sm opacity-75">Dias</div>
        {props.showHours && (
              {timeLeft.hours.toString().padStart(2, '0')}
            <div className="text-sm opacity-75">Horas</div>
        {props.showMinutes && (
              {timeLeft.minutes.toString().padStart(2, '0')}
            <div className="text-sm opacity-75">Min</div>
        {props.showSeconds && (
              {timeLeft.seconds.toString().padStart(2, '0')}
            <div className="text-sm opacity-75">Seg</div>
// Componente de Barra de Progresso
export const ProgressBarComponent: React.FC<ComponentProps> = ({ props, isSelected, onSelect }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
    if (props.animated) {
      const timer = setTimeout(() => {
        setAnimatedProgress(props.percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedProgress(props.percentage);
  }, [props.percentage, props.animated]);
      className={`${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      {props.label && (
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">{props.label}</span>
          {props.showPercentage && (
            <span className="text-sm font-semibold">{props.percentage}%</span>
          )}
        className="w-full overflow-hidden"
          backgroundColor: props.backgroundColor,
          className="h-full transition-all ease-out"
          style={{ 
            backgroundColor: props.fillColor,
            width: `${animatedProgress}%`,
            transitionDuration: props.animated ? `${props.animationDuration}ms` : '0ms'
          }}
        />
// Componente de Caixa de Preço
export const PriceBoxComponent: React.FC<ComponentProps> = ({ props, isSelected, onSelect }) => {
  const discount = props.showDiscount ? Math.round(((props.originalPrice - props.currentPrice) / props.originalPrice) * 100) : 0;
  const savings = props.originalPrice - props.currentPrice;
      className={`p-6 border-2 rounded-lg text-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        borderColor: props.borderColor,
        borderRadius: props.borderRadius,
        padding: props.padding
      {props.showDiscount && (
          className="inline-block px-3 py-1 rounded-full text-white font-bold text-sm mb-3"
          style={{ backgroundColor: props.accentColor }}
          {discount}% OFF
      <div className="space-y-2">
        <div className="flex justify-center items-center gap-2">
          <span className="text-gray-500 line-through text-lg">
            {props.currency} {props.originalPrice}
          </span>
        <div className="text-4xl font-bold" style={{ color: props.accentColor }}>
          {props.currency} {props.currentPrice}
        {props.highlightSavings && (
          <div className="text-green-600 font-semibold">
            Economia de {props.currency} {savings}
// Componente de Ancoragem de Valor
export const ValueAnchorComponent: React.FC<ComponentProps> = ({ props, isSelected, onSelect }) => {
  const totalSavings = props.totalValue - props.yourPrice;
      className={`p-6 border rounded-lg ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      <h3 className="text-xl font-bold mb-4 text-center">{props.title}</h3>
      <div className="space-y-3">
        {props.items.map((item: any, index: number) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
            <span className="font-medium">{item.name}</span>
            <span className="font-bold" style={{ color: props.accentColor }}>
              R$ {item.value}
            </span>
        ))}
        <div className="border-t-2 pt-3 mt-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Valor Total:</span>
            <span style={{ color: props.accentColor }}>R$ {props.totalValue}</span>
          <div className="flex justify-between items-center text-2xl font-bold mt-2">
            <span>Seu Investimento:</span>
            <span className="text-green-600">R$ {props.yourPrice}</span>
          {props.highlightSavings && (
            <div className="text-center mt-3 p-3 bg-green-50 rounded-lg">
              <span className="text-green-800 font-bold text-lg">
                Você economiza R$ {totalSavings}!
              </span>
// Componente Antes e Depois
export const BeforeAfterComponent: React.FC<ComponentProps> = ({ props, isSelected, onSelect }) => {
      className={`p-6 rounded-lg ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      <h3 className="text-2xl font-bold text-center mb-6">{props.title}</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {/* ANTES */}
        <div className="text-center">
          <div 
            className="inline-block px-4 py-2 rounded-lg text-white font-bold mb-4"
            style={{ backgroundColor: props.beforeColor }}
            {props.beforeTitle}
          <ul className="space-y-3">
            {props.beforeItems.map((item: string, index: number) => (
              <li key={index} className="flex items-center gap-3">
                <span 
                  className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: props.beforeColor }}
                >
                  ✗
                </span>
                <span className="text-gray-600">{item}</span>
              </li>
          </ul>
        {/* Arrow */}
        {props.showArrow && (
          <div className="hidden md:flex items-center justify-center">
            <div className="text-4xl font-bold text-gray-400">→</div>
        {/* DEPOIS */}
            style={{ backgroundColor: props.afterColor }}
            {props.afterTitle}
            {props.afterItems.map((item: string, index: number) => (
                  style={{ backgroundColor: props.afterColor }}
                  ✓
                <span className="font-medium">{item}</span>
// Componente de Gráfico de Barras
export const BarChartComponent: React.FC<ComponentProps> = ({ props, isSelected, onSelect }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
        setAnimationProgress(100);
      }, 200);
      setAnimationProgress(100);
  }, [props.animated]);
      <h3 className="text-xl font-bold text-center mb-6">{props.title}</h3>
      <div className="space-y-4">
        {props.data.map((item: any, index: number) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{item.label}</span>
              {props.showValues && (
                <span className="font-bold">{item.value}%</span>
            
              className="h-8 rounded-full overflow-hidden"
              style={{ backgroundColor: props.gridColor }}
                className="h-full transition-all duration-1000 ease-out rounded-full"
                  backgroundColor: item.color,
                  width: `${(item.value / props.maxValue) * animationProgress}%` 
// Componente de Lista de Benefícios
export const BenefitsListComponent: React.FC<ComponentProps> = ({ props, isSelected, onSelect }) => {
        padding: props.padding,
      <h3 className="text-xl font-bold mb-4">{props.title}</h3>
      <ul className="space-y-3">
        {props.benefits.map((benefit: string, index: number) => (
          <li key={index} className="flex items-center gap-3">
            <CheckCircle 
              className="w-5 h-5 flex-shrink-0" 
              style={{ color: props.checkColor }}
            />
            <span className="font-medium">{benefit}</span>
          </li>
      </ul>
// Componente de Contador de Escassez
export const ScarcityCounterComponent: React.FC<ComponentProps> = ({ props, isSelected, onSelect }) => {
  const [currentSpots, setCurrentSpots] = useState(props.remainingSpots);
  
    if (props.type === 'spots' && props.updateInterval) {
        setCurrentSpots((prev: number) => Math.max(1, prev - Math.floor(Math.random() * 2)));
      }, props.updateInterval);
  }, [props.type, props.updateInterval]);
  const percentage = (currentSpots / props.totalSpots) * 100;
        <h3 className="text-lg font-bold" style={{ color: props.textColor }}>
          {props.title}
        </h3>
          {currentSpots} {props.type === 'spots' ? 'vagas' : 'horas'}
        {props.showProgress && (
          <div className="w-full bg-gray-200 rounded-full h-3">
              className="h-3 rounded-full transition-all duration-300"
              style={{ 
                backgroundColor: props.accentColor,
                width: `${percentage}%` 
              }}
        <p className="text-sm" style={{ color: props.textColor }}>
          {props.type === 'spots' ? 'Restam poucas vagas disponíveis!' : 'Tempo limitado!'}
        </p>
// Exportar todos os componentes
export const ComponentRenderers = {
  video: VideoComponent,
  audio: AudioComponent,
  'image-carousel': ImageCarouselComponent,
  countdown: CountdownComponent,
  'progress-bar': ProgressBarComponent,
  'price-box': PriceBoxComponent,
  'value-anchor': ValueAnchorComponent,
  'before-after': BeforeAfterComponent,
  'bar-chart': BarChartComponent,
  'benefits-list': BenefitsListComponent,
  'scarcity-counter': ScarcityCounterComponent,
