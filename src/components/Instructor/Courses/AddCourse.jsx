import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import instance from "../../../config/instance";

const AddCourse = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await instance.get("course/" + id);
            setCourse(response.data.course);
        };
        fetchData();
    }, []);
    console.log(course);
    return (
        <div>
            <h2>Tambah Video Kursus</h2>
            <hr />
            <h3>{course?.ttl}</h3>
            <h4>Title Section</h4>
            <input type="text" />
            <button>
                <AiOutlinePlusCircle />
            </button>
        </div>
    );
};

export default AddCourse;
