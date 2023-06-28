import React, { useEffect } from "react";
import { Container, Button, Typography } from "@mui/material";
import styles from "./page.module.css";
import { Draggable } from "react-beautiful-dnd";
import {
  BasketComponent,
  ComponentType,
  ImageComponent,
} from "./components/components";

//database mock

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

export default function ComponentBasket() {
  return (
    <Container className={styles.componentBasket}>
      {items.map((item, index) => {
        return <BasketComponent component={item} />;
      })}
    </Container>
  );
}
