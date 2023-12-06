/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "we-captured.kr",
                port: "",
                pathname: "/cdn-images/product/**",
            },
        ],
    },
    output: "standalone",
};

module.exports = nextConfig;
