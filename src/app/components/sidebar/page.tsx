import Link from "next/link";
import {MdDashboard} from "react-icons/md";
import {AiOutlineHome} from "react-icons/ai";
import {BsPeople} from "react-icons/bs";
import {FiMail} from "react-icons/fi";
import {TiContacts} from "react-icons/ti";

export  default  function  Sidebar() {

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

    return(
        <div>
            <aside className="sidebar">
                <div className="sidebar_top">
               <h1>this is sidebar Image</h1>  
                </div>

                <ul className="sidebar_list">
                   {sidebarItems.map(({name, href, icon: Icon}) => (
                     <li className="sidebar_item" key={name}>
                     <Link className="sidebar_link" href={href}>
                         <span className="sidebar_icon">
                         <Icon/>
                         </span>
                         <span className="sidebar_name">
                          {name}
                         </span>
                         
                     </Link>
                 </li>
                   ))}

                </ul>
            </aside>
        </div>
    )
}
