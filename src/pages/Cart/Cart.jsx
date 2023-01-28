import { useState } from "react";

import css from "./Cart.module.css";

import Layout1 from "../Layout1/Layout1";
import Button1 from "../../utils/Buttons/Button1/Button1";
import InputUtil from "../../utils/FormUtils/InputUtil/InputUtil";

import CheckoutCourseCard from "../../components/Cards/CheckoutCourseCard/CheckoutCourseCard";

import cardImg from "/images/card.jpg";
import crossIcon from "/icons/close.png";
import { BsCartX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../config/instance";
import Swal from "sweetalert2";
import { removeCart } from "../../service/redux/cart";

const Cart = () => {
    const courseInCart = useSelector((state) => state.cartData);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const totalPrice = courseInCart?.cart?.reduce((accumulator, object) => {
        return accumulator + object.newPrc;
    }, 0);

    const getIds = courseInCart?.cart?.map((item) => item._id);
    const postFreeCourse = async (e) => {
        e.preventDefault()
        try {
            const res = await instance.post("course/purchase", {
                data: getIds,
            });
            console.log(res);
            dispatch(removeCart())
            await Swal.fire("Berhasil membeli kursus", "", "success");
            navigate("/user/my-courses/learning");
        } catch (error) {
            console.log(error);
            await Swal.fire(error?.response?.data?.message, "", "error");
        }
    };

    return (
        <>
            <Layout1>
                <div className={css.outerDiv}>
                    <div className={css.innerDiv}>
                        <div className={css.ttl}>Keranjang Belanja</div>
                        <div className={css.boxs}>
                            <div className={css.box1}>
                                <div className={css.cnt}>
                                    {courseInCart?.cart?.length} Kursus dalam
                                    Keranjang
                                </div>
                                <div className={css.courses}>
                                    {courseInCart?.cart?.length >= 1 ? (
                                        courseInCart.cart.map((item) => {
                                            return (
                                                <CheckoutCourseCard
                                                    data={item}
                                                    key={item._id}
                                                />
                                            );
                                        })
                                    ) : (
                                        <div className={css.emptyCart}>
                                            <BsCartX size={100} />
                                            <h3>Opss, keranjang kamu kosong</h3>
                                            <Link to="/">Tambah Kursus</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={css.box2}>
                                <div className={css.totalTxt}>Total:</div>
                                <div className={css.currrency}>
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(totalPrice)}
                                </div>
                                {/* <div className={css.totalDiscount}>
                                    {new Intl.NumberFormat("en-IN", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(3399)}
                                </div>
                                <div className={css.ttlDisPer}>
                                    {courseInCart.disc}% off
                                </div> */}
                                {
                                    totalPrice <= 1 && courseInCart?.cart?.length >= 1 &&
                                    <Button1 txt="Ambil Kursus" bck="var(--primary)"
                                        hovBck="var(--primary-dark)"
                                        onClick={postFreeCourse}
                                        extraCss={{
                                            width: "100%",
                                            margin: "1rem 0",
                                            padding: "1rem",
                                            border: "none",
                                            color: "var(--white)",
                                        }} />
                                }
                                {totalPrice >= 1 && (
                                    <Button1
                                        link="/checkout"
                                        txt="Checkout"
                                        bck="var(--primary)"
                                        hovBck="var(--primary-dark)"
                                        extraCss={{
                                            width: "100%",
                                            margin: "1rem 0",
                                            padding: "1rem",
                                            border: "none",
                                            color: "var(--white)",
                                        }}
                                    />
                                )}

                                {/* <div className={css.ctxt}>Coupon code</div>
                                {appliedCoupon ? (
                                    <div className={css.cpnBox}>
                                        <img
                                            src={crossIcon}
                                            alt="close icon"
                                            className={css.icon}
                                            onClick={clearCouponHandler}
                                        />
                                        <div className={css.cpnCode}>
                                            <b>{appliedCoupon}</b> is applied
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                                <InputUtil
                                    type="text"
                                    btnTxt="Apply"
                                    onChange={setCouponHandler}
                                    btnClick={submitCoupon}
                                    extraCss={{ padding: "0.5rem" }}
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout1>
        </>
    );
};

export default Cart;
