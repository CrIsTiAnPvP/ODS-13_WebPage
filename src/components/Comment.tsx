"use client"
import { use, useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslations} from 'next-intl'
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Comentario = {
	Id: string;
	nombre: string;
	email: string;
	comentario: string;
	fecha: Date;
}


export default function Comment() {
	const er = useTranslations("errors");
	const schema = z.object({
		nombre: z.string().min(2, {
			message: er("1"),
		}),
		email: z.string().email({
			message: er("2"),
		}),
		comentario: z.string().min(2, {
			message: er("3"),
		}).max(30, {
			message: er("6")
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

	const [loading, setLoading] = useState(true);
	const [comments, setComments] = useState<Array<{ Id: string; nombre: string; email: string; comentario: string; fecha: Date }>>([]);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [howMany, setHowMany] = useState(8);
	const [order, setOrder] = useState('newest');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const t = useTranslations("comments");

	useEffect(() => {
		fetch('/api/comments')
		.then(r => {
			if (!r.ok) throw new Error(er('4'));
			return r.json();
		}).then(data => {
			setComments(data.comentarios);
			setLoading(false);
		}).catch(e => {
			setError(e.message);
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		if (comments.length > 0) {
			setTotalPages(Math.ceil(comments.length / howMany));
		}
	}, [comments, howMany]);

	function onSubmit(data: {nombre: string; email: string; comentario: string; fecha?: Date}) {
		setIsModalOpen(false);
		form.reset();
		toast.success(t('6'));
		data.fecha = new Date();
		fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(r => {
			if (!r.ok) throw new Error(er('5'));
			return r.json();
		}
		).then(data => {
			setComments([data.comentario, ...comments]);
		}).catch(e => {
			setError(e.message);
		});
	}

	if (loading) {
		return (
			<div className='flex justify-center mt-10 my-2'>
				<div className='grid grid-cols-3 gap-4 my-5'>
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="flex items-center space-x-4">
							<div className="space-y-2">
								<Skeleton className="h-4 w-[250px]" />
								<Skeleton className="h-4 w-[200px]" />
								<Skeleton className="h-4 w-[200px]" />
								<div className='flex justify-end'>
									<Skeleton className="h-4 w-[100px]" />
								</div>
							</div>
						</div>
					))}	
				</div>
			</div>
		)
	}

	if (error) {
		toast.error(error);
		setError(null);
	}

	if (comments.length === 0 && !loading) {
		return (
			<div className='flex justify-center mt-10'>
				<div className='grid grid-cols-3 gap-4 my-5'>
					<div className="flex items-center justify-center">
						<div className="">
							<p className="text-2xl font-bold">{t('11.1')}</p>
							<p className="text-gray-600">{t('11.2')}</p>
							<Button onClick={() => setIsModalOpen(true)} className="transform active:scale-95 transition-transform hover:cursor-pointer mt-4 bg-(--cambridge-blue) text-green-900 hover:bg-(--reseda-green-3) hover:text-white px-4 py-2 rounded">{t('1')}</Button>
						</div>
					</div>
				</div>
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
										<FormLabel>{t('3.1.1')}</FormLabel>
										<FormControl>
										<Input placeholder="CrIsTiAnPvP" {...field}/>
										</FormControl>
										<FormDescription className='text-black'>{t('3.1.2')}</FormDescription>
										<FormMessage />
									</FormItem>
									)}
								/>
								<FormField 
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('3.2.1')}</FormLabel>
										<FormControl>
										<Input placeholder="cristian@cristianac.live" {...field}/>
										</FormControl>
										<FormDescription className='text-black'>{t('3.2.2')}</FormDescription>
										<FormMessage />
									</FormItem>
									)}
								/>
								<FormField 
								control={form.control}
								name='comentario'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('3.3.1')}</FormLabel>
										<FormControl>
										<Input placeholder={t('5')} {...field}/>
										</FormControl>
										<FormDescription className='text-black'>{t('3.3.2')}</FormDescription>
										<FormMessage />
									</FormItem>
									)}
								/>
								<Button type='submit' className='transform active:scale-95 transition-transform hover:cursor-pointer'>{t('4')}</Button>
							</form>
						</Form>
						<button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 transform active:scale-95 transition-transform hover:cursor-pointer bg-red-500 text-white px-4 py-2 rounded-full">X</button>
					</div>
				</div>
				)}
			</div>
		)
	}
	else return (
		<>	
			<div>
				<div className="flex justify-end w-5/6 gap-2">
					<Select onValueChange={(value) => {
						setLoading(true);
						setOrder(value);
						setTimeout(() => {
							setLoading(false);
						}, 400);
						} } defaultValue={order}>
						<SelectTrigger className='transform active:scale-95 transition-transform hover:cursor-pointer mt-4 bg-(--cambridge-blue) text-green-900 hover:bg-(--reseda-green-3) hover:text-white px-4 py-2 rounded'>
							<SelectValue placeholder="Cantidad"/>
						</SelectTrigger>
						<SelectContent className='bg-(--cambridge-blue) '>
							<SelectItem value='newest' className='text-green-900 hover:cursor-pointer hover:bg-(--reseda-green-3) hover:text-white'>{t('7')}</SelectItem>
							<SelectItem value='oldest' className='text-green-900 hover:cursor-pointer hover:bg-(--reseda-green-3) hover:text-white'>{t('8')}</SelectItem>
							<SelectItem value='az' className='text-green-900 hover:cursor-pointer hover:bg-(--reseda-green-3) hover:text-white'>{t('9')}</SelectItem>
						</SelectContent>
					</Select>

					<Select onValueChange={(value) => {
						setLoading(true);
						setHowMany(parseInt(value));
						setTimeout(() => {
							setLoading(false);
						}, 400);
						} } defaultValue={howMany.toString()}>
						<SelectTrigger className='transform active:scale-95 transition-transform hover:cursor-pointer mt-4 bg-(--cambridge-blue) text-green-900 hover:bg-(--reseda-green-3) hover:text-white px-4 py-2 rounded'>
							<SelectValue placeholder="Cantidad"/>
						</SelectTrigger>
						<SelectContent className='bg-(--cambridge-blue) '>
							<SelectItem value='8' className='text-green-900 hover:cursor-pointer hover:bg-(--reseda-green-3) hover:text-white'>8</SelectItem>
							<SelectItem value='16' className='text-green-900 hover:cursor-pointer hover:bg-(--reseda-green-3) hover:text-white'>16</SelectItem>
							<SelectItem value='24' className='text-green-900 hover:cursor-pointer hover:bg-(--reseda-green-3) hover:text-white'>24</SelectItem>
						</SelectContent>
					</Select>

					<Button onClick={() => setIsModalOpen(true)} className="transform active:scale-95 transition-transform hover:cursor-pointer mt-4 bg-(--cambridge-blue) text-green-900 hover:bg-(--reseda-green-3) hover:text-white px-4 py-2 rounded">{t('1')}</Button>
				</div>
			<div>
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
								{totalPages > 3 ? <PaginationEllipsis /> : null}
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
										<FormLabel>{t('3.1.1')}</FormLabel>
										<FormControl>
									  	<Input placeholder="CrIsTiAnPvP" {...field}/>
										</FormControl>
										<FormDescription className='text-black'>{t('3.1.2')}</FormDescription>
										<FormMessage />
								  	</FormItem>
									)}
								/>
								<FormField 
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('3.2.1')}</FormLabel>
										<FormControl>
									  	<Input placeholder="cristian@cristianac.live" {...field}/>
										</FormControl>
										<FormDescription className='text-black'>{t('3.2.2')}</FormDescription>
										<FormMessage />
								  	</FormItem>
									)}
								/>
								<FormField 
								control={form.control}
								name='comentario'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('3.3.1')}</FormLabel>
										<FormControl>
									  	<Input placeholder={t('5')} {...field}/>
										</FormControl>
										<FormDescription className='text-black'>{t('3.3.2')}</FormDescription>
										<FormMessage />
								  	</FormItem>
									)}
								/>
								<Button type='submit' className='transform active:scale-95 transition-transform hover:cursor-pointer'>{t('4')}</Button>
							</form>
						</Form>
						<button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 transform active:scale-95 transition-transform hover:cursor-pointer bg-red-500 text-white px-4 py-2 rounded-full">X</button>
					</div>
				</div>
				)}
				</div>
				<div className="flex justify-center mt-10">
					<div className="grid grid-cols-4 gap-y-4 gap-x-0">
					{
						comments
							.sort((a, b) => {
								if (order === 'newest') {
									return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
								} else if (order === 'oldest') {
									return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
								} else if (order === 'az') {
									return a.nombre.localeCompare(b.nombre);
								}
								return 0;
							})
							.slice((page - 1) * howMany, page * howMany)
							.map((comment: Comentario) => {
								return (
									<div key={comment.Id} className='flex items-center'>
										<div className="bg-gray-200 p-6 rounded-lg px-10 mx-3 min-w-3xs">
											<h2 className="text-xl font-bold">{comment.nombre}</h2>
											<p className="text-gray-600">{comment.comentario}</p>
											<br />
											<div className='flex justify-end'>
												<p className="text-gray-400">{new Date(comment.fecha).toLocaleString()}</p>
											</div>
										</div>
									</div>
								);
							})
					}
					</div>
				</div>
		</>
	)
}