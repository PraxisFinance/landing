import { LandingFooter } from "@/components/sections/LandingFooter";
import { LandingHeader } from "@/components/sections/LandingHeader";
import { LandingHero } from "@/components/sections/LandingHero";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <LandingHeader />

      <main>
        <LandingHero />
      </main>

      <LandingFooter />
    </div>
  );
}
