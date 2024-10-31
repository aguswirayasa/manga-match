import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Search,
  Star,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Discover Stories",
      description: "Find your next favorite manhwa, manga, or manhua",
    },
    {
      icon: <Users className="w-8 h-8 text-secondary" />,
      title: "Join the Community",
      description: "Connect with readers who share your interests",
    },
    {
      icon: <Search className="w-8 h-8 text-accent" />,
      title: "Smart Search",
      description: "Find recommendations based on your preferences",
    },
  ];

  const stats = [
    { number: "1,000+", label: "Active Users" },
    { number: "5,000+", label: "Recommendations" },
    { number: "20+", label: "Genres" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-float"></div>
          <div
            className="absolute top-40 right-20 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute -bottom-20 left-1/2 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h1 className="text-6xl sm:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-primary animate-glow py-4 rounded-lg ">
              MangaMatch
            </h1>
            <p className="text-xl sm:text-2xl max-w-2xl mx-auto text-muted-foreground">
              Your gateway to discovering amazing manga, manhwa, and manhua
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-8 py-6 text-lg rounded-xl"
              >
                Get Started
              </Button>
              <Link href={"/discover"}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg rounded-xl"
                >
                  Browse Recommendations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
            Everything You Need to Find Your Next Read
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-background border-accent/20 hover:border-accent/40 transition-colors"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 backdrop-blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                <Search className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover</h3>
              <p className="text-muted-foreground">
                Browse curated recommendations
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rate</h3>
              <p className="text-muted-foreground">Share your thoughts</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discuss</h3>
              <p className="text-muted-foreground">Engage with others</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Grow</h3>
              <p className="text-muted-foreground">Build your reading list</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
        </div>
        <div className="max-w-3xl mx-auto relative">
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
            Ready to Find Your Next Reading Adventure?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join our community of manga, manhwa, and manhua enthusiasts today!
          </p>
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-8 py-6 text-lg rounded-xl"
          >
            Join Now - It's Free!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
