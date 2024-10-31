"use client";
import { useState } from "react";
import { Menu, X, BookOpen, Heart } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                  MangaMatch
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/discover"
                className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <BookOpen size={18} />
                Discover
              </a>
              <a
                href="/favorites"
                className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Heart size={18} />
                Favorites
              </a>
              <div className="flex items-center space-x-4">
                <Link
                  href={"/sign-in"}
                  className="px-4 py-2 text-foreground hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href={"/sign-up"}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-80 transition-opacity"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-primary transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/discover"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
              >
                Discover
              </a>
              <a
                href="/favorites"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
              >
                Favorites
              </a>
              <div className="px-3 py-2 space-y-2">
                <button className="w-full px-4 py-2 text-foreground hover:text-primary transition-colors">
                  Sign In
                </button>
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-80 transition-opacity">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
