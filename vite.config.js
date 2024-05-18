

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
      "/juavaal2-api": {
        target: "http://localhost:8803",
        changeOrigin: false,
        secure: true,
        rewrite: (path) => path.replace(/^\/juavaal2-api/, ""),
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

