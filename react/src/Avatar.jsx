export default function Avatar({ src, alt, size }) {
    const avatarStyle = {
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
      };
    
      return (
        <img
          src={src}
          alt={alt}
          style={avatarStyle}
        />
      );
};