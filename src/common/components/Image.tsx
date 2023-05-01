import { type FC } from "react";
import { useToggle } from "../hooks/useToggle";

type ImageProps = {
  className?: string;
  src: string;
  fallback?: string;
  alt?: string;
};

const Img: FC<ImageProps> = ({ src, fallback, alt, className }) => {
  const [loading, { close }] = useToggle(true);
  return (
    <img
      className={`data-[loading='true']:bg-zinc-200 data-[loading='true']:animate-pulse
      ${className ?? ""}`}
      src={src}
      loading="lazy"
      data-loading={loading}
      onLoad={close}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = `https://avatar.vercel.sh/${fallback}`;
      }}
      alt={alt}
    />
  );
};

export default Img;
