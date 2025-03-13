"use client"
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {useTranslations, useLocale} from 'next-intl';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import "../../node_modules/flag-icons/css/flag-icons.min.css"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

function classNames(...classes: [string, string]) {
  return classes.filter(Boolean).join(' ')
}

export default function Nav() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations("nav")
  
  const handleLngChange = (lng: string) => {
    if (locale !== lng){
      router.push(`${pathname.replace(locale, lng)}`)
    }
  }

  const navitems = [
    {
      name: t('1'),
      href: `/${locale}`,
      current: pathname == `/${locale}` ? true : false 
    },
    {
      name: t('2'),
      href: `/${locale}/about`,
      current: pathname == `/${locale}/about` ? true : false 
    },
    {
      name: t('3'),
      href: `/${locale}/comments`,
      current: pathname == `/${locale}/comments` ? true : false 
    },
    {
      name: t('4'),
      href: `/${locale}/news`,
      current: pathname == `/${locale}/news` ? true : false
    },
    {
      name: t('6'),
      href: `/${locale}/ods`,
      current: pathname == `/${locale}/ods` ? true : false
    }
  ]

  return (
	<>
	  <Disclosure as="nav" className="bg-(--cambridge-blue)">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-green-900 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-900">
                <span className='absoulte inset-0.5'></span>
                <span className='sr-only'>Abrir Menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
            <div className="rounded-full overflow-hidden max-w-sm mx-auto hidden sm:block">
              <Image
              src={"/images/logo.png"}
              priority={true}
              alt="ODS13"
              width={64}
              height={64}
              className='h-12 w-12 hover:cursor-help'
              onClick={() => {router.push("https://www.un.org/sustainabledevelopment/es/objetivos-de-desarrollo-sostenible/")}}
              />
            </div>
            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='hidden sm:ml-6 sm:block'>
                <div className='flex space-x-4'>
                  {navitems.map((item) => (
                    <a key={item.name} href={item.href} aria-current={item.current ? 'page' : undefined} className={classNames(item.current ? 'bg-(--reseda-green) text-black' : 'text-lg text-green-900 hover:bg-(--reseda-green-3) hover:text-white','rounded-md px-3 py-2 text-sm font-medium',)}>{item.name}</a>
                  ))}
                </div>
              </div>
            </div>
            <Menu as="div" className="relative mr-3 cursor-pointer">
              <MenuButton className="relative flex rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d542b" className="size-6 cursor-pointer ">
                  <path fillRule="evenodd" d="M9 2.25a.75.75 0 0 1 .75.75v1.506a49.384 49.384 0 0 1 5.343.371.75.75 0 1 1-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 0 1-2.97 6.323c.318.384.65.753 1 1.107a.75.75 0 0 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482.75.75 0 0 1-.688-1.333 17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.168 17.168 0 0 0 2.391-5.165 48.04 48.04 0 0 0-8.298.307.75.75 0 0 1-.186-1.489 49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 1 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726Z" clipRule="evenodd" />
                </svg>
              </MenuButton>
              <MenuItems transition anchor="bottom end" className="w-36 rounded-xl bg-white origin-top-right border border-white/5 p-1 text-sm font-semibold text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 cursor-pointer">
                <MenuItem>
                    <div className={locale == "es" ? "group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 bg-gray-300" : "group flex w-full items-center gap-2 rounded-lg py-1.5 px-3"}>
                      <button className="hover:scale-105 transform transition-transform duration-300" onClick={() => handleLngChange("es")}>
                        <span className='fi fi-es'></span>
                        <span className='ml-2'>{locale == "es" ? "Español" : "Spanish"}</span>
                      </button>
                    </div>
                </MenuItem>
                <hr className='h-px my-1 bg-gray-200 border-0'/>
                <MenuItem>
                    <div className={locale == "en" ? "group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 bg-gray-300" : "group flex w-full items-center gap-2 rounded-lg py-1.5 px-3"}>
                      <button className='hover:scale-105 transform transition-transform duration-300' onClick={() => handleLngChange("en")}>
                        <span className='fi fi-gb'></span>
                        <span className='ml-2'>{locale == "es" ? "Ingles" : "English"}</span>
                      </button>
                    </div>
                </MenuItem>
              </MenuItems>
            </Menu>
            <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className='hover:cursor-pointer outline-none border-none active:scale-95 transform transition-transform duration-150 bg-(--cambridge-blue) text-green-900 hover:bg-(--reseda-green-3) hover:text-white'>GitHub</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('5.1')}</AlertDialogTitle>
                <AlertDialogDescription>{t('5.2')}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className='hover:cursor-pointer'>{t('5.3')}</AlertDialogCancel>
                <Link href="https://github.com/CrIsTiAnPvP"><AlertDialogAction className='hover:cursor-pointer'>{t('5.4')}</AlertDialogAction></Link>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          </div>
        </div>
        <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navitems.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-(--reseda-green) text-black' : 'text-lg text-green-900 hover:bg-(--reseda-green-3) hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
	</>
  )
}