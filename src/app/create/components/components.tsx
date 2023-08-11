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
import GridText from "./gridText";

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
  color?: string;
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
  deviceId?: string;
}

export function BasketComponent(props: { component: BasketComponent }) {
  const { component } = props;

  switch (component.type) {
    case ComponentType.Blank:
      return <div></div>;

    case ComponentType.Button:
      return <GridButton component={component as ButtonComponent} />;

    case ComponentType.Text:
      const textComponent = component as TextComponent;
      return <GridText component={textComponent} />;

    case ComponentType.Image:
      return <GridImage component={component as ImageComponent} />;

    case ComponentType.Mirror:
      const mirrorComponent = component as MirrorComponent;
      return <GridMirror component={mirrorComponent} />;

    default:
      return <></>;
  }
}
