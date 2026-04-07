import { Navigation } from "@/components/navigation/Navigation";

export function LandingHeader() {
  return (
    <header className="border-b border-zinc-200">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <div className="text-lg font-semibold tracking-tight">Brand</div>
        <Navigation />
        <button className="hidden rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 md:block">
          Action
        </button>
      </div>
    </header>
  );
}
