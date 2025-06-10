import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card"; // Example usage of shadcn Card
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  id: string | number;
  content: React.ReactNode; // Can be JSX for complex slides
  altText?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplayOptions?: Parameters<typeof Autoplay>[0];
  showArrows?: boolean;
  showDots?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  autoplayOptions = { delay: 4000, stopOnInteraction: false },
  showArrows = true,
  showDots = true,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const scrollTo = React.useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect); // Handle reinitialization
    onSelect(); // Set initial selected dot
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  console.log("Rendering Carousel with slides:", slides.length);

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No slides to display.</div>;
  }

  return (
    <div className="relative embla w-full mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div className="embla__slide flex-[0_0_100%] min-w-0 relative" key={slide.id}>
              <Card className="m-1 h-full"> {/* Adjust margin/padding as needed */}
                <CardContent className="flex aspect-[16/7] items-center justify-center p-2 md:p-6 h-full">
                  {/* Assuming slide.content is designed to fill */}
                  {slide.content}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {showArrows && emblaApi && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full"
            onClick={scrollPrev}
            disabled={!emblaApi?.canScrollPrev()}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full"
            onClick={scrollNext}
            disabled={!emblaApi?.canScrollNext()}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {showDots && emblaApi && scrollSnaps.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {scrollSnaps.map((_, index) => (
            <Button
              key={index}
              variant={index === selectedIndex ? 'default' : 'outline'}
              size="icon"
              className={`h-2 w-2 rounded-full p-0 ${index === selectedIndex ? 'bg-primary' : 'bg-muted'}`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;