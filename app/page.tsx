import { AboutSection } from "@/components/sections/about/AboutSection";
import { CoverSection } from "@/components/sections/cover/CoverSection";
import { FrequencyQuestionsSection } from "@/components/sections/FrequencyQuestionsSection";
import { LandingFooter } from "@/components/sections/LandingFooter";
import { LandingHeader } from "@/components/sections/LandingHeader";
import { JoinGetStartedSection } from "@/components/sections/JoinGetStartedSection";
import { JoinWaitlistSection } from "@/components/sections/join-waitlist/JoinWaitlistSection";
import { ProjectRoadmapSection } from "@/components/sections/roadmap/ProjectRoadmapSection";
import { TeamSection } from "@/components/sections/team/TeamSection";
import { UserFlowSection } from "@/components/sections/user-flow/UserFlowSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-white text-brand-black">
      <LandingHeader />

      <main className="flex flex-col gap-[clamp(5rem,10vw,11.25rem)]">
        <CoverSection />
        <AboutSection />
        <UserFlowSection />
        <JoinWaitlistSection />
        <ProjectRoadmapSection />
        <TeamSection />
        <FrequencyQuestionsSection />
        <JoinGetStartedSection />
      </main>

      <LandingFooter />
    </div>
  );
}
