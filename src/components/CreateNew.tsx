"use client"

import { z } from "zod"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
  
export default function CreateNew() {

	const er = useTranslations('news.errors')
	const t = useTranslations('news')

	const schema = z.object({
		titulo: z.string().min(5, { message: er('1') }),
		enlace: z.string().url({ message: er('2') }),
		fecha: z.date({required_error: er('3')}),
		contenido: z.string().min(100, { message: er('4') }),
		imagen: z.string().url({ message: er('5') }),
		
	})

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema)
	})

	function onSubmit(data: z.infer<typeof schema>) {
		form.reset();
		toast.success('Noticia creada correctamente')
		console.log(data)
		fetch('/api/news', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json()).then(console.log).catch(console.error)

	} 

  return (
	<>
		<div className="flex justify-center items-center min-h-screen">
			<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-md">
				<FormField 
				control={form.control}
				name='titulo'
				render={({ field }) => (
					<FormItem>
						<FormLabel>{t('2.1')}</FormLabel>
						<FormControl>
						<Input placeholder={t('2.3')} {...field}/>
						</FormControl>
						<FormDescription>{t('2.2')}</FormDescription>
						<FormMessage />
					</FormItem>
					)}
				/>
				<FormField 
				control={form.control}
				name='enlace'
				render={({ field }) => (
					<FormItem>
						<FormLabel>{t('3.1')}</FormLabel>
						<FormControl>
						<Input placeholder="cristianac.live" {...field}/>
						</FormControl>
						<FormDescription>{t('3.2')}</FormDescription>
						<FormMessage />
					</FormItem>
					)}
				/>
				<FormField 
				control={form.control}
				name='contenido'
				render={({ field }) => (
					<FormItem>
						<FormLabel>{t('4.1')}</FormLabel>
						<FormControl>
						<Textarea
							placeholder={t('4.3')}
							className="resize-none"
							{...field}
						/>
						</FormControl>
						<FormDescription>{t('4.2')}</FormDescription>
						<FormMessage />
					</FormItem>
					)}
				/>
				<FormField 
				control={form.control}
				name='imagen'
				render={({ field }) => (
					<FormItem>
						<FormLabel>{t('5.1')}</FormLabel>
						<FormControl>
						<Input placeholder={t('5.3')} {...field}/>
						</FormControl>
						<FormDescription>{t('5.2')}</FormDescription>
						<FormMessage />
					</FormItem>
					)}
				/>
				<FormField
				control={form.control}
				name="fecha"
				render={({ field }) => (
					<FormItem className="flex flex-col">
					<FormLabel>{t('1')}</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
						<FormControl>
							<Button
							variant={"outline"}
							className={cn(
								"w-[240px] pl-3 text-left font-normal",
								!field.value && "text-muted-foreground"
							)}
							>
							{field.value ? (
								format(field.value, "PPP")
							) : (
								<span>{t('date.1')}</span>
							)}
							<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
							</Button>
						</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							captionLayout="dropdown"
							fromDate={new Date("1900-01-01")}
							toDate={new Date()}
							selected={field.value}
							onSelect={field.onChange}
							disabled={(date) =>
							date > new Date() || date < new Date("1900-01-01")
							}
							className="px-8"
							initialFocus
						/>
						</PopoverContent>
					</Popover>
					<FormDescription>
						{t('date.2')}
					</FormDescription>
					<FormMessage />
					</FormItem>
				)}
				/>
				<Button type="submit">Submit</Button>
			</form>
			</Form>
		</div>
	</>
  )
}
