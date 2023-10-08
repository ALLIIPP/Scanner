import axios from 'axios'
import fs from 'fs'
import puppeteer from 'puppeteer'

async function gimmee() {
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()

    await page.setRequestInterception(true)

    page.on('request', (request) => {

        request.continue()
    })

    page.on('response', async (response) => {
 
        if (response.url() == 'https://api-mainnet.magiceden.io/launchpad_collections?edge_cache=true') {
       
            const responseBody = await response.json()
         
            let links = []
            for (let project of responseBody) {
                console.log(project.websiteLink)
                if (project.websiteLink != "" && project.blockchain == 'solana') {
                    links.push(project.websiteLink)
                }
            }
            links.forEach(element => {
                fs.appendFileSync('./projects.txt', `${element}\n`, (e) => {
                    console.log(e)
                })
            });

        }
    })

    await page.goto('https://magiceden.io/launchpad')
    await page.waitForTimeout(10000)
    await browser.close()

}



await gimmee()
