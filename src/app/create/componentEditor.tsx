import { Typography } from "@mui/material";
import { BasketComponent } from "./components/components";
import { render } from "react-dom";

export default function ComponentEditor(props: {
  selectedItem?: BasketComponent;
}) {
  const renderEditorPanel = () => {
    switch (props.selectedItem?.type) {
      case "text":
        return <Typography> text </Typography>;
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
