import { useEffect } from "react";

import { categoriesSubCategoriesData } from "../../../fakedata/fakedata";

import rightArrowIcon from "/icons/down-arrow.svg";

import css from "./VerticalCategoryMenuBar.module.css";
import { Link } from "react-router-dom";

const VerticalCategoryMenuBar = () => {
    const category = [
        {
            ttl: "Teknologi",
            value: "technology",
            link: "/technology",
        },
        {
            ttl: "Bisnis",
            value: "business",
            link: "/business",
        },
        {
            ttl: "Bahasa",
            value: "language",
            link: "/language",
        },
        {
            ttl: "Kesehatan",
            value: "health",
            link: "/health",
        },
        {
            ttl: "Hobi",
            value: "hobby",
            link: "/hobby",
        },
    ];
    return (
        <div className={css.outerDiv} id="vouterDiv">
            <div className={css.innerDiv}>
                <div className={css.cats} id="cats">
                    {category?.map((cat, i) => (
                        <Link
                            key={i}
                            to={cat.link}
                            className={[css.category, "categoryDiv"].join(" ")}
                        >
                            {cat.ttl}
                        </Link>
                    ))}
                </div>

                <div className={css.iconBox}>
                    <span>Scroll</span>
                    <img
                        src={rightArrowIcon}
                        alt="right arrow"
                        className={css.icon}
                    />
                </div>
            </div>
            {/* {categoriesSubCategoriesData?.map((cat) => (
        <div
          className={[css.subCat, `subCat-${cat.id}`, "subCatDiv"].join(" ")}
          key={`subcatCat-${cat.id}`}
          id="{`subCat-${cat.id}`}"
        >
          {cat.sub?.map((item) => (
            <div
              key={`subcat-${item.id}`}
              id={`subcat-${item.id}`}
              className={css.subCategory}
            >
              {item.ttl}
            </div>
          ))}
        </div>
      ))} */}
        </div>
    );
};

export default VerticalCategoryMenuBar;
