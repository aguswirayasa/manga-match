import { Github } from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="bg-background border-t border-border mt-5 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo Section */}
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MangaMatch
              </span>
              <p className="mt-4 text-muted-foreground max-w-md">
                Your ultimate platform for discovering and sharing manga
                recommendations. Join our community of manga enthusiasts today!
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/about"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Connect
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Github size={18} />
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-center text-muted-foreground">
              © {new Date().getFullYear()} MangaMatch. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
