import { type Component, Show } from 'solid-js';
import styles from './App.module.css';
import Header from './components/Header';
import Login from './components/Login';
import user from './stores/user';
import Calendar from './components/Calendar';

const App: Component = () => {
    const { setUser, isLoggedIn } = user;

    return (
        <div class={styles.app} classList={{ [styles.login]: !isLoggedIn() }}>
            <Show
                when={isLoggedIn()}
                fallback={
                    <Login onLogin={(loggedInUser) => setUser(loggedInUser)} />
                }
            >
                <Header />
                <Calendar />
            </Show>
        </div>
    );
};

export default App;
