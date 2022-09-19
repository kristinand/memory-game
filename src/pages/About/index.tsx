/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import AboutGif from 'assets/about.gif';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Footer from 'components/Footer';
import classes from './classes.module.scss';

const About: React.FC = () => (
  <>
    <Header title="About Game" />
    <Layout>
      <article>
        <h1>Welcome to Memo — memory card game!</h1>
        <section>
          <img className={classes.image} src={AboutGif} alt="how-to-play" width="250" />
          <h3>How to play</h3>
          <p>
            To complete level you should guess all cards.
            <br />
            The game has 5 levels, it takes nearly 5 minutes to complete it.
            <br />
            When the game was finished, your time(score) will appear in the ratings and will store in the back-end.
            Therefore, firstly, you need to login before you can play the game.
            <br />
            You <span className={classes.strike}>or not you</span> could also overwrite your scores.
          </p>
        </section>
        <section>
          <h3>Default hotkeys</h3>
          <p>You could change it in the settings.</p>
          <ul>
            <li>
              <b>p</b> — pause
            </li>
            <li>
              <b>r</b> — restart game
            </li>
            <li>
              <b>f</b> — fullscreen
            </li>
            <li>
              <b>s</b> — sounds volume
            </li>
            <li>
              <b>m</b> — music volume
            </li>
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
    </Layout>
    <Footer />
  </>
);

export default About;
