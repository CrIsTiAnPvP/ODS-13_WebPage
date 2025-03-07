import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()
export async function GET() {
	const news = await prisma.noticias.findMany()
	return NextResponse.json({ news }, { status: 200 });
}

export async function POST(req:NextRequest) {
	try {
		const data: noticia = await req.json()

		if (!data || typeof data !== 'object') {
			return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
		}

		const { titulo, fecha, contenido, imagen, enlace } = data

		if (!titulo || !fecha || !contenido || !imagen || !enlace) {
			return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
		}

		const noticia = await prisma.noticias.create({
			data: {
				titulo,
				fecha: new Date(fecha),
				contenido,
				imagen,
				enlace
			}
		})

		if (!noticia) {
			return NextResponse.json({ error: 'Failed to create noticia' }, { status: 500 });
		}

		return NextResponse.json({ noticia }, { status: 200 });

	} catch (e) {
		console.log(e);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}