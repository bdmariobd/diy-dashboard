"use client";
import { Container, Slider, Typography } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import ComponentGrid from "./componentGrid";
import ComponentBasket from "./componentBasket";
import { BasketComponent } from "./components/components";

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

      <div>
        <ComponentBasket></ComponentBasket>
        <ComponentGrid></ComponentGrid>
      </div>
    </Container>
  );
}
