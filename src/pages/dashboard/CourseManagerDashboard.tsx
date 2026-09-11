import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  FileCheck,
  Users,
  XCircle,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

export default function CourseManagerDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout activeItem="Dashboard">
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Course Manager Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back, {user?.name || "Course Manager"}.
            Review courses, student work and certificate requests.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Assigned Courses
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  8
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
                  Total Students
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  342
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <Users size={24} />
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
                  12
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Clock size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Approved
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  286
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
            </div>
          </div>

        </div>

        {/* Pending Certificate Requests */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-col gap-3 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Certificate Requests
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review student requests before certificate issuance.
              </p>
            </div>

            <button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
              View All Requests
            </button>
          </div>

          <div className="divide-y divide-slate-100">

            {[
              {
                name: "Rahul Sharma",
                course: "Full Stack Web Development",
                date: "Today",
              },
              {
                name: "Priya Reddy",
                course: "Python Programming",
                date: "Yesterday",
              },
              {
                name: "Arjun Kumar",
                course: "Data Analytics",
                date: "2 days ago",
              },
            ].map((request) => (
              <div
                key={`${request.name}-${request.course}`}
                className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-600">
                    {request.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {request.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {request.course}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Requested {request.date}
                    </p>
                  </div>

                </div>

                <div className="flex gap-2">

                  <button className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100">
                    <XCircle size={17} />
                    Reject
                  </button>

                  <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
                    <CheckCircle2 size={17} />
                    Approve
                  </button>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Course Overview */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <BookOpen size={22} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Course Overview
                </h2>

                <p className="text-sm text-slate-500">
                  Your managed courses
                </p>
              </div>
            </div>

            <div className="space-y-4">

              {[
                ["Full Stack Web Development", "124 students"],
                ["Python Programming", "98 students"],
                ["Data Analytics", "76 students"],
              ].map(([course, students]) => (
                <div
                  key={course}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {course}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {students}
                    </p>
                  </div>

                  <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                    View
                  </button>
                </div>
              ))}

            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <Award size={22} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Quick Actions
                </h2>

                <p className="text-sm text-slate-500">
                  Frequently used actions
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              <button className="rounded-xl border border-slate-200 p-4 text-left hover:bg-slate-50">
                <FileCheck
                  size={20}
                  className="mb-2 text-blue-600"
                />
                <p className="font-semibold text-slate-900">
                  Review Requests
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  12 pending
                </p>
              </button>

              <button className="rounded-xl border border-slate-200 p-4 text-left hover:bg-slate-50">
                <Users
                  size={20}
                  className="mb-2 text-purple-600"
                />
                <p className="font-semibold text-slate-900">
                  View Students
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  342 students
                </p>
              </button>

              <button className="rounded-xl border border-slate-200 p-4 text-left hover:bg-slate-50">
                <BookOpen
                  size={20}
                  className="mb-2 text-emerald-600"
                />
                <p className="font-semibold text-slate-900">
                  Manage Courses
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  8 courses
                </p>
              </button>

              <button className="rounded-xl border border-slate-200 p-4 text-left hover:bg-slate-50">
                <Award
                  size={20}
                  className="mb-2 text-amber-600"
                />
                <p className="font-semibold text-slate-900">
                  Certificates
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  View issued certificates
                </p>
              </button>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}