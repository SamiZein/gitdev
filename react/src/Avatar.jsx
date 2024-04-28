

export default function Avatar({ src, size, onClick }) {
    const avatarStyle = {
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
      };
    
      return (
        <div onClick={onClick}>
          <img
            src={src}
            alt="https://github.com/shadcn.png"
            style={avatarStyle}
          />
        </div>
 
      );
};