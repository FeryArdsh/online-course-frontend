import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseContentComponent from "../../components/CourseVideoComponents/CourseContentComponent/CourseContentComponent";
import LoadingComp from "../../components/LoadingComp";
import instance from "../../config/instance";

const CoursePageView = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await instance.get("course/" + id);
                setCourse(response.data.course);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {loading ?
                <LoadingComp /> :
                <CourseContentComponent
                    title="Course Content"
                    data={course?.videos}
                />
            }
        </div>
    );
};

export default CoursePageView;
