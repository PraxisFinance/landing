import { FirstPredictionSection } from "@/components/sections/FirstPredictionSection";
import { LandingFooter } from "@/components/sections/LandingFooter";
import { LandingHeader } from "@/components/sections/LandingHeader";
import { JoinSection } from "@/components/sections/JoinSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-white text-brand-black">
      <LandingHeader />

      <main>
        <JoinSection />
        <FirstPredictionSection />
      </main>

      <LandingFooter />
    </div>
  );
}
