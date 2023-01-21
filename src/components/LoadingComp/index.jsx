import React from "react";
import ReactLoading from "react-loading";

const LoadingComp = () => {
    return (
        <div className="loading">
            <ReactLoading
                type="spinningBubbles"
                color="#306de4"
                width={100}
                height={100}
            />
        </div>
    );
};

export default LoadingComp;
