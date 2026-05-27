type Props = {
  image: string;
  video?: string;
  alt: string;
  className?: string;
};

export default function MediaTile({ image, video, alt, className = "" }: Props) {
  if (video) {
    return (
      <video
        src={video}
        poster={image}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={alt}
        className={className}
      />
    );
  }
  return <img src={image} alt={alt} className={className} />;
}
