const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/api/chat",
        headers: [
          {
            key: "Access-Control-Allow-Methods",
            value: "POST, GET, OPTIONS",
          },
        ],
      },
    ];
  },
  output: "export", // Outputs a Single-Page Application (SPA).
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
};

export default nextConfig;
