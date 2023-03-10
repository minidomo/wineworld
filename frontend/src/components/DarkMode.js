import { useState, useEffect } from 'react';
import '../Dark.css';
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
            <button type="button" class={`btn btn-${theme}`} onClick={ModeSwitch}>
                Light/Dark
            </button>
        );
    }
    if (my_theme === undefined) {
        my_theme = 'light';
    }
    return my_theme;
}
