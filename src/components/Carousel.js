import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Image } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

import { getAllSpecialties } from "../services/specialties.service";
import { getAllDoctors } from "../services/doctors.service";
import { getAllClinics } from "../services/clinics.service";

const Carousel = ({ status }) => {
    const [elements, setElements] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSpecialties = async () => {
            let res;

            if (status === 'specialties') {
                res = await getAllSpecialties();
            } if (status === 'doctors') {
                res = await getAllDoctors();
            } if (status === 'clinics') {
                res = await getAllClinics();
            }
            setElements(res.data);

        };

        fetchSpecialties();
    }, []);


    const Arrow = (props) => {
        const { className, style, onClick, direction } = props;
        const arrowStyle = {
            display: "block",
            color: "black",
            width: "50px",
            height: "50px",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "30px",
            textAlign: "center",
            lineHeight: "50px",
        };

        const positionStyle =
            direction === "next"
                ? { right: "10px" }
                : { left: "10px" };

        return (
            <div
                className={className}
                style={{ ...style, ...arrowStyle, ...positionStyle }}
                onClick={onClick}
            >
                {direction === "next" ? <CaretRightOutlined /> : <CaretLeftOutlined />}
            </div>
        );
    };


    var settings = {
        dots: true,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 3,
        nextArrow: <Arrow direction="next" />,
        prevArrow: <Arrow direction="prev" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const handleViewElement = id => {
        navigate(`/${status}/${id}`)
    }
    return (
        <div className=" mt-3">
            <div>
                <span className=" text-2xl font-bold ml-4">Popular {status}</span>
                {/* <button className="btn-section">More Info</button> */}
            </div>
            <Slider {...settings}>
                {elements.length > 0 &&
                    elements.map((element) => {
                        return (
                            <div
                                key={element.id}
                                className="flex flex-col items-center justify-center p-4 cursor-pointer"
                            >
                                <div className="flex items-center justify-center" onClick={() => handleViewElement(element.id)}>
                                    <Image
                                        preview={false}
                                        src={element.image}
                                        className="mb-2"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                <h3 className="text-center">{element.name}</h3>
                            </div>
                        );
                    })}
            </Slider>
        </div>
    );
};

export default Carousel;
