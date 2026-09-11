import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  FileText,
  Mail,
  QrCode,
  Sparkles,
  User,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";

interface Course {
  id: string;
  title: string;
  code: string;
  instructor: string;
}

interface Template {
  id: string;
  name: string;
  category: string;
}

const courses: Course[] = [
  {
    id: "CS101",
    title: "Full Stack Web Development",
    code: "FSWD-101",
    instructor: "John Smith",
  },
  {
    id: "AI202",
    title: "Artificial Intelligence & Machine Learning",
    code: "AIML-202",
    instructor: "Sarah Wilson",
  },
  {
    id: "DS303",
    title: "Data Science with Python",
    code: "DSP-303",
    instructor: "Michael Brown",
  },
  {
    id: "UI404",
    title: "UI/UX Design Fundamentals",
    code: "UIUX-404",
    instructor: "Emily Davis",
  },
];

const templates: Template[] = [
  {
    id: "TPL-001",
    name: "Professional Course Certificate",
    category: "Course Completion",
  },
  {
    id: "TPL-002",
    name: "Modern Achievement Certificate",
    category: "Achievement",
  },
  {
    id: "TPL-003",
    name: "Excellence Award",
    category: "Award",
  },
];

export default function GenerateCertificate() {
  const navigate = useNavigate();

  const [courseId, setCourseId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [completionDate, setCompletionDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [customNote, setCustomNote] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === courseId),
    [courseId],
  );

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === templateId),
    [templateId],
  );

  const certificateId = useMemo(() => {
    if (!generated) return "CERT-XXXXXXXX";

    return `CERT-${Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase()}`;
  }, [generated]);

  const canGenerate =
    courseId.trim() !== "" &&
    templateId.trim() !== "" &&
    recipientName.trim() !== "";

  const handleGenerate = () => {
    if (!canGenerate) return;

    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 1500);
  };

  const resetForm = () => {
    setCourseId("");
    setTemplateId("");
    setRecipientName("");
    setEmail("");
    setGrade("");
    setCompletionDate(new Date().toISOString().split("T")[0]);
    setCustomNote("");
    setGenerated(false);
  };

  return (
    <DashboardLayout activeItem="Generate Certificate">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/certificates")}
              className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Generate Certificate
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create a professional certificate for a course learner.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700">
            <CheckCircle2 size={17} />
            Secure certificate generation
          </div>
        </div>

        {generated && (
          <div className="flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                <CheckCircle2 size={21} />
              </div>

              <div>
                <h2 className="font-bold text-emerald-900">
                  Certificate generated successfully
                </h2>

                <p className="mt-1 text-sm text-emerald-700">
                  Certificate ID:{" "}
                  <span className="font-bold">{certificateId}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/certificates/result")}
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              View Result
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_520px]">
          {/* Form */}
          <div className="space-y-6">
            {/* Course */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  1. Select Course
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select the course associated with this certificate.
                </p>
              </div>

              <div className="relative">
                <select
                  value={courseId}
                  onChange={(event) => setCourseId(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm text-slate-900 focus:border-blue-500 focus:bg-white"
                >
                  <option value="">Select a course</option>

                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title} ({course.code})
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              {selectedCourse && (
                <div className="mt-4 rounded-xl bg-blue-50 p-4">
                  <p className="text-sm font-semibold text-blue-900">
                    {selectedCourse.title}
                  </p>

                  <p className="mt-1 text-xs text-blue-700">
                    {selectedCourse.code} · Instructor:{" "}
                    {selectedCourse.instructor}
                  </p>
                </div>
              )}
            </div>

            {/* Template */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  2. Select Template
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose the certificate design you want to use.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {templates.map((template) => {
                  const selected = templateId === template.id;

                  return (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => setTemplateId(template.id)}
                      className={`overflow-hidden rounded-xl border-2 text-left transition ${
                        selected
                          ? "border-blue-600 bg-blue-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex h-24 items-center justify-center bg-slate-100">
                        <div className="flex h-16 w-24 flex-col items-center justify-center border-4 border-double border-blue-300 bg-white">
                          <div className="h-1 w-8 rounded-full bg-blue-600" />
                          <span className="mt-1 text-[6px] font-bold uppercase text-slate-500">
                            Certificate
                          </span>
                        </div>
                      </div>

                      <div className="p-3">
                        <p className="text-xs font-semibold text-slate-800">
                          {template.name}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-500">
                          {template.category}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recipient */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  3. Recipient Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter the learner's certificate information.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Recipient Full Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={recipientName}
                      onChange={(event) =>
                        setRecipientName(event.target.value)
                      }
                      placeholder="Enter recipient's full name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="recipient@email.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Grade / Score
                  </label>

                  <input
                    type="text"
                    value={grade}
                    onChange={(event) => setGrade(event.target.value)}
                    placeholder="e.g. A+ or 92%"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Completion Date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="date"
                      value={completionDate}
                      onChange={(event) =>
                        setCompletionDate(event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Custom Note
                  </label>

                  <input
                    type="text"
                    value={customNote}
                    onChange={(event) =>
                      setCustomNote(event.target.value)
                    }
                    placeholder="Optional note"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Generate */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                  <Sparkles size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-blue-900">
                    Ready to generate?
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-blue-700">
                    The system will generate a unique certificate ID,
                    QR code, and certificate document.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={!canGenerate || isGenerating}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:bg-slate-300"
              >
                {isGenerating ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Generating Certificate...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Generate Certificate
                  </>
                )}
              </button>

              {!canGenerate && (
                <p className="mt-3 text-center text-xs text-blue-600">
                  Select a course, template, and enter the recipient name.
                </p>
              )}
            </div>
          </div>

          {/* Live Preview */}
          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:sticky xl:top-24">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Live Preview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Certificate preview
                </p>
              </div>

              <FileText size={20} className="text-slate-400" />
            </div>

            <div className="mt-6 overflow-hidden rounded-xl bg-slate-100 p-4">
              <div className="relative aspect-[1.414/1] overflow-hidden border-[8px] border-double border-blue-700 bg-white shadow-lg">
                <div className="absolute inset-2 border border-blue-200" />

                <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50">
                    <FileText size={18} className="text-blue-600" />
                  </div>

                  <p className="text-[7px] font-bold uppercase tracking-[0.3em] text-blue-600 sm:text-[9px]">
                    Certificate of Completion
                  </p>

                  <h3 className="mt-2 text-sm font-bold text-slate-900 sm:text-lg">
                    {selectedCourse?.title || "Course Title"}
                  </h3>

                  <p className="mt-2 text-[7px] text-slate-500 sm:text-[9px]">
                    This certificate is proudly presented to
                  </p>

                  <p className="mt-1 max-w-full truncate border-b border-slate-300 px-4 pb-1 text-xs font-bold italic text-slate-800 sm:text-base">
                    {recipientName || "Recipient Name"}
                  </p>

                  {grade && (
                    <p className="mt-2 text-[7px] font-semibold text-slate-500 sm:text-[9px]">
                      Grade: {grade}
                    </p>
                  )}

                  <p className="mt-2 max-w-xs text-[6px] leading-3 text-slate-400 sm:text-[8px] sm:leading-4">
                    For successfully completing the required course and
                    demonstrating the required knowledge and skills.
                  </p>

                  <div className="absolute bottom-5 left-4 right-4 flex items-end justify-between">
                    <div className="text-center">
                      <div className="mb-1 h-px w-14 bg-slate-300 sm:w-20" />
                      <p className="text-[5px] text-slate-400 sm:text-[7px]">
                        Authorized Signature
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center border border-slate-300 bg-white sm:h-12 sm:w-12">
                      <QrCode
                        size={25}
                        className="text-slate-700"
                      />
                    </div>

                    <div className="text-center">
                      <div className="mb-1 h-px w-14 bg-slate-300 sm:w-20" />
                      <p className="text-[5px] text-slate-400 sm:text-[7px]">
                        {completionDate || "Completion Date"}
                      </p>
                    </div>
                  </div>

                  <p className="absolute bottom-1 text-[5px] text-slate-400 sm:text-[6px]">
                    {certificateId}
                  </p>
                </div>
              </div>
            </div>

            {/* Preview Information */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span className="text-xs text-slate-500">
                  Course
                </span>

                <span className="max-w-[220px] truncate text-xs font-semibold text-slate-700">
                  {selectedCourse?.title || "Not selected"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span className="text-xs text-slate-500">
                  Template
                </span>

                <span className="max-w-[220px] truncate text-xs font-semibold text-slate-700">
                  {selectedTemplate?.name || "Not selected"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span className="text-xs text-slate-500">
                  Certificate ID
                </span>

                <span className="text-xs font-semibold text-slate-700">
                  {certificateId}
                </span>
              </div>
            </div>

            {generated && (
              <button
                type="button"
                onClick={resetForm}
                className="mt-5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Generate Another Certificate
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}