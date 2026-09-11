import {  type ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Download,
  FileSpreadsheet,
  Info,
  Upload,
  Users,
  X,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";

interface Course {
  id: string;
  title: string;
  code: string;
}

interface Template {
  id: string;
  name: string;
}

const courses: Course[] = [
  {
    id: "CS101",
    title: "Full Stack Web Development",
    code: "FSWD-101",
  },
  {
    id: "AI202",
    title: "Artificial Intelligence & Machine Learning",
    code: "AIML-202",
  },
  {
    id: "DS303",
    title: "Data Science with Python",
    code: "DSP-303",
  },
  {
    id: "UI404",
    title: "UI/UX Design Fundamentals",
    code: "UIUX-404",
  },
];

const templates: Template[] = [
  {
    id: "TPL-001",
    name: "Professional Course Certificate",
  },
  {
    id: "TPL-002",
    name: "Modern Achievement Certificate",
  },
  {
    id: "TPL-003",
    name: "Excellence Award",
  },
];

interface Learner {
  name: string;
  email: string;
  grade: string;
}

const sampleLearners: Learner[] = [
  {
    name: "John Anderson",
    email: "john@example.com",
    grade: "A+",
  },
  {
    name: "Sarah Williams",
    email: "sarah@example.com",
    grade: "A",
  },
  {
    name: "Michael Brown",
    email: "michael@example.com",
    grade: "A",
  },
  {
    name: "Emily Davis",
    email: "emily@example.com",
    grade: "B+",
  },
  {
    name: "Robert Wilson",
    email: "robert@example.com",
    grade: "A",
  },
];

export default function BulkGenerate() {
  const navigate = useNavigate();

  const [courseId, setCourseId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [fileName, setFileName] = useState("");
  const [learners, setLearners] = useState<Learner[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  const canStart =
    courseId.trim() !== "" &&
    templateId.trim() !== "" &&
    learners.length > 0;

  const handleFileUpload = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    // Frontend demonstration data.
    // Real CSV/Excel parsing will be connected to the backend later.
    setLearners(sampleLearners);
    setCompleted(false);
    setProgress(0);
  };

  const removeFile = () => {
    setFileName("");
    setLearners([]);
    setProgress(0);
    setCompleted(false);
  };

  const downloadSample = () => {
    const csv =
      "name,email,grade\nJohn Anderson,john@example.com,A+\nSarah Williams,sarah@example.com,A\nMichael Brown,michael@example.com,A";

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "certificate_learners_template.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const startGeneration = () => {
    if (!canStart) return;

    setIsProcessing(true);
    setCompleted(false);
    setProgress(0);

    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += 20;

      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsProcessing(false);
        setCompleted(true);
      }
    }, 500);
  };

  return (
    <DashboardLayout activeItem="Bulk Generate">
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
                Bulk Generate Certificates
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Generate certificates for multiple learners at once.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700">
            <Users size={17} />
            Batch certificate generation
          </div>
        </div>

        {/* Success */}
        {completed && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                  <CheckCircle2 size={21} />
                </div>

                <div>
                  <h2 className="font-bold text-emerald-900">
                    Bulk generation completed
                  </h2>

                  <p className="mt-1 text-sm text-emerald-700">
                    {learners.length} certificates have been generated
                    successfully.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/certificates")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                View Certificates
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_400px]">
          {/* Main */}
          <div className="space-y-6">
            {/* Course and Template */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  1. Generation Settings
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose the course and template for this batch.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Course
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <select
                      value={courseId}
                      onChange={(event) =>
                        setCourseId(event.target.value)
                      }
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
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Certificate Template
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <select
                      value={templateId}
                      onChange={(event) =>
                        setTemplateId(event.target.value)
                      }
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm text-slate-900 focus:border-blue-500 focus:bg-white"
                    >
                      <option value="">Select a template</option>

                      {templates.map((template) => (
                        <option
                          key={template.id}
                          value={template.id}
                        >
                          {template.name}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={18}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Upload */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  2. Upload Learner List
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Upload a CSV or Excel file containing learner
                  information.
                </p>
              </div>

              {!fileName ? (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center transition hover:border-blue-400 hover:bg-blue-50">
                  <div className="rounded-2xl bg-white p-4 text-blue-600 shadow-sm">
                    <Upload size={30} />
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-slate-800">
                    Upload CSV or Excel file
                  </h3>

                  <p className="mt-2 max-w-md text-xs leading-5 text-slate-500">
                    Your file should contain columns for learner
                    name, email, and optional grade or score.
                  </p>

                  <span className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white">
                    Choose File
                  </span>

                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              ) : (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-white p-3 text-emerald-600 shadow-sm">
                        <FileSpreadsheet size={24} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {fileName}
                        </p>

                        <p className="mt-1 text-xs text-emerald-700">
                          {learners.length} learner records loaded
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removeFile}
                      className="rounded-lg p-2 text-red-500 transition hover:bg-white"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-col gap-3 rounded-xl bg-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <Info
                    size={18}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <p className="text-xs leading-5 text-blue-700">
                    Need a sample format? Download the CSV template
                    and replace the sample learner information.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={downloadSample}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-blue-700 shadow-sm transition hover:bg-blue-100"
                >
                  <Download size={15} />
                  Download Template
                </button>
              </div>
            </div>

            {/* Preview Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      3. Validate Learners
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Review the learner records before generation.
                    </p>
                  </div>

                  {learners.length > 0 && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {learners.length} records
                    </span>
                  )}
                </div>
              </div>

              {learners.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[650px]">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          #
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Learner
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Email
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Grade
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {learners.map((learner, index) => (
                        <tr key={`${learner.email}-${index}`}>
                          <td className="px-6 py-4 text-sm text-slate-500">
                            {index + 1}
                          </td>

                          <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                            {learner.name}
                          </td>

                          <td className="px-6 py-4 text-sm text-slate-600">
                            {learner.email}
                          </td>

                          <td className="px-6 py-4 text-sm text-slate-600">
                            {learner.grade}
                          </td>

                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                              <CheckCircle2 size={13} />
                              Valid
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="px-6 py-14 text-center">
                  <FileSpreadsheet
                    size={42}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 font-semibold text-slate-700">
                    No learner data yet
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Upload a CSV or Excel file to preview learners.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Side Panel */}
          <div className="h-fit space-y-6 xl:sticky xl:top-24">
            {/* Summary */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Generation Summary
              </h2>

              <div className="mt-5 space-y-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Course
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {courses.find((course) => course.id === courseId)
                      ?.title || "Not selected"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Template
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {templates.find(
                      (template) => template.id === templateId,
                    )?.name || "Not selected"}
                  </p>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-blue-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-white p-2 text-blue-600">
                      <Users size={18} />
                    </div>

                    <span className="text-sm font-medium text-blue-800">
                      Learners
                    </span>
                  </div>

                  <span className="text-xl font-bold text-blue-900">
                    {learners.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress */}
            {isProcessing && (
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-blue-900">
                    Generating certificates
                  </p>

                  <p className="text-sm font-bold text-blue-700">
                    {progress}%
                  </p>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-blue-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="mt-3 text-xs text-blue-700">
                  Please keep this page open while the batch is being
                  processed.
                </p>
              </div>
            )}

            {/* Start */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">
                Start Generation
              </h3>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                Each learner will receive a unique certificate ID and
                QR verification code.
              </p>

              <button
                type="button"
                onClick={startGeneration}
                disabled={!canStart || isProcessing}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:bg-slate-300"
              >
                {isProcessing ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Generate {learners.length || ""} Certificates
                  </>
                )}
              </button>

              {!canStart && (
                <p className="mt-3 text-center text-xs text-slate-400">
                  Select a course, template, and upload learner data.
                </p>
              )}
            </div>

            {/* Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">
                How bulk generation works
              </h3>

              <div className="mt-5 space-y-4">
                {[
                  "Select a course and certificate template.",
                  "Upload your CSV or Excel learner list.",
                  "Review and validate learner information.",
                  "Generate certificates with unique IDs and QR codes.",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                      {index + 1}
                    </div>

                    <p className="text-xs leading-5 text-slate-600">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}