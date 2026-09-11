import {
  Bell,
  Search,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

export default function Header() {
  return (
    <header className="fixed left-64 right-0 top-0 z-30 h-20 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-8">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search certificates, courses..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Right side */}
        <div className="ml-6 flex items-center gap-3">
          {/* Help */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            title="Help"
          >
            <HelpCircle className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="mx-2 h-8 w-px bg-slate-200" />

          {/* User */}
          <button
            type="button"
            className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-slate-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              AU
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold leading-tight text-slate-800">
                Admin User
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Administrator
              </p>
            </div>

            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
}