/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from "next";
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	images:{
		remotePatterns:[
			{
				protocol: 'https',
				hostname: '**'

			},
			{
				protocol: 'http',
				hostname: '**'
			}
		]
	}
};

export default withNextIntl(nextConfig);
