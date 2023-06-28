import { Button, Typography } from "@mui/material";
import { DropResult } from "react-beautiful-dnd";
import { useDrag } from "react-dnd";

export enum ComponentType {
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
  text?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  src?: string;
  alt?: string;
  video?: string;
  audio?: string;
  carousel?: string[];
}

export interface ImageComponent extends BasketComponent {
  type: ComponentType.Image;
  src: string;
  alt: string;
}

export function BasketComponent(props: { component: BasketComponent }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: props.component.type,
    item: props.component,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  if (isDragging) return <div ref={drag}> </div>;

  return (
    <div
      ref={drag}
      style={{
        cursor: "move",
      }}
    >
      {props.component.type === ComponentType.Button ? (
        <Button>Button</Button>
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
