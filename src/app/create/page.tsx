"use client";
import { Container, Slider, Typography } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import ComponentGrid from "./componentGrid";
import ComponentBasket from "./componentBasket";
import {
  BasketComponent,
  ComponentType,
  ImageComponent,
} from "./components/components";
import { v4 as uuidv4 } from "uuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const items: (BasketComponent | ImageComponent)[] = [
  { id: "1", type: ComponentType.Button, text: "Button" },
  {
    id: "2",
    type: ComponentType.Image,
    src: "https://picsum.photos/200",
    alt: "placeholder",
  },
  { id: "3", type: ComponentType.Button },
];

export default function Create() {
  const [components, setComponents] = useState<BasketComponent[]>([]);

  const onComponentAdded = (component: BasketComponent) => {
    setComponents([...components, component]);
  };

  return (
    <Container>
      <Link href="/">Go to homepage</Link>
      <Typography> x </Typography>
      <Slider
        min={5}
        defaultValue={20}
        max={50}
        aria-label="Default"
        valueLabelDisplay="auto"
      />
      <Typography> y </Typography>
      <Slider
        min={5}
        defaultValue={20}
        max={50}
        aria-label="Default"
        valueLabelDisplay="auto"
      />

      <DndProvider backend={HTML5Backend}>
        <ComponentGrid></ComponentGrid>
        <ComponentBasket></ComponentBasket>
      </DndProvider>
    </Container>
  );
}
