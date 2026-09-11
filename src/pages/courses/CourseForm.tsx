import {
  ArrowLeft,
  BookOpen,
  Save,
  CalendarDays,
  FileText,
  User,
  Hash,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";

interface FormData {
  title: string;
  code: string;
  description: string;
  instructor: string;
  startDate: string;
  endDate: string;
  duration: string;
  status: "Active" | "Draft";
}

const initialForm: FormData = {
  title: "",
  code: "",
  description: "",
  instructor: "",
  startDate: "",
  endDate: "",
  duration: "",
  status: "Draft",
};

export default function CourseForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [saved, setSaved] = useState(false);

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));

    setSaved(false);
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.title.trim()) {
      newErrors.title = "Course title is required.";
    }

    if (!form.code.trim()) {
      newErrors.code = "Course code is required.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Course description is required.";
    }

    if (!form.instructor.trim()) {
      newErrors.instructor = "Instructor name is required.";
    }

    if (!form.startDate) {
      newErrors.startDate = "Start date is required.";
    }

    if (!form.endDate) {
      newErrors.endDate = "End date is required.";
    }

    if (
      form.startDate &&
      form.endDate &&
      form.endDate < form.startDate
    ) {
      newErrors.endDate = "End date must be after the start date.";
    }

    if (!form.duration.trim()) {
      newErrors.duration = "Course duration is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setSaved(true);
  };

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

      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
          <BookOpen className="h-4 w-4" />
          <span>Course Management</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Create Course
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Add the course information required for certificate generation.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Main Information */}
          <div className="xl:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-base font-semibold text-slate-900">
                Course Information
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Enter the basic details of the course.
              </p>
            </div>

            <div className="space-y-6 p-6">
              {/* Course Title */}
              <div>
                <label
                  htmlFor="course-title"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Course Title <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="course-title"
                    type="text"
                    value={form.title}
                    onChange={(event) =>
                      updateField("title", event.target.value)
                    }
                    placeholder="e.g. Generative AI & Prompt Engineering"
                    className={`h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 ${
                      errors.title
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
                    }`}
                  />
                </div>

                {errors.title && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Course Code */}
              <div>
                <label
                  htmlFor="course-code"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Course Code <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="course-code"
                    type="text"
                    value={form.code}
                    onChange={(event) =>
                      updateField(
                        "code",
                        event.target.value.toUpperCase()
                      )
                    }
                    placeholder="e.g. GAI-001"
                    className={`h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm font-medium text-slate-700 placeholder:font-normal placeholder:text-slate-400 transition focus:outline-none focus:ring-2 ${
                      errors.code
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
                    }`}
                  />
                </div>

                {errors.code && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.code}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="course-description"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Description <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                  <textarea
                    id="course-description"
                    value={form.description}
                    onChange={(event) =>
                      updateField("description", event.target.value)
                    }
                    placeholder="Describe the course and what learners will achieve..."
                    rows={5}
                    className={`w-full resize-none rounded-lg border bg-white py-3 pl-10 pr-4 text-sm leading-6 text-slate-700 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 ${
                      errors.description
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
                    }`}
                  />
                </div>

                <div className="mt-1.5 flex justify-between">
                  {errors.description ? (
                    <p className="text-xs text-red-600">
                      {errors.description}
                    </p>
                  ) : (
                    <span />
                  )}

                  <span className="text-xs text-slate-400">
                    {form.description.length}/500
                  </span>
                </div>
              </div>

              {/* Instructor */}
              <div>
                <label
                  htmlFor="instructor"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Instructor <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="instructor"
                    type="text"
                    value={form.instructor}
                    onChange={(event) =>
                      updateField("instructor", event.target.value)
                    }
                    placeholder="e.g. Admin User"
                    className={`h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 ${
                      errors.instructor
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
                    }`}
                  />
                </div>

                {errors.instructor && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.instructor}
                  </p>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="start-date"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Start Date <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      id="start-date"
                      type="date"
                      value={form.startDate}
                      onChange={(event) =>
                        updateField("startDate", event.target.value)
                      }
                      className={`h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm text-slate-700 transition focus:outline-none focus:ring-2 ${
                        errors.startDate
                          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                          : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
                      }`}
                    />
                  </div>

                  {errors.startDate && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.startDate}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="end-date"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    End Date <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      id="end-date"
                      type="date"
                      value={form.endDate}
                      onChange={(event) =>
                        updateField("endDate", event.target.value)
                      }
                      className={`h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm text-slate-700 transition focus:outline-none focus:ring-2 ${
                        errors.endDate
                          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                          : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
                      }`}
                    />
                  </div>

                  {errors.endDate && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.endDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label
                  htmlFor="duration"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Course Duration <span className="text-red-500">*</span>
                </label>

                <input
                  id="duration"
                  type="text"
                  value={form.duration}
                  onChange={(event) =>
                    updateField("duration", event.target.value)
                  }
                  placeholder="e.g. 10 Weeks"
                  className={`h-11 w-full rounded-lg border bg-white px-4 text-sm text-slate-700 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 ${
                    errors.duration
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
                  }`}
                />

                {errors.duration && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.duration}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-base font-semibold text-slate-900">
                Course Settings
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Configure the course status.
              </p>
            </div>

            <div className="space-y-6 p-6">
              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Status
                </label>

                <select
                  id="status"
                  value={form.status}
                  onChange={(event) =>
                    updateField(
                      "status",
                      event.target.value as FormData["status"]
                    )
                  }
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                </select>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-800">
                  Certificate Generation
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Once the course is active, certificates can be generated
                  for completed learners.
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50">
                    <AwardIcon />
                  </div>

                  <span className="text-xs font-medium text-slate-700">
                    Certificate generation supported
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs font-semibold text-blue-800">
                  Tip
                </p>

                <p className="mt-1 text-xs leading-5 text-blue-700">
                  Make sure the course title and code are correct before
                  generating certificates because these details may appear
                  on the final certificate.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            {saved ? (
              <p className="text-sm font-medium text-emerald-600">
                Course saved successfully.
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                Fields marked with <span className="text-red-500">*</span>{" "}
                are required.
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              Save Course
            </button>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}

function AwardIcon() {
  return (
    <svg
      className="h-4 w-4 text-emerald-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.12" />
    </svg>
  );
}