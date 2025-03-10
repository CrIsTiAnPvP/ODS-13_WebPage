"use client";
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip } from "react-tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslations } from 'next-intl'
import { useRouter } from "next/navigation";

export default function News() {

	const err = useTranslations("errors");
	const t = useTranslations("news.page");
	const router = useRouter();

	const [news, setNews] = useState<Array<noticia>>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [howMany, setHowMany] = useState(6);
	const [order, setOrder] = useState('newest');
	// const [search, setSearch] = useState('');
	// const [searching, setSearching] = useState(false);

	useEffect(() => {
		fetch('/api/news')
			.then(res => {
				if (!res.ok) throw new Error(err('7'));
				return res.json()
			})
			.then(data => {
				setNews(data.news);
				setLoading(false);
			})
			.catch(e => {
				setError(e.message);
				setLoading(false);
			})
	}, [])

	useEffect(() => {
		if (news.length > 0) {
			setTotalPages(Math.ceil(news.length / howMany));
		}
	}, [news, howMany]);

	if (loading) {
		return (
			<div className='flex justify-center mt-10 my-2'>
				<div className='grid grid-cols-1 gap-4 my-5'>
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="flex items-center space-x-4">
							<div className="space-y-2">
								<Skeleton className="h-4 w-[350px] lg:w-[850px]" />
								<Skeleton className="h-4 w-[200px] lg:w-[500px]" />
								<Skeleton className="h-4 w-[200px] lg:w-[500px]" />
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

	if (news.length === 0 && !loading) {
		return (
			<div className='flex justify-center mt-10'>
				<div className='grid grid-cols-1 gap-4 my-5 lg:grid-cols-3'>
					<div className="flex items-center justify-center">
						<div>
							<p className="text-2xl font-bold">{t('errors.1')}</p>
							<p className="text-gray-600">{t('errors.2')}</p>
						</div>
					</div>
				</div>
			</div>
		)
	} else return (
		<>
			<div>
				<div className="flex justify-end w-full lg:w-5/6 gap-2 px-4 lg:px-0">
					<Select onValueChange={(value) => {
						setLoading(true);
						setOrder(value);
						setTimeout(() => {
							setLoading(false);
						}, 400);
					}} defaultValue={order}>
						<SelectTrigger data-tooltip-id="order" className='transform active:scale-95 transition-transform hover:cursor-pointer mt-4 bg-(--cambridge-blue) text-green-900 hover:bg-(--reseda-green-3) hover:text-white px-4 py-2 rounded'>
							<SelectValue placeholder="Cantidad" />
						</SelectTrigger>
						<SelectContent className='bg-(--cambridge-blue) '>
							<SelectItem value='newest' className='text-green-900 hover:cursor-pointer hover:bg-(--reseda-green-3) hover:text-white'>{t('1')}</SelectItem>
							<SelectItem value='oldest' className='text-green-900 hover:cursor-pointer hover:bg-(--reseda-green-3) hover:text-white'>{t('2')}</SelectItem>
							<SelectItem value='az' className='text-green-900 hover:cursor-pointer hover:bg-(--reseda-green-3) hover:text-white'>{t('3')}</SelectItem>
						</SelectContent>
					</Select>
					<Tooltip id='order' content={t('4')} noArrow delayShow={700} />

					<Select onValueChange={(value) => {
						setLoading(true);
						setHowMany(parseInt(value));
						setTimeout(() => {
							setLoading(false);
						}, 400);
					}} defaultValue={howMany.toString()}>
						<SelectTrigger data-tooltip-id="howMany" className='transform active:scale-95 transition-transform hover:cursor-pointer mt-4 bg-(--cambridge-blue) text-green-900 hover:bg-(--reseda-green-3) hover:text-white px-4 py-2 rounded'>
							<SelectValue placeholder="Cantidad" />
						</SelectTrigger>
						<SelectContent className='bg-(--cambridge-blue) '>
							<SelectItem value='6' className='text-green-900 hover:cursor-pointer hover:bg-(--reseda-green-3) hover:text-white'>6</SelectItem>
							<SelectItem value='12' className='text-green-900 hover:cursor-pointer hover:bg-(--reseda-green-3) hover:text-white'>12</SelectItem>
							<SelectItem value='24' className='text-green-900 hover:cursor-pointer hover:bg-(--reseda-green-3) hover:text-white'>24</SelectItem>
						</SelectContent>
					</Select>
					<Tooltip id='howMany' content={t('5')} noArrow delayShow={700} />
				</div>
			</div>
			{totalPages > 1 ? (
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious className='transform active:scale-95 transition-transform hover:cursor-pointer bg-(--cambridge-blue) text-green-900 hover:bg-(--reseda-green-3) hover:text-white' texto={t('10.1')} onClick={() => {
								if (page > 1) {
									setPage(page - 1);
								}
							}} />
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
							}} />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			) : null}
			<div className="flex justify-center mt-8">
				<div className="grid grid-cols-1 gap-y-10 lg:gap-y-4 gap-x-0">
					{
						news.sort((a, b) => {
							if (order === 'newest') {
								return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
							} else if (order === 'oldest') {
								return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
							} else if (order === 'az') {
								return a.titulo.localeCompare(b.titulo);
							}
							return 0;
						})
							.slice((page - 1) * howMany, page * howMany)
							.map((noticia: noticia) => {
								return (
									<div key={noticia.Id} className="hover:transform hover:scale-[101%] transition-transform hover:cursor-pointer flex items-center space-x-4 bg-gray-100/30 p-4 rounded-lg lg:mb-2 lg:mt-2" onClick={() => router.push(`/news/${noticia.Id}`)}>
										<div className="space-y-2 w-full">
											<h1 className="text-2xl font-bold">{noticia.titulo}.</h1>
											<div>
												{noticia.contenido.split('.').slice(0, 2).map((parrafo, index) => {
													const parrafos = noticia.contenido.split('.').slice(0, 2);
													if (parrafo.length > 140 && index === 0) {
														return (<p key={index}>{parrafo}...</p>)
													} else if (parrafos[0].length < 140) {
														return (<p key={index}>{parrafo.length > 140 ? `${parrafo.substring(0, 140)}...` : parrafo}</p>)
													}
												})}
											</div>
											<div className='flex justify-end '>
												<p className='text-(--reseda-green) font-bold'>{new Date(noticia.fecha).toLocaleString().split(',')[0]}</p>
											</div>
										</div>
									</div>
								)
							})
					}
				</div>
			</div>
		</>
	)
}