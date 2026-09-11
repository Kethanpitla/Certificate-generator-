import { useMemo, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  AlertTriangle,
  CalendarDays,
  ChevronDown,
  Download,
  FileWarning,
  RefreshCw,
  Search,
  ShieldAlert,
  XCircle,
} from "lucide-react";

interface RevokedCertificate {
  id: string;
  recipient: string;
  email: string;
  course: string;
  issuer: string;
  issuedDate: string;
  revokedDate: string;
  reason: string;
  status: "Revoked";
}

const revokedCertificates: RevokedCertificate[] = [
  {
    id: "CERT-2026-00421",
    recipient: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    course: "Advanced React Development",
    issuer: "Admin User",
    issuedDate: "2026-08-12",
    revokedDate: "2026-09-02",
    reason: "Incorrect recipient information",
    status: "Revoked",
  },
  {
    id: "CERT-2026-00398",
    recipient: "Priya Reddy",
    email: "priya.reddy@example.com",
    course: "Python for Data Science",
    issuer: "Course Manager",
    issuedDate: "2026-07-28",
    revokedDate: "2026-08-29",
    reason: "Certificate issued in error",
    status: "Revoked",
  },
  {
    id: "CERT-2026-00376",
    recipient: "Arjun Kumar",
    email: "arjun.kumar@example.com",
    course: "Full Stack Web Development",
    issuer: "Admin User",
    issuedDate: "2026-07-15",
    revokedDate: "2026-08-21",
    reason: "Course completion requirement not met",
    status: "Revoked",
  },
  {
    id: "CERT-2026-00344",
    recipient: "Sneha Patel",
    email: "sneha.patel@example.com",
    course: "UI/UX Design Fundamentals",
    issuer: "Course Manager",
    issuedDate: "2026-06-30",
    revokedDate: "2026-08-14",
    reason: "Duplicate certificate",
    status: "Revoked",
  },
  {
    id: "CERT-2026-00321",
    recipient: "Vikram Singh",
    email: "vikram.singh@example.com",
    course: "Cloud Computing Essentials",
    issuer: "Admin User",
    issuedDate: "2026-06-18",
    revokedDate: "2026-08-08",
    reason: "Unauthorized issuance",
    status: "Revoked",
  },
  {
    id: "CERT-2026-00287",
    recipient: "Ananya Rao",
    email: "ananya.rao@example.com",
    course: "Machine Learning Basics",
    issuer: "Course Manager",
    issuedDate: "2026-05-26",
    revokedDate: "2026-07-31",
    reason: "Incorrect course assignment",
    status: "Revoked",
  },
];

const reasonOptions = [
  "All Reasons",
  "Incorrect recipient information",
  "Certificate issued in error",
  "Course completion requirement not met",
  "Duplicate certificate",
  "Unauthorized issuance",
  "Incorrect course assignment",
];

export default function RevocationReport() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reasonFilter, setReasonFilter] = useState("All Reasons");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredCertificates = useMemo(() => {
    return revokedCertificates.filter((certificate) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        certificate.id.toLowerCase().includes(search) ||
        certificate.recipient.toLowerCase().includes(search) ||
        certificate.email.toLowerCase().includes(search) ||
        certificate.course.toLowerCase().includes(search);

      const matchesReason =
        reasonFilter === "All Reasons" ||
        certificate.reason === reasonFilter;

      const matchesFrom =
        !dateFrom || certificate.revokedDate >= dateFrom;

      const matchesTo =
        !dateTo || certificate.revokedDate <= dateTo;

      return (
        matchesSearch &&
        matchesReason &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [searchTerm, reasonFilter, dateFrom, dateTo]);

  const totalRevoked = revokedCertificates.length;

  const thisMonth = revokedCertificates.filter((certificate) =>
    certificate.revokedDate.startsWith("2026-09")
  ).length;

  const lastMonth = revokedCertificates.filter((certificate) =>
    certificate.revokedDate.startsWith("2026-08")
  ).length;

  const mostCommonReason = "Incorrect recipient information";

  const clearFilters = () => {
    setSearchTerm("");
    setReasonFilter("All Reasons");
    setDateFrom("");
    setDateTo("");
  };

  const exportCSV = () => {
    const headers = [
      "Certificate ID",
      "Recipient",
      "Email",
      "Course",
      "Issuer",
      "Issued Date",
      "Revoked Date",
      "Reason",
      "Status",
    ];

    const rows = filteredCertificates.map((certificate) => [
      certificate.id,
      certificate.recipient,
      certificate.email,
      certificate.course,
      certificate.issuer,
      certificate.issuedDate,
      certificate.revokedDate,
      certificate.reason,
      certificate.status,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "certificate-revocation-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout activeItem="Revocation Report">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100">
                <ShieldAlert className="h-6 w-6 text-red-600" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Revocation Report
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Monitor and analyze revoked certificates.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Revoked
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {totalRevoked}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              All revoked certificates
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  This Month
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {thisMonth}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                <CalendarDays className="h-5 w-5 text-orange-600" />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Revocations in September 2026
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Previous Month
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {lastMonth}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <RefreshCw className="h-5 w-5 text-blue-600" />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Revocations in August 2026
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">
                  Common Reason
                </p>

                <p className="mt-2 truncate text-base font-bold text-slate-900">
                  Incorrect information
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Most frequent revocation reason
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Filter Revocations
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Search and filter certificate revocation activity.
              </p>
            </div>

            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 self-start text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <RefreshCw className="h-4 w-4" />
              Clear filters
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {/* Search */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search certificate or recipient..."
                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* Reason */}
            <div className="relative">
              <select
                value={reasonFilter}
                onChange={(event) =>
                  setReasonFilter(event.target.value)
                }
                className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-700 focus:border-red-400 focus:ring-2 focus:ring-red-100"
              >
                {reasonOptions.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>

            {/* From Date */}
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="date"
                value={dateFrom}
                onChange={(event) =>
                  setDateFrom(event.target.value)
                }
                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 focus:border-red-400 focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* To Date */}
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="date"
                value={dateTo}
                onChange={(event) =>
                  setDateTo(event.target.value)
                }
                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 focus:border-red-400 focus:ring-2 focus:ring-red-100"
              />
            </div>
          </div>
        </div>

        {/* Revocation Overview */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Monthly Activity */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Revocation Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Certificate revocations by month.
                </p>
              </div>

              <div className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                2026
              </div>
            </div>

            <div className="mt-7 flex h-56 items-end justify-between gap-4 border-b border-slate-100 px-2 pb-2">
              {[
                { month: "Apr", value: 1 },
                { month: "May", value: 1 },
                { month: "Jun", value: 1 },
                { month: "Jul", value: 1 },
                { month: "Aug", value: 2 },
                { month: "Sep", value: 1 },
              ].map((item) => (
                <div
                  key={item.month}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >
                  <span className="mb-2 text-xs font-semibold text-slate-600">
                    {item.value}
                  </span>

                  <div
                    className="w-full max-w-10 rounded-t-md bg-red-500 transition hover:bg-red-600"
                    style={{
                      height: `${item.value * 45}px`,
                    }}
                  />

                  <span className="mt-3 text-xs text-slate-500">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reasons */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Revocation Reasons
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Distribution of certificate revocation reasons.
              </p>
            </div>

            <div className="mt-6 space-y-5">
              {[
                {
                  label: "Incorrect recipient information",
                  count: 2,
                  percentage: 33,
                },
                {
                  label: "Certificate issued in error",
                  count: 1,
                  percentage: 17,
                },
                {
                  label: "Course requirement not met",
                  count: 1,
                  percentage: 17,
                },
                {
                  label: "Duplicate certificate",
                  count: 1,
                  percentage: 17,
                },
                {
                  label: "Other reasons",
                  count: 1,
                  percentage: 16,
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm text-slate-600">
                      {item.label}
                    </span>

                    <span className="shrink-0 text-sm font-semibold text-slate-900">
                      {item.count}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-red-500"
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Revoked Certificates
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredCertificates.length} record
                {filteredCertificates.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
              <FileWarning className="h-4 w-4" />
              Revoked certificates are no longer valid
            </div>
          </div>

          {filteredCertificates.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Certificate
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Recipient
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Course
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Issued
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Revoked
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Reason
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
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
                        <p className="text-sm font-semibold text-slate-900">
                          {certificate.id}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Issuer: {certificate.issuer}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-900">
                          {certificate.recipient}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {certificate.email}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="max-w-[220px] text-sm text-slate-700">
                          {certificate.course}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {certificate.issuedDate}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-red-600">
                        {certificate.revokedDate}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex max-w-[230px] rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs font-medium leading-5 text-amber-700">
                          {certificate.reason}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                          Revoked
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <Search className="h-6 w-6 text-slate-400" />
              </div>

              <h3 className="mt-4 text-base font-semibold text-slate-900">
                No revocations found
              </h3>

              <p className="mt-1 max-w-md text-sm text-slate-500">
                Try changing your search text, reason, or date filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
              <ShieldAlert className="h-5 w-5 text-red-600" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-red-900">
                Certificate security notice
              </h3>

              <p className="mt-1 max-w-4xl text-sm leading-6 text-red-800">
                Revoked certificates must not be considered valid.
                Public verification should immediately display the
                revoked status when a revoked certificate ID or QR
                verification code is checked.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400">
          Showing {filteredCertificates.length} of{" "}
          {revokedCertificates.length} revoked certificates
          {mostCommonReason && " • Report data is currently mocked"}
        </div>
      </div>
    </DashboardLayout>
  );
}