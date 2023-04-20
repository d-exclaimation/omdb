import { Transition } from "@headlessui/react";
import { useEffect, useRef, useState, type FC } from "react";
import Signature from "../common/components/Signature";

const SIZES = [
  { sm: "text-5xl", md: "md:text-7xl", lg: "lg:text-8xl" },
  { sm: "text-4xl", md: "md:text-6xl", lg: "lg:text-8xl" },
  { sm: "text-4xl", md: "md:text-6xl", lg: "lg:text-8xl" },
  { sm: "text-4xl", md: "md:text-6xl", lg: "lg:text-8xl" },
  { sm: "text-3xl", md: "md:text-5xl", lg: "lg:text-8xl" },
  { sm: "text-3xl", md: "md:text-5xl", lg: "lg:text-8xl" },
] satisfies Array<{
  sm: `text-${string}`;
  md: `md:text-${string}`;
  lg: `lg:text-${string}`;
}>;

const MESSAGES = [
  ["IMDb", "but", "better"],
  ["Tomatoes", "not", "rotten"],
  ["Outside", "the", "Letterboxd"],
  ["Fandango", "on", "the", "go"],
  ["Box", "office", "at", "your", "service"],
  ["Web", "movies", "made", "simple"],
];

const HomePage: FC = () => {
  const timeoutRef = useRef<number>();
  const [show, setShow] = useState(true);
  const [messageIndex, setIndex] = useState(0);

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <div
        className="max-w-3xl px-5 h-max flex-col items-center justify-center 
        pb-20 backdrop-blur-sm min-h-screen w-full flex p-4"
        onClick={() => {
          setShow(false);

          timeoutRef.current = setTimeout(() => {
            setShow(true);
            setIndex((prev) => (prev + 1) % MESSAGES.length);
          }, 750);
        }}
      >
        <Transition
          as="div"
          className="flex flex-col items-center p-4"
          appear
          show={show}
        >
          <h1
            className={`flex flex-row gap-2 md:gap-3 font-semibold
            ${SIZES[messageIndex].sm} ${SIZES[messageIndex].md}
            ${SIZES[messageIndex].lg}`}
          >
            {MESSAGES[messageIndex].map((word, index) => {
              const delay =
                index === 0
                  ? "delay-0"
                  : index === 1
                  ? "delay-100"
                  : index === 2
                  ? "delay-150"
                  : index === 3
                  ? "delay-200"
                  : index === 4
                  ? "delay-300"
                  : "delay-500";
              return (
                <Transition.Child
                  key={`home-page-title-${index}`}
                  as="span"
                  enter={`transition-all duration-500 ${delay}`}
                  enterFrom={
                    index % 2 === 0
                      ? messageIndex % 2 === 0
                        ? "opacity-0 -translate-y-20"
                        : "opacity-0 translate-y-20"
                      : messageIndex % 2 === 0
                      ? "opacity-0 translate-y-20"
                      : "opacity-0 -translate-y-20"
                  }
                  enterTo="opacity-100 translate-y-0"
                  leave="transition-all duration-500 delay-0"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-90"
                >
                  {word}
                </Transition.Child>
              );
            })}
          </h1>
        </Transition>
      </div>
      <Signature />
    </>
  );
};

export default HomePage;
