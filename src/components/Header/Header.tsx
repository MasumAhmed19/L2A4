import { Link, useLocation } from "react-router";
import { Plus, BarChart3, Home, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Add Book", href: "/add-book", icon: Plus },
  { name: "Borrow Summary", href: "/borrow-summary", icon: BarChart3 },
];

export function Header() {
  const location = useLocation();

  return (
    <nav className="relative w-full z-[50] pt-3">
      <div className="w-full container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-xl text-slate-900 font-semibold">
              <span className="text-blue-600">Cloud</span>Library
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-slate-600 hover:text-slate-900 focus:outline-none">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-5">
                <div className="flex flex-col gap-4 mt-8">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          "flex items-center space-x-2 px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
