import projectList from "../../utils/projectList";

export default function SideBarNav() {
  return (
    <section className="ml-5">
      <nav>
        <ul className="grid gap-4 text-xl">
          {projectList.map((listItem) => (
            <li
              key={listItem.label}
              className="flex cursor-pointer items-center gap-6 rounded-md p-2 hover:bg-[#282b30]"
            >
              <span className="text-lg">{listItem.icon}</span>
              <span>{listItem.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
