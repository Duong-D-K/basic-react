import { useLocation, useParams } from "react-router-dom";

import HomeFooter from "../HomeFooter";
import HomeHeader from "../HomeHeader";
import { confirmBooking } from "../../../services/patients.service";
import { useEffect, useState } from "react";

const ConfirmBooking = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const token = queryParams.get('token');
    const doctorId = queryParams.get('doctorId');
    const patientId = queryParams.get('patientId');

    console.log('Token:', token);
    console.log('Doctor ID:', doctorId);
    console.log('Patient ID:', patientId);

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await confirmBooking({ token, doctorId, patientId });

            setData(res.data);
        }

        fetchData();
    }, [token, doctorId, patientId]);

    return (
        <div>
            <HomeHeader isShowBanner={false} />
            <span className="flex items-center justify-center font-bold text-rose-500 text-xl sm:text-3xl mt-52 mb-52">

                {data}
            </span>
            <HomeFooter />
        </div>
    );
};

export default ConfirmBooking;