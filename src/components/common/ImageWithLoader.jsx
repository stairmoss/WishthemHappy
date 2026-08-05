import React, { useEffect, useState } from 'react';

export function ImageWithLoader({
  src,
  alt = '',
  className = '',
  style = {},
  fallbackSrc = '/assets/birthday_cake.png',
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {/* CSS Flash Shimmer Loader overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 img-flash-loader z-10 rounded-inherit" />
      )}

      {/* Actual Image */}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        {...props}
      />
    </div>
  );
}
