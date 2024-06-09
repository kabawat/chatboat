import 'react-image-crop/dist/ReactCrop.css';
import React, { useState, useRef, useEffect } from 'react';
import { MdOutlineClose } from "react-icons/md";
import ReactCrop from 'react-image-crop';
import SiderButton from '../button/SiderButton';
function CropPicture({ preview, previewCanvasRef, setIsCropModal }) {
    const [isCrop, setIsCrop] = useState(false)
    const [crop, setCrop] = useState({ unit: 'px', width: 200, height: 200 });
    const imageRef = useRef(null);
    const onCropComplete = async (crop) => {
        setIsCrop(true)
        if (!imageRef.current || !previewCanvasRef.current) {
            return;
        }

        const canvas = previewCanvasRef.current;
        const image = imageRef.current;
        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const ctx = canvas.getContext('2d');

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    };

    function handleCropFinish() {
        if (!isCrop) {
            const croped = {
                height: 200,
                unit: "px",
                width: 200,
                x: 0,
                y: 0
            }
            onCropComplete(croped)
        }
        setIsCropModal(false)
    }

    return (
        <div className="crop_container">
            <div className="close_btn">
                <MdOutlineClose />
            </div>
            <h4>Crop Image</h4>
            <div className="crop">
                <ReactCrop
                    crop={crop}
                    onChange={(newCrop) => setCrop(newCrop)}
                    onComplete={onCropComplete}
                    aspect={1}
                    style={{ height: '100%' }}
                >
                    <img ref={imageRef} src={preview} alt="Crop Demo" className="main_image" />
                </ReactCrop>
            </div>
            <SiderButton title={" Crop and Save Image"} endIcon={<></>} handalClick={handleCropFinish} />
        </div>
    );
}

export default CropPicture;
