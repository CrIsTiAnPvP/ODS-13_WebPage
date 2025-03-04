import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: NextRequest): Promise<NextResponse> {
    const comentarios = await prisma.comentarios_web.findMany()
    return NextResponse.json({ comentarios });
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        if (!data || typeof data !== 'object') {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }
        const { nombre, email, comentario, fecha } = data;
        if (!nombre || !email || !comentario || !fecha) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const newComentario = await prisma.comentarios_web.create({
            data: {
                nombre,
                email,
                comentario,
                fecha: new Date(fecha)
            },
        })
        if (!newComentario) {
            return NextResponse.json({ error: 'Failed to create comentario' }, { status: 500 });
        }
        return NextResponse.json({ comentario: newComentario }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}