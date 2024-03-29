import { useEffect, useMemo, useState, type FC } from "react";
import { useToggle } from "../hooks/useToggle";
import { tw } from "../utils/tailwind";

type ImageProps = {
  className?: string;
  src: string;
  fallback?: string;
  alt?: string;
};

const Img: FC<ImageProps> = ({ src, fallback, alt, className }) => {
  const hrefs = useMemo(
    () => [
      src,
      `https://avatar.vercel.sh/${(fallback ?? "cookie").toLowerCase()}`,
      `https://avatar.vercel.sh/cookie`,
    ],
    [src]
  );
  const [attempt, setAttempt] = useState(0);
  const [loading, { close }] = useToggle(true);

  const href = useMemo(() => hrefs[attempt], [hrefs, attempt]);

  useEffect(() => {
    setAttempt(0);
  }, [src, setAttempt]);

  return (
    <img
      className={tw(
        "data-[loading='true']:animate-pulse data-[loading='true']:bg-zinc-200 dark:data-[loading='true']:bg-zinc-800",
        className
      )}
      src={href}
      loading="lazy"
      data-loading={loading}
      onLoad={close}
      onError={() => {
        setAttempt((prev) => prev + 1);
      }}
      alt={alt}
    />
  );
};

export default Img;
