import {
    Keypair,
} from '@solana/web3.js'
import bs58 from 'bs58'
import fs from "fs"

await checker()

async function checker() {

    let parsed = fs.readFileSync('./utils/checker/data.txt', 'utf-8').split(/[^a-zA-Z0-9]+/); //arr


    let keys = []
    for (let element of parsed) {
        if (element.length > 30) {
            try {
                let key = Keypair.fromSecretKey(bs58.decode(element))
                keys.push(bs58.encode(key.secretKey))
            } catch (e) {
                //console.log('bunk')
            }
        }
    }

    // filter out duplicate keys
    keys = keys.filter((key, index) => {
        return keys.indexOf(key) == index
    })

    if (keys.length > 0) {
        let old_keys = JSON.parse(fs.readFileSync('./utils/checker/found_keys.json'))

        for (let new_key of keys) {
            let exists = false;
            for (let old_key of old_keys) {
                if (new_key === old_key.key) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                keys.push({ website: process.argv[2], key: new_key })
                fs.writeFileSync('./utils/checker/found_keys.json', JSON.stringify(keys))
            }
        }
    } 

}

