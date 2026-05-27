/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["better-sqlite3"]
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Keep the native module as a Node require everywhere (incl. the
      // static-paths worker) so it isn't bundled by webpack.
      const ext = config.externals || [];
      config.externals = Array.isArray(ext)
        ? [...ext, "better-sqlite3"]
        : [ext, "better-sqlite3"];
    }
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" }
    ]
  }
};

module.exports = nextConfig;
