import React from 'react';

/**
 * LetterRiseHeading
 * Splits heading text into individual rising letters for editorial GSAP/AOS style reveal
 */
function LetterRiseHeading({ text, as: Component = 'h2', className = '', id, style }) {
  if (!text) return null;

  return (
    <Component id={id} className={`letters-rise-wrapper ${className}`} style={style}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`rise-char ${char === ' ' ? 'rise-space' : ''}`}
          style={{ transitionDelay: `${index * 26}ms` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Component>
  );
}

export default LetterRiseHeading;
