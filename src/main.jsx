import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePages/HomePage/HomePage";
import LoggedInUserHomePage from "./pages/HomePages/LoggedInUserHomePage/LoggedInUserHomePage";
import Login from "./pages/join/login/login";
import Signup from "./pages/join/signup/signup";
import Cart from "./pages/Cart/Cart";
import CoursePage from "./pages/CoursePage/CoursePage";
import CategoryCoursePage from "./pages/CategoryCoursePage/CategoryCoursePage";
import ProfilePage from "./pages/User/ProfilePage/ProfilePage";
import MyCoursesPage from "./pages/User/MyCoursesPage/MyCoursesPage";
import AllCoursesComponent from "./components/UserComponents/MyCourses/AllCoursesComponent/AllCoursesComponent";
import MyListsComponent from "./components/UserComponents/MyCourses/MyListsComponent/MyListsComponent";
import WishListComponent from "./components/UserComponents/MyCourses/WishListComponent/WishListComponent";
import ArchivedComponent from "./components/UserComponents/MyCourses/ArchivedComponent/ArchivedComponent";
import ProfileSettingsComponent from "./components/UserComponents/Profile/ProfileSettingsComponent/ProfileSettingsComponent";
import BasicSettingsComponent from "./components/UserComponents/Profile/BasicSettingsComponent/BasicSettingsComponent";
import PhotoComponent from "./components/UserComponents/Profile/PhotoComponent/PhotoComponent";
import PrivacyComponent from "./components/UserComponents/Profile/PrivacyComponent/PrivacyComponent";
import ToolsComponent from "./components/UserComponents/ToolsComponent/ToolsComponent";
import ResourcesComponent from "./components/UserComponents/ResourcesComponent/ResourcesComponent";
import Checkout from "./pages/Checkout/Checkout";
import PublicProfile from "./pages/User/PublicProfile/PublicProfile";
import NotFound from "./pages/NotFound/NotFound";
import "./index.css";
import Test from "./pages/Test/Test";
import ProtectedRoute from "./components/ProtectedRoute";

import { persistor, store } from "./service/redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import InstructorCourses from "./components/Instructor/Courses";
import AddCourse from "./components/Instructor/Courses/AddCourse";
import AddDraftCourse from "./components/Instructor/Courses/AddDraftCourse";
import CoursePageView from "./pages/CoursePageView";

let routes;
routes = [
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <LoggedInUserHomePage />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/course/:id",
                element: <CoursePage />,
            },
            {
                path: "/courses",
                element: <CategoryCoursePage />,
                children: [
                    {
                        path: ":categoryPage",
                        element: <CategoryCoursePage />,
                        children: [
                            {
                                path: ":subCatId",
                                element: <CategoryCoursePage />,
                            },
                        ],
                    },
                ],
            },
            {
                path: "/user/:id",
                element: <PublicProfile />,
            },
            {
                path: "/user/profile",
                element: <ProfilePage />,
                children: [
                    {
                        path: "courses",
                        element: <InstructorCourses />,
                    },
                    {
                        path: "add-courses/:id",
                        element: <AddCourse />,
                    },
                    {
                        path: "add-courses/draf",
                        element: <AddDraftCourse />,
                    },
                    {
                        path: "communication",
                        element: <ResourcesComponent />,
                    },
                    {
                        path: "performance",
                        element: <ResourcesComponent />,
                    },
                    {
                        path: "settings",
                        element: <ProfileSettingsComponent />,
                        children: [
                            {
                                path: "basic",
                                element: <BasicSettingsComponent />,
                            },
                            {
                                path: "photo",
                                element: <PhotoComponent />,
                            },
                            {
                                path: "privacy",
                                element: <PrivacyComponent />,
                            },
                        ],
                    },
                    {
                        path: "tools",
                        element: <ToolsComponent />,
                    },
                    {
                        path: "resources",
                        element: <ResourcesComponent />,
                    },
                ],
            },
            {
                path: "/user/my-courses",
                element: <MyCoursesPage />,
                children: [
                    {
                        path: "learning",
                        element: <AllCoursesComponent />,
                    },
                    {
                        path: "lists",
                        element: <MyListsComponent />,
                    },
                    {
                        path: "wishlist",
                        element: <WishListComponent />,
                    },
                    {
                        path: "archived",
                        element: <ArchivedComponent />,
                    },
                ],
            },
            {
                path: "/checkout",
                element: <Checkout />,
            },
            {
                path: "/course/view/:id",
                element: <CoursePageView />,
            },
            {
                path: "/test",
                element: <Test />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
    {
        path: "/welcome",
        element: <HomePage />,
    },
    {
        path: "/join/login",
        element: <Login />,
    },
    {
        path: "/join/signup",
        element: <Signup />,
    },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
