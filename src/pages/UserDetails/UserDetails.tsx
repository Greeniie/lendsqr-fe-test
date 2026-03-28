import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type User } from "../../hooks/allUsers/useAllUsers";
import styles from "./userdetails.module.scss";
import backimg from "../../assets/icons/np_back_3007750_000000 1.svg";
import photo from "../../assets/icons/avatar.svg";
import StarRating from "../../components/StarRating/StarRating";
import ErrorFallback from "../../components/ErrorFallback/ErrorFallback";

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      if (parsedUser.id === id) setUser(parsedUser);
    }
  }, [id]);

  if (!user) {
    return (
      <ErrorFallback message="User data could not be loaded. Please make sure you selected a valid user." />
    );
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    });
  };

  const formattedIncome = (() => {
    const income = user.educationEmployment?.monthlyIncome;

    if (!income) return "-";

    const [min, max] = income.split(" - ").map(Number);

    return `${formatCurrency(min)}- ${formatCurrency(max)}`;
  })();

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backbutton}>
        <img src={backimg} alt="back" />
        <span>Back to Users</span>
      </button>

      <div className={styles.header}>
        <div className={styles.title}>User Details</div>

        <div className={styles.headerbuttons}>
          <button className={styles.blacklist}>Blacklist User</button>
          <button className={styles.activate}>Activate User</button>
        </div>
      </div>

      <div className={styles.userCard}>
        <div className={styles.userInfo}>
          <img className={styles.avatar} src={photo} />

          <div>
            <div className={styles.name}>{user.personalInfo?.fullName}</div>
            <div className={styles.id}>LSQFf587g90</div>
          </div>
        </div>

        <div className={styles.tier}>
          <div>User’s Tier</div>
          <StarRating rating={user.userTier} />{" "}
        </div>

        <div className={styles.balance}>
          <div className={styles.amount}>
            {formatCurrency(user.accountBalance)}
          </div>
          <div>9912345678/Providus Bank</div>
        </div>
      </div>

      <div className={styles.tabs}>
        <span className={styles.active}>General Details</span>
        <span>Documents</span>
        <span>Bank Details</span>
        <span>Loans</span>
        <span>Savings</span>
        <span>App and System</span>
      </div>

      <div className={styles.section}>
        <h3>Personal Information</h3>

        <div className={styles.grid}>
          <div>
            <span>Full Name</span>
            <p>{user.personalInfo?.fullName}</p>
          </div>

          <div>
            <span>Phone Number</span>
            <p>{user.phoneNumber}</p>
          </div>

          <div>
            <span>Email Address</span>
            <p>{user.email}</p>
          </div>

          <div>
            <span>BVN</span>
            <p>{user.personalInfo?.bvn}</p>
          </div>

          <div>
            <span>Marital status</span>
            <p>{user.personalInfo?.maritalStatus}</p>
          </div>
          <div>
            <span>Chidren</span>
            <p>{user.personalInfo?.children}</p>
          </div>
          <div>
            <span>Type of residence</span>
            <p>{user.personalInfo?.residenceType}</p>
          </div>
        </div>

        <h3>Education and Employment</h3>

        <div className={styles.grid}>
          <div>
            <span>Level of Education</span>
            <p>{user.educationEmployment?.levelOfEducation}</p>
          </div>

          <div>
            <span>Employment Status</span>
            <p>{user.educationEmployment?.employmentStatus}</p>
          </div>

          <div>
            <span>Sector</span>
            <p>{user.educationEmployment?.sector}</p>
          </div>

          <div>
            <span>Duration</span>
            <p>{user.educationEmployment?.duration}</p>
          </div>

          <div>
            <span>Office Email</span>
            <p>{user.educationEmployment?.officeEmail}</p>
          </div>

          <div>
            <span>Monthly Income</span>
            <p>{formattedIncome}</p>{" "}
          </div>

          <div>
            <span>Loan Repayment</span>
            <p>₦{user.educationEmployment?.loanRepayment}</p>
          </div>
        </div>

        <h3>Socials</h3>

        <div className={styles.grid}>
          <div>
            <span>Twitter</span>
            <p>{user.socials?.twitter}</p>
          </div>

          <div>
            <span> Facebook</span>
            <p>{user.socials?.facebook}</p>
          </div>

          <div>
            <span>Instagram</span>
            <p>{user.socials?.instagram}</p>
          </div>
        </div>

        <h3>Guarantor</h3>

        <div className={styles.grid}>
          <div>
            <span>Full name</span>
            <p>{user.guarantor?.fullName}</p>
          </div>

          <div>
            <span>Phone number</span>
            <p>{user.guarantor?.phoneNumber}</p>
          </div>

          <div>
            <span>Email address</span>
            <p>{user.guarantor?.fullName}</p>
          </div>
          <div>
            <span>Relationship</span>
            <p>{user.guarantor?.relationship}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
