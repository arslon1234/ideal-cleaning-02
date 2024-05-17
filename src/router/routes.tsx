import React from 'react';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';

interface Route {
    path: string;
    content: string;
    icon: React.ReactElement;
}

const routes: Route[] = [
    {
        path: "/main",
        content: "Asosiy",
        icon: <DashboardCustomizeRoundedIcon />
    },
    {
        path: "/main/orders",
        content: "Buyurtmalar",
        icon: <DryCleaningIcon />
    },
    {
        path: "/main/Services",
        content: "Xizmatlar",
        icon: <DryCleaningIcon />
    },
];

export default routes;
