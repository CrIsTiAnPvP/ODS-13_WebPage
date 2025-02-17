/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from "next";
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
};

export default withNextIntl(nextConfig);
