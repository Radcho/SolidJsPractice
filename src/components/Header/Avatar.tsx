import { Component, createSignal } from 'solid-js';
import Dismiss from 'solid-dismiss';
import styles from './Header.module.css';
import user from '../../stores/user';

/**
 * An avatar component with a dropdown only containing one action: logout
 */
const Avatar: Component = () => {
    const { getUser, setUser } = user;
    const [isDropdownOpen, setDropdownOpen] = createSignal(false);

    const getInitials = () =>
        `${getUser()?.firstName[0]}${getUser()?.lastName[0]}`;

    let dropdownActivator: HTMLDivElement | undefined;

    const getDropdownPosition = () => {
        if (!dropdownActivator) {
            const { right } = document.body.getBoundingClientRect();

            return { top: '48px', left: `${right - 120}px`, width: '120px' };
        }

        const { bottom, left, width } =
            dropdownActivator.getBoundingClientRect();

        return { top: `${bottom}px`, left: `${left}px`, width: `${width}px` };
    };

    const logout = () => {
        setDropdownOpen(false);
        setUser();
    };

    return (
        <>
            <div ref={dropdownActivator} class={styles.avatar}>
                <div class={styles.avatarImage}>{getInitials()}</div>
                <div class={styles.avatarName}>
                    {getUser()?.firstName}
                    &nbsp;
                    {getUser()?.lastName}
                </div>
                <div class={styles.avatarDropdownArrow}>&#x2335;</div>
            </div>
            <Dismiss
                menuButton={dropdownActivator}
                open={isDropdownOpen}
                setOpen={setDropdownOpen}
                mount='body'
                focusElementOnOpen='menuPopup'
                cursorKeys
            >
                <ul
                    class={styles.avatarDropdown}
                    style={{
                        left: getDropdownPosition().left,
                        top: getDropdownPosition().top,
                        width: getDropdownPosition().width,
                    }}
                >
                    <li onClick={() => logout()}>Logout</li>
                </ul>
            </Dismiss>
        </>
    );
};

export default Avatar;
