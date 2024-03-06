import styles from "./loader-screen.module.scss";

export const LoaderScreen = () => {
  return (
    <div className={styles.loaderScreen}>
      <img className={styles.loader} src="/donna-face.svg" />
    </div>
  );
};
