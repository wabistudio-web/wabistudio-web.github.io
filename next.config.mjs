/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/wabistudio-web",
  assetPrefix: "/wabistudio-web",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
