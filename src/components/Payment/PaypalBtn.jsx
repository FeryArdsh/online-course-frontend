import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";

const nameCourse = "How to be rich";
const style = { layout: "vertical" };

const PaypalBtn = ({ currency, showSpinner, amount }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    const handleApprove = (e) => {
        console.log(e);
        alert("Success");
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
