import React from 'react';

type PropType = {
  scrollSnaps: number[];
  selectedIndex: number;
  scrollTo: (index: number) => void;
};

export const SliderDots = ({ scrollSnaps, selectedIndex, scrollTo }: PropType) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={() => scrollTo(index)}
          className={`h-2 w-2 rounded-full transition-all duration-300 ${
            index === selectedIndex ? 'w-4 bg-white' : 'bg-white/50'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};