import { FaUserTie, FaUsers } from "react-icons/fa";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { RiDashboardFill, RiMoneyRupeeCircleFill } from "react-icons/ri";

export const SideBar={
company:[
    {
        LinkName:'Dashboard',
        Link:'/',
        icon:<RiDashboardFill />,
        nested:[
            {
                LinkName:'My Clients',
                Link:'',
                icon:<FaUserTie />   
            },
            {
                LinkName:'All Clients',
                Link:'',
                icon:<FaUsers />   
            }
        ]
    },
    {
        LinkName:'Transaction',
        Link:'/transaction',
        icon:<RiMoneyRupeeCircleFill />,
        nested:[
            {
                LinkName:'My Transaction',
                Link:'',
                icon:<RiMoneyRupeeCircleFill />   
            },
            {
                LinkName:'All Transaction',
                Link:'',
                icon:<RiMoneyRupeeCircleFill />   
            }
        ]
    },
    {
        LinkName:'Games',
        Link:'/game',
        icon:<MdOutlinePlayCircleFilled />,
    }
],
all:[
    {
        LinkName:'Dashboard',
        Link:'/',
        icon:<RiDashboardFill />,
        nested:[
            {
                LinkName:'My Clients',
                Link:'',
                icon:<FaUserTie />   
            }
        ]
    },
    {
        LinkName:'Transaction',
        Link:'/transaction',
        icon:<RiMoneyRupeeCircleFill />,
        nested:[
            {
                LinkName:'My Transaction',
                Link:'',
                icon:<RiMoneyRupeeCircleFill />   
            }
        ]
    }
]
}

