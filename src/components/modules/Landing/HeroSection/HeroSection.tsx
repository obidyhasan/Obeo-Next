"use client";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/ui/grid-background";

const HeroSection = () => {
  return (
    <div className="relative h-150 w-full overflow-hidden">
      <GridBackground
        gridSize="4:4"
        colors={{
          // background: 'bg-gradient-to-br from-slate-900 via-fuchsia-900 to-slate-900',
          // borderColor: 'border-purple-500/20',
          borderSize: "1px",
          borderStyle: "solid",
        }}
        beams={{
          count: 8,
          colors: [
            "bg-purple-400",
            "bg-indigo-400",
            "bg-cyan-400",
            "bg-violet-400",
            "bg-fuchsia-400",
          ],
          speed: 5,
          shadow: "shadow-lg shadow-current/60",
        }}
      >
        {/* Content */}
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto space-y-10 h-full px-8">
          {/* Main heading */}
          <h1 className="text-center text-4xl md:text-5xl font-bold bg-linear-to-r from-white via-purple-200 to-fuchsia-400 bg-clip-text text-transparent animate-fade-in">
            OBEO PMS
            <br />
            <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent text-3xl md:text-4xl">
              Bangladesh’s First AI-Powered Property Management System
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-center text-md text-purple-100 max-w-5xl mx-auto animate-fade-in">
            OBEO PMS is Bangladesh’s first AI-powered Property Management
            System, enabling hotels and properties to create reservations
            instantly using voice commands—without traditional form filling.
            Built for automation, speed, and scalability, OBEO simplifies daily
            operations and delivers a smarter, AI-driven hospitality experience.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button
              size="lg"
              variant="ghost"
              className="bg-zinc-950 hover:bg-zinc-950 text-white hover:text-white hover:shadow-lg hover:shadow-fuchsia-950 w-40"
            >
              Start Building Free
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="bg-fuchsia-900 hover:bg-fuchsia-900 text-white hover:text-white hover:shadow-lg hover:shadow-fuchsia-950 w-40"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </GridBackground>
    </div>
  );
};

export default HeroSection;
