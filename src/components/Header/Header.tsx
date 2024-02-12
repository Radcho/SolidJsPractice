import { Component } from 'solid-js';
import styles from './Header.module.css';
import Avatar from './Avatar';

const Header: Component = () => {
    return (
        <header class={styles.header}>
            <div class={styles.logo} />
            <Avatar />
        </header>
    );
};

export default Header;
