import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "../containers/System/Header";
import DoctorManagement from "../containers/System/Doctor/DoctorManagement";
import ScheduleManagement from "../containers/System/Doctor/ScheduleManagement";
import SpecialtyManagement from "../containers/System/Specialty/SpecialtyManagement";
import ClinicManagement from "../containers/System/Clinic/ClinicManagement";
import PatientManagement from "../containers/System/Doctor/PatientManagement";
import useAuthStore from "../store/useAuthStore";
import BarChart from "../containers/System/BarChart";

const System = () => {
    const navigate = useNavigate();

    const { isLoggedIn } = useAuthStore();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/home');
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            {isLoggedIn && <Header />}
            <Routes>
                <Route path=":id/doctor-management" element={<DoctorManagement />} />
                <Route path=":id/schedule-management" element={<ScheduleManagement />} />
                <Route path=":id/specialty-management" element={<SpecialtyManagement />} />
                <Route path=":id/clinic-management" element={<ClinicManagement />} />
                <Route path=":id/patient-management" element={<PatientManagement />} />
            </Routes>
            {/* <BarChart /> */}
        </>
    );
};

export default System;
