import { Component, Show, createSignal } from 'solid-js';
import styles from './Login.module.css';
import MSLoginButton from './MSLoginButton';
import loginService from '../../services/loginService';
import User from '../../interfaces/user';
import LoadingIndicator from '../LoadingIndicator';

type LoginProps = {
    onLogin: (user: User) => void;
};

/**
 * Simple login dialog
 */
const Login: Component<LoginProps> = (props) => {
    const [getUsername, setUsername] = createSignal('');
    const [getPassword, setPassword] = createSignal('');
    const [isLoggingIn, setLoggingIn] = createSignal(false);
    const [getLoginError, setLoginError] = createSignal('');

    const canLogIn = () =>
        getUsername().trim() && getPassword().trim() && !isLoggingIn();

    const handleLoginError = (error: unknown) => {
        if (error === null) {
            setLoginError('Unknown error occurred.');
            return;
        }

        if (typeof error === 'object') {
            if ((error as Error).message) {
                setLoginError((error as Error).message);
                return;
            }

            console.error(error);
            setLoginError(
                'Unknown error occurred. See console for more details.'
            );
            return;
        }

        setLoginError(String(error));
    };

    const logIn = async (e: Event) => {
        e.preventDefault();

        if (canLogIn()) {
            setLoggingIn(true);
            try {
                const user = await loginService.login({
                    username: getUsername(),
                    password: getPassword(),
                });
                props.onLogin(user);
            } catch (err) {
                handleLoginError(err);
            }
            setLoggingIn(false);
        }
    };

    return (
        <div class={styles.login}>
            <LoadingIndicator show={isLoggingIn()} />
            <h1>Log in to your account</h1>
            <div class={styles.loginSection}>
                <MSLoginButton
                    onClick={() =>
                        console.log('Logging in with a Microsoft account')
                    }
                />
            </div>
            <div class={styles.loginSeparator}>OR</div>
            <div class={styles.loginSection}>
                <form onSubmit={(e) => logIn(e)}>
                    <input
                        type='text'
                        placeholder='Username'
                        aria-label='Username'
                        autofocus
                        disabled={isLoggingIn()}
                        onInput={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        aria-label='Password'
                        disabled={isLoggingIn()}
                        onInput={(e) => setPassword(e.target.value)}
                    />
                    <Show when={getLoginError()}>
                        <small class={styles.loginError}>
                            {getLoginError()}
                        </small>
                    </Show>
                    <button
                        type='submit'
                        title='Sign in'
                        disabled={!canLogIn()}
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
