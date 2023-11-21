"use client";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { TiContacts } from "react-icons/ti";
import { useRouter } from "next/navigation";
export default function Sidebar() {
  const sidebarItems = [
    {
      name: "Home",
      href: "/home",
      icon: AiOutlineHome,
    },
    {
      name: "About",
      href: "/about",
      icon: BsPeople,
    },
    {
      name: "Mails",
      href: "/mails",
      icon: FiMail,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: TiContacts,
    },
  ];
  const router = useRouter();
const logout = async () => {
  try {
    await fetch("api/users/logout");
    router.push("/login");
  } catch (error:any) {
    console.log("error is", error.message);
  }
};
  return (
    <div>
      <aside className="sidebar">
        <div className="sidebar_top">
          <h1>this is sidebar Image</h1>
        </div>

        <ul className="sidebar_list">
          {sidebarItems.map(({ name, href, icon: Icon }) => (
            <li className="sidebar_item" key={name}>
              <Link className="sidebar_link" href={href}>
                <span className="sidebar_icon">
                  <Icon />
                </span>
                <span className="sidebar_name">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <button
        onClick={logout}
          style={{
            marginLeft: "100px",
            width: "160px",
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Logout
        </button>
      </aside>
    </div>
  );
}
