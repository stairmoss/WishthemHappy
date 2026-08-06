import React, { useRef, useEffect } from 'react';
import { annotate } from 'rough-notation';

export function RoughNotationText({
  children,
  type = 'highlight', // 'highlight', 'underline', 'box', 'circle', 'bracket'
  color = '#f43f5e',
  show = true,
  strokeWidth = 2,
  padding = 4,
  multiline = true,
  iterations = 2,
  animationDuration = 800,
  className = ''
}) {
  const elementRef = useRef(null);
  const annotationRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Clean up previous annotation if any
    if (annotationRef.current) {
      try {
        annotationRef.current.remove();
      } catch (e) {
        // ignore
      }
    }

    const config = {
      type,
      color,
      strokeWidth,
      padding,
      multiline,
      iterations,
      animationDuration
    };

    if (type === 'highlight') {
      config.color = color || '#fbcfe8'; // soft pink default highlight
    }

    const annotation = annotate(elementRef.current, config);
    annotationRef.current = annotation;

    if (show) {
      annotation.show();
    }

    return () => {
      if (annotationRef.current) {
        try {
          annotationRef.current.remove();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [type, color, show, strokeWidth, padding, multiline, children]);

  return (
    <span ref={elementRef} className={`inline-block relative ${className}`}>
      {children}
    </span>
  );
}
