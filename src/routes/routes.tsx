import React from "react";
import { PuffLoader } from "react-spinners";
import { createBrowserRouter } from "react-router-dom";

import { slug } from "../constants/slug";
import App from "../containers/App";

import Home from "../views/home/Home";
import UserPage from "../views/user";

const loading = (
    <div className='h-[70vh] pb-24 pt-24 flex flex-col justify-center items-center'>
        <PuffLoader size={100} color='red' />
    </div>
);

const router = createBrowserRouter([
    {
        path: slug.home.to,
        element: <App />,
        children: [
            {
                index: true,
                element: (
                    <React.Suspense fallback={loading}>
                        <Home />
                    </React.Suspense>
                )
            },
            {
                path: slug.user.path,
                element: (
                    <React.Suspense fallback={loading}>
                        <UserPage />
                    </React.Suspense>
                )
            }
        ]
    }
])

export default router