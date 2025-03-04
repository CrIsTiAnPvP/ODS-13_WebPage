"use client"
import { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslations} from 'next-intl'
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

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
	// const [order, setOrder] = useState('newest');
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

	return (
		<>	
			<div id="NewComment">
			<div className="flex justify-end w-5/6">
				<button onClick={() => setIsModalOpen(true)} className="transform active:scale-95 transition-transform hover:cursor-pointer mt-4 bg-(--cambridge-blue) text-green-900 hover:bg-(--reseda-green-3) hover:text-white px-4 py-2 rounded">{t('1')}</button>
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
				<div className="grid grid-cols-4 gap-4">
					{
						comments.map((comment) => (
							<div key={comment.Id} className="flex items-center space-x-4">
								<div className="bg-gray-200 p-6 rounded-lg">
									<h2 className="text-xl font-bold">{comment.nombre}</h2>
									<p className="text-gray-600">{comment.comentario}</p>
									<br />
									<div className='flex justify-end'>
										<p className="text-gray-400">{new Date(comment.fecha).toLocaleString()}</p>
									</div>
								</div>
							</div>
						))
					}
				</div>
			</div>
		</>
	)
}