

export default {
  build: {
    sourcemap: true,
  },
  server: {
    cors: {
      origin: "https://vps-3206e74d.vps.ovh.net"
    },    
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/api": {
        target: "https://vps-3206e74d.vps.ovh.net",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  preview:{
    cors: {
        origin: "https://vps-3206e74d.vps.ovh.net"
    },  
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
}

