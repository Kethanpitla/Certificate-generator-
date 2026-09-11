import {
  Award,
  BookOpen,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Search,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout activeItem="Dashboard">
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Student Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back, {user?.name || "Student"}.
            Track your courses and certificates.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Enrolled Courses
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  5
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <BookOpen size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Completed
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  3
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <GraduationCap size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Certificates
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  2
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <Award size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Pending Requests
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  1
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Clock size={24} />
              </div>
            </div>
          </div>

        </div>

        {/* My Courses */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                My Courses
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Courses you are currently enrolled in.
              </p>
            </div>

            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">

            {[
              {
                title: "Full Stack Web Development",
                progress: 100,
                status: "Completed",
              },
              {
                title: "Python Programming",
                progress: 85,
                status: "In Progress",
              },
              {
                title: "Data Analytics",
                progress: 100,
                status: "Completed",
              },
            ].map((course) => (
              <div
                key={course.title}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <BookOpen size={23} />
                </div>

                <h3 className="font-semibold text-slate-900">
                  {course.title}
                </h3>

                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-500">
                      Progress
                    </span>

                    <span className="font-semibold text-slate-700">
                      {course.progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{
                        width: `${course.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      course.status === "Completed"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Certificates */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900">
              My Certificates
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Download and verify your earned certificates.
            </p>
          </div>

          <div className="divide-y divide-slate-100">

            {[
              {
                course: "Full Stack Web Development",
                id: "CERT-2026-00124",
                date: "Aug 24, 2026",
              },
              {
                course: "Data Analytics",
                id: "CERT-2026-00098",
                date: "Jul 18, 2026",
              },
            ].map((certificate) => (
              <div
                key={certificate.id}
                className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Award size={22} />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {certificate.course}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Certificate ID: {certificate.id}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Issued: {certificate.date}
                    </p>
                  </div>

                </div>

                <div className="flex gap-2">

                  <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    <Search size={17} />
                    Verify
                  </button>

                  <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                    <Download size={17} />
                    Download
                  </button>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Request Certificate */}
        <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <FileText size={22} />
              </div>

              <h2 className="text-xl font-bold">
                Request a Certificate
              </h2>

              <p className="mt-1 max-w-xl text-sm text-slate-300">
                Completed a course? Submit your certificate
                request for review by the Course Manager.
              </p>
            </div>

            <button
  type="button"
  onClick={() =>
    window.location.href =
      "/student/certificate-request"
  }
  className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
>
  Request Certificate
</button>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}