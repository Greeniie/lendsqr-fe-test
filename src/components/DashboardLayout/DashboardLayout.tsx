import React, { useState } from "react";
import styles from "./dashboardlayout.module.scss";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Header onMobileToggle={() => setMobileOpen(true)} />

      <div className={styles.content}>
        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>

      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
      )}
    </div>
  );
};

export default DashboardLayout;
