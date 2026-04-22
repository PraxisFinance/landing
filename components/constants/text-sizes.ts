type DeviceTextSize = {
  mobile: string;
  desktop: string;
};

type SectionTextSizes = {
  title: DeviceTextSize;
  description: DeviceTextSize;
};

export const SECTION_TEXT_SIZES: Record<string, SectionTextSizes> = {
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
      mobile: "ui-text-2",
      desktop: "ui-headline-1",
    },
    description: {
      mobile: "ui-text-2",
      desktop: "ui-text-2",
    },
  },
};
