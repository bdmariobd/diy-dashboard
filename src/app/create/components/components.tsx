import { Button, Typography } from "@mui/material";
// import Image from "next/image";

export enum ComponentType {
  Blank = "blank",
  Text = "text",
  Image = "image",
  Video = "video",
  Audio = "audio",
  Button = "button",
  Carousel = "carousel",
}

export interface BasketComponent {
  type: ComponentType;
  id: string;
  x?: number;
  y?: number;
}

export interface ButtonComponent extends BasketComponent {
  type: ComponentType.Button;
  text: string;
  x?: 1;
  y?: 1;
}
export interface ImageComponent extends BasketComponent {
  type: ComponentType.Image;
  src: string;
  alt: string;
  x?: 4;
  y?: 4;
}

export interface TextComponent extends BasketComponent {
  type: ComponentType.Text;
  text: string;
  x?: 4;
  y?: 4;
}

export function BasketComponent(props: { component: BasketComponent }) {
  if (props.component.type === ComponentType.Blank) {
    return <div></div>;
  } else if (props.component.type === ComponentType.Button) {
    const component = props.component as ButtonComponent;
    return (
      <Button
        style={{ height: "100%", width: "100%", minWidth: "auto" }}
        fullWidth
        variant="contained"
      >
        {component.text}
      </Button>
    );
  } else if (props.component.type === ComponentType.Text) {
    const component = props.component as TextComponent;
    return <Typography> {component.text} </Typography>;
  } else if (props.component.type === ComponentType.Image) {
    return (
      <img
        style={{ height: "100%", width: "100%" }}
        src="https://picsum.photos/1000"
        alt="placeholder"
      />
    );
  } else {
    return <div></div>;
  }
}
