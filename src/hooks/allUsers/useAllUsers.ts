import { useEffect, useState } from "react";

export interface User {
  id: number;
  organization: string;
  username: string;
  email: string;
  phoneNumber: number;
  dateJoined: string;
  status: string;
  hasLoan: boolean;
  hasSavings: boolean;
  accountBalance: number;
  accountNumber: string;
  userTier: number;

  personalInfo?: {
    firstName: string;
    lastName: string;
    fullName: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: string;
    residenceType: string;
  };

  educationEmployment?: {
    levelOfEducation: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string;
    loanRepayment: string;
  };

  socials?: {
    twitter: string;
    facebook: string;
    instagram: string;
  };

  guarantor?: {
    fullName: string;
    relationship: string;
    gender: string;
    phoneNumber: number;
  };
}

export const useAllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAllUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/users`);
        if (!res.ok) throw new Error("Failed to fetch users");

        const data: User[] = await res.json();
        if (isMounted) setUsers(data);
      } catch (err: any) {
        if (isMounted) setError(err.message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAllUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  return { users, loading, error };
};
