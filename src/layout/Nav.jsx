import { NavLink } from "react-router-dom";

const NAV_MENU = [
  { title: "피드", url: "feed" },
  { title: "리뷰", url: "my-review" },
  { title: "방문/예약", url: "reservation" },
  { title: "저장", url: "favorite" },
];

function Nav() {
  return (
    <nav className="sticky top-0 z-10 mb-2 border-gray-800 bg-gray-50 shadow-md">
      <ul className="border-box mx-auto flex max-w-2xl items-center justify-around pt-3 text-lg">
        {NAV_MENU.map((item) => {
          return (
            <li key={crypto.randomUUID()}>
              <NavLink
                to={`/${item.url}`}
                className={({ isActive }) => {
                  const baseClassName = "px-3";
                  return isActive
                    ? `${baseClassName} block border-b-4 border-primary font-extrabold text-primary`
                    : `${baseClassName} text-secondary`;
                }}
              >
                {item.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
