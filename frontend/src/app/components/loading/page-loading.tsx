import styles from "./styles.module.css";
const PageLoading = () => {
    return (
        <div className="flex-center fixed w-full h-screen top-0 left-0 right-0 z-50">
            <div className={styles.dot_pulse} />
        </div>
    );
};

export default PageLoading;
