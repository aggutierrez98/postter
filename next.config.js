/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: [
      "rb.gy",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "www.desktopbackground.org",
      "firebasestorage.googleapis.com",
    ],
  },
};
