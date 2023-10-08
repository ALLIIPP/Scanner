import fs from 'fs'

let rpcs = fs.readFileSync('./utils/linkparser/rpc.txt', 'utf-8')

rpcs = rpcs.split('\n');

rpcs = rpcs.filter((link, index) => {
    return rpcs.indexOf(link) == index &&
     (link.includes('quiknode') || 
     link.includes('ankr') || 
     link.includes('helius') || 
     link.includes('alchemy') || 
     link.includes('blockdaemon') ||
     link.includes('hellomoon')) 
     //link.includes('genesysgo'))  &&
 
})


if (rpcs.length > 0) {
    const writeStream = fs.createWriteStream('./utils/linkparser/rpc.txt');

    rpcs.forEach(element => {
        writeStream.write(`${element}\n`)
    });
} else {
    console.log('NO links found')
}
 
