
import { URL_API } from './js/settings';

export default {
  build: {
    sourcemap: true,
  },
  server: {
    cors: {
      origin: URL_API
    },    
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/api": {
        target: URL_API,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  preview:{
    cors: {
        origin: URL_API
    },  
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
}

