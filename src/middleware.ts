import createIntlMiddleware from "next-intl/middleware";
import { routing } from './i18n/routing';
import { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {

	return createIntlMiddleware(routing)(req);
	}
