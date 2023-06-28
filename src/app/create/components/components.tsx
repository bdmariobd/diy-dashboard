import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useDrag } from "react-dnd";

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
  x: number;
  y: number;
  expansionRows: number;
  expansionColumns: number;
}

export interface ButtonComponent extends BasketComponent {
  type: ComponentType.Button;
  text: string;
  expansionRows: 2;
  expansionColumns: 1;
}
export interface ImageComponent extends BasketComponent {
  type: ComponentType.Image;
  src: string;
  alt: string;
  expansionRows: 2;
  expansionColumns: 2;
}

export function BasketComponent(props: { component: BasketComponent }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: props.component.type,
    item: props.component,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  if (props.component.type === ComponentType.Blank) {
    return (
      <div
        key={props.component.id}
        style={{ gridArea: "auto" }}
        onClick={() => {
          console.log("xd");
        }}
      ></div>
    );
  }

  if (isDragging) return <div ref={drag}> </div>;

  return (
    <div
      key={props.component.id}
      ref={drag}
      style={{
        gridColumn: `${props.component.x + 1} / span ${
          props.component.expansionColumns
        }`,
        gridRow: `${props.component.y + 1} / span ${
          props.component.expansionRows
        }`,
      }}
    >
      {props.component.type === ComponentType.Button ? (
        <Button variant="contained">Button</Button>
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
