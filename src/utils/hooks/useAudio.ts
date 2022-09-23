import { useEffect, useMemo } from 'react';

import { MUSIC_URL } from 'utils/constants';
import soundFile from '../../assets/menu-click.opus';

type IUseAudio = (
  type: 'music' | 'sound',
  config: Partial<HTMLAudioElement>,
  isPlay?: boolean,
) => HTMLAudioElement & {
  replay: () => void;
};

export const useAudio: IUseAudio = (type, { volume, loop }, isPlay = false) => {
  const audio = useMemo(() => new Audio(type === 'music' ? MUSIC_URL : soundFile), [type]);
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
