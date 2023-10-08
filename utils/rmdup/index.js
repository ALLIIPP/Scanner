import fs from 'fs'


let projects = fs.readFileSync('./projects.txt', 'utf-8')



projects = projects.split('\n');



// -1 because the last one is \n
for (let i = 0; i < projects.length - 1; i++) {

    if (projects[i].slice(projects[i].length - 1, projects[i].length) != '/') {
        projects[i] = projects[i].concat('/')
    }
}


// remove tinyurl
// remove launchmynft
// remove bitly
// remove duplicates

let updatedProj = projects.filter((c, index) => {
    return projects.indexOf(c) === index &&
        !c.includes('tinyurl') &&
        !c.includes('launchmynft') &&
        !c.includes('bit.ly') &&
        !c.includes('linktr') &&
        !c.includes('twitter') &&
        !c.includes('discord') &&
        !c.includes('opensea') &&
        !c.includes('magiceden') &&
        !c.includes('exchange.art') &&
        !c.includes('tensor.trade') &&
        !c.includes('t.co') &&
        !c.includes('instagram.com') &&
        !c.includes('trustwallet.com') &&
        !c.includes('ftx.com') &&
        !c.includes('solchicks.io') &&
        !c.includes('compendium.finance') &&
        !c.includes('https://solvent.xyz/') &&
        !c.includes('wormhole.com') &&
        !c.includes('wormholenetwork.com') &&
        !c.includes('boringprotocol.io') &&
        !c.includes('maps.me') &&
        !c.includes('hivemapper.com') &&
        !c.includes('port.finance') &&
        !c.includes('dexlab.space') &&
        !c.includes('meanfi.com') &&
        !c.includes('marinade.finance') &&
        !c.includes('mango.markets') &&
        !c.includes('basis.markets') &&
        !c.includes('unlimitedcope.com') &&
        !c.includes('oxygen.org') &&
        !c.includes('parrot.fi') &&
        !c.includes('synthetify.io') &&
        !c.includes('apricot.one') &&
        !c.includes('jungledefi.io') &&
        !c.includes('app.soulofox.com') &&
        !c.includes('nfteyez.global') &&
        !c.includes('arbsolana.com') &&
        !c.includes('chain.link') &&
        !c.includes('app.saber.so') &&
        !c.includes('viralinu.com') &&
        !c.includes('xhashtag.io') &&
        !c.includes('soldex.ai') &&
        !c.includes('ivyvampires.com') &&
        !c.includes('pepepunks.net') &&
        !c.includes('jpool.one') &&
        !c.includes('coin98.com') &&
        !c.includes('apexit.finance') &&
        !c.includes('sunnysideup.finance') &&
        !c.includes('yearn.finance') &&
        !c.includes('xhashtag.io') &&
        !c.includes('walken.io') &&
        !c.includes('fronk.xyz') &&
        !c.includes('oxbull.tech') &&
        !c.includes('getyournftforreal.com') &&
    	!c.includes('solsrfr.io') &&

        c.length > 0
})
 



console.log(`${updatedProj.length} projects found.`)
const writeStream = fs.createWriteStream('./projects.txt');

updatedProj.forEach(element => {
    writeStream.write(`${element}\n`)
}); 
