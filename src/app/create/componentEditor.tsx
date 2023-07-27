import React, { useEffect, useState } from "react";
import {
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  BasketComponent,
  ButtonComponent,
  ImageComponent,
  MirrorComponent,
  TextComponent,
} from "./components/components";

export default function ComponentEditor(props: {
  selectedItem?: BasketComponent;
  setSelectedItem: Function;
}) {
  const [editOptions, setEditOptions] = useState<any>({});
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    if (props.selectedItem) {
      setEditOptions({ ...props.selectedItem });
    }
  }, [props.selectedItem]);

  useEffect(() => {
    const fetchDevices = async () => {
      const devices = (await navigator.mediaDevices.enumerateDevices()).filter(
        ({ kind }) => kind === "videoinput"
      );
      setDevices(devices);
    };
    fetchDevices();
  }, []);

  const textEditor = () => {
    const textComponent = props.selectedItem as TextComponent;
    return (
      <>
        <Typography> Text </Typography>
        <TextField
          multiline
          type="text"
          value={editOptions.text || ""}
          onChange={(e) => {
            setEditOptions({ ...editOptions, text: e.target.value });
            props.setSelectedItem({
              ...textComponent,
              text: e.target.value,
            });
          }}
        />
      </>
    );
  };

  const imageEditor = () => {
    const imageComponent = props.selectedItem as ImageComponent;
    return (
      <>
        <Typography> Image </Typography>
        <TextField
          multiline
          type="text"
          value={editOptions.src || ""}
          onChange={(e) => {
            setEditOptions({ ...editOptions, src: e.target.value });
            props.setSelectedItem({
              ...imageComponent,
              src: e.target.value,
            });
          }}
        />
      </>
    );
  };

  const buttonEditor = () => {
    const buttonComponent = props.selectedItem as ButtonComponent;
    return (
      <>
        <Typography> Button </Typography>
        <TextField
          multiline
          type="text"
          value={editOptions.text || ""}
          onChange={(e) => {
            setEditOptions({ ...editOptions, text: e.target.value });
            props.setSelectedItem({
              ...buttonComponent,
              text: e.target.value,
            });
          }}
        />
        <TextField
          type="text"
          value={editOptions.label || ""}
          onChange={(e) => {
            setEditOptions({ ...editOptions, label: e.target.value });
            props.setSelectedItem({
              ...buttonComponent,
              label: e.target.value,
            });
          }}
        />
        <input
          value={editOptions.color}
          type="color"
          onChange={(e) => {
            props.setSelectedItem({
              ...buttonComponent,
              color: e.target.value,
            });
          }}
        />
      </>
    );
  };

  const mirrorEditor = () => {
    const mirrorComponent = props.selectedItem as MirrorComponent;
    return (
      <>
        <Typography> Mirror </Typography>
        <InputLabel id="demo-simple-select-label">Select Camera</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={editOptions.deviceId || ""}
          label="Select Camera"
          onChange={(e) => {
            setEditOptions({ ...editOptions, deviceId: e.target.value });
            props.setSelectedItem({
              ...mirrorComponent,
              deviceId: e.target.value,
            });
          }}
        >
          {devices.map((device) => (
            <MenuItem key={device.deviceId} value={device.deviceId}>
              {device.label}
            </MenuItem>
          ))}
        </Select>
      </>
    );
  };

  const renderEditorPanel = () => {
    switch (props.selectedItem?.type) {
      case "text":
        return textEditor();
      case "image":
        return imageEditor();
      case "button":
        return buttonEditor();
      case "mirror":
        return mirrorEditor();
      default:
        return <Typography> Select an item </Typography>;
    }
  };

  return (
    <div>
      {props.selectedItem ? (
        renderEditorPanel()
      ) : (
        <Typography> Select an item </Typography>
      )}
    </div>
  );
}
