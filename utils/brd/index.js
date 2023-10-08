import axios from "axios";
import fs from 'fs'

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
 

getLinks()

async function getLinks() {
    let links = await getBirds()

    links.forEach(element => {
        fs.appendFileSync('./projects.txt', `${element}\n`, (e) => {
            console.log(e)
        })
    });
}
async function getBirds() {
    let joints = []
    for (let i = 0; i < 16; i++) {
        let offset = 15 * i
        console.log('offset : ' + offset)
        await sleep(15000)
        await axios.post('https://multichain-api.birdeye.so/solana/gems', `{\"sort_by\":\"liquidity\",\"sort_type\":\"asc\",\"offset\":${offset},\"limit\":15,\"query\":[],\"export\":false}`, {
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.5',
                'agent-id': 'bd1ac745-3271-4ddb-b9a2-7e95e3b4b665',
                'cf-be': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODYyNjg2OTIsImV4cCI6MTY4NjI2ODk5Mn0.jngSlJRurvKHLhkfA0ksBdd_iND8mcV01MbcW7KHqNA',
                Connection: 'keep-alive',
                'Content-Type': 'application/json',
                'Host': 'multichain-api.birdeye.so',
                'Origin': 'https://birdeye.so',
                'Referer': 'https://birdeye.so/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
                'TE': 'trailers',
                'token': 'undefined',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0'

            }
        }).then((res) => {
            res.data.data.items.forEach(element => {
                if (element?.extensions?.website) {
                    joints.push(element.extensions.website)
                }

            });

        }).catch((e => {
            console.log('BIRD IS BROKE : '+e)
        }))



        /*  res.data.data.items.filter((item) => {
              return item.liquidity <= 5000
          }) */

        //{"sort_by":"v24hUSD","sort_type":"desc","offset":0,"limit":15,"query":[{"keyword":"liquidity","operator":"lt","value":20000}],"export":false}
    }
    return joints;
}


