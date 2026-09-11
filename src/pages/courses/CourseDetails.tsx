import {
  ArrowLeft,
  BookOpen,
  Users,
  Award,
  CalendarDays,
  Pencil,
  MoreVertical,
  CheckCircle2,
  Clock3,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";

const courseData = {
  title: "Generative AI & Prompt Engineering",
  code: "GAI-001",
  description:
    "Learn generative AI concepts, prompt engineering techniques and practical AI applications.",
  status: "Active",
  students: 128,
  certificates: 96,
  startDate: "January 10, 2026",
  endDate: "March 20, 2026",
  instructor: "Admin User",
  duration: "10 Weeks",
};

const recentLearners = [
  {
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    status: "Completed",
    certificate: "Issued",
  },
  {
    name: "Priya Reddy",
    email: "priya.reddy@example.com",
    status: "Completed",
    certificate: "Issued",
  },
  {
    name: "Arjun Kumar",
    email: "arjun.kumar@example.com",
    status: "In Progress",
    certificate: "Pending",
  },
  {
    name: "Sneha Patel",
    email: "sneha.patel@example.com",
    status: "Completed",
    certificate: "Issued",
  },
  {
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    status: "In Progress",
    certificate: "Pending",
  },
];

export default function CourseDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <DashboardLayout activeItem="Courses">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/courses")}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Courses
      </button>

      {/* Course Header */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">
                  {courseData.title}
                </h1>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {courseData.status}
                </span>
              </div>

              <p className="mt-2 text-sm font-medium text-blue-600">
                {courseData.code}
              </p>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
                {courseData.description}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Pencil className="h-4 w-4" />
              Edit Course
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Course Meta */}
        <div className="grid grid-cols-1 border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-slate-200 p-5 sm:border-r">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Users className="h-4 w-4" />
              Learners
            </div>

            <p className="mt-2 text-xl font-bold text-slate-900">
              {courseData.students}
            </p>
          </div>

          <div className="border-b border-slate-200 p-5 lg:border-r">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Award className="h-4 w-4" />
              Certificates
            </div>

            <p className="mt-2 text-xl font-bold text-slate-900">
              {courseData.certificates}
            </p>
          </div>

          <div className="border-b border-slate-200 p-5 sm:border-r lg:border-b-0">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <CalendarDays className="h-4 w-4" />
              Course Period
            </div>

            <p className="mt-2 text-sm font-bold text-slate-900">
              {courseData.startDate}
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              to {courseData.endDate}
            </p>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Clock3 className="h-4 w-4" />
              Duration
            </div>

            <p className="mt-2 text-xl font-bold text-slate-900">
              {courseData.duration}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Learners */}
        <div className="xl:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Recent Learners
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Learners enrolled in this course
              </p>
            </div>

            <button
              type="button"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentLearners.map((learner) => (
              <div
                key={learner.email}
                className="flex flex-col gap-3 px-5 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                    {learner.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {learner.name}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {learner.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {learner.status === "Completed" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                      <Clock3 className="h-3.5 w-3.5" />
                      In Progress
                    </span>
                  )}

                  <span className="hidden text-xs text-slate-500 sm:block">
                    Certificate:{" "}
                    <span className="font-semibold text-slate-700">
                      {learner.certificate}
                    </span>
                  </span>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(
                          openMenu === learner.email
                            ? null
                            : learner.email
                        )
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {openMenu === learner.email && (
                      <div className="absolute right-0 top-9 z-10 w-36 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                        <button
                          type="button"
                          onClick={() => setOpenMenu(null)}
                          className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          View Learner
                        </button>

                        <button
                          type="button"
                          onClick={() => setOpenMenu(null)}
                          className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          View Certificate
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Overview */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-900">
              Course Overview
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Current course information
            </p>
          </div>

          <div className="space-y-5 p-5">
            <div>
              <p className="text-xs font-medium text-slate-400">
                Instructor
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {courseData.instructor}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">
                Course Code
              </p>

              <p className="mt-1 font-mono text-sm font-semibold text-blue-600">
                {courseData.code}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">
                Completion Rate
              </p>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  75%
                </span>

                <span className="text-xs text-slate-500">
                  96 of 128 learners
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: "75%" }}
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">
                Certificate Status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />

                <span className="text-sm font-semibold text-slate-700">
                  Certificate generation enabled
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">
                Certificate Template
              </p>

              <div className="mt-2 flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    Professional Certificate
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Default template
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/certificates/generate")}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Generate Certificate
            </button>
          </div>
        </div>
      </div>

      {/* ID reference */}
      <p className="mt-5 text-center text-xs text-slate-400">
        Course ID: {id || "GAI-001"}
      </p>
    </DashboardLayout>
  );
}