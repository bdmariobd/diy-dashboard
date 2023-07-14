"use client";

import { Container, Grid } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
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

  return (
    <Container>
      <Link href="/">Go to homepage</Link>

      <Grid container spacing={2}>
        <Grid item md={2}>
          <ComponentEditor
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
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
    </Container>
  );
}
