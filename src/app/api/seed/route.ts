import { ComponentType, Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const data: Prisma.BatchPayload = await prisma.component.createMany(
            {
            data: [
                {
                    type: ComponentType.Text,
                    x: 0,
                    y: 0,
                    maxX: 1,
                    maxY: 1
                }
            ]
        })
        console.log(data)

    }
    catch(e){
        console.log(e)
        return NextResponse.error()
    }
    
    return NextResponse.json({name: "Populated!"})
}
