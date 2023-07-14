import React from "react";
import { Container, Divider, Stack } from "@mui/material";
import styles from "./page.module.css";
import {
  BasketComponent,
  ButtonComponent,
  ComponentType,
  ImageComponent,
  MirrorComponent,
  TextComponent,
} from "./components/components";
import { v4 as uuid } from "uuid";

//TODO retrieve from another source
const newButton: ButtonComponent = {
  type: ComponentType.Button,
  text: "Test",
  id: uuid(),
};

const newImage: ImageComponent = {
  type: ComponentType.Image,
  src: "https://picsum.photos/200",
  alt: "placeholder",
  id: uuid(),
};

const newText: TextComponent = {
  type: ComponentType.Text,
  text: "Text",
  id: uuid(),
};

const newMirror: MirrorComponent = {
  type: ComponentType.Mirror,
  id: uuid(),
  cameraActivated: false,
};

const newComponents: BasketComponent[] = [
  newButton,
  newImage,
  newText,
  newMirror,
];

export default function ComponentBasket(props: {
  setItems: Function;
  setMovingItem: Function;
}) {
  return (
    <Container className={styles.componentBasket}>
      <Stack
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
        sx={{ height: 500, overflow: "auto" }}
      >
        {newComponents.map((component) => (
          <div
            key={component.id}
            draggable={true}
            unselectable="on"
            // this is a hack for firefox
            // Firefox requires some kind of initialization
            // which we can do by adding this attribute
            onDragStart={(e) => {
              props.setMovingItem(component);
              e.dataTransfer.setData("text/plain", "");
            }}
            onDragEnd={(e) => {
              props.setItems(component);
              component.id = uuid();
            }}
          >
            <BasketComponent component={component} />
          </div>
        ))}
      </Stack>
    </Container>
  );
}
