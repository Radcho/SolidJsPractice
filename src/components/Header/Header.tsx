import { Component } from 'solid-js';
import styles from './Header.module.css';
import Avatar from './Avatar';

/**
 * General purpose header component
 */
const Header: Component = () => {
    return (
        <header class={styles.header}>
            <div class={styles.logo} />
            <Avatar />
        </header>
    );
};

export default Header;
