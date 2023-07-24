import styles from "./page.module.css";
import { BasketComponent } from "./components/components";
import { useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { Paper } from "@mui/material";

const ReactGridLayout = WidthProvider(RGL);
export default function ComponentGrid(props: {
  items: { [key: string]: BasketComponent };
  movingItem?: BasketComponent;
  setSelectedItem: Function;
}) {
  const [layout, setlayout] = useState<RGL.Layout[]>([]);

  const onDropHandler = (layout: RGL.Layout[], layoutItem: RGL.Layout) => {
    layoutItem.minW = props.movingItem?.maxX;
    layoutItem.minH = props.movingItem?.maxY;
    setlayout(layout);
  };

  /* className: "layout",
    items: 20,
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12 */
  return (
    <Paper>
      <ReactGridLayout
        className={styles.componentGrid}
        /* rowHeight={64} */
        layout={layout}
        // onLayoutChange={this.onLayoutChange}
        onDrop={(layout, _layoutItem, _event) => {
          //change dropped item id to uuid
          onDropHandler(layout, _layoutItem);
        }}
        cols={12}
        width={1200}
        rowHeight={30}
        measureBeforeMount={false}
        useCSSTransforms={true}
        compactType={null}
        isDroppable={true}
        isResizable={true}
        droppingItem={{
          i: props.movingItem?.id || "blank",
          h: props.movingItem?.maxX || 1,
          w: props.movingItem?.maxY || 1,
        }}
        maxRows={12}
      >
        {layout.map((item) => {
          if (!props.items[item.i]) {
            return <></>;
          }
          return (
            <div
              key={item.i}
              data-grid={item}
              onClick={() => props.setSelectedItem(props.items[item.i])}
            >
              <BasketComponent component={props.items[item.i]} />
            </div>
          );
        })}
      </ReactGridLayout>
    </Paper>
  );
}
