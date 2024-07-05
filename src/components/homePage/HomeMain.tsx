export default function HomeMain({}) {
  return (
    <main>
      <nav className="grid place-items-center">
        <ul className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <li
              key={index}
              className="size-60 rounded-md bg-slate-400 transition-all duration-300 hover:scale-110"
            ></li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
