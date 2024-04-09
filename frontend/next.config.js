/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1r7wlqxs7xy7.cloudfront.net",
        port: "",
        pathname: "/cdn-images/**",
      },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
