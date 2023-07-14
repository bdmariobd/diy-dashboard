import { Typography } from "@mui/material";
import { BasketComponent, TextComponent } from "./components/components";
import { useState } from "react";

export default function ComponentEditor(props: {
  selectedItem?: BasketComponent;
  setSelectedItem: Function;
}) {
  const [editOptions, setEditOptions] = useState<any>({});

  const textEditor = () => {
    const textComponent = props.selectedItem as TextComponent;
    return (
      <>
        <Typography> Text </Typography>
        <input
          type="text"
          value={editOptions.text}
          onChange={(e) => {
            setEditOptions({ text: e.target.value });
            props.setSelectedItem({
              ...textComponent,
              text: e.target.value,
            });
          }}
        />
      </>
    );
  };

  const renderEditorPanel = () => {
    switch (props.selectedItem?.type) {
      case "text":
        return textEditor();
      case "image":
        return <Typography> image </Typography>;
      case "button":
        return <Typography> button </Typography>;
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
