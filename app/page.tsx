import dynamic from "next/dynamic";

import { PrefetchBelowFoldChunks } from "@/components/landing/PrefetchBelowFoldChunks";
import { AboutSection } from "@/components/sections/about/AboutSection";
import { CoverSection } from "@/components/sections/cover/CoverSection";
import { LandingHeader } from "@/components/sections/LandingHeader";
import { UserFlowSection } from "@/components/sections/user-flow/UserFlowSection";

const JoinWaitlistSection = dynamic(
  () =>
    import("@/components/sections/join-waitlist/JoinWaitlistSection").then((m) => m.JoinWaitlistSection),
  { ssr: true }
);

const ProjectRoadmapSection = dynamic(
  () =>
    import("@/components/sections/roadmap/ProjectRoadmapSection").then(
      (m) => m.ProjectRoadmapSection
    ),
  { ssr: true }
);

const TeamSection = dynamic(
  () => import("@/components/sections/team/TeamSection").then((m) => m.TeamSection),
  { ssr: true }
);

const FAQSection = dynamic(
  () => import("@/components/sections/faq/FAQSection").then((m) => m.FAQSection),
  { ssr: true }
);

const SocialMediaJoinSection = dynamic(
  () =>
    import("@/components/sections/social-media-join/SocialMediaJoinSection").then(
      (m) => m.SocialMediaJoinSection
    ),
  { ssr: true }
);

const LandingFooter = dynamic(
  () => import("@/components/sections/LandingFooter").then((m) => m.LandingFooter),
  { ssr: true }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-white text-brand-black">
      <LandingHeader />
      <PrefetchBelowFoldChunks />

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
