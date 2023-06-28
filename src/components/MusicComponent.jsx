/**
 * MusicComponent component
 */

import { useState } from "react";
import useSound from "use-sound";
import backgroundMusic from "../assets/background.mp3";
import SoundOn from "../assets/sound--on.svg";
import SoundOff from "../assets/sound--off.svg";

const MusicComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound(backgroundMusic, {
    volume: 0.25,
    loop: true,
  });
  /**
   * The function `handlePlay` toggles between playing and stopping audio.
   */
  const handlePlay = () => {
    if (!isPlaying) {
      play();
      setIsPlaying(true);
    } else {
      stop();
      setIsPlaying(false);
    }
  };
  return (
    <div className="h-10 w-10 hover:cursor-pointer" onClick={handlePlay}>
      {isPlaying ? (
        <img src={SoundOff} alt="Sound On" />
      ) : (
        <img src={SoundOn} alt="Sound Off" />
      )}
    </div>
  );
};

export default MusicComponent;
