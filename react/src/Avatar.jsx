

export default function Avatar({ src, onClick, className }) {
    
      return (
        <div className={`${className} min-w-10 min-h-10 rounded-full overflow-hidden`} onClick={onClick}>
          <img
            src={src}
            alt="https://github.com/shadcn.png"
          />
        </div>
      );
};