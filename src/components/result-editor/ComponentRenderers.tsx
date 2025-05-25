import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

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
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

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
          <button
            onClick={toggleMute}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
};

// Componente de Áudio
export const AudioComponent: React.FC<ComponentProps> = ({ props, isSelected, onSelect }) => {
  const [isPlaying, setIsPlaying] = useState(false);
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
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={`p-4 rounded-lg ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
      style={{ 
        backgroundColor: props.backgroundColor,
        marginBottom: props.marginBottom 
      }}
    >
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
      </div>
    </div>
  );
};

// Componente de Carrossel
export const ImageCarouselComponent: React.FC<ComponentProps> = ({ props, isSelected, onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(props.autoplay);

  useEffect(() => {
    if (isAutoPlaying && props.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % props.images.length);
      }, props.autoplaySpeed);

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, props.images.length, props.autoplaySpeed]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => prev === 0 ? props.images.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % props.images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
      style={{ marginBottom: props.marginBottom }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(props.autoplay)}
    >
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
        >
          {props.images.map((image: any, index: number) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {image.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                  <h3 className="font-semibold">{image.title}</h3>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Arrows */}
        {props.showArrows && props.images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Countdown
export const CountdownComponent: React.FC<ComponentProps> = ({ props, isSelected, onSelect }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
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
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [props.targetDate]);

  return (
    <div 
      className={`p-6 rounded-lg text-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
      style={{ 
        backgroundColor: props.backgroundColor,
        color: props.textColor,
        marginBottom: props.marginBottom,
        borderRadius: props.borderRadius 
      }}
    >
      {props.title && (
        <h3 className="text-lg font-semibold mb-4">{props.title}</h3>
      )}
      
      <div className="flex justify-center gap-4">
        {props.showDays && (
          <div className="text-center">
            <div 
              className="text-3xl font-bold"
              style={{ fontSize: props.fontSize, color: props.accentColor }}
            >
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-sm opacity-75">Dias</div>
          </div>
        )}
        
        {props.showHours && (
          <div className="text-center">
            <div 
              className="text-3xl font-bold"
              style={{ fontSize: props.fontSize, color: props.accentColor }}
            >
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-sm opacity-75">Horas</div>
          </div>
        )}
        
        {props.showMinutes && (
          <div className="text-center">
            <div 
              className="text-3xl font-bold"
              style={{ fontSize: props.fontSize, color: props.accentColor }}
            >
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-sm opacity-75">Min</div>
          </div>
        )}
        
        {props.showSeconds && (
          <div className="text-center">
            <div 
              className="text-3xl font-bold"
              style={{ fontSize: props.fontSize, color: props.accentColor }}
            >
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-sm opacity-75">Seg</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Barra de Progresso
export const ProgressBarComponent: React.FC<ComponentProps> = ({ props, isSelected, onSelect }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (props.animated) {
      const timer = setTimeout(() => {
        setAnimatedProgress(props.percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedProgress(props.percentage);
    }
  }, [props.percentage, props.animated]);

  return (
    <div 
      className={`${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
      style={{ marginBottom: props.marginBottom }}
    >
      {props.label && (
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">{props.label}</span>
          {props.showPercentage && (
            <span className="text-sm font-semibold">{props.percentage}%</span>
          )}
        </div>
      )}
      
      <div 
        className="w-full overflow-hidden"
        style={{ 
          backgroundColor: props.backgroundColor,
          height: props.height,
          borderRadius: props.borderRadius 
        }}
      >
        <div 
          className="h-full transition-all ease-out"
          style={{ 
            backgroundColor: props.fillColor,
            width: `${animatedProgress}%`,
            transitionDuration: props.animated ? `${props.animationDuration}ms` : '0ms'
          }}
        />
      </div>
    </div>
  );
};

// Exportar todos os componentes
export const ComponentRenderers = {
  video: VideoComponent,
  audio: AudioComponent,
  'image-carousel': ImageCarouselComponent,
  countdown: CountdownComponent,
  'progress-bar': ProgressBarComponent
};
