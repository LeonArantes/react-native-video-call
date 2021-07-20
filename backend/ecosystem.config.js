module.exports = {
  apps: [
    {
      name: 'videochat-api',
      exec_mode: process.env.NODE_ENV === 'development' ? 'fork' : 'cluster',
      instances: process.env.NODE_ENV === 'development' ? '1' : 'max',
      script:
        process.env.NODE_ENV === 'development'
          ? 'src/server.js'
          : 'dist/server.js',
      watch: process.env.NODE_ENV === 'development',
      interpreter:
        process.env.NODE_ENV === 'development' ? 'sucrase-node' : null,
    },
  ],
}
