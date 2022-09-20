import React, { useState } from 'react';
import { ValidationError } from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import Login from 'assets/icons/right.svg';
import Logout from 'assets/icons/left.svg';
import Layout from 'components/Layout';
import MenuLink from 'components/MenuLink';
import Button from 'components/Button';
import Input from 'components/Input';
import { usePlayerData } from 'utils/hooks';
import { removeCookie, setCookie } from 'utils/functions';
import { login, logout, selectPlayerName } from 'store/auth/slice';
import { setDefaultSettings } from 'store/settings/slice';
import { validationSchema } from './validation';
import classes from './classes.module.scss';

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const storedPlayer = useSelector(selectPlayerName);
  const [helperText, setHelperText] = useState('');
  const [player, setPlayer] = useState(storedPlayer);
  const { playerData } = usePlayerData();

  const onInputValueChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    if (!storedPlayer) {
      setPlayer((event.target as HTMLInputElement).value.trim());
    }
  };

  const onLogin = async () => {
    try {
      await validationSchema.validate(player);
      setCookie('player', player);
      dispatch(login(player));
      setHelperText('');
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (err?.name === 'ValidationError') {
        const { message } = err as ValidationError;
        setHelperText(message);
      }
    }
  };

  const onLogout = () => {
    setPlayer('');
    setHelperText('');
    removeCookie('player', storedPlayer);
    dispatch(setDefaultSettings());
    dispatch(logout());
  };

  return (
    <Layout centered>
      <div className={classes.loginContainer}>
        {storedPlayer ? (
          <div className={classes.playerName}>Hello, {storedPlayer}!</div>
        ) : (
          <Input
            onChange={onInputValueChangeHandler}
            onKeyPress={async (event) => {
              if (event.key === 'Enter') await onLogin();
            }}
            withHelperText
            helperText={helperText}
            placeholder="Your name"
            value={player}
            autoFocus
            type="text"
            className={classes.input}
          />
        )}

        <Button
          className={classes.loginButton}
          icon={storedPlayer ? <Logout /> : <Login />}
          onClick={storedPlayer ? onLogout : onLogin}
          title={storedPlayer ? 'Logout' : 'Login'}
        />
      </div>

      <div className={classes.separator}>♥ ☀ ♦</div>

      <div className={classes.menu}>
        <MenuLink to="/game" state={{ isNew: true }} disabled={!storedPlayer} title="New Game" />
        <MenuLink to="/game" state={{ isNew: false }} disabled={!storedPlayer || !playerData?.game} title="Continue" />
        <MenuLink to="/rating" title="Rating" />
        <MenuLink to="/settings" disabled={!storedPlayer} title="Settings" />
        <MenuLink to="/about" title="About" />
      </div>
    </Layout>
  );
};

export default Menu;
