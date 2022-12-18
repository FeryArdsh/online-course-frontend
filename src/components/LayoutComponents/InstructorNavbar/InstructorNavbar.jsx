import { Link } from "react-router-dom";

import css from "./InstructorNavbar.module.css";

import globeIcon from "/icons/globe.png";
import notificationIcon from "/icons/notification.png";
import userEmptyIcon from "/icons/user-empty.png";
import exitIcon from "/icons/exit.png";
import { useSelector } from "react-redux";

const InstructorNavbar = () => {
    const user = useSelector((state) => state.userData.data);

    return (
        <div className={css.navbar}>
            <div className={css.right}>
                <Link className={css.hovBox} to="/">
                    Student
                </Link>
                {/* <div className={css.notiBox}>
          <img
            className={css.notiIcon}
            src={notificationIcon}
            alt="notification icon"
          />
        </div> */}
                <div className={css.profile}>
                    <img
                        src={user?.imgProfil.url}
                        className={css.profileIcon}
                    />
                    <div className={css.menuBox}>
                        <div className={css.innerMenuBox}>
                            <div className={css.prflDiv}>
                                <Link
                                    to="/user/profile/settings/basic"
                                    className={css.user}
                                >
                                    <div className={css.leftUserDiv}>
                                        <img
                                            src={user?.imgProfil.url}
                                            alt="user profile"
                                            className={css.userProfileImg}
                                        />
                                    </div>
                                    <div className={css.rightUserDiv}>
                                        <div className={css.uname}>
                                            {user?.name}
                                        </div>
                                        <div className={css.email}>
                                            {user?.email}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <Link
                                    to="/user/my-courses/learning"
                                    className={css.menuItem}
                                >
                                    Pembelajaran Saya
                                </Link>
                                <Link to="/cart" className={css.menuItem}>
                                    Keranjang
                                </Link>
                                <Link
                                    to="/user/profile/courses"
                                    className={css.menuItem}
                                >
                                    Instructor Dashboard
                                </Link>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <Link to="/" className={css.menuItem}>
                                    Beranda
                                </Link>
                            </div>
                            {/* <div className={css.prflDiv}>
                                <Link to="/" className={css.menuItem}>
                                    Notifications
                                </Link>
                                <Link to="/" className={css.menuItem}>
                                    Messages
                                </Link>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <Link
                                    to="/user/account"
                                    className={css.menuItem}
                                >
                                    Account Settings
                                </Link>
                                <Link to="/" className={css.menuItem}>
                                    Payment Methods
                                </Link>
                                <Link to="/" className={css.menuItem}>
                                    Subscriptions
                                </Link>
                                <Link to="/" className={css.menuItem}>
                                    Udemy Credits
                                </Link>
                                <Link to="/" className={css.menuItem}>
                                    Purchase History
                                </Link>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <div className={css.menuItem2}>
                                    <span>Language</span>
                                    <span>
                                        <span>English</span>
                                        <img
                                            src={globeIcon}
                                            className={css.icon}
                                            alt="glob icon"
                                        />
                                    </span>
                                </div>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <Link to="/" className={css.menuItem}>
                                    Public Profile
                                </Link>
                                <Link
                                    to="/user/profile/settings/basic"
                                    className={css.menuItem}
                                >
                                    Edit Profile
                                </Link>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <Link to="/" className={css.menuItem}>
                                    Help
                                </Link>
                                <Link to="/" className={css.menuItem}>
                                    Logout
                                </Link>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <div className={css.menuItem2}>
                                    <span>
                                        <div className={css.menuItemTxt1}>
                                            Udemy Bussiness
                                        </div>
                                        <div className={css.menuItemTxt2}>
                                            Bring learning to your company
                                        </div>
                                    </span>
                                    <span>
                                        <img
                                            src={exitIcon}
                                            className={css.icon}
                                            alt="exit icon"
                                        />
                                    </span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorNavbar;
