import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: 'Carlos Silva',
    role: 'Cliente desde 2022',
    content: 'Melhor barbearia da cidade! O atendimento é impecável e o resultado sempre supera as expectativas. Recomendo muito!',
    rating: 5,
    avatar: 'CS',
  },
  {
    name: 'Roberto Mendes',
    role: 'Cliente desde 2021',
    content: 'Ambiente incrível, profissionais qualificados e um corte que dura semanas. A WowBarber realmente entende de estilo.',
    rating: 5,
    avatar: 'RM',
  },
  {
    name: 'Felipe Santos',
    role: 'Cliente desde 2023',
    content: 'O combo premium vale cada centavo. Saio de lá renovado! A atenção aos detalhes é impressionante.',
    rating: 5,
    avatar: 'FS',
  },
  {
    name: 'André Costa',
    role: 'Cliente desde 2020',
    content: 'Depois que conheci a WowBarber, nunca mais fui em outro lugar. Qualidade, conforto e profissionalismo top!',
    rating: 5,
    avatar: 'AC',
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 md:py-32 bg-carbon-light">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-4">
            O QUE DIZEM <span className="text-gold">NOSSOS CLIENTES</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A satisfação dos nossos clientes é nossa maior conquista
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote icon */}
          <Quote className="absolute -top-4 left-4 w-16 h-16 text-gold/10" />

          {/* Testimonial card */}
          <div className="relative bg-card border border-border rounded-2xl p-8 md:p-12">
            <div className="text-center">
              {/* Avatar */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
                <span className="font-display text-2xl text-gold">
                  {testimonials[current].avatar}
                </span>
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Content */}
              <p className="text-lg md:text-xl text-foreground mb-6 italic leading-relaxed">
                "{testimonials[current].content}"
              </p>

              {/* Author */}
              <p className="font-display text-xl text-gold">{testimonials[current].name}</p>
              <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="goldOutline"
              size="icon"
              onClick={prev}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrent(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current ? 'bg-gold w-6' : 'bg-border hover:bg-gold/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="goldOutline"
              size="icon"
              onClick={next}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
