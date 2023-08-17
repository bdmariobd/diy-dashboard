import { ComponentType, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
import { NextResponse } from "next/server";

export async function GET(){
    await prisma.component.createMany({
        data: [
            {
                type: ComponentType.Text,
                x: 0,
                y: 0,
                maxX: 1,
                maxY: 1
            }
        ]
    }).catch((e:any) => {
        return NextResponse.json({name: "Error!", error: e})
    })

    return NextResponse.json({name: "Populated!"})
}
