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
      loading="lazy"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = `https://avatar.vercel.sh/${fallback}`;
      }}
      alt={alt}
    />
  );
};

export default Img;
