import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(req: NextRequest, { params }: { params: Promise<{slug: string}> }) {
	const { slug } = await params

	const noticia = await prisma.noticias.findUnique({
		where: {
			Id: slug
		}
	})

	if (!noticia) {
		return NextResponse.json({ error: "No se ha encontrado la noticia" }, { status: 404 });
	}

	return NextResponse.json({ noticia }, { status: 200 });
}