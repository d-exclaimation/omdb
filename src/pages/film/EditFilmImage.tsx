import { useRef, type FC } from "react";
import { tw } from "../../common/utils/tailwind";

type EditFilmImageProps = {
  className?: string;
  label?: string;
  onUpload: (file: File) => void;
};

const EditFilmImage: FC<EditFilmImageProps> = ({
  onUpload,
  className,
  label,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className={tw("z-50 min-w-max", className)}>
      <button
        type="button"
        className={tw(`inline-flex items-center rounded bg-white 
        px-3 py-1 text-sm ring-1 ring-zinc-400/50 hover:bg-zinc-100 
        active:bg-zinc-100 dark:bg-zinc-800 dark:text-white 
        dark:ring-zinc-600/50 dark:hover:bg-zinc-700 dark:active:bg-zinc-700`)}
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        <img
          className="mr-1 h-3 w-3 dark:content-[url('/icons/edit-selected.svg')]"
          src="/icons/edit.svg"
        />
        {label ?? "Add"}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            if (!e.target.files || !e.target.files.length) {
              return;
            }
            const file = e.target.files[0];
            onUpload(file);
          }}
        />
      </button>
    </div>
  );
};

export default EditFilmImage;
