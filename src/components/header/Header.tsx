import { memo } from "react";

import Logo from "./Logo";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className='header' id='home'>
      <Logo />
      <Navigation />
    </header>
  );
}

export default memo(Header);
