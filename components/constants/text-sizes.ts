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

type SectionTextSizes = {
  cover: CoverSectionTextSizes;
  about: AboutSectionTextSizes;
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
};
