const { copyFileSync, mkdirSync } = require('node:fs')
const { join } = require('node:path')

const dist = join(__dirname, '..', 'dist')
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))

const naturcycle = join(dist, 'naturcycle')
mkdirSync(naturcycle, { recursive: true })
copyFileSync(join(dist, 'index.html'), join(naturcycle, 'index.html'))

const metaglasses = join(dist, 'metaglasses')
mkdirSync(metaglasses, { recursive: true })
copyFileSync(join(dist, 'index.html'), join(metaglasses, 'index.html'))
