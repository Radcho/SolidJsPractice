import { createRoot, createSignal } from 'solid-js';
import User from '../interfaces/user';

const createUserStore = () => {
    const [getUser, setUser] = createSignal<User>();
    const isLoggedIn = () => !!getUser();
    return { getUser, setUser, isLoggedIn };
};

const user = createRoot(createUserStore);
export default user;
