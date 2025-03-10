"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

export default function NewsComponent() {

	const t = useTranslations("news.page")

	const { slug } = useParams()
	const [noticia, setNoticia] = useState<noticia | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch(`/api/news/${slug}`)
		.then(res => res.json())
		.then(data => {
			setNoticia(data.noticia as noticia)
			setLoading(false)
		}).catch(e => {
			setError(e)
			setLoading(false)
		})
	}, [slug])

	console.log(noticia)

	if (loading) {
		return (
			<div className='flex justify-center mt-14 my-2'>
				<div className='grid grid-cols-1 gap-4 my-5'>
					<div className="flex items-center space-x-4">
						<div className="space-y-2">
							<Skeleton className="h-4 w-[350px] lg:w-[850px]" />
							<div className='flex justify-center mb-10 mt-10'>
							<Skeleton className="h-20 lg:h-40 w-[200px] lg:w-[500px]" />
							</div>
							<div className="grid justify-center gap-5">
								<Skeleton className="h-4 w-[400px] lg:w-[650px]" />
								<Skeleton className="h-4 w-[400px] lg:w-[650px]" />
								<Skeleton className="h-4 w-[400px] lg:w-[650px]" />
								<Skeleton className="h-4 w-[400px] lg:w-[650px]" />
								<Skeleton className="h-4 w-[400px] lg:w-[650px]" />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (error) {
		toast.error(error)
		setError(null)
	}

  return (
	<>
		{
			noticia &&
				<div className="grid grid-cols-1 gap-4 my-5 lg:grid-cols-[1fr_4fr_1fr]">
					<div className="flex justify-center col-start-2 mt-12 bg-gray-300/30 p-4 rounded-lg">
						<div className="space-y-2 max-w-[800px]">
							<h1 className="text-2xl lg:text-3xl font-bold text-justify">{noticia.titulo}</h1>
							<div className="flex justify-end">
								<p className="text-sm lg:text-lg">{new Date(noticia.fecha).toLocaleString().split(',')[0]}</p>
							</div>
							<div className="flex justify-center mb-10 mt-6">
								<Image 
								src={noticia.imagen}
								alt={noticia.titulo}
								width={1000}
								height={1000}
								className="rounded-lg h-[400px] w-[400px] lg:h-auto lg:w-auto"
								/>
							</div>
							<div className="grid justify-center gap-2 lg:gap-3">
								{noticia.contenido.split('\n').map((parrafo, i) => (
									<p key={i} className="text-lg lg:text-xl text-justify mb-0.5 font-medium lg:font-normal">{parrafo}</p>
								))}
							</div>
							<div className="flex justify-end">
								<Link href={noticia.enlace} target="_blank" className="transform active:scale-95 transition-transform hover:bg-blue-300/70 text-sm lg:text-lg border-blue-500/50 border bg-blue-300/30 rounded-2xl p-2 mb-2">{t('6')}</Link>
							</div>
						</div>
					</div>
				</div>
		}
	</>
  )
}
