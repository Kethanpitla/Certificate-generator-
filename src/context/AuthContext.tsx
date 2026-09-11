import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type UserRole =
  | "admin"
  | "course-manager"
  | "student";

export interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;

  login: (
    email: string,
    password: string
  ) => boolean;

  signup: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => boolean;

  logout: () => void;
}

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

const STORAGE_KEY = "certifyhub_user";

/*
  TEMPORARY FRONTEND LOGIN MAPPING

  Later, this will be replaced by Supabase Auth
  + the profiles table.

  For now:
  - admin email -> Admin
  - course manager email -> Course Manager
  - every other email -> Student

  Replace these two emails with your actual
  admin and course-manager emails.
*/

const ADMIN_EMAIL =
  "admin@certifyhub.com";

const COURSE_MANAGER_EMAIL =
  "manager@certifyhub.com";


function getRoleFromEmail(
  email: string
): UserRole {
  const normalizedEmail =
    email.trim().toLowerCase();

  if (
    normalizedEmail ===
    ADMIN_EMAIL.toLowerCase()
  ) {
    return "admin";
  }

  if (
    normalizedEmail ===
    COURSE_MANAGER_EMAIL.toLowerCase()
  ) {
    return "course-manager";
  }

  return "student";
}


function getNameFromRole(
  role: UserRole
): string {
  if (role === "admin") {
    return "Admin User";
  }

  if (role === "course-manager") {
    return "Course Manager";
  }

  return "Student User";
}


export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<AuthUser | null>(null);


  useEffect(() => {
    const savedUser =
      localStorage.getItem(STORAGE_KEY);

    if (!savedUser) {
      return;
    }

    try {
      const parsedUser =
        JSON.parse(savedUser) as AuthUser;

      setUser(parsedUser);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);


  const login = (
    email: string,
    _password: string
  ): boolean => {
    const role =
      getRoleFromEmail(email);

    const loggedInUser: AuthUser = {
      name: getNameFromRole(role),
      email: email.trim(),
      role,
    };

    setUser(loggedInUser);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(loggedInUser)
    );

    return true;
  };


  const signup = (
    name: string,
    email: string,
    _password: string,
    role: UserRole
  ): boolean => {
    const newUser: AuthUser = {
      name: name.trim(),
      email: email.trim(),
      role,
    };

    setUser(newUser);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newUser)
    );

    return true;
  };


  const logout = (): void => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth(): AuthContextType {
  const context =
    useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}