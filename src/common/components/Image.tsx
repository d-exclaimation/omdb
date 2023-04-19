import { type FC } from "react";

type ImageProps = {
  className?: string;
  src: string;
  fallback?: string;
  alt?: string;
};

const Img: FC<ImageProps> = ({ src, fallback, alt, className }) => {
  return (
    <img
      className={className}
      src={src}
      onError={(e) => {
        e.currentTarget.src = `https://api.dicebear.com/6.x/shapes/svg?seed=${fallback}`;
      }}
      alt={alt}
    />
  );
};

export default Img;
