import { Box, Button, Container, Grid, Typography } from "@mui/material";
import styles from "./page.module.css";
import { BasketComponent, ComponentType } from "./components/components";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { useRef, useState } from "react";

export default function ComponentGrid() {
  const [components, setComponents] = useState<BasketComponent[][]>([[]]);

  const gridRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ComponentType.Button, ComponentType.Image, ComponentType.Text],
    drop: (item: BasketComponent, monitor: DropTargetMonitor) =>
      handleDrop(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [items, setItems] = useState<BasketComponent[]>([]);

  function handleDrop(item: BasketComponent, monitor: DropTargetMonitor) {
    const newPosition = monitor.getClientOffset();
    const gridPosition = gridRef.current?.getBoundingClientRect();
    if (!gridPosition || !newPosition) return;

    const x = Math.floor((newPosition.x - gridPosition.left) / 64);
    const y = Math.floor((newPosition.y - gridPosition.top) / 64);

    const newItem: BasketComponent = { ...item, x, y };
    newItem.id = Date.now().toString();

    console.log(newItem);
    // setComponents([...items, newItem]);
  }
  return (
    <div ref={drop} className={styles.blueprint_grid}>
      <Box
        display={"grid"}
        style={{ width: "100%", height: "100%", position: "relative" }}
        ref={gridRef}
        gridTemplateColumns="repeat(12, 1fr)"
        gap={1}
      >
        {/*  {components.map((item, index) => {
          return (
            <Box gridColumn={"span 8"} key={item.id}>
              {item.type === ComponentType.Button ? (
                <Button>Button</Button>
              ) : item.type === ComponentType.Text ? (
                <Typography> y </Typography>
              ) : item.type === ComponentType.Image ? (
                <img src="https://picsum.photos/200" alt="placeholder" />
              ) : (
                <div></div>
              )}
            </Box>
          );
        })} */}
      </Box>
    </div>
  );
}
