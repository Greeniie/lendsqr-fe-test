import React from "react";
import styles from "./starrating.module.scss";

interface Props {
  rating: number; 
  max?: number;
}

const StarRating: React.FC<Props> = ({ rating, max = 3 }) => {
  return (
    <div className={styles.stars}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? styles.active : styles.inactive}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;