type NavGroup = {
  label: string;
  items: string[];
};

const navGroups: NavGroup[] = [
  { label: "About", items: ["Company", "Team", "Mission"] },
  { label: "Products", items: ["Overview", "Use cases", "Pricing"] },
  { label: "Resources", items: ["Blog", "Guides", "Docs"] },
  { label: "Development", items: ["Roadmap", "Status", "Changelog"] },
];

export function Navigation() {
  return (
    <>
      <nav className="hidden items-center gap-3 md:flex">
        {navGroups.map((group) => (
          <details key={group.label} className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-900">
              {group.label}
              <span className="text-xs text-zinc-400 transition group-open:rotate-180">
                &#9662;
              </span>
            </summary>
            <div className="absolute left-0 top-11 z-20 w-44 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg">
              {group.items.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block rounded-lg px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
                >
                  {item}
                </a>
              ))}
            </div>
          </details>
        ))}
      </nav>

      <button
        type="button"
        className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 md:hidden"
      >
        Menu
      </button>
    </>
  );
}
