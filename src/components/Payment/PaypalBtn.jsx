import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import instance from "../../config/instance";

const nameCourse = "How to be rich";
const style = { layout: "vertical" };

const PaypalBtn = ({ currency, showSpinner, amount, courseId }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const getIds = courseId?.cart?.map((item) => item._id);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    const handleApprove = async (e) => {
        try {
            const res = await instance.post("course/purchase", {
                data: getIds,
            });
            console.log(res);
            await Swal.fire("Berhasil membeli kursus", "", "success");
            navigate("/user/my-courses/learning");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    title: nameCourse,
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            console.log("after create order", orderId);
                            return orderId;
                        });
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log("orers", order);
                    handleApprove(data);
                }}
                onCancel={(data) => {
                    console.log("cancle", data);
                }}
                onError={(err) => {
                    console.log(err);
                }}
            />
        </>
    );
};

export default PaypalBtn;
