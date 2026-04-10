import { ExpertsSection } from "@/components/sections/ExpertsSection";
import { FirstPredictionSection } from "@/components/sections/FirstPredictionSection";
import { LandingFooter } from "@/components/sections/LandingFooter";
import { LandingHeader } from "@/components/sections/LandingHeader";
import { JoinSection } from "@/components/sections/JoinSection";
import { JoinWaitlistSection } from "@/components/sections/JoinWaitlistSection";
import { ProjectRoadmapSection } from "@/components/sections/ProjectRoadmapSection";
import { UserFlowSection } from "@/components/sections/UserFlowSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-white text-brand-black">
      <LandingHeader />

      <main>
        <JoinSection />
        <FirstPredictionSection />
        <UserFlowSection />
        <JoinWaitlistSection />
        <ProjectRoadmapSection />
        <ExpertsSection />
      </main>

      <LandingFooter />
    </div>
  );
}
