import React, { useState, useEffect } from "react";
import styles from "./header.module.scss";
import logo from "../../assets/logos/logo.svg";
import searchicon from "../../assets/icons/search.svg";
import notificon from "../../assets/icons/notif.svg";
import avatar from "../../assets/avatar.png";
import dropdown from "../../assets/icons/dropdown.svg";

interface HeaderProps {
  onMobileToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMobileToggle }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.loggo}>
            {onMobileToggle && (
              <button
                className={styles.mobileHamburger}
                onClick={onMobileToggle}
              >
                ☰
              </button>
            )}
            <img src={logo} alt="logo" />
          </div>

          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search for anything"
              className={styles.searchInput}
            />

            <button
              className={styles.searchButton}
              onClick={() => setOpenSearch(true)}
            >
              <img src={searchicon} alt="search" />
            </button>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.docs}>Docs</div>
          <div className={styles.notif}>
            <img src={notificon} alt="notifications" />
          </div>
          <div
            className={styles.user}
            onClick={() => {
              if (isMobile) setOpenMenu((prev) => !prev);
            }}
            style={{ cursor: isMobile ? "pointer" : "default" }} // optional visual cue
          >
            <img src={avatar} alt="avatar" />
            <div className={styles.username}>Adedeji</div>
            <img
              className={styles.dropdownIcon}
              src={dropdown}
              alt="dropdown"
            />

            {/* Mobile dropdown menu */}
            {openMenu && isMobile && (
              <div className={styles.mobileMenu}>
                <div className={styles.menuItem}>Docs</div>
                <div className={styles.menuItem}>
                  <img src={dropdown} alt="notifications" /> Notifications
                </div>
                <div className={styles.menuItem}>Other</div>
              </div>
            )}
          </div>
        </div>
        {openMenu && (
          <div className={styles.mobileMenu}>
            <div className={styles.menuItem}>
              <img src={notificon} alt="" />
            </div>
            <div className={styles.menuItem}>Docs</div>

            <div className={styles.menuItem}>Profile</div>
            <div className={styles.menuItem}>Logout</div>
          </div>
        )}
      </header>

      {openSearch && (
        <div
          className={styles.searchModalOverlay}
          onClick={() => setOpenSearch(false)}
        >
          <div
            className={styles.searchModal}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              className={styles.modalInput}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
