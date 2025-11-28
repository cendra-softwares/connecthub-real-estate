"use client";

import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    checkUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Optionally redirect to home page after logout
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
              <span className="text-xl font-bold text-white">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ConnectHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
            >
              Dashboard
            </Link>
            {user ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-gray-300"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} // Toggle dropdown
                >
                  <User size={20} />
                </button>
                {/* Dropdown menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg py-1 z-50 border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2 text-sm font-medium text-white transition-all hover:from-green-600 hover:to-emerald-700 hover:shadow-lg"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {profileDropdownOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            {user ? (
              <div className="space-y-1">
                <div className="flex items-center px-3 py-2 text-base font-medium text-gray-700">
                  <User size={20} className="mr-2" />
                  <span>Profile</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left rounded-lg px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-3 py-2 text-base font-medium text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
