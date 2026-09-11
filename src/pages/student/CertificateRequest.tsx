import React, { useState } from "react";
import {
  Award,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FileText,
  Send,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

interface CourseOption {
  id: number;
  title: string;
  score: string;
  completionDate: string;
}

const completedCourses: CourseOption[] = [
  {
    id: 1,
    title: "Full Stack Web Development",
    score: "92%",
    completionDate: "August 20, 2026",
  },
  {
    id: 2,
    title: "Python Programming",
    score: "88%",
    completionDate: "August 18, 2026",
  },
  {
    id: 3,
    title: "Data Analytics",
    score: "95%",
    completionDate: "August 15, 2026",
  },
];

export default function CertificateRequest() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedCourse, setSelectedCourse] =
    useState("");

  const [customNote, setCustomNote] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const [error, setError] = useState("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!selectedCourse) {
      setError("Please select a completed course.");
      return;
    }

    setSubmitted(true);
  };

  const selectedCourseData =
    completedCourses.find(
      (course) =>
        course.title === selectedCourse
    );

  if (submitted) {
    return (
      <DashboardLayout activeItem="Certificate Requests">
        <div className="flex min-h-[650px] items-center justify-center">

          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={42} />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              Certificate Request Submitted
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Your certificate request has been submitted
              successfully. A Course Manager will review
              your course completion details before the
              certificate is issued.
            </p>

            <div className="mt-7 rounded-2xl bg-slate-50 p-5 text-left">

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Award size={22} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Requested Course
                  </p>

                  <p className="font-semibold text-slate-900">
                    {selectedCourse}
                  </p>
                </div>
              </div>

              {selectedCourseData && (
                <div className="mt-5 grid grid-cols-2 gap-4">

                  <div>
                    <p className="text-xs text-slate-400">
                      Completion Score
                    </p>

                    <p className="mt-1 font-semibold text-slate-700">
                      {selectedCourseData.score}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Completion Date
                    </p>

                    <p className="mt-1 font-semibold text-slate-700">
                      {selectedCourseData.completionDate}
                    </p>
                  </div>

                </div>
              )}

              <div className="mt-5 flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Pending Review
                </span>
              </div>

            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">

              <button
                type="button"
                onClick={() =>
                  navigate("/student/dashboard")
                }
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Back to Dashboard
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setSelectedCourse("");
                  setCustomNote("");
                }}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Submit Another Request
              </button>

            </div>

          </div>

        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeItem="Certificate Requests">

      <div className="mx-auto max-w-4xl space-y-6">

        {/* HEADER */}
        <div className="flex items-center gap-4">

          <Link
            to="/student/dashboard"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          >
            <ArrowLeft size={19} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Request Certificate
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Submit a request for your completed course.
            </p>
          </div>

        </div>

        {/* INFO */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">

          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <FileText size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-blue-900">
                How certificate requests work
              </h2>

              <p className="mt-1 text-sm leading-6 text-blue-700">
                Select a completed course and submit your
                request. The Course Manager will verify your
                completion details. Once approved, your
                certificate can be generated.
              </p>
            </div>

          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          {/* FORM HEADER */}
          <div className="border-b border-slate-200 p-6">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <Award size={22} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Certificate Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Provide the information required for
                  certificate approval.
                </p>
              </div>

            </div>

          </div>

          <div className="space-y-6 p-6">

            {/* STUDENT */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Student
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <User size={19} />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {user?.name || "Student User"}
                  </p>

                  <p className="text-xs text-slate-500">
                    {user?.email || "student@example.com"}
                  </p>
                </div>

              </div>

            </div>

            {/* COURSE */}
            <div>

              <label
                htmlFor="course"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Completed Course
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <div className="relative">

                <BookOpen
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  id="course"
                  value={selectedCourse}
                  onChange={(event) =>
                    setSelectedCourse(
                      event.target.value
                    )
                  }
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Select a completed course
                  </option>

                  {completedCourses.map(
                    (course) => (
                      <option
                        key={course.id}
                        value={course.title}
                      >
                        {course.title}
                      </option>
                    )
                  )}
                </select>

              </div>

            </div>

            {/* SELECTED COURSE DETAILS */}
            {selectedCourseData && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                <h3 className="font-semibold text-slate-900">
                  Course Completion Details
                </h3>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-slate-400">
                      Course
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedCourseData.title}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-slate-400">
                      Score
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedCourseData.score}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4 sm:col-span-2">
                    <p className="text-xs text-slate-400">
                      Completion Date
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedCourseData.completionDate}
                    </p>
                  </div>

                </div>

              </div>
            )}

            {/* CUSTOM NOTE */}
            <div>

              <label
                htmlFor="customNote"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Additional Note
                <span className="ml-1 font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <textarea
                id="customNote"
                value={customNote}
                onChange={(event) =>
                  setCustomNote(
                    event.target.value
                  )
                }
                rows={4}
                placeholder="Add any additional information for the Course Manager..."
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* SUBMIT */}
            <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

              <Link
                to="/student/dashboard"
                className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Send size={17} />
                Submit Certificate Request
              </button>

            </div>

          </div>

        </form>

      </div>

    </DashboardLayout>
  );
}