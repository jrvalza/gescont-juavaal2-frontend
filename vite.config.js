

export default {
  build: {
    sourcemap: true,
  },
  server: {
    cors: {
      origin: "http://localhost:8000"
    },    
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  preview:{
    cors: {
        origin: "http://localhost:8000"
    },  
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
}

