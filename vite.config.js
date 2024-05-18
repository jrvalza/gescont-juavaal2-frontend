

export default {
  build: {
    sourcemap: true,
  },
  server: {
    cors: {
      origin: "http://37.187.181.98"
    },    
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/api": {
        target: "http://localhost:8803",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  preview:{
    cors: {
        origin: "http://37.187.181.98"
    },  
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
}

