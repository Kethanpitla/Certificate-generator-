import React, { useState } from "react";

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";


export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");


  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        "Please enter your email and password."
      );

      return;
    }


    login(email, password);


    /*
      Role is determined automatically
      from the authenticated user.

      Temporary frontend mapping is inside
      AuthContext.

      Later Supabase will return the
      actual role from the profiles table.
    */

    const savedUser =
      localStorage.getItem(
        "certifyhub_user"
      );

    if (!savedUser) {
      setError(
        "Unable to sign in. Please try again."
      );

      return;
    }


    try {
      const user = JSON.parse(
        savedUser
      );


      if (user.role === "admin") {
        navigate(
          "/admin/dashboard",
          { replace: true }
        );

        return;
      }


      if (
        user.role ===
        "course-manager"
      ) {
        navigate(
          "/course-manager/dashboard",
          { replace: true }
        );

        return;
      }


      navigate(
        "/student/dashboard",
        { replace: true }
      );

    } catch {
      setError(
        "Unable to sign in. Please try again."
      );
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">

      <div className="w-full max-w-md">

        {/* LOGO */}

        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
            <ShieldCheck size={30} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            CertifyHub
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Course Certificate Management System
          </p>

        </div>


        {/* LOGIN CARD */}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Welcome back
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Sign in to continue to your account.
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-sm text-slate-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-12 text-sm text-slate-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >

                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

            </div>


            {/* FORGOT PASSWORD */}

            <div className="flex justify-end">

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/forgot-password"
                  )
                }
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </button>

            </div>


            {/* LOGIN */}

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Sign In
            </button>

          </form>


          {/* SIGN UP */}

          <div className="mt-6 border-t border-slate-200 pt-6 text-center">

            <p className="text-sm text-slate-500">
              Don't have an account?
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/signup")
              }
              className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Create an account
            </button>

          </div>

        </div>


        <p className="mt-6 text-center text-xs text-slate-400">
          Secure certificate generation and verification platform
        </p>

      </div>

    </div>
  );
}