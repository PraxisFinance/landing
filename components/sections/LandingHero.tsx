export function LandingHero() {
  return (
    <section className="mx-auto w-full max-w-screen-2xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 lg:p-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="h-4 w-24 rounded-full bg-zinc-200" />
          <div className="mt-6 h-10 w-full max-w-2xl rounded-lg bg-zinc-200 sm:h-14" />
          <div className="mt-3 h-10 w-full max-w-xl rounded-lg bg-zinc-100 sm:h-14" />
          <div className="mt-6 h-6 w-full max-w-lg rounded-lg bg-zinc-100" />
          <div className="mt-10 h-11 w-36 rounded-full bg-zinc-900" />
        </div>

        <div className="mt-12 h-56 w-full rounded-2xl bg-zinc-100 sm:h-72 lg:h-96" />
      </div>
    </section>
  );
}
