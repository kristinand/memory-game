import { useSelector } from 'react-redux';

import { getLocalStorageValue, setLocalStorageValue } from 'utils/functions';
import { IPlayerData } from 'entities/';
import { selectPlayerName } from 'store/auth/slice';

export const usePlayerData = () => {
  const player = useSelector(selectPlayerName);
  const playerData = getLocalStorageValue<IPlayerData>(player);

  const updatePlayerData = (updatedValue: Partial<IPlayerData>) => {
    setLocalStorageValue(player, {
      ...playerData,
      ...updatedValue,
    });
  };

  const deletePlayerData = (deletedValue: keyof IPlayerData) => {
    const newPlayerData = {
      ...playerData,
    };
    delete newPlayerData[deletedValue];
    setLocalStorageValue(player, newPlayerData);
  };

  return {
    playerData,
    updatePlayerData,
    deletePlayerData,
  };
};
