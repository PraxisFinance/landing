import { AboutSection } from "@/components/sections/about/AboutSection";
import { CoverSection } from "@/components/sections/cover/CoverSection";
import { FAQSection } from "@/components/sections/faq/FAQSection";
import { LandingFooter } from "@/components/sections/LandingFooter";
import { LandingHeader } from "@/components/sections/LandingHeader";
import { JoinWaitlistSection } from "@/components/sections/join-waitlist/JoinWaitlistSection";
import { ProjectRoadmapSection } from "@/components/sections/roadmap/ProjectRoadmapSection";
import { SocialMediaJoinSection } from "@/components/sections/social-media-join/SocialMediaJoinSection";
import { TeamSection } from "@/components/sections/team/TeamSection";
import { UserFlowSection } from "@/components/sections/user-flow/UserFlowSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-white text-brand-black">
      <LandingHeader />

      <main className="mb-[100px] flex flex-col gap-[100px] md:mb-[180px] md:gap-[180px] px-5 sm:px-6 lg:px-10">
        <CoverSection />
        <AboutSection />
        <UserFlowSection />
        <JoinWaitlistSection />
        <ProjectRoadmapSection />
        <TeamSection />
        <FAQSection />
        <SocialMediaJoinSection />
      </main>

      <LandingFooter />
    </div>
  );
}
