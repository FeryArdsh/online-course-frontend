import { useEffect, useRef } from "react";
import css from "./VideoPlayer.module.css";

const VideoPlayer = ({ src }) => {
    const videoRef = useRef();

    useEffect(() => {
        videoRef.current?.load();
    }, [src]);

    return (
        <div className={css.outerDiv}>
            <video ref={videoRef} controls className={css.video}>
                <source src={src} type="video/webm" />
                <source src={src} type="video/mp4" />
            </video>
        </div>
    );
};

export default VideoPlayer;
