import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Award,
  CheckCircle2,
  ChevronDown,
  Download,
  Eye,
  FileText,
  Plus,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";

type CertificateStatus = "Active" | "Revoked";

interface Certificate {
  id: string;
  recipient: string;
  email: string;
  course: string;
  template: string;
  issueDate: string;
  completionDate: string;
  status: CertificateStatus;
  grade: string;
  issuer: string;
  verificationCode: string;
}

const certificates: Certificate[] = [
  {
    id: "CERT-2026-000184",
    recipient: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    course: "Advanced Web Development",
    template: "Professional Blue",
    issueDate: "Sep 10, 2026",
    completionDate: "Sep 09, 2026",
    status: "Active",
    grade: "A+",
    issuer: "Admin User",
    verificationCode: "VH8K2P91",
  },
  {
    id: "CERT-2026-000183",
    recipient: "Priya Reddy",
    email: "priya.reddy@example.com",
    course: "Python Programming",
    template: "Modern Gold",
    issueDate: "Sep 10, 2026",
    completionDate: "Sep 08, 2026",
    status: "Active",
    grade: "A",
    issuer: "Admin User",
    verificationCode: "Q7M4XK28",
  },
  {
    id: "CERT-2026-000182",
    recipient: "Arjun Kumar",
    email: "arjun.kumar@example.com",
    course: "Data Science Fundamentals",
    template: "Classic White",
    issueDate: "Sep 09, 2026",
    completionDate: "Sep 07, 2026",
    status: "Active",
    grade: "A+",
    issuer: "Course Manager",
    verificationCode: "P4N8LQ62",
  },
  {
    id: "CERT-2026-000181",
    recipient: "Sneha Patel",
    email: "sneha.patel@example.com",
    course: "UI/UX Design",
    template: "Creative Purple",
    issueDate: "Sep 08, 2026",
    completionDate: "Sep 06, 2026",
    status: "Active",
    grade: "B+",
    issuer: "Course Manager",
    verificationCode: "T6R9ZW41",
  },
  {
    id: "CERT-2026-000180",
    recipient: "Vikram Singh",
    email: "vikram.singh@example.com",
    course: "Machine Learning",
    template: "Professional Blue",
    issueDate: "Sep 07, 2026",
    completionDate: "Sep 05, 2026",
    status: "Revoked",
    grade: "B",
    issuer: "Admin User",
    verificationCode: "Y2C7MN84",
  },
  {
    id: "CERT-2026-000179",
    recipient: "Ananya Rao",
    email: "ananya.rao@example.com",
    course: "Cloud Computing",
    template: "Modern Gold",
    issueDate: "Sep 06, 2026",
    completionDate: "Sep 04, 2026",
    status: "Active",
    grade: "A",
    issuer: "Admin User",
    verificationCode: "K5V3RX17",
  },
  {
    id: "CERT-2026-000178",
    recipient: "Karthik Reddy",
    email: "karthik.reddy@example.com",
    course: "React.js Development",
    template: "Classic White",
    issueDate: "Sep 05, 2026",
    completionDate: "Sep 03, 2026",
    status: "Active",
    grade: "A+",
    issuer: "Course Manager",
    verificationCode: "B9H4QS53",
  },
];

export default function Certificates() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [courseFilter, setCourseFilter] = useState("All Courses");

  const courses = Array.from(
    new Set(certificates.map((certificate) => certificate.course)),
  );

  const filteredCertificates = useMemo(() => {
    return certificates.filter((certificate) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        certificate.id.toLowerCase().includes(searchValue) ||
        certificate.recipient.toLowerCase().includes(searchValue) ||
        certificate.email.toLowerCase().includes(searchValue) ||
        certificate.course.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All Status" ||
        certificate.status === statusFilter;

      const matchesCourse =
        courseFilter === "All Courses" ||
        certificate.course === courseFilter;

      return matchesSearch && matchesStatus && matchesCourse;
    });
  }, [search, statusFilter, courseFilter]);

  const activeCount = certificates.filter(
    (certificate) => certificate.status === "Active",
  ).length;

  const revokedCount = certificates.filter(
    (certificate) => certificate.status === "Revoked",
  ).length;

  const downloadCertificate = (certificate: Certificate) => {
    const content = `
Certificate ID: ${certificate.id}
Recipient: ${certificate.recipient}
Course: ${certificate.course}
Grade: ${certificate.grade}
Completion Date: ${certificate.completionDate}
Issue Date: ${certificate.issueDate}
Status: ${certificate.status}
Verification Code: ${certificate.verificationCode}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${certificate.id}.txt`;
    anchor.click();

    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout activeItem="All Certificates">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link to="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
              <span>/</span>
              <span className="text-slate-700">Certificates</span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              All Certificates
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage, view and verify certificates issued by your organization.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/certificates/bulk"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <FileText size={17} />
              Bulk Generate
            </Link>

            <Link
              to="/certificates/generate"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={17} />
              Generate Certificate
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Certificates
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {certificates.length}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Award size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Active
                </p>
                <p className="mt-2 text-3xl font-bold text-emerald-600">
                  {activeCount}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Revoked
                </p>
                <p className="mt-2 text-3xl font-bold text-red-600">
                  {revokedCount}
                </p>
              </div>

              <div className="rounded-xl bg-red-50 p-3 text-red-600">
                <XCircle size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Verification Ready
                </p>
                <p className="mt-2 text-3xl font-bold text-purple-600">
                  {activeCount}
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <ShieldCheck size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search certificate ID, recipient, email or course..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="min-w-[160px] appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 focus:border-blue-500"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Revoked</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            <div className="relative">
              <select
                value={courseFilter}
                onChange={(event) => setCourseFilter(event.target.value)}
                className="min-w-[210px] appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 focus:border-blue-500"
              >
                <option>All Courses</option>
                {courses.map((course) => (
                  <option key={course}>{course}</option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Certificate
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Recipient
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Course
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Issue Date
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Grade
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredCertificates.map((certificate) => (
                  <tr
                    key={certificate.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <button
                        onClick={() =>
                          navigate(`/certificates/${certificate.id}`)
                        }
                        className="text-left"
                      >
                        <p className="font-semibold text-blue-600 hover:text-blue-700">
                          {certificate.id}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {certificate.verificationCode}
                        </p>
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {certificate.recipient}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {certificate.email}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-800">
                        {certificate.course}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {certificate.template}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {certificate.issueDate}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-sm font-semibold text-blue-700">
                        {certificate.grade}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      {certificate.status === "Active" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                          Revoked
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            navigate(`/certificates/${certificate.id}`)
                          }
                          title="View certificate"
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() => downloadCertificate(certificate)}
                          title="Download certificate"
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          <Download size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCertificates.length === 0 && (
            <div className="px-6 py-16 text-center">
              <Award className="mx-auto text-slate-300" size={42} />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No certificates found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredCertificates.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {certificates.length}
              </span>{" "}
              certificates
            </p>

            <div className="text-xs text-slate-400">
              Certificate records are stored securely
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}