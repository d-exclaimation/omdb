import { useState, type FC } from "react";
import { useToggle } from "../hooks/useToggle";

type ImageProps = {
  className?: string;
  src: string;
  fallback?: string;
  alt?: string;
};

const Img: FC<ImageProps> = ({ src, fallback, alt, className }) => {
  const [href, setHref] = useState(src);
  const [loading, { close }] = useToggle(true);
  return (
    <img
      className={`data-[loading='true']:bg-zinc-200 data-[loading='true']:animate-pulse
      ${className ?? ""}`}
      src={href}
      loading="lazy"
      data-loading={loading}
      onLoad={close}
      onError={() => {
        setHref(`https://avatar.vercel.sh/${fallback}`);
      }}
      alt={alt}
    />
  );
};

export default Img;
