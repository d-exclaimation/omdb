import { useMemo, type FC } from "react";
import { useToggle } from "../hooks/useToggle";

type ImageProps = {
  className?: string;
  src: string;
  fallback?: string;
  alt?: string;
};

const Img: FC<ImageProps> = ({ src, fallback, alt, className }) => {
  const [notFound, { open }] = useToggle(false);
  const [loading, { close }] = useToggle(true);
  const href = useMemo(
    () => (notFound ? `https://avatar.vercel.sh/${fallback}` : src),
    [src, fallback, notFound]
  );
  return (
    <img
      className={`data-[loading='true']:bg-zinc-200 data-[loading='true']:animate-pulse
      ${className ?? ""}`}
      src={href}
      loading="lazy"
      data-loading={loading}
      onLoad={close}
      onError={() => {
        open();
      }}
      alt={alt}
    />
  );
};

export default Img;
