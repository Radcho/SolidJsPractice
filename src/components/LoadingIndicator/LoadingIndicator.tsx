import { Component, Show } from 'solid-js';
import styles from './LoadingIndicator.module.css';
import { joinClasses } from '../../utils/classUtil';

type LoadingIndicatorProps = {
    show: boolean;
};

const LoadingIndicator: Component<LoadingIndicatorProps> = (props) => {
    return (
        <Show when={props.show}>
            <div class={styles.loading}>
                <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <circle class={styles.loadAnimation} cx='4' cy='12' r='3' />
                    <circle
                        class={joinClasses(
                            styles.loadAnimation,
                            styles.dotSecond
                        )}
                        cx='4'
                        cy='12'
                        r='3'
                    />
                    <circle
                        class={joinClasses(
                            styles.loadAnimation,
                            styles.dotThird
                        )}
                        cx='4'
                        cy='12'
                        r='3'
                    />
                    <circle
                        class={joinClasses(
                            styles.loadAnimation,
                            styles.dotFourth
                        )}
                        cx='4'
                        cy='12'
                        r='3'
                    />
                </svg>
            </div>
        </Show>
    );
};

export default LoadingIndicator;
