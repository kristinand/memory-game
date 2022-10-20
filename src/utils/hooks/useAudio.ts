import { useEffect, useMemo } from 'react';

import cardClick from 'assets/card-click.opus';
import menuClick from 'assets/menu-click.opus';
import { MUSIC_URL } from 'utils/constants';

type IUseAudio = (
  type: 'music' | 'sound' | 'game-sound',
  config: Partial<HTMLAudioElement>,
  isPlay?: boolean,
) => HTMLAudioElement & {
  replay: () => void;
};

export const useAudio: IUseAudio = (type, { volume, loop }, isPlay = false) => {
  const audio = useMemo(() => {
    switch (type) {
      case 'music':
        return new Audio(MUSIC_URL);
      case 'game-sound':
        return new Audio(cardClick);
      default:
        return new Audio(menuClick);
    }
  }, [type]);
  audio.volume = volume;
  audio.loop = loop;

  const replay = () => {
    audio.currentTime = 0;
    void audio.play();
  };

  useEffect(() => {
    if (isPlay) {
      void audio.play();
    }
    return () => void audio.pause();
  }, [audio, isPlay]);

  return {
    ...audio,
    replay,
  };
};
