import React from 'react';
import classNames from 'classnames';
import Header from '../Header';
import Footer from '../Footer';
import classes from './classes.module.scss';

interface IProps {
  children: React.ReactNode;
  centered?: boolean;
  fullWidth?: boolean;
  noBottomPadding?: boolean;
  showFooter?: boolean;
  title?: string;
  header?: React.ReactNode;
}

const Layout: React.FC<IProps> = ({
  children,
  centered = false,
  fullWidth = false,
  noBottomPadding = false,
  showFooter = true,
  title,
  header,
}) => {
  const renderHeader = () => {
    if (header) {
      return header;
    } 
    
    if (title) {
      return <Header title={title} />;
    }

    return null;
  };

  return (
    <>
      {renderHeader()}
      <main
        className={classNames(classes.layout, {
          [classes.centered]: centered,
          [classes.fullWidth]: fullWidth,
          [classes.noBottomPadding]: noBottomPadding,
        })}
      >
        <>{children}</>
      </main>
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;
