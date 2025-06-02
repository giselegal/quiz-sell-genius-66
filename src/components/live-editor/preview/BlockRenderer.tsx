import React from 'react';
import { Block } from '@/types/editor';
import { cn } from '@/lib/utils';
import { 
  Image, Star, Shield, Zap, Target, Quote, Users, BarChart3, 
  MessageSquare, CheckCircle, Sparkles, TrendingUp, Phone, Mail, 
  Clock, Video, Play, Pause, ChevronDown, ChevronUp, CheckSquare,
  Grid, Minus
} from 'lucide-react';

interface BlockRendererProps {
  block: Block;
  isSelected?: boolean;
  onClick?: () => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isSelected = false,
  onClick
}) => {
  const renderBlockContent = () => {
    switch (block.type) {
      case 'headline':
        return (
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-[#432818]">
              {block.content?.title || 'Título Principal'}
            </h1>
            <p className="text-lg text-[#8F7A6A]">
              {block.content?.subtitle || 'Subtítulo explicativo'}
            </p>
          </div>
        );

      case 'text':
        return (
          <div className="prose prose-lg max-w-none">
            <p className="text-[#432818] leading-relaxed">
              {block.content?.text || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
            </p>
          </div>
        );

      case 'image':
        return (
          <div className="text-center">
            {block.content?.imageUrl ? (
              <img 
                src={block.content.imageUrl} 
                alt={block.content.alt || 'Imagem'} 
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-[#FAF9F7] border-2 border-dashed border-[#B89B7A]/40 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Image className="h-12 w-12 mx-auto mb-2 text-[#B89B7A]/50" />
                  <p className="text-[#8F7A6A]">Clique para adicionar uma imagem</p>
                </div>
              </div>
            )}
            {block.content?.caption && (
              <p className="text-sm text-[#8F7A6A] mt-2">{block.content.caption}</p>
            )}
          </div>
        );

      case 'benefits':
        const benefits = block.content?.benefits || [
          'Benefício 1: Resultado garantido',
          'Benefício 2: Suporte especializado',
          'Benefício 3: Acesso vitalício'
        ];
        return (
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-[#432818] mb-4">
              {block.content?.title || 'Principais Benefícios'}
            </h3>
            {benefits.map((benefit: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <Star className="h-5 w-5 text-[#D4B996] mt-0.5 flex-shrink-0" />
                <p className="text-[#432818]">{benefit}</p>
              </div>
            ))}
          </div>
        );

      case 'pricing':
        return (
          <div className="text-center bg-[#FAF9F7] p-6 rounded-lg border border-[#B89B7A]/20">
            <h3 className="text-2xl font-bold text-[#432818] mb-2">
              {block.content?.title || 'Oferta Especial'}
            </h3>
            <div className="text-4xl font-bold text-[#D4B996] mb-2">
              {block.content?.price || 'R$ 297'}
            </div>
            {block.content?.originalPrice && (
              <div className="text-lg text-[#8F7A6A] line-through mb-4">
                {block.content.originalPrice}
              </div>
            )}
            <p className="text-[#8F7A6A] mb-4">
              {block.content?.description || 'Acesso completo ao produto'}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-[#D4B996]">
              <Target className="h-4 w-4" />
              <span>{block.content?.highlight || 'Melhor oferta'}</span>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="text-center">
            <button className="bg-[#D4B996] hover:bg-[#B89B7A] text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors w-full max-w-md">
              {block.content?.buttonText || 'Comprar Agora'}
            </button>
            {block.content?.subtext && (
              <p className="text-sm text-[#8F7A6A] mt-2">{block.content.subtext}</p>
            )}
          </div>
        );

      case 'guarantee':
        return (
          <div className="bg-[#FAF9F7] p-6 rounded-lg border border-[#B89B7A]/20 text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-[#D4B996]" />
            <h3 className="text-xl font-semibold text-[#432818] mb-2">
              {block.content?.title || 'Garantia de Satisfação'}
            </h3>
            <p className="text-[#8F7A6A]">
              {block.content?.description || 'Garantia incondicional de 30 dias. Não gostou? Devolvemos seu dinheiro.'}
            </p>
            {block.content?.period && (
              <div className="mt-3 text-[#D4B996] font-semibold">
                {block.content.period} dias de garantia
              </div>
            )}
          </div>
        );

      case 'style-result':
        return (
          <div className="bg-gradient-to-r from-[#FAF9F7] to-[#F5F1EB] p-6 rounded-lg border border-[#B89B7A]/20 text-center">
            <h3 className="text-xl font-semibold text-[#432818] mb-4">
              Seu Resultado Personalizado
            </h3>
            <div className="bg-white p-4 rounded-lg border border-[#D4B996]/30">
              <div className="text-2xl font-bold text-[#D4B996] mb-2">
                {block.content?.category || 'Seu Estilo'}
              </div>
              <div className="text-[#8F7A6A]">
                Compatibilidade: {block.content?.percentage || 85}%
              </div>
            </div>
          </div>
        );

      case 'testimonial':
        return (
          <div className="bg-white p-6 rounded-lg border border-[#B89B7A]/20 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#D4B996] rounded-full flex items-center justify-center">
                  <Quote className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <blockquote className="text-[#432818] italic mb-3">
                  "{block.content?.text || 'Este produto mudou completamente minha vida. Recomendo para todos!'}"
                </blockquote>
                <div className="flex items-center gap-3">
                  {block.content?.avatar ? (
                    <img 
                      src={block.content.avatar} 
                      alt={block.content.name || 'Cliente'} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-[#B89B7A] rounded-full"></div>
                  )}
                  <div>
                    <div className="font-semibold text-[#432818]">
                      {block.content?.name || 'Maria Silva'}
                    </div>
                    <div className="text-sm text-[#8F7A6A]">
                      {block.content?.title || 'Cliente Satisfeita'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="text-center">
            <div className="relative bg-black rounded-lg overflow-hidden max-w-2xl mx-auto">
              {block.content?.thumbnail ? (
                <img 
                  src={block.content.thumbnail} 
                  alt="Video thumbnail" 
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-[#432818] to-[#B89B7A] flex items-center justify-center">
                  <Video className="h-16 w-16 text-white opacity-70" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-[#D4B996] hover:bg-[#B89B7A] text-white p-4 rounded-full transition-colors shadow-lg">
                  <Play className="h-8 w-8 ml-1" />
                </button>
              </div>
            </div>
            {block.content?.title && (
              <h3 className="text-lg font-semibold text-[#432818] mt-4">
                {block.content.title}
              </h3>
            )}
            {block.content?.description && (
              <p className="text-[#8F7A6A] mt-2">
                {block.content.description}
              </p>
            )}
          </div>
        );

      case 'faq':
        const faqs = block.content?.faqs || [
          { question: 'Como funciona a garantia?', answer: 'Oferecemos 30 dias de garantia incondicional.' },
          { question: 'Posso cancelar a qualquer momento?', answer: 'Sim, você pode cancelar quando quiser.' },
          { question: 'O suporte é incluído?', answer: 'Sim, suporte completo está incluído no produto.' }
        ];
        return (
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-[#432818] mb-4">
              {block.content?.title || 'Perguntas Frequentes'}
            </h3>
            {faqs.map((faq: any, index: number) => (
              <div key={index} className="border border-[#B89B7A]/20 rounded-lg overflow-hidden">
                <button className="w-full p-4 text-left flex items-center justify-between hover:bg-[#FAF9F7] transition-colors">
                  <span className="font-medium text-[#432818]">{faq.question}</span>
                  <ChevronDown className="h-5 w-5 text-[#8F7A6A]" />
                </button>
                <div className="p-4 bg-[#FAF9F7] border-t border-[#B89B7A]/20">
                  <p className="text-[#8F7A6A]">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'countdown':
        // Mock countdown values
        const timeLeft = {
          days: block.content?.days || 2,
          hours: block.content?.hours || 14,
          minutes: block.content?.minutes || 32,
          seconds: block.content?.seconds || 45
        };
        
        return (
          <div className="bg-gradient-to-r from-[#D4B996] to-[#B89B7A] p-6 rounded-lg text-center text-white">
            <h3 className="text-xl font-bold mb-4">
              {block.content?.title || 'Oferta por tempo limitado!'}
            </h3>
            <div className="flex justify-center gap-4 mb-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-white bg-opacity-20 rounded-lg p-3 min-w-[60px]">
                  <div className="text-2xl font-bold">{value}</div>
                  <div className="text-sm opacity-90 capitalize">{unit}</div>
                </div>
              ))}
            </div>
            <p className="opacity-90">
              {block.content?.description || 'Aproveite antes que acabe!'}
            </p>
          </div>
        );

      case 'stats':
        const stats = block.content?.stats || [
          { number: '10K+', label: 'Clientes Satisfeitos' },
          { number: '95%', label: 'Taxa de Sucesso' },
          { number: '24/7', label: 'Suporte Disponível' }
        ];
        
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat: any, index: number) => (
              <div key={index} className="text-center p-4 bg-[#FAF9F7] rounded-lg border border-[#B89B7A]/20">
                <div className="text-3xl font-bold text-[#D4B996] mb-2">
                  {stat.number}
                </div>
                <div className="text-[#8F7A6A] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className="bg-[#FAF9F7] p-6 rounded-lg border border-[#B89B7A]/20">
            <h3 className="text-xl font-semibold text-[#432818] mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              {block.content?.title || 'Entre em Contato'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#B89B7A]" />
                <span className="text-[#432818]">
                  {block.content?.phone || '(11) 99999-9999'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#B89B7A]" />
                <span className="text-[#432818]">
                  {block.content?.email || 'contato@exemplo.com'}
                </span>
              </div>
              {block.content?.address && (
                <div className="flex items-start gap-3">
                  <div className="h-4 w-4 text-[#B89B7A] mt-0.5">📍</div>
                  <span className="text-[#432818]">{block.content.address}</span>
                </div>
              )}
            </div>
          </div>
        );

      case 'divider':
        return (
          <div className="flex items-center justify-center py-4">
            <div className={cn(
              "border-t-2",
              block.content?.style === 'dotted' ? 'border-dotted' : 
              block.content?.style === 'dashed' ? 'border-dashed' : 'border-solid',
              "w-full max-w-md"
            )} 
            style={{ 
              borderColor: block.content?.color || '#B89B7A',
              borderWidth: block.content?.thickness || '2px'
            }} />
          </div>
        );

      case 'spacer':
        return (
          <div 
            className="w-full bg-transparent"
            style={{ 
              height: block.content?.height || '40px' 
            }}
          >
            <div className="flex items-center justify-center h-full text-[#B89B7A] opacity-50">
              <Minus className="h-4 w-4" />
            </div>
          </div>
        );

      case 'social-proof':
        return (
          <div className="text-center bg-[#FAF9F7] p-6 rounded-lg border border-[#B89B7A]/20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="h-6 w-6 text-[#D4B996]" />
              <h3 className="text-xl font-semibold text-[#432818]">
                {block.content?.title || 'Junte-se a milhares de clientes'}
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(block.content?.metrics || [
                { value: '15,847', label: 'Clientes' },
                { value: '4.9/5', label: 'Avaliação' },
                { value: '99%', label: 'Satisfação' },
                { value: '24h', label: 'Suporte' }
              ]).map((metric: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-[#D4B996]">
                    {metric.value}
                  </div>
                  <div className="text-sm text-[#8F7A6A]">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'newsletter':
        return (
          <div className="bg-gradient-to-r from-[#D4B996] to-[#B89B7A] p-6 rounded-lg text-center text-white">
            <h3 className="text-xl font-bold mb-2">
              {block.content?.title || 'Receba nossas novidades'}
            </h3>
            <p className="mb-4 opacity-90">
              {block.content?.description || 'Cadastre-se e receba dicas exclusivas'}
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={block.content?.placeholder || 'Seu melhor e-mail'}
                className="flex-1 px-4 py-2 rounded-lg text-[#432818] border-0 focus:outline-none"
                disabled
              />
              <button className="bg-white text-[#D4B996] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {block.content?.buttonText || 'Inscrever'}
              </button>
            </div>
          </div>
        );

      case 'checklist':
        const items = block.content?.items || [
          'Item verificado 1',
          'Item verificado 2', 
          'Item verificado 3'
        ];
        
        return (
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-[#432818] mb-4">
              {block.content?.title || 'Lista de Verificação'}
            </h3>
            {items.map((item: string, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <CheckSquare className="h-5 w-5 text-[#D4B996] flex-shrink-0" />
                <span className="text-[#432818]">{item}</span>
              </div>
            ))}
          </div>
        );

      case 'comparison':
        const plans = block.content?.plans || [
          {
            name: 'Básico',
            price: 'R$ 97',
            features: ['Recurso 1', 'Recurso 2', 'Suporte email'],
            popular: false
          },
          {
            name: 'Premium',
            price: 'R$ 197',
            features: ['Tudo do Básico', 'Recurso 3', 'Recurso 4', 'Suporte prioritário'],
            popular: true
          }
        ];
        
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#432818] text-center mb-6">
              {block.content?.title || 'Compare os Planos'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plans.map((plan: any, index: number) => (
                <div 
                  key={index} 
                  className={cn(
                    "p-6 rounded-lg border-2 relative",
                    plan.popular 
                      ? "border-[#D4B996] bg-[#FAF9F7]" 
                      : "border-[#B89B7A]/20 bg-white"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#D4B996] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Mais Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-bold text-[#432818]">{plan.name}</h4>
                    <div className="text-2xl font-bold text-[#D4B996] mt-2">{plan.price}</div>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature: string, fIndex: number) => (
                      <li key={fIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#D4B996]" />
                        <span className="text-[#432818] text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'feature-grid':
        const features = block.content?.features || [
          { icon: '🚀', title: 'Recurso 1', description: 'Descrição do recurso' },
          { icon: '⚡', title: 'Recurso 2', description: 'Descrição do recurso' },
          { icon: '🎯', title: 'Recurso 3', description: 'Descrição do recurso' },
          { icon: '💡', title: 'Recurso 4', description: 'Descrição do recurso' }
        ];
        
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#432818] text-center mb-6">
              {block.content?.title || 'Principais Recursos'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature: any, index: number) => (
                <div key={index} className="text-center p-4 bg-[#FAF9F7] rounded-lg border border-[#B89B7A]/20">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="font-semibold text-[#432818] mb-2">{feature.title}</h4>
                  <p className="text-[#8F7A6A] text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-lg text-center">
            <p className="text-[#8F7A6A]">Componente {block.type}</p>
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        "cursor-pointer transition-all duration-200",
        isSelected && "ring-2 ring-[#D4B996] ring-offset-2"
      )}
      onClick={onClick}
    >
      {renderBlockContent()}
    </div>
  );
};
