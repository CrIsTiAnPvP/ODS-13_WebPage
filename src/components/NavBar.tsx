import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import {useTranslations, useLocale} from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import "../../node_modules/flag-icons/css/flag-icons.min.css"

export default function Nav() {
  return (
	<div>NavBar</div>
  )
}
