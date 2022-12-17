import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseContentComponent from "../../components/CourseVideoComponents/CourseContentComponent/CourseContentComponent";
import instance from "../../config/instance";

const CoursePageView = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await instance.get("course/" + id);
            setCourse(response.data.course);
        };
        fetchData();
    }, []);

    return (
        <div>
            <CourseContentComponent
                title="Course Content"
                data={course?.videos}
            />
        </div>
    );
};

export default CoursePageView;
