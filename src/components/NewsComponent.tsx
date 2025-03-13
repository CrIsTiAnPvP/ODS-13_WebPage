"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip } from "react-tooltip"

export default function NewsComponent() {

	const t = useTranslations("news.page")
	const t2 = useTranslations("comments")
	const err = useTranslations("errors");

	const { slug } = useParams()
	const [noticia, setNoticia] = useState<noticia | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null);
	const [coments, setComents] = useState<Array<comentarios_noticia>>([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1);
	const howMany = 10

	const valid_mail = async (email: string) => {
		const res = await fetch('/api/mail/validate',
			{
				method: 'POST',
				body: JSON.stringify({domain: email.split('@')[1]}),
				headers: {
					'Content-Type': 'application/json',
				}})
		if (!res.ok) {
			return false
		} else {
			return true
		}
	}

	const schema = z.object({
		nombre: z.string().min(2, {
			message: err("1"),
		}),
		email: z.string().email({
			message: err("2"),
		}).refine(valid_mail, () => ({
			message: err("2")
		})),
		comentario: z.string().min(2, {
			message: err("3"),
		}).max(100, {
			message: err("8")
		}),
	})
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			nombre: "",
		  email: "",
		  comentario: ""
		},
	  })


	useEffect(() => {
		fetch(`/api/news/${slug}`)
		.then(res => res.json())
		.then(data => {
			setNoticia(data.noticia as noticia)
			setLoading(false)
		}).catch(e => {
			setError(e.toString())
			setLoading(false)
		})
	}, [slug])

	useEffect(() => {
		fetch(`/api/news/${slug}/comments`)
		.then(res => res.json())
		.then(data => {
			setComents(data.comentarios as Array<comentarios_noticia>)
		}).catch(e => {
			setError(e.toString())
		})
	}, [slug])

	useEffect(() => {
		if (coments.length > 0) {
			setTotalPages(Math.ceil(coments.length / howMany));
		}
	}, [coments, howMany]);

	function onSubmit(data: {nombre: string; email: string; comentario: string; fecha?: Date;}) {
		setIsModalOpen(false);
		form.reset();
		toast.success(t2('6'));
		data.fecha = new Date();
		fetch(`/api/news/${noticia?.Id}/comments`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(r => {
			if (!r.ok) throw new Error(err('5'));
			return r.json();
		}
		).then(data => {
			setComents([data.comentario, ...(coments || [])]);
		}).catch(e => {
			setError(e.message);
		});
	}

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
				{isModalOpen && (
				<div className="fixed inset-0 bg-black/85 flex items-center justify-center z-10">
					<div className="bg-(--cambridge-blue) p-12 rounded-lg shadow-lg w-3/4 max-w-lg">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
								<FormField 
								control={form.control}
								name='nombre'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t2('3.1.1')}</FormLabel>
										<FormControl>
										<Input placeholder="CrIsTiAnPvP" {...field}/>
										</FormControl>
										<FormDescription className='text-black'>{t2('3.1.2')}</FormDescription>
										<FormMessage />
									</FormItem>
									)}
								/>
								<FormField 
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t2('3.2.1')}</FormLabel>
										<FormControl>
										<Input placeholder="cristian@cristianac.live" {...field}/>
										</FormControl>
										<FormDescription className='text-black'>{t2('3.2.2')}</FormDescription>
										<FormMessage />
									</FormItem>
									)}
								/>
								<FormField 
								control={form.control}
								name='comentario'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t2('3.3.1')}</FormLabel>
										<FormControl>
										<Input placeholder={t2('5')} {...field}/>
										</FormControl>
										<FormDescription className='text-black'>{t2('3.3.2')}</FormDescription>
										<FormMessage />
									</FormItem>
									)}
								/>
								<Button type='submit' className='transform active:scale-95 transition-transform hover:cursor-pointer'>{t2('4')}</Button>
							</form>
						</Form>
						<button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 transform active:scale-95 transition-transform hover:cursor-pointer bg-red-500 text-white px-4 py-2 rounded-full">X</button>
					</div>
				</div>
				)}
		{
			noticia && (
				<div className="grid grid-cols-1 gap-4 my-5 lg:grid-cols-[1fr_3.6fr_1fr]">
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
					<div className="hidden lg:grid lg:col-start-3 mt-12 bg-gray-300/30 p-4 rounded-lg">
						<div className="flex flex-col items-center">
							<div className="">
								<Button onClick={() => setIsModalOpen(true)} className="transform active:scale-95 transition-transform hover:cursor-pointer mt-4 bg-(--cambridge-blue) text-green-900 hover:bg-(--reseda-green-3) hover:text-white px-4 py-2 rounded">{t('coments.2')}</Button>
							</div>
							<div className="mt-4">
								{totalPages > 1 ? (
									<Pagination>
									<PaginationContent>
										<PaginationItem>
											<PaginationPrevious className='transform active:scale-95 transition-transform hover:cursor-pointer bg-(--cambridge-blue) text-green-900 hover:bg-(--reseda-green-3) hover:text-white' texto={t('10.1')} onClick={() => {
												if (page > 1) {
													setPage(page - 1);
												}
											}}/>
										</PaginationItem>
										<PaginationItem>
											{Array.from({ length: totalPages }, (_, i) => (
												<PaginationLink className='mx-1 aria-[current]:text-white transform active:scale-95 transition-transform hover:cursor-pointer bg-(--cambridge-blue) text-green-900 hover:bg-(--reseda-green-3) hover:text-white' key={i + 1} isActive={(i + 1 === page)} onClick={() => setPage(i + 1)}>{i + 1}</PaginationLink>
											))}
										</PaginationItem>
										<PaginationItem>
											{totalPages > 2 ? <PaginationEllipsis /> : null}
										</PaginationItem>
										<PaginationItem>
											<PaginationNext className='transform active:scale-95 transition-transform hover:cursor-pointer bg-(--cambridge-blue) text-green-900 hover:bg-(--reseda-green-3) hover:text-white' texto={t('10.2')} onClick={() => {
												if (page < totalPages) {
													setPage(page + 1);
												}
											}}/>
										</PaginationItem>
									</PaginationContent>
								</Pagination>
								) : null}
							</div>
							{coments && coments.length > 0 ? (
								<>
									{
										coments.slice((page - 1) * howMany, page * howMany).map((comentario, i) => (
											<div key={i} className="flex flex-col bg-gray-200/50 px-6 py-4 rounded-lg my-2">
												<div className="flex justify-between">
													<p className="text-xl font-bold">{comentario.nombre}</p>
													<p className="text-base">{new Date(comentario.fecha).toLocaleString().split(',')[0]}</p>
												</div>
												<p className="text-lg text-justify">{comentario.comentario}</p>
											</div>
										))
									}
								</>
							) : (
								<div className="flex flex-col">
									<p className="text-lg lg:text-xl">{t('coments.1')}</p>
								</div>
							)}
							<div className="mt-4">
								{totalPages > 1 ? (
									<Pagination>
									<PaginationContent>
										<PaginationItem>
											<PaginationPrevious className='transform active:scale-95 transition-transform hover:cursor-pointer bg-(--cambridge-blue) text-green-900 hover:bg-(--reseda-green-3) hover:text-white' texto={t('10.1')} onClick={() => {
												if (page > 1) {
													setPage(page - 1);
												}
											}}/>
										</PaginationItem>
										<PaginationItem>
											{Array.from({ length: totalPages }, (_, i) => (
												<PaginationLink className='mx-1 aria-[current]:text-white transform active:scale-95 transition-transform hover:cursor-pointer bg-(--cambridge-blue) text-green-900 hover:bg-(--reseda-green-3) hover:text-white' key={i + 1} isActive={(i + 1 === page)} onClick={() => setPage(i + 1)}>{i + 1}</PaginationLink>
											))}
										</PaginationItem>
										<PaginationItem>
											{totalPages > 2 ? <PaginationEllipsis /> : null}
										</PaginationItem>
										<PaginationItem>
											<PaginationNext className='transform active:scale-95 transition-transform hover:cursor-pointer bg-(--cambridge-blue) text-green-900 hover:bg-(--reseda-green-3) hover:text-white' texto={t('10.2')} onClick={() => {
												if (page < totalPages) {
													setPage(page + 1);
												}
											}}/>
										</PaginationItem>
									</PaginationContent>
								</Pagination>
								) : null}
							</div>
						</div>
						
								
						
					</div>
				</div>
			)
		}
	</>
  )
}
