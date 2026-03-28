import React, { useState } from "react";
import styles from "./users.module.scss";
import { usePaginatedUsers } from "../../hooks/usePaginatedUsers/usePaginatedUsers";
import { useAllUsers } from "../../hooks/allUsers/useAllUsers";
import UserHighlights from "../../components/UserHighlights/UserHighlights";
import UserTable from "../../components/UserTable/UsersTable";

const Users: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [filters, setFilters] = useState({});

  const {
    users: paginatedUsers,
    total,
    loading,
    error,
  } = usePaginatedUsers(currentPage, pageSize, filters);

  const {
    users: allUsers,
    loading: highlightsLoading,
    error: highlightsError,
  } = useAllUsers();

  if (error) return <p>{error}</p>;
  if (highlightsError) return <p>{highlightsError}</p>;

  // Skeleton for highlights
  const renderHighlightsSkeleton = () => (
    <div className={styles.highlightsSkeleton}>
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className={styles.highlightCardSkeleton} />
      ))}
    </div>
  );

  // Skeleton for table rows
  const renderTableSkeleton = () => (
    <div className={styles.tableSkeleton}>
      <div className={styles.tableHeaderSkeleton}>
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className={styles.cellHeaderSkeleton} />
        ))}
      </div>
      {[...Array(5)].map((_, rowIdx) => (
        <div key={rowIdx} className={styles.tableRowSkeleton}>
          {[...Array(6)].map((_, cellIdx) => (
            <div key={cellIdx} className={styles.cellSkeleton} />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.usercontainer}>
      <div className={styles.title}>Users</div>

      {highlightsLoading ? (
        renderHighlightsSkeleton()
      ) : (
        <UserHighlights users={allUsers} />
      )}

      {loading ? (
        renderTableSkeleton()
      ) : (
        <UserTable
          users={paginatedUsers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          total={total}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </div>
  );
};

export default Users;
