import React from "react";
import { Container, Stack } from "@mui/material";
import styles from "./page.module.css";
import {
  BasketComponent,
  ButtonComponent,
  ComponentType,
  ImageComponent,
} from "./components/components";
import { v4 as uuid } from "uuid";

//database mock

export default function ComponentBasket() {
  const newButton: ButtonComponent = {
    type: ComponentType.Button,
    id: uuid(),
    text: "Button",
  };

  const newImage: ImageComponent = {
    type: ComponentType.Image,
    id: uuid(),
    src: "https://picsum.photos/200",
    alt: "placeholder",
  };

  const buttonBasket = <BasketComponent component={newButton} />;

  const imageBasket = <BasketComponent component={newImage} />;

  return (
    <Container className={styles.componentBasket}>
      <Stack spacing={2} direction="row">
        <div
          className={styles.block}
          draggable={true}
          unselectable="on"
          // this is a hack for firefox
          // Firefox requires some kind of initialization
          // which we can do by adding this attribute
          // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
          onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
        >
          {buttonBasket}
        </div>
        <div
          className={styles.block}
          draggable={true}
          unselectable="on"
          // this is a hack for firefox
          // Firefox requires some kind of initialization
          // which we can do by adding this attribute
          // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
          onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
        >
          {imageBasket}
        </div>
      </Stack>
    </Container>
  );
}
