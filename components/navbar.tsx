"use client";
import { useState } from "react";
import { Menu, X, BookOpen, Heart, Plus } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

export default function Navbar() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
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
            {status === "loading" ? (
              <>
                {/* Skeleton for Discover link */}
                <Skeleton className="h-6 w-20" />

                {/* Skeleton for Create button and User Avatar */}
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </>
            ) : user ? (
              <>
                <Link href={"/discover"} className="hover:text-primary">
                  Discover
                </Link>

                <div className="flex items-center justify-end space-x-3 w-full cursor-pointer">
                  <Avatar>
                    <AvatarImage src="default-avatar.webp" />
                    <AvatarFallback />
                  </Avatar>
                  <h4>{user.name}</h4>
                </div>
              </>
            ) : (
              <div className="px-3 py-2 space-y-2">
                <button className="w-full px-4 py-2 text-foreground hover:text-primary transition-colors">
                  Sign In
                </button>
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-80 transition-opacity">
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex">
            {status === "loading" && <Skeleton className="h-10 w-24" />}
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
            {status === "loading" ? (
              <>
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </>
            ) : user ? (
              <div className="flex items-center space-x-3 w-full cursor-pointer">
                <Avatar>
                  <AvatarImage src="default-avatar.webp" />
                  <AvatarFallback />
                </Avatar>
                <h4>{user.name}</h4>
              </div>
            ) : (
              <div className="px-3 py-2 space-y-2">
                <button className="w-full px-4 py-2 text-foreground hover:text-primary transition-colors">
                  Sign In
                </button>
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-80 transition-opacity">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
