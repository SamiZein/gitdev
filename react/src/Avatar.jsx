export default function Avatar({ src, size }) {
    const avatarStyle = {
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
      };
    
      return (
        <img
          src={src}
          alt="https://github.com/shadcn.png"
          style={avatarStyle}
        />
      );
};