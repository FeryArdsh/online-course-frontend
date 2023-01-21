import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import backIcon from "/icons/back.png";
import nextIcon from "/icons/next.png";

import CourseCard from "../../Cards/CourseCard/CourseCard";

import ArrowsComp from "../ArrowComp/ArrowsComp";

import css from "./CourseCarouselComp.module.css";

const CourseCarouselComp = (props) => {
  const { ttl, link = null, linkTxt = "", coursesData } = props;
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    nextArrow: <ArrowsComp img={nextIcon} />,
    prevArrow: <ArrowsComp img={backIcon} />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        },
      },
    ],
  };
  return (
    <div className={css.scrollBox}>
      {ttl ? (
        <h2 className={css.ttl}>
          {ttl}
          <Link className={css.linkTxt} to={link}>
            {linkTxt}
          </Link>
        </h2>
      ) : null}
      <Slider {...settings}>
        {coursesData?.map((item, id) => {
          return <CourseCard key={id} data={item} />;
        })}
      </Slider>
    </div>
  );
};

export default CourseCarouselComp;
