import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { ECardStatus, ICard } from 'types/';
import { selectSettings } from 'store/settings/slice';
import classes from './classes.module.scss';

interface IProps {
  card: ICard;
  onClick: () => void;
}

const Card: React.FC<IProps> = ({ card, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPatternShown, theme } = useSelector(selectSettings);

  useEffect(() => {
    setIsOpen(card.status !== ECardStatus.Closed)
  }, [card.status]);

  return (
    <div className={classNames(classes.card, { [classes.opened]: isOpen })}>
      <button
        type="button"
        onClick={onClick}
        className={classNames(classes.innerCard, classes[theme], { [classes.opened]: isOpen })}
      >
        <div className={classes.cardCover} style={{ backgroundColor: card.coverColor }}>
          <span>?</span>
        </div>
        <div className={classes.cardFace} style={{ backgroundColor: card.color }}>
          {isPatternShown && <span className={classes.pattern}>{card.pattern}</span>}
        </div>
      </button>
    </div>
  );
};

export default Card;
