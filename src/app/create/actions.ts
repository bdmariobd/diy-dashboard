"use server";

import { prisma } from "../../../prisma/prismaSingleton";
import { BasketComponent } from "./components/components";
import {
  ButtonComponent,
  ImageComponent,
  MirrorComponent,
  TextComponent,
} from "@prisma/client";

// nextjs server actions
export async function saveDashboard(
  dashboardname: string,
  items: BasketComponent[]
): Promise<void> {
  console.log("saveDashboard", dashboardname, items);

  const dashResultData = await prisma.dashboard.create({
    data: {
      name: dashboardname,
      userId: 1,
    },
  });

  if (dashResultData.id) {
    items.map(async (item) => {
      console.log("item", item);
      const parentComponent = await prisma.component.create({
        data: {
          type: item.type,
          maxX: item.maxX,
          maxY: item.maxY,
          x: item.x || 0,
          y: item.y || 0,
          dashboardId: dashResultData.id,
        },
      });

      if (parentComponent.id) {
        switch (item.type) {
          case "Text":
            const textItem = item as unknown as TextComponent;
            await prisma.textComponent.create({
              data: {
                text: textItem.text,
                componentId: parentComponent.id,
              },
            });
            break;
          case "Image":
            const imageItem = item as unknown as ImageComponent;
            await prisma.imageComponent.create({
              data: {
                url: imageItem.url,
                componentId: parentComponent.id,
              },
            });
            break;
          case "Button":
            const buttonItem = item as unknown as ButtonComponent;
            await prisma.buttonComponent.create({
              data: {
                text: buttonItem.text,
                componentId: parentComponent.id,
                color: buttonItem.color,
              },
            });
            break;
          case "Mirror":
            await prisma.mirrorComponent.create({
              data: {
                componentId: parentComponent.id,
              },
            });
            break;
          default:
            break;
        }
      }
    });
  }
}
