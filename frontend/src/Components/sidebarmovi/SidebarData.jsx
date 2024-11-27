import {FaTh,FaExclamationCircle ,FaFile,FaTruck,FaMapMarkerAlt} from 'react-icons/fa'
export const SidebarData=[
    

    {
       
        title: " Dashboard",
        path:"/deliverychart",
        icon: <FaTh/>
        
    },

    {
        title: "Delivery",
        path:"/deliverydetails",
        icon: <FaTruck/>,
    },

    {
        title: "Status",
        path:"/trackingdetails",
        icon: <FaMapMarkerAlt/>,
    },


    {
        title: "Reports",
        path:"/sendpdf",
        icon: <FaFile/>,
    },

    {
        title: "Delay Forms",
        path:"/delaydetails",
        icon: <FaExclamationCircle />,
    },
    {
       
        title: "Petpulse",
        path:"/",
        icon: <FaTh/>
        
    },

    

]

export default SidebarData