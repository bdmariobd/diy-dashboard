"use client";
import { Container, Grid, Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ComponentGrid from "./componentGrid";
import ComponentBasket from "./componentBasket";
import { BasketComponent } from "./components/components";
import ComponentEditor from "./componentEditor";

export default function Create() {
  // declare items dictionary state
  const [items, setItems] = useState<{ [key: string]: BasketComponent }>({});
  const [movingItem, setMovingItem] = useState<string>();
  const [selectedItem, setSelectedItem] = useState<BasketComponent>();

  const onSetItems = (e: BasketComponent) => {
    setItems((prev) => {
      return { ...prev, [e.id]: e };
    });
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

      <Grid container spacing={2}>
        <Grid item>
          <ComponentEditor selectedItem={selectedItem}></ComponentEditor>
        </Grid>
        <Grid item xs={12} md={8}>
          <ComponentGrid
            movingItem={movingItem}
            items={items}
            setSelectedItem={setSelectedItem}
          ></ComponentGrid>
        </Grid>
        <Grid item>
          <ComponentBasket
            setMovingItem={setMovingItem}
            setItems={onSetItems}
          ></ComponentBasket>
        </Grid>
      </Grid>
    </Container>
  );
}
