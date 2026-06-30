import React from 'react';

const Image = ({ src, alt, className = '', ...props }) => {
  return (
    <img
      src={src}
      alt={alt || 'Image'}
      loading="lazy"
      decoding="async"
      className={className}
      {...props}
    />
  );
};

export default Image;
