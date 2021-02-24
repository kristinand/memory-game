import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import classes from './About.css';
import about from '@assets/about.gif';

const About = () => {
  return (
    <Fragment>
      <Header title="About Game" />
      <article className={classes.About}>
        <h1>Wlecome to Memo — memory card game!</h1>
        <section>
          <img className={classes.image} src={about} alt="how-to-play" width="250" />
          <h3>How to play</h3>
          <p>
            To complete level you should guess all cards.
            <br />
            The game has 5 levels, it takes nearly 5 minutes to complete it.
            <br />
            When game was finished, your time(score) will appear in the ratings and will store in the backend. Therefore, firstly, you need to login before you can play the game.
						<br />
						You <strike>or not you</strike> could also overwrite your scores.
          </p>
        </section>
				<section>
					<h3>Default hotkeys</h3>
					<p>You could change it in the settings.</p>
					<ul>
						<li><b>P</b> — pause</li>
						<li><b>R</b> — restart game</li>
						<li><b>F</b> — fullscreen</li>
						<li><b>S</b> — sounds volume</li>
						<li><b>M</b> — music volume</li>
					</ul>
				</section>
				<section>
					<h3>Game support</h3>
					<ul>
						<li>Device width min 500px</li>
						<li>Guaranteed Chrome last version</li>
					</ul>
				</section>
      </article>
    </Fragment>
  );
};

export default About;
