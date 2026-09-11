import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Download,
  FileText,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";

interface IssuedCertificate {
  id: string;
  recipient: string;
  course: string;
  issueDate: string;
  status: "Active" | "Revoked";
  issuer: string;
}

const issuedCertificates: IssuedCertificate[] = [
  {
    id: "CERT-2026-000184",
    recipient: "Rahul Sharma",
    course: "Advanced Web Development",
    issueDate: "Sep 10, 2026",
    status: "Active",
    issuer: "Admin User",
  },
  {
    id: "CERT-2026-000183",
    recipient: "Priya Reddy",
    course: "Python Programming",
    issueDate: "Sep 10, 2026",
    status: "Active",
    issuer: "Admin User",
  },
  {
    id: "CERT-2026-000182",
    recipient: "Arjun Kumar",
    course: "Data Science Fundamentals",
    issueDate: "Sep 09, 2026",
    status: "Active",
    issuer: "Course Manager",
  },
  {
    id: "CERT-2026-000181",
    recipient: "Sneha Patel",
    course: "UI/UX Design",
    issueDate: "Sep 08, 2026",
    status: "Active",
    issuer: "Course Manager",
  },
  {
    id: "CERT-2026-000180",
    recipient: "Vikram Singh",
    course: "Machine Learning",
    issueDate: "Sep 07, 2026",
    status: "Revoked",
    issuer: "Admin User",
  },
  {
    id: "CERT-2026-000179",
    recipient: "Ananya Rao",
    course: "Cloud Computing",
    issueDate: "Sep 06, 2026",
    status: "Active",
    issuer: "Admin User",
  },
];

export default function IssuanceReport() {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("Last 30 Days");

  const filteredCertificates = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return issuedCertificates;
    }

    return issuedCertificates.filter(
      (certificate) =>
        certificate.id.toLowerCase().includes(value) ||
        certificate.recipient.toLowerCase().includes(value) ||
        certificate.course.toLowerCase().includes(value) ||
        certificate.issuer.toLowerCase().includes(value),
    );
  }, [search]);

  const activeCertificates = issuedCertificates.filter(
    (certificate) => certificate.status === "Active",
  ).length;

  const revokedCertificates = issuedCertificates.filter(
    (certificate) => certificate.status === "Revoked",
  ).length;

  const totalCertificates = issuedCertificates.length;

  const activePercentage =
    totalCertificates > 0
      ? Math.round((activeCertificates / totalCertificates) * 100)
      : 0;

  const handleExport = () => {
    const headers = [
      "Certificate ID",
      "Recipient",
      "Course",
      "Issue Date",
      "Status",
      "Issuer",
    ];

    const rows = issuedCertificates.map((certificate) => [
      certificate.id,
      certificate.recipient,
      certificate.course,
      certificate.issueDate,
      certificate.status,
      certificate.issuer,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${value.replace(/"/g, '""')}"`)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "issuance-report.csv";
    anchor.click();

    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout activeItem="Issuance Report">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link to="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>

              <span>/</span>

              <span>Reports</span>

              <span>/</span>

              <span className="text-slate-700">
                Issuance Report
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Issuance Report
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Analyze certificates issued by your organization.
            </p>
          </div>

          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Download size={17} />
            Export Report
          </button>
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
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search certificate, recipient, course or issuer..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="relative">
              <CalendarDays
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                className="min-w-[180px] appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm font-medium text-slate-700 focus:border-blue-500"
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>This Year</option>
                <option>All Time</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ReportCard
            title="Total Issued"
            value={String(totalCertificates)}
            description="Certificates generated"
            icon={<Award size={24} />}
            iconClass="bg-blue-50 text-blue-600"
          />

          <ReportCard
            title="Active Certificates"
            value={String(activeCertificates)}
            description={`${activePercentage}% of issued certificates`}
            icon={<CheckCircle2 size={24} />}
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <ReportCard
            title="Revoked"
            value={String(revokedCertificates)}
            description="Certificates no longer valid"
            icon={<FileText size={24} />}
            iconClass="bg-red-50 text-red-600"
          />

          <ReportCard
            title="Recipients"
            value={String(totalCertificates)}
            description="Unique certificate recipients"
            icon={<Users size={24} />}
            iconClass="bg-purple-50 text-purple-600"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 xl:grid-cols-2">
          {/* Monthly issuance */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Issuance Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Certificates issued during the selected period.
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                <BarChart3 size={20} />
              </div>
            </div>

            <div className="mt-8 flex h-56 items-end justify-between gap-3 border-b border-l border-slate-200 px-4 pb-0">
              {[
                { month: "Apr", value: 42 },
                { month: "May", value: 58 },
                { month: "Jun", value: 72 },
                { month: "Jul", value: 64 },
                { month: "Aug", value: 88 },
                { month: "Sep", value: 96 },
              ].map((item) => (
                <div
                  key={item.month}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="text-xs font-semibold text-slate-500">
                    {item.value}
                  </span>

                  <div
                    className="w-full max-w-12 rounded-t-lg bg-blue-500 transition hover:bg-blue-600"
                    style={{
                      height: `${item.value * 1.5}px`,
                    }}
                  />

                  <span className="mb-2 text-xs text-slate-400">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Course distribution */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Certificates by Course
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Distribution across available courses.
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600">
                <TrendingUp size={20} />
              </div>
            </div>

            <div className="mt-7 space-y-5">
              <ProgressRow
                title="Advanced Web Development"
                value={32}
                count={32}
              />

              <ProgressRow
                title="Python Programming"
                value={25}
                count={25}
              />

              <ProgressRow
                title="Data Science Fundamentals"
                value={20}
                count={20}
              />

              <ProgressRow
                title="UI/UX Design"
                value={14}
                count={14}
              />

              <ProgressRow
                title="Other Courses"
                value={9}
                count={9}
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Issued Certificates
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Detailed certificate issuance records.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
              {filteredCertificates.length} records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Certificate ID
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
                    Issuer
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
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
                      <Link
                        to={`/certificates/${certificate.id}`}
                        className="font-semibold text-blue-600 hover:text-blue-700"
                      >
                        {certificate.id}
                      </Link>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-800">
                      {certificate.recipient}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {certificate.course}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {certificate.issueDate}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {certificate.issuer}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCertificates.length === 0 && (
            <div className="py-14 text-center">
              <FileText
                size={40}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-3 font-semibold text-slate-800">
                No records found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function ReportCard({
  title,
  value,
  description,
  icon,
  iconClass,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div className={`rounded-xl p-3 ${iconClass}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function ProgressRow({
  title,
  value,
  count,
}: {
  title: string;
  value: number;
  count: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="truncate text-sm font-medium text-slate-700">
          {title}
        </span>

        <span className="shrink-0 text-xs font-semibold text-slate-500">
          {count}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}