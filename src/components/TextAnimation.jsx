import React, { useState, useEffect } from 'react';

const TextSlider = ({slides}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); 

    return () => clearInterval(intervalId);
  }, [currentSlide, slides.length]);

  return (
    <div>
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            fontFamily: 'sans-serif',
            textAlign: 'center',
            opacity: currentSlide === index ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        >
          <h1 style={{ color: 'white', fontWeight: 'bold', fontSize: '3rem' }}>{slide.title}</h1>
          <p className='-mt-2' style={{ color: 'white',  }}>{slide.description}</p>
          
        </div>
      ))}
    </div>
  );
};

export default TextSlider;
