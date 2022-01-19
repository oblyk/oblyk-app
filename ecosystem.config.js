module.exports = {
  apps: [
    {
      name: 'OblykApp',
      exec_mode: 'cluster',
      cwd: '/var/www/oblyk/app/current',
      error_file: './log/app.err.log',
      out_file: './log/app.out.log',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
