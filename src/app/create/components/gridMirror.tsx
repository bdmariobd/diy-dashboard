"use client";
import { Box, IconButton } from "@mui/material";
import Webcam from "react-webcam";
import { MirrorComponent } from "./components";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import webcamPreview from "./imagePreview.png";
import { useCallback, useRef, useState } from "react";
import { triggerBase64Download } from "react-base64-downloader";

export default function GridMirror(props: { component: MirrorComponent }) {
  const [image, setImage] = useState<string>("");

  const webcamRef = useRef<any>();
  const capture = useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot({
      width: 1920,
      height: 1080,
    });
    setImage(imageSrc);
  }, [webcamRef]);

  const onDownloadImage = () => {
    triggerBase64Download(image, "image");
  };

  const onDeleteImage = () => {
    setImage("");
  };

  if (props.component.cameraActivated) {
    if (image !== "") {
      return (
        <>
          <Image
            src={image}
            alt="Webcam preview"
            style={{ height: "100%", width: "100%" }}
            width={100}
            height={100}
          />
          <IconButton
            onClick={onDownloadImage}
            size="small"
            aria-label="add"
            style={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
            }}
          >
            <DownloadIcon />
          </IconButton>
          <IconButton
            onClick={onDeleteImage}
            size="small"
            aria-label="add"
            style={{
              position: "absolute",
              bottom: "10px",
              left: "40px",
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      );
    }

    return (
      <Box style={{ position: "relative", height: "100%", width: "100%" }}>
        <Webcam
          ref={webcamRef}
          style={{ height: "100%", width: "100%" }}
          audio={false}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
        />
        <IconButton
          onClick={capture}
          size="small"
          aria-label="add"
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
          }}
        >
          <CameraAltIcon />
        </IconButton>
      </Box>
    );
  }
  return (
    <Image
      src={webcamPreview}
      alt="Webcam preview"
      style={{ height: "100%", width: "100%" }}
    />
  );
}
