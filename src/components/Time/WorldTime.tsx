import useWorldTime from "../../customHooks/useWorldTime";

export default function WorldTime() {
  const { worldTime } = useWorldTime();

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {worldTime.map((city) => (
        <div
          className="w-[7.5rem] rounded-xl bg-columbia p-2 font-bold text-jet"
          key={city.id}
        >
          <p>{city.name}</p>
          <p>{city.time}</p>
        </div>
      ))}
    </div>
  );
}
