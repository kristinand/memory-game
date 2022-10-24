import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { ECardStatus, ICard } from 'types/';
import { selectTheme } from 'store/settings/slice';
import classes from './classes.module.scss';

interface IProps {
  card: ICard;
  onClick: () => void;
}

const Card: React.FC<IProps> = ({ card, onClick }) => {
  const isOpen = card.status !== ECardStatus.Closed;
  const theme = useSelector(selectTheme);

  return (
    <div className={classNames(classes.card, isOpen && classes.opened)}>
      <button
        type="button"
        onClick={onClick}
        className={classNames(classes.innerCard, classes[theme], isOpen && classes.opened)}
      >
        <div className={classes.cardCover} style={{ backgroundColor: card.coverColor }}>
          <span>?</span>
        </div>
        <div className={classes.cardFace} style={{ backgroundColor: card.color }}>
          <span className={classes.pattern}>{card.pattern}</span>
        </div>
      </button>
    </div>
  );
};

export default Card;
