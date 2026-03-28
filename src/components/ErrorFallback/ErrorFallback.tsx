import React from "react";
import styles from "./errorfallback.module.scss";
import errorIcon from "../../assets/icons/error.svg"; 

interface ErrorFallbackProps {
  message: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ message }) => {
  return (
    <div className={styles.errorContainer}>
      <img src={errorIcon} alt="Error" className={styles.icon} />
      <div className={styles.text}>
        <h2>Oops!</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorFallback;