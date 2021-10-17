import React, { ElementType } from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

import { myGitHubLink, myGitHubName, RSSchoolLink } from 'constants/index';
import Logo from 'assets/icons/rss_logo.svg';
import classes from './classes.module.scss';

const Footer: React.FC = () => (
  <footer className={classes.footer}>
    Created by{' '}
    <a rel="noopener noreferrer nofollow" target="_blank" href={myGitHubLink}>
      @{myGitHubName}
    </a>
    , 2021 /{' '}
    <a rel="noopener noreferrer nofollow" target="_blank" href={RSSchoolLink}>
      <SvgIcon component={Logo as ElementType} className={classes.logoSvg} viewBox="0 0 552.8 205.3" />
    </a>
  </footer>
);

export default Footer;
