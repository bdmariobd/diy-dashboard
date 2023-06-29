import styles from "./page.module.css";
import {
  BasketComponent,
  ButtonComponent,
  ComponentType,
} from "./components/components";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import RGL, { WidthProvider } from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

const ReactGridLayout = WidthProvider(RGL);
export default function ComponentGrid() {
  const [items, setItems] = useState<BasketComponent[][]>([[]]);
  const newButton: ButtonComponent = {
    type: ComponentType.Button,
    id: uuid(),
    text: "Button",
  };
  const [layout, setlayout] = useState<RGL.Layout[]>([]);

  /* className: "layout",
    items: 20,
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12 */
  return (
    <div>
      <ReactGridLayout
        className={styles.componentGrid}
        /* rowHeight={64} */
        layout={layout}
        // onLayoutChange={this.onLayoutChange}
        onDrop={(layout, _layoutItem, _event) => {
          setlayout(layout);
        }}
        cols={12}
        width={1200}
        rowHeight={30}
        measureBeforeMount={false}
        useCSSTransforms={true}
        compactType={null}
        preventCollision={!"vertical"}
        isDroppable={true}
        isResizable={true}
        droppingItem={{ i: uuid(), h: 1, w: 1 }}
        maxRows={12}
      >
        {layout.map((itm, i) => (
          <div key={itm.i} data-grid={itm} className={styles.block}>
            <BasketComponent component={newButton} />
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
}
