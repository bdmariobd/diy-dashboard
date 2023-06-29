import { Button, Typography } from "@mui/material";

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
}

export interface ButtonComponent extends BasketComponent {
  type: ComponentType.Button;
  text: string;
}
export interface ImageComponent extends BasketComponent {
  type: ComponentType.Image;
  src: string;
  alt: string;
}

export function BasketComponent(props: { component: BasketComponent }) {
  if (props.component.type === ComponentType.Blank) {
    return <div></div>;
  }
  return (
    <div
      style={{
        /* position: "absolute",
        top: 0,
        bottom: 0, */
        width: "100%",
        height: "100%",
      }}
    >
      {props.component.type === ComponentType.Button ? (
        <Button fullWidth style={{ height: "100%" }} variant="contained">
          Button
        </Button>
      ) : props.component.type === ComponentType.Text ? (
        <Typography> y </Typography>
      ) : props.component.type === ComponentType.Image ? (
        <img src="https://picsum.photos/200" alt="placeholder" />
      ) : (
        <div></div>
      )}
    </div>
  );
}
