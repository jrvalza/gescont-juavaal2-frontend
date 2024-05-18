

export default {
  build: {
    sourcemap: true,
  },
  server: {
    cors: {
      origin: "https://37.187.181.98"
    },    
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/juavaal2-api": {
        target: "https://37.187.181.98",
        changeOrigin: false,
        secure: false,
        rewrite: (path) => path.replace(/^\/juavaal2-api/, ""),
      },
    },
  },
  preview:{
    cors: {
        origin: "https://37.187.181.98"
    },  
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
}

