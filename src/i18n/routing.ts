import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localeDetection: false
});

export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);