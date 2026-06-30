const { copyFileSync } = require('node:fs')
const { join } = require('node:path')

const dist = join(__dirname, '..', 'dist')
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))
