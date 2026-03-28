import React from "react";
import styles from "./userhighlights.module.scss";
import { type User } from "../../hooks/allUsers/useAllUsers";
import iconn from "../../assets/icons/iconn.svg";
import icon1 from "../../assets/icons/icon (1).svg";
import icon2 from "../../assets/icons/icon (2).svg";
import icon3 from "../../assets/icons/icon (3).svg";

interface Props {
  users: User[];
}

const UserHighlights: React.FC<Props> = ({ users }) => {
  const totalUsers = users.length;

  const activeUsers = users.filter((user) => user.status === "Active").length;

  const usersWithLoans = users.filter((user) => user.hasLoan).length;

  const usersWithSavings = users.filter((user) => user.hasSavings).length;

  const cards = [
    { label: "Total Users", value: totalUsers, icon: iconn },
    { label: "Active Users", value: activeUsers, icon: icon1 },
    { label: "Users with Loans", value: usersWithLoans, icon: icon2 },
    { label: "Users with Savings", value: usersWithSavings, icon: icon3 },
  ];

  return (
    <div className={styles.container}>
      {cards.map((card) => (
        <div key={card.label} className={styles.card}>
          <img src={card.icon} alt="" className={styles.icon} />
          <p className={styles.label}>{card.label}</p>
          <div className={styles.value}>{card.value}</div>
        </div>
      ))}
    </div>
  );
};

export default UserHighlights;
