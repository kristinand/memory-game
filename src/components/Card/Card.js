import React from 'react';
import classes from './Card.css';

const card = (props) => {
  const clicked = (event) => {
    const card = event.target.closest('.Card');
		card.style.transform = 'rotateY(180deg)';
		setTimeout(() => {
			card.style.transform = 'rotateY(0deg)';
		}, 7000);
  };

  return (
    <div onClick={clicked} className={['Card', classes.Card].join(' ')}>
      <div className={classes.CardCover} style={{ backgroundColor: props.coverColor }}><span>?</span></div>
      <div className={classes.CardColor} style={{ backgroundColor: props.color}}>
				<span>{props.pattern}</span>
			</div>
    </div>
  );
};

export default card;
