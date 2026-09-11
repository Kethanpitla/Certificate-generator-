import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";

interface Course {
  id: string;
  title: string;
  code: string;
  instructor: string;
  duration: string;
  learners: number;
  status: "Active" | "Draft" | "Completed";
  startDate: string;
}

const initialCourses: Course[] = [
  {
    id: "CS101",
    title: "Full Stack Web Development",
    code: "FSWD-101",
    instructor: "John Smith",
    duration: "12 Weeks",
    learners: 128,
    status: "Active",
    startDate: "Jan 15, 2026",
  },
  {
    id: "AI202",
    title: "Artificial Intelligence & Machine Learning",
    code: "AIML-202",
    instructor: "Sarah Wilson",
    duration: "16 Weeks",
    learners: 96,
    status: "Active",
    startDate: "Feb 01, 2026",
  },
  {
    id: "DS303",
    title: "Data Science with Python",
    code: "DSP-303",
    instructor: "Michael Brown",
    duration: "10 Weeks",
    learners: 74,
    status: "Completed",
    startDate: "Nov 10, 2025",
  },
  {
    id: "UI404",
    title: "UI/UX Design Fundamentals",
    code: "UIUX-404",
    instructor: "Emily Davis",
    duration: "8 Weeks",
    learners: 52,
    status: "Draft",
    startDate: "Mar 10, 2026",
  },
];

export default function Courses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filteredCourses = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return courses;
    }

    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.code.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query),
    );
  }, [courses, search]);

  const activeCourses = courses.filter(
    (course) => course.status === "Active",
  ).length;

  const completedCourses = courses.filter(
    (course) => course.status === "Completed",
  ).length;

  const totalLearners = courses.reduce(
    (total, course) => total + course.learners,
    0,
  );

  const deleteCourse = (id: string) => {
    setCourses((currentCourses) =>
      currentCourses.filter((course) => course.id !== id),
    );

    setOpenMenu(null);
  };

  return (
    <DashboardLayout activeItem="Courses">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Courses
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage courses and learners for your organization.
            </p>
          </div>

          <Link
            to="/courses/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Create Course
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Courses
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {courses.length}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <BookOpen size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Active Courses
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {activeCourses}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CheckCircle2 size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Completed
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {completedCourses}
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <Clock3 size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Learners
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {totalLearners}
                </p>
              </div>

              <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                <Users size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* Course List */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                All Courses
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                View and manage your organization's courses.
              </p>
            </div>

            <div className="relative w-full lg:w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Instructor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Learners
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {course.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {course.code}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {course.instructor}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {course.duration}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users size={16} />
                        {course.learners}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          course.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : course.status === "Completed"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>

                    <td className="relative px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/courses/${course.id}`)}
                          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                          View Details
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === course.id ? null : course.id,
                            )
                          }
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                          <MoreVertical size={18} />
                        </button>
                      </div>

                      {openMenu === course.id && (
                        <div className="absolute right-6 top-14 z-20 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-left shadow-lg">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/courses/${course.id}`)
                            }
                            className="w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                          >
                            View Course
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteCourse(course.id)}
                            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredCourses.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-16 text-center"
                    >
                      <BookOpen
                        size={40}
                        className="mx-auto text-slate-300"
                      />
                      <p className="mt-3 font-semibold text-slate-700">
                        No courses found
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or create a new course.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}