"use client";

import { Grid } from "@mui/material";
import React, { useState } from "react";
import ComponentGrid from "./componentGrid";
import ComponentBasket from "./componentBasket";
import {
  BasketComponent,
  ComponentType,
  MirrorComponent,
} from "./components/components";
import ComponentEditor from "./componentEditor";

export default function Create() {
  // declare items dictionary state
  const [items, setItems] = useState<{ [key: string]: BasketComponent }>({});
  const [movingItem, setMovingItem] = useState<BasketComponent>();
  const [selectedItem, setSelectedItem] = useState<BasketComponent>();

  const onSetItems = (e: BasketComponent) => {
    let newItem: any = { ...e };
    if (e.type === ComponentType.Mirror) {
      newItem = newItem as MirrorComponent;
      newItem.cameraActivated = true;
    }
    setItems((prev) => {
      return { ...prev, [e.id]: newItem };
    });
  };

  const onChangeSelecteditem = (e: BasketComponent) => {
    setSelectedItem(e);
    setItems((prev) => {
      return { ...prev, [e.id]: e };
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={2}>
          <ComponentEditor
            selectedItem={selectedItem}
            setSelectedItem={onChangeSelecteditem}
          ></ComponentEditor>
        </Grid>
        <Grid item xs={12} md={8}>
          <ComponentGrid
            movingItem={movingItem}
            items={items}
            setSelectedItem={setSelectedItem}
          ></ComponentGrid>
        </Grid>
        <Grid item md={2}>
          <ComponentBasket
            setMovingItem={setMovingItem}
            setItems={onSetItems}
          ></ComponentBasket>
        </Grid>
      </Grid>
    </>
  );
}
