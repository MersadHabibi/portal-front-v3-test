import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 
  env:{
    baseUrl : process.env.NEXT_PUBLIC_BASE_URL
  },

  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"s3.ravinow.ir",
        pathname:"/revayat-portal/**"
      }
    ]
  }
}
export default nextConfig;
