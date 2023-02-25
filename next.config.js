/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
const { parsed: localEnv } = require("dotenv").config({
  path: ".env.local",
});
const { parsed: productionEnv } = require("dotenv").config({
  path: ".env.production",
});
module.exports = {
  env: {
    ...localEnv,

    ...(process.env.NODE_ENV === "production" ? productionEnv : {}),
  },
  ...nextConfig,
};
