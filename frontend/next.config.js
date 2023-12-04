/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "d3hoea0p4wjde8.cloudfront.net",
                port: "",
                pathname: "/product/**",
            },
        ],
    },
    output: "standalone",
};

module.exports = nextConfig;
