export function AudioPlayer({ src }: { src: string }) {
  if (!src) return null;
  return (
    <div className="episode-page__audio">
      <audio controls preload="none" src={src}>
        Your browser does not support audio playback.
      </audio>
    </div>
  );
}
