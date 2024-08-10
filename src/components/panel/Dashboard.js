// import React, { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import SessionManager from './SessionManager';
//
// const Dashboard = ({ children }) => {
//     const router = useRouter();
//     const role = localStorage.getItem('userRole');
//
//     useEffect(() => {
//         if (!role) {
//             router.push('/login');
//         } else {
//             const currentPath = router.pathname;
//             if (currentPath.startsWith('/client') && role !== 'client') {
//                 router.push('/login');
//             } else if (currentPath.startsWith('/funeralHome') && role !== 'funeralHome') {
//                 router.push('/login');
//             } else if (currentPath.startsWith('/admin') && role !== 'admin') {
//                 router.push('/login');
//             }
//         }
//     }, [router, role]);
//
//     return (
//         <>
//             <SessionManager />
//             {children}
//         </>
//     );
// };
//
// export const ClientDashboard = () => (
//     <Dashboard>
//         <h1>Panel Klienta</h1>
//         {/* zawartość panelu klienta */}
//     </Dashboard>
// );
//
// export const FuneralHomeDashboard = () => (
//     <Dashboard>
//         <h1>Panel Domu Pogrzebowego</h1>
//         {/* zawartość panelu domu pogrzebowego */}
//     </Dashboard>
// );
//
// export const AdminDashboard = () => (
//     <Dashboard>
//         <h1>Panel Admina</h1>
//         {/* zawartość panelu admina */}
//     </Dashboard>
// );
