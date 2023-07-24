import { Typography } from "@mui/material";

import GridButton from "./gridButton";
import GridImage from "./gridImage";

const GridMirror = dynamic(
  () => {
    return import("./gridMirror");
  },
  { ssr: false }
);

import dynamic from "next/dynamic";

// import Image from "next/image";

export enum ComponentType {
  Blank = "blank",
  Text = "text",
  Image = "image",
  Video = "video",
  Audio = "audio",
  Button = "button",
  Carousel = "carousel",
  Mirror = "mirror",
}

export interface BasketComponent {
  type: ComponentType;
  id: string;
  x?: number;
  y?: number;
  maxX: number;
  maxY: number;
}

export interface ButtonComponent extends BasketComponent {
  type: ComponentType.Button;
  text: string;
  x?: 1;
  y?: 1;
  maxX: 1;
  maxY: 1;
}
export interface ImageComponent extends BasketComponent {
  type: ComponentType.Image;
  src: string;
  alt: string;
  x?: 4;
  y?: 4;
  maxX: 1;
  maxY: 1;
}

export interface TextComponent extends BasketComponent {
  type: ComponentType.Text;
  text: string;
  x?: 4;
  y?: 4;
  maxX: 1;
  maxY: 1;
}

export interface MirrorComponent extends BasketComponent {
  type: ComponentType.Mirror;
  cameraActivated: boolean;
  maxX: 4;
  maxY: 4;
}

export function BasketComponent(props: { component: BasketComponent }) {
  if (props.component.type === ComponentType.Blank) {
    return <div></div>;
  } else if (props.component.type === ComponentType.Button) {
    return <GridButton component={props.component as ButtonComponent} />;
  } else if (props.component.type === ComponentType.Text) {
    const component = props.component as TextComponent;
    return <Typography> {component.text} </Typography>;
  } else if (props.component.type === ComponentType.Image) {
    return <GridImage component={props.component as ImageComponent} />;
  } else if (props.component.type === ComponentType.Mirror) {
    const component = props.component as MirrorComponent;
    return <GridMirror component={component} />;
  } else {
    return <div></div>;
  }
}
