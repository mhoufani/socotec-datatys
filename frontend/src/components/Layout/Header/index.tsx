import { ReactNode } from 'react';

import classes from './index.module.scss';

interface IHeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: IHeaderProps) => {
  return (
    <header className={classes.header}>
      <img className={classes.logo} src="/logo.png" alt="logo SOCOTEC"/>
      {children}
    </header>
  );
}

export default Header;
