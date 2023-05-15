import { useRef, type FC } from "react";

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
    <div className={`min-w-max z-50 ${className ?? ""}`}>
      <button
        type="button"
        className="inline-flex items-center bg-white ring-1 ring-zinc-400/50 hover:bg-zinc-100
      active:bg-zinc-100 rounded px-3 py-1 text-sm"
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        <img className="w-3 h-3 mr-1" src="/icons/edit.svg" />
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
