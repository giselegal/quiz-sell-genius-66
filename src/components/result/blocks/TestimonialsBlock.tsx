
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { BlockData } from '@/types/resultPageConfig';

interface TestimonialsBlockProps {
  block: BlockData;
  isEditMode?: boolean;
  onClick?: () => void;
}

const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({ 
  block, 
  isEditMode = false,
  onClick 
}) => {
  const content = block.content;
  
  const testimonials = content.testimonials || [
    {
      name: "Ana Carolina",
      text: "Finalmente entendi qual é o meu estilo! Agora me visto com muito mais confiança e recebo elogios constantemente.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Mariana Santos",
      text: "O guia me ajudou a economizar muito dinheiro. Agora só compro peças que realmente combinam comigo!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Fernanda Lima",
      text: "Transformou completamente minha relação com a moda. Me sinto mais eu mesma do que nunca!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`py-16 px-6 bg-[#f8f9fa] ${isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-[#B89B7A]' : ''}`}
      onClick={onClick}
      style={block.style}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-[#432818] mb-4">
            {content.title || 'O que nossas clientes estão dizendo'}
          </h2>
          <p className="text-xl text-[#8F7A6A] max-w-2xl mx-auto">
            {content.description || 'Mais de 10.000 mulheres já descobriram seu estilo pessoal'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#B89B7A]/10 h-full transition-all duration-300 group-hover:shadow-lg relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-[#B89B7A]/20" />
                
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-[#432818]">{testimonial.name}</h4>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-[#432818] leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsBlock;
