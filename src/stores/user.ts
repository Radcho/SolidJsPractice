import { createRoot, createSignal } from 'solid-js';
import User from '../interfaces/user';

const createUserStore = () => {
    const [getUser, setUser] = createSignal<User>();
    const isLoggedIn = () => !!getUser();
    return {
        /**
         * Gets the user object
         */
        getUser,
        /**
         * Sets the user object
         */
        setUser,
        /**
         * Returns true if the user is logged in
         */
        isLoggedIn,
    };
};

/**
 * A very simple global user store
 */
const user = createRoot(createUserStore);

export default user;
