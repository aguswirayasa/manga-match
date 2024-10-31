import { MangaPost } from "@/app/types";
import { ClockIcon, GridIcon, HeartIcon, TrendingUpIcon } from "lucide-react";

interface Recommendations {
  recommendations: MangaPost[];
}

export function LeftSidebar() {
  return (
    <aside className="bg-background text-foreground p-4 space-y-4 hidden md:block">
      <h2 className="text-lg font-bold text-primary">Browse</h2>
      <nav className="space-y-3">
        <a href="/popular" className="flex items-center hover:text-primary">
          <TrendingUpIcon className="mr-2" /> Popular Manga
        </a>
        <a href="/favorites" className="flex items-center hover:text-primary">
          <HeartIcon className="mr-2" /> Top Favorites
        </a>
        <a href="/genres" className="flex items-center hover:text-primary">
          <GridIcon className="mr-2" /> Genres
        </a>
        <a
          href="/new-releases"
          className="flex items-center hover:text-primary"
        >
          <ClockIcon className="mr-2" /> New Releases
        </a>
      </nav>
    </aside>
  );
}

export function RightSidebar({ recommendations }: Recommendations) {
  return (
    <aside className="bg-background text-foreground p-4 space-y-4 hidden md:block">
      <h2 className="text-lg font-bold text-primary">
        Recommended by Community
      </h2>
      <div className="space-y-4  max-h-screen">
        {recommendations.map((manga, idx) => (
          <div key={idx} className="flex items-center space-x-4">
            <img
              src="1.jpg"
              alt={`${manga.title} cover`}
              className="w-20 h-28"
            />
            <div>
              <h3 className="font-semibold">{manga.title}</h3>
              <p className="text-sm text-muted-foreground">
                {manga.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
