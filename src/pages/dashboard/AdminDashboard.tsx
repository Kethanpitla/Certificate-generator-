import {
  Award,
  BookOpen,
  Users,
  ShieldCheck,
  Plus,
  ArrowUpRight,
  MoreHorizontal,
  CheckCircle2,
  Clock3,
  AlertCircle,
  TrendingUp,
  FileCheck2,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const recentCertificates = [
  {
    id: "CERT-2026-001284",
    recipient: "Rahul Sharma",
    course: "Generative AI & Prompt Engineering",
    date: "Today, 10:32 AM",
    status: "Verified",
  },
  {
    id: "CERT-2026-001283",
    recipient: "Priya Reddy",
    course: "Full Stack Web Development",
    date: "Today, 09:18 AM",
    status: "Verified",
  },
  {
    id: "CERT-2026-001282",
    recipient: "Arjun Kumar",
    course: "Data Science with Python",
    date: "Yesterday, 04:45 PM",
    status: "Verified",
  },
  {
    id: "CERT-2026-001281",
    recipient: "Sneha Patel",
    course: "Generative AI & Prompt Engineering",
    date: "Yesterday, 02:10 PM",
    status: "Pending",
  },
  {
    id: "CERT-2026-001280",
    recipient: "Vikram Singh",
    course: "Full Stack Web Development",
    date: "Sep 08, 2026",
    status: "Verified",
  },
];

const stats = [
  {
    title: "Total Certificates",
    value: "1,284",
    change: "+12.5%",
    description: "from last month",
    icon: Award,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Active Courses",
    value: "24",
    change: "+4",
    description: "this month",
    icon: BookOpen,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    title: "Total Learners",
    value: "3,642",
    change: "+8.2%",
    description: "from last month",
    icon: Users,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Verifications",
    value: "8,421",
    change: "+18.4%",
    description: "from last month",
    icon: ShieldCheck,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout activeItem="Dashboard">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-blue-600">
            Welcome back, Admin
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Here's what's happening with your certificates today.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="/certificates/generate"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Generate Certificate
          </a>

          <a
            href="/certificates/bulk"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <FileCheck2 className="h-4 w-4" />
            Bulk Generate
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-xs">
                    <span className="inline-flex items-center gap-0.5 font-semibold text-emerald-600">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {stat.change}
                    </span>

                    <span className="text-slate-400">
                      {stat.description}
                    </span>
                  </div>
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg ${stat.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent Certificates */}
        <div className="xl:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Recent Certificates
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest certificates generated by your organization
              </p>
            </div>

            <a
              href="/certificates"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Certificate
                  </th>

                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Recipient
                  </th>

                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Course
                  </th>

                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Date
                  </th>

                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {recentCertificates.map((certificate) => (
                  <tr
                    key={certificate.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="font-mono text-xs font-semibold text-blue-600">
                        {certificate.id}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {certificate.recipient}
                      </p>
                    </td>

                    <td className="max-w-[220px] px-5 py-4">
                      <p className="truncate text-sm text-slate-600">
                        {certificate.course}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500">
                      {certificate.date}
                    </td>

                    <td className="px-5 py-4">
                      {certificate.status === "Verified" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                          <Clock3 className="h-3.5 w-3.5" />
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        title="More options"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Frequently used certificate operations
            </p>
          </div>

          <div className="space-y-3 p-5">
            <a
              href="/certificates/generate"
              className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <Award className="h-5 w-5 text-blue-600" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  Generate Certificate
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Create a certificate for a learner
                </p>
              </div>

              <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-blue-600" />
            </a>

            <a
              href="/certificates/bulk"
              className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-violet-200 hover:bg-violet-50/50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50">
                <FileCheck2 className="h-5 w-5 text-violet-600" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  Bulk Generate
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Generate multiple certificates
                </p>
              </div>

              <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-violet-600" />
            </a>

            <a
              href="/templates"
              className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                <BookOpen className="h-5 w-5 text-emerald-600" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  Manage Templates
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Create or edit certificate templates
                </p>
              </div>

              <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-emerald-600" />
            </a>

            <a
              href="/reports/issuance"
              className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-amber-200 hover:bg-amber-50/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                <TrendingUp className="h-5 w-5 text-amber-600" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  View Reports
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Analyze certificate activity
                </p>
              </div>

              <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-amber-600" />
            </a>
          </div>

          {/* System status */}
          <div className="mx-5 mb-5 rounded-lg bg-slate-50 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

              <div>
                <p className="text-xs font-semibold text-slate-700">
                  System Status
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Certificate generation and verification services are
                  operating normally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom information */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Secure Verification
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Every certificate includes a unique certificate ID and QR
                code for instant public verification.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Keep Your Records Updated
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Review certificate records regularly and revoke certificates
                when necessary to maintain data accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}