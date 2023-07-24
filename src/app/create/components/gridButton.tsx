import { Button } from "@mui/material";
import { ButtonComponent } from "./components";

export default function GridButton(props: { component: ButtonComponent }) {
  return (
    <Button
      style={{ height: "100%", width: "100%", minWidth: "auto" }}
      fullWidth
      variant="contained"
    >
      {props.component.text}
    </Button>
  );
}
