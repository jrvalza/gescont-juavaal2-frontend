

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
        target: "http://37.187.181.98",
        changeOrigin: true,
        secure: false,
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

