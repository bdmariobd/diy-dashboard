import { Typography } from "@mui/material";
import { TextComponent } from "./components";

export default function GridText(props: { component: TextComponent }) {
  return <Typography noWrap>{props.component.text}</Typography>;
}
