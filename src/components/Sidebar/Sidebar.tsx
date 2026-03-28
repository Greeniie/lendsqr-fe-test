import { NavLink } from "react-router-dom";
import { sidebarSections } from "../../routes/sidebarRoutes";
import styles from "./sidebar.module.scss";
import dropdown from "../../assets/icons/claretdown.svg";
import logo from "../../assets/logos/logo.svg";

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  return (
    <aside
      className={`${styles.sidebar} ${mobileOpen ? styles.mobileOpen : ""}`}
    >
      {mobileOpen && (
        <div className={styles.loggo}>
          <img src={logo} alt="logo" />

          <div>
            <div className={styles.close} onClick={onMobileClose}>
              ✕
            </div>
          </div>
        </div>
      )}

      {sidebarSections.map((section, sIdx) => (
        <div key={sIdx} className={styles.section}>
          {section.title && (
            <p className={styles.sectionTitle}>{section.title}</p>
          )}
          <ul>
            {section.items.map((item, i) => (
              <li key={i}>
                {item.path ? (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                    end
                    onClick={onMobileClose}
                  >
                    {item.icon && <img src={item.icon} alt="" />}
                    <span>{item.label}</span>
                  </NavLink>
                ) : (
                  <div className={styles.link}>
                    {item.icon && <img src={item.icon} alt="" />}
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <img className={styles.dropdown} src={dropdown} alt="" />
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
