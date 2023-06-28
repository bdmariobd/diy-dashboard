import styles from "./page.module.css";
import {
  BasketComponent,
  ButtonComponent,
  ComponentType,
} from "./components/components";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { use, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

export default function ComponentGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ComponentType.Button, ComponentType.Image, ComponentType.Text],
    drop: (item: BasketComponent, monitor: DropTargetMonitor) =>
      handleDrop(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [items, setItems] = useState<BasketComponent[][]>(() => {
    const initialItems: BasketComponent[][] = [];
    for (let i = 0; i < 8; i++) {
      const row: BasketComponent[] = [];
      for (let j = 0; j < 8; j++) {
        row.push({
          type: ComponentType.Blank,
          id: uuid(),
          x: j,
          y: i,
          expansionRows: 1,
          expansionColumns: 1,
        });
      }
      initialItems.push(row);
    }
    return initialItems;
  });

  // Función para establecer un elemento específico en el array bidimensional
  const setItemValue = (
    rowIndex: number,
    columnIndex: number,
    value: BasketComponent
  ) => {
    setItems((prevState) => {
      const newItems = prevState.map((row) => [...row]);
      newItems[rowIndex] = newItems[rowIndex].slice(); // Copia profunda del subarray interno
      newItems[rowIndex][columnIndex] = value;
      return newItems;
    });
  };

  useEffect(() => {
    setItemValue(0, 0, {
      type: ComponentType.Button,
      id: uuid(),
      x: 0,
      y: 1,
      expansionRows: 2,
      expansionColumns: 1,
    });
  }, []);

  const getGridTemplateAreas = () => {
    const gridTemplateAreas = items
      .map((row) => `"${row.map((item) => item.id).join(" ")}"`)
      .join("\n");
    console.log(gridTemplateAreas);
    return gridTemplateAreas;
  };

  function handleDrop(item: BasketComponent, monitor: DropTargetMonitor) {
    const newPosition = monitor.getClientOffset();
    const gridPosition = gridRef.current?.getBoundingClientRect();
    if (!gridPosition || !newPosition) return;

    const x = Math.floor((newPosition.x - gridPosition.left) / 64);
    const y = Math.floor((newPosition.y - gridPosition.top) / 64);

    const newItem: BasketComponent = { ...item };
    console.log(newItem);
  }
  return (
    <div
      ref={drop}
      className={styles.grid_container}
      style={{ gridTemplateAreas: getGridTemplateAreas() }}
    >
      {items.map((row, y) =>
        row.map((item, x) => <BasketComponent key={item.id} component={item} />)
      )}
    </div>
  );
}
