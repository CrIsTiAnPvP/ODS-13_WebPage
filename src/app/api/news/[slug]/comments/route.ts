import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(req: NextRequest, { params }: { params: Promise<{slug: string}> }) {
	const { slug } = await params

	const comentarios = await prisma.comentarios_noticia.findMany({
		where: {
			noticiaId: slug
		}
	})

	if (!comentarios) {
		return NextResponse.json({ error: "Notice not found" }, { status: 404 });
	}

	return NextResponse.json({ comentarios }, { status: 200 });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{slug: string}> }) {

	const { slug } = await params

	const { nombre, email, comentario, fecha } = await req.json()

	if (!nombre || !email || !comentario) {
		return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
	}

	if (!slug) {
		return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
	}

	const noticia = await prisma.noticias.findUnique({
		where: {
			Id: slug
		}
	})

	if (!noticia) {
		return NextResponse.json({ error: "Notice not found" }, { status: 404 });
	}

	const new_comment = await prisma.comentarios_noticia.create({
		data: {
			nombre,
			email,
			comentario,
			fecha,
			noticia: {
				connect: {
					Id: slug
				}
			}
		}
	})

	return NextResponse.json({ comentario: new_comment }, { status: 200 });

}