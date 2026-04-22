type DeviceTextSize = {
  mobile: string;
  desktop: string;
};

type CoverSectionTextSizes = {
  title: DeviceTextSize;
  description: DeviceTextSize;
};

type AboutSectionTextSizes = {
  title: DeviceTextSize;
  cardTitle: DeviceTextSize;
  cardDescription: DeviceTextSize;
};

type JoinWaitlistSectionTextSizes = {
  title: DeviceTextSize;
  description: DeviceTextSize;
};

type RoadmapSectionTextSizes = {
  title: DeviceTextSize;
  cardQuarter: DeviceTextSize;
  cardBody: DeviceTextSize;
};

type TeamSectionTextSizes = {
  title: DeviceTextSize;
  cardName: DeviceTextSize;
  cardBio: DeviceTextSize;
  roleBadge: DeviceTextSize;
};

type FaqSectionTextSizes = {
  title: DeviceTextSize;
  question: DeviceTextSize;
  answer: DeviceTextSize;
};

type SectionTextSizes = {
  cover: CoverSectionTextSizes;
  about: AboutSectionTextSizes;
  joinWaitlist: JoinWaitlistSectionTextSizes;
  roadmap: RoadmapSectionTextSizes;
  team: TeamSectionTextSizes;
  faq: FaqSectionTextSizes;
};

export const SECTION_TEXT_SIZES: SectionTextSizes = {
  cover: {
    title: {
      mobile: "ui-headline-4",
      desktop: "ui-headline-3",
    },
    description: {
      mobile: "ui-text-7",
      desktop: "ui-text-3",
    },
  },
  about: {
    title: {
      mobile: "ui-headline-4",
      desktop: "ui-headline-1",
    },
    cardTitle: {
      mobile: "ui-text-2",
      desktop: "ui-text-2",
    },
    cardDescription: {
      mobile: "ui-text-7",
      desktop: "ui-text-6",
    },
  },
  joinWaitlist: {
    title: {
      mobile: "ui-headline-4",
      desktop: "ui-headline-2",
    },
    description: {
      mobile: "ui-text-7",
      desktop: "ui-text-3",
    },
  },
  roadmap: {
    title: {
      mobile: "ui-headline-4",
      desktop: "ui-headline-1",
    },
    cardQuarter: {
      mobile: "ui-text-8",
      desktop: "ui-text-8",
    },
    cardBody: {
      mobile: "ui-text-5",
      desktop: "ui-text-5",
    },
  },
  team: {
    title: {
      mobile: "ui-headline-4",
      desktop: "ui-headline-1",
    },
    cardName: {
      mobile: "ui-text-6",
      desktop: "ui-text-2",
    },
    cardBio: {
      mobile: "ui-text-10",
      desktop: "ui-text-5",
    },
    roleBadge: {
      mobile: "ui-text-10",
      desktop: "ui-text-10",
    },
  },
  faq: {
    title: {
      mobile: "ui-headline-4",
      desktop: "ui-headline-1",
    },
    question: {
      mobile: "ui-text-8",
      desktop: "ui-text-8",
    },
    answer: {
      mobile: "ui-text-7",
      desktop: "ui-text-7",
    },
  },
};
