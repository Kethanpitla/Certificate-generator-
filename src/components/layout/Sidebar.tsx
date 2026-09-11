import {
  Award,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FileCheck,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  Upload,
  Users,
  UserRound,
  WandSparkles,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import type { UserRole } from "../../context/AuthContext";

interface SidebarProps {
  activeItem?: string;
}

interface MenuItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export default function Sidebar({
  activeItem = "Dashboard",
}: SidebarProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const role: UserRole = user?.role ?? "student";

  const adminSections: MenuSection[] = [
    {
      title: "MAIN",
      items: [
        {
          label: "Dashboard",
          path: "/admin/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "Courses",
          path: "/courses",
          icon: BookOpen,
        },
        {
          label: "Templates",
          path: "/templates",
          icon: Award,
        },
        {
          label: "Generate Certificate",
          path: "/certificates/generate",
          icon: WandSparkles,
        },
        {
          label: "Bulk Generate",
          path: "/certificates/bulk",
          icon: Upload,
        },
        {
          label: "All Certificates",
          path: "/certificates",
          icon: FileCheck,
        },
      ],
    },
    {
      title: "REPORTS",
      items: [
        {
          label: "Issuance Report",
          path: "/reports/issuance",
          icon: BarChart3,
        },
        {
          label: "Verification Report",
          path: "/reports/verification",
          icon: BarChart3,
        },
        {
          label: "Revocation Report",
          path: "/reports/revocation",
          icon: FileText,
        },
      ],
    },
    {
      title: "ADMINISTRATION",
      items: [
        {
          label: "Users",
          path: "/admin/users",
          icon: Users,
        },
        {
          label: "Roles & Permissions",
          path: "/admin/roles",
          icon: Shield,
        },
        {
          label: "Organization Settings",
          path: "/admin/settings",
          icon: Settings,
        },
        {
          label: "Notifications",
          path: "/admin/notifications",
          icon: FileText,
        },
        {
          label: "Audit Logs",
          path: "/admin/audit-logs",
          icon: ClipboardCheck,
        },
      ],
    },
  ];

  const courseManagerSections: MenuSection[] = [
    {
      title: "MAIN",
      items: [
        {
          label: "Dashboard",
          path: "/course-manager/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "Courses",
          path: "/courses",
          icon: BookOpen,
        },
        {
          label: "Certificate Requests",
          path: "/course-manager/certificate-requests",
          icon: ClipboardCheck,
        },
        {
          label: "Templates",
          path: "/templates",
          icon: Award,
        },
        {
          label: "Generate Certificate",
          path: "/certificates/generate",
          icon: WandSparkles,
        },
        {
          label: "Bulk Generate",
          path: "/certificates/bulk",
          icon: Upload,
        },
        {
          label: "Certificates",
          path: "/certificates",
          icon: FileCheck,
        },
      ],
    },
  ];

  const studentSections: MenuSection[] = [
    {
      title: "MY LEARNING",
      items: [
        {
          label: "Dashboard",
          path: "/student/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "My Courses",
          path: "/courses",
          icon: BookOpen,
        },
        {
          label: "Request Certificate",
          path: "/student/certificate-request",
          icon: ClipboardCheck,
        },
        {
          label: "My Certificates",
          path: "/certificates",
          icon: Award,
        },
      ],
    },
  ];

  let sections: MenuSection[];

  if (role === "admin") {
    sections = adminSections;
  } else if (role === "course-manager") {
    sections = courseManagerSections;
  } else {
    sections = studentSections;
  }

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">

      {/* LOGO */}

      <div className="flex h-20 items-center border-b border-slate-200 px-6">
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Award size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              CertifyHub
            </h1>

            <p className="text-xs text-slate-400">
              Certificate System
            </p>
          </div>

        </div>
      </div>


      {/* MENU */}

      <nav className="flex-1 overflow-y-auto px-4 py-5">

        {sections.map((section) => (
          <div
            key={section.title}
            className="mb-7"
          >

            <p className="mb-2 px-3 text-[10px] font-bold tracking-widest text-slate-400">
              {section.title}
            </p>

            <div className="space-y-1">

              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => {
                      const active =
                        isActive ||
                        activeItem === item.label;

                      return [
                        "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
                        active
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                      ].join(" ");
                    }}
                  >
                    <Icon size={18} />

                    <span>
                      {item.label}
                    </span>
                  </NavLink>
                );
              })}

            </div>
          </div>
        ))}

      </nav>


      {/* USER / LOGOUT */}

      <div className="border-t border-slate-200 p-4">

        <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <UserRound size={18} />
          </div>

          <div className="min-w-0 flex-1">

            <p className="truncate text-sm font-semibold text-slate-800">
              {user?.name ?? "User"}
            </p>

            <p className="truncate text-xs capitalize text-slate-400">
              {role === "course-manager"
                ? "Course Manager"
                : role}
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />

          <span>
            Logout
          </span>
        </button>

      </div>

    </aside>
  );
}