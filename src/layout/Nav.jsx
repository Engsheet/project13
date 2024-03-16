import { NavLink } from "react-router-dom";

const NAV_MENU = [
  { title: "피드", url: "" },
  { title: "리뷰", url: "my-review" },
  { title: "방문/예약", url: "reservation" },
  { title: "북마크", url: "favorite" },
];

function Nav() {
  return (
    <nav className="sticky top-[-4px] z-10 mb-2 border-gray-800 bg-gray-50 shadow-md">
      <ul className="mx-auto flex max-w-2xl items-center justify-around sm:text-lg">
        {NAV_MENU.map((item) => {
          return (
            <li key={crypto.randomUUID()}>
              <NavLink
                to={`/${item.url}`}
                className={({ isActive }) => {
                  const baseClassName = "px-3 py-2";
                  return isActive
                    ? `${baseClassName} block border-b-2 border-primary font-bold text-primary`
                    : `${baseClassName} text-secondary hover:border-b-2 hover:border-secondary hover:font-bold focus:border-b-2 focus:border-secondary focus:font-bold`;
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
