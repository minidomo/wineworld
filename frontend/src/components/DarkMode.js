import '../Dark.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ColorTheme } from '../App';
let my_theme = { ColorTheme };
export default function DarkMode(job) {
  const [theme, setTheme] = useState('light');
  const ModeSwitch = () => {
    if (theme === 'light') {
      setTheme('dark');
      my_theme = 'dark';
    } else {
      setTheme('light');
      my_theme = 'light';
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  if (job === 'toggle') {
    return (
      <Link class="nav-link" onClick={ModeSwitch}>
        Light/Dark
      </Link>
    );
  }
  if (my_theme === undefined) {
    my_theme = 'light';
  }
  return my_theme;
}
