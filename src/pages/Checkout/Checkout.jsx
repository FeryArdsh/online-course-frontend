import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar2 from "../../components/LayoutComponents/Navbar2/Navbar2";
import SelectUtil from "../../utils/FormUtils/SelectUtil/SelectUtil";
import { coursesInCartData } from "../../fakedata/fakedata";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import css from "./Checkout.module.css";
import { MdPayment } from "react-icons/md";
import PaypalBtn from "../../components/Payment/PaypalBtn";
import CheckoutCrypto from "./CheckoutCrypto";
import axios from "axios";
import instance from "../../config/instance";

const Checkout = () => {
    const [idr, setIdr] = useState(null);
    const [price, setPrice] = useState(null);
    const [state, setState] = useState({
        txt: "Pilih metode pembayaran",
        value: "",
    });

    const paymentOption = [
        {
            txt: "Paypal/Visa",
            value: "paypal",
        },
        {
            txt: "Etherium",
            value: "eth",
        },
    ];

    const selectHandler = (value) => {
        setState({ ...state, value, txt: value });
    };

    useEffect(() => {
        const getIdrEth = async () => {
            try {
                const response = await axios.get(
                    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=IDR"
                );
                const getCourse = await instance.get(
                    "course/6399d43ba136dce1ea48cf06"
                );
                setPrice(getCourse.data.course.prc);
                setIdr(response.data.IDR);
            } catch (error) {
                console.log(error);
            }
        };
        getIdrEth();
    }, []);

    const usd = (price / 15600).toFixed(2);

    return (
        <>
            <Navbar2 />
            <div className={css.outerDiv}>
                <div className={css.bdy}>
                    <div className={css.leftDiv}>
                        <h2 className={css.ttl}>Checkout</h2>
                        <div className={css.cbdy}>
                            <div className={css.bx}>
                                <h2 className={css.cbdyTtl}>
                                    Pilih Metode Pembayaran
                                </h2>
                                <div className={css.formBox}>
                                    <SelectUtil
                                        label="Metode"
                                        txt="Required"
                                        options={paymentOption}
                                        value={state.txt}
                                        setValue={selectHandler}
                                        icon={<MdPayment size={20} />}
                                    />
                                </div>
                            </div>
                            <div className={css.bx}>
                                <h2 className={css.cbdyTtl}>Pesanan</h2>
                                <div className={css.crsBox}>
                                    {coursesInCartData?.map((item) => {
                                        return (
                                            <div
                                                className={css.cres}
                                                key={item.id}
                                            >
                                                <div className={css.crsebx1}>
                                                    <img
                                                        src={item.img}
                                                        className={css.img}
                                                    />
                                                    <div className={css.crsTtl}>
                                                        {item.ttl}
                                                    </div>
                                                </div>
                                                <div className={css.crsPrc}>
                                                    {new Intl.NumberFormat(
                                                        "en-IN",
                                                        {
                                                            style: "currency",
                                                            currency: "IDR",
                                                        }
                                                    ).format(item.price)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={css.rightDiv}>
                        <div className={css.innerRightDiv}>
                            <div className={css.cbdyTtl}>Ringkasan</div>
                            <div className={css.p1}>
                                <span>Harga Asli</span>
                                <span>
                                    {new Intl.NumberFormat("en-IN", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(3399)}
                                </span>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.p2}>
                                <span>Total:</span>
                                <span>
                                    {new Intl.NumberFormat("en-IN", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(3399)}
                                </span>
                            </div>
                            <div className={css.note}>
                                By completing your purchase you agree to these
                                <Link to="/" className={css.noteLink}>
                                    Terms of Service
                                </Link>
                                .
                            </div>

                            <div
                                style={{
                                    maxWidth: "750px",
                                    minHeight: "200px",
                                }}
                            >
                                <PayPalScriptProvider
                                    options={{
                                        "client-id":
                                            "AX5nD06gyJwbzzlzyKMB6mG9EuuRPvA7CXbMPaPccYGr54RetqlMEI2YLbgi9HD-y9E3dF6vnIyPQ8am",
                                        components: "buttons",
                                        currency: "USD",
                                    }}
                                >
                                    <PaypalBtn
                                        currency="USD"
                                        amount={usd && usd.toString()}
                                        showSpinner={false}
                                    />
                                </PayPalScriptProvider>
                            </div>

                            {state?.value === "eth" && (
                                <CheckoutCrypto
                                    amount={price / idr && price / idr}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
