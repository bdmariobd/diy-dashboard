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
const newButton: ButtonComponent = {
  type: ComponentType.Button,
  text: "Button",
  id: uuid(),
};

const newImage: ImageComponent = {
  type: ComponentType.Image,
  src: "https://picsum.photos/200",
  alt: "placeholder",
  id: uuid(),
};

export default function ComponentBasket(props: {
  setItems: Function;
  setMovingItem: Function;
}) {
  const buttonBasket = <BasketComponent component={newButton} />;

  const imageBasket = <BasketComponent component={newImage} />;

  console.log(newButton.id);
  console.log(newImage.id);

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
          onDragStart={(e) => {
            props.setMovingItem(newButton.id);
            e.dataTransfer.setData("text/plain", "");
          }}
          onDragEnd={(e) => {
            console.log(e);
            props.setItems(newButton);
            newButton.id = uuid();
          }}
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
          onDragStart={(e) => {
            props.setMovingItem(newImage.id);
            e.dataTransfer.setData("text/plain", "");
          }}
          onDragEnd={(e) => {
            props.setItems(newImage);
            newImage.id = uuid();
          }}
        >
          {imageBasket}
        </div>
      </Stack>
    </Container>
  );
}
