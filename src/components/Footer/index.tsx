import React from 'react';

import { MY_GITHUB_LINK, MY_GITHUB_NICK, RSSCHOOL_LINK } from 'utils/constants/index';
import Logo from '../../assets/icons/rss_logo.svg';
import classes from './classes.module.scss';

const Footer: React.FC = () => (
  <footer className={classes.footer}>
    Created by{' '}
    <a rel="noopener noreferrer nofollow" target="_blank" href={MY_GITHUB_LINK}>
      @{MY_GITHUB_NICK}
    </a>
    , 2021 /{' '}
    <a rel="noopener noreferrer nofollow" target="_blank" href={RSSCHOOL_LINK}>
      <Logo className={classes.logoSvg} />
    </a>
  </footer>
);

export default Footer;
