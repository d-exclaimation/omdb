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
        e.currentTarget.src = `https://avatar.vercel.sh/${fallback}`;
      }}
      alt={alt}
    />
  );
};

export default Img;
