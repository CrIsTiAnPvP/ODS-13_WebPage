import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function GET() {
	const news = await prisma.noticias.findMany()
	return Response.json({ news });
}