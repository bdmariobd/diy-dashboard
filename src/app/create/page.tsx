"use client";

import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import ComponentGrid from "./componentGrid";
import ComponentBasket from "./componentBasket";
import { BasketComponent, MirrorComponent } from "./components/components";
import ComponentEditor from "./componentEditor";
import SaveIcon from "@mui/icons-material/Save";
import { saveDashboard } from "./actions";

export default function Create() {
  // declare items dictionary state
  const [items, setItems] = useState<{ [key: string]: BasketComponent }>({});
  const [movingItem, setMovingItem] = useState<BasketComponent>();
  const [selectedItem, setSelectedItem] = useState<BasketComponent>();

  const onSetItems = (e: BasketComponent) => {
    let newItem: any = { ...e };
    if (e.type === "Mirror") {
      newItem = newItem as MirrorComponent;
      newItem.cameraActivated = true;
    }
    setItems((prev) => {
      return { ...prev, [e.id]: newItem };
    });
  };

  const onChangeSelecteditem = (e: BasketComponent) => {
    setSelectedItem(e);
    console.log(e);
    setItems((prev) => {
      return { ...prev, [e.id]: e };
    });
  };

  const onSubmitDashBoard = (form: FormData) => {
    saveDashboard({
      dashboardname: {
        dashboardname: form.get("dashboardName") as string,
        items: Object.values(items),
      },
    });
  };

  return (
    <>
      <form action={onSubmitDashBoard}>
        <Grid
          container
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
          marginY={5}
        >
          <Grid item md={2}>
            <TextField
              label="Dashboard name"
              type="text"
              name="dashboardName"
            ></TextField>
          </Grid>
          <Grid item md={2}>
            <Button
              variant="contained"
              endIcon={<SaveIcon></SaveIcon>}
              type="submit"
            >
              Save dashboard
            </Button>
          </Grid>
        </Grid>
      </form>
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
