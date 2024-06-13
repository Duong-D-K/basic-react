import { Button } from "antd";
import { useEffect, useRef } from "react";

const UploadWidget = () => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;

        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "diqb9eoi4",
            uploadPreset: 'swujg17o',

        }, (error, result) => {
            console.log(result)
        })

    }, [])


    return (
        <Button onClick={() => widgetRef.current.open()} >
            Upload
        </Button>

    );
};

export default UploadWidget;