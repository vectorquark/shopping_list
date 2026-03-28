import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MEALDB_BASE_URL: "https://www.themealdb.com/api/json/v1/1",
  },
};

export default nextConfig;
