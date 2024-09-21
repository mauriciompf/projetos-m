import useWorldTime from "../../customHooks/useWorldTime";

export default function WorldTime() {
  const { worldTime } = useWorldTime();

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {worldTime.map((city) => (
        <div
          className="grid w-[7.5rem] place-items-center gap-0 rounded-xl bg-columbia p-2 font-bold text-jet lg:w-[8.5rem] lg:text-xl"
          key={city.id}
        >
          <p>{city.name}</p>
          <p>{city.time}</p>
        </div>
      ))}
    </div>
  );
}
