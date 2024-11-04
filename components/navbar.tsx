"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 p-6">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
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
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </>
            ) : status === "authenticated" ? (
              <>
                <Link href="/discover" className="hover:text-primary">
                  Discover
                </Link>
                <Link href="/profile">
                  <div className="flex items-center justify-end space-x-3 w-full cursor-pointer">
                    <h4>{user.name}</h4>
                  </div>
                </Link>
                <LogOut
                  onClick={() => signOut({ callbackUrl: "/sign-in" })}
                  className="cursor-pointer"
                />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button
                    variant={"outline"}
                    className={cn(
                      "px-4 py-2 text-foreground hover:text-primary hover:bg-background transition-colors"
                    )}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className=" px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-80 transition-opacity">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {status === "loading" ? (
              <>
                <Skeleton className="h-6 w-20" />{" "}
                {/* Placeholder for Discover */}
                <Skeleton className="h-8 w-8" />{" "}
                {/* Placeholder for Menu icon */}
              </>
            ) : (
              <>
                <Link href="/discover" className="hover:text-primary mx-2">
                  Discover
                </Link>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-3">
            {status === "loading" ? (
              <div className="flex flex-col items-center space-y-3">
                <Skeleton className="h-8 w-8 rounded-full" />{" "}
                {/* Avatar Skeleton */}
                <Skeleton className="h-6 w-24" /> {/* Username Skeleton */}
                <Skeleton className="h-10 w-full" /> {/* Button Skeleton */}
                <Skeleton className="h-10 w-full" /> {/* Button Skeleton */}
              </div>
            ) : status === "authenticated" ? (
              <div className="grid place-items-center w-full space-y-3">
                <Link
                  href="/profile"
                  className="w-full flex items-center space-x-3 cursor-pointer"
                >
                  <h4>{user.name}</h4>
                </Link>
                <Button
                  onClick={() => signOut({ callbackUrl: "/sign-in" })}
                  className="cursor-pointer w-full"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="px-3 py-2 space-y-2 flex flex-col justify-center items-center">
                <Link href="/sign-in" className="w-full">
                  <Button
                    variant={"outline"}
                    className={cn(
                      "px-4 py-2 text-foreground hover:text-primary hover:bg-background transition-colors w-full"
                    )}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up" className="w-full">
                  <Button
                    className={cn(
                      "px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-80 transition-opacity w-full"
                    )}
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
