import fs from 'fs'
import fetch from 'node-fetch'
import readline from 'readline'
const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let loopValue = null
let codeName = ""
readLine.question("Input directory code: ", answer1 => {
    readLine.question("Input loop value: ", answer2 => {
        codeName = answer1
        let loopIteration = parseInt(answer2)
        if (!isNaN(loopIteration)) {
            loopValue = loopIteration
            loopDownload()
            console.log("Downloading...");
        } else {
            throw new Error("Input must be number")
        }
})
})


const downloadFile = async ({ url, fileName }) => {
    const dir = './download';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Failed to download ${response.statusText}`)
    }
    response.buffer().then((value) => {
        fs.writeFile(`./download/${fileName}`,value,"utf-8",(err)=>console.log(`Writing to system ${fileName} Error:${err}`))
    })
}

const loopDownload = () => {
    for (let i = 1; i <= loopValue; i++) {
        if (i < 10) {
            const url = `https://bestdori.com/assets/jp/movie/mv/music_video_${codeName}_hq_rip/rgmv_hq_${codeName}-00${i}.usm`
            const fileName = `rgmv_hq_${codeName}-00${i}.usm`
            downloadFile({ url, fileName })
            
        } else if (i < 100) {
            const url = `https://bestdori.com/assets/jp/movie/mv/music_video_${codeName}_hq_rip/rgmv_hq_${codeName}-0${i}.usm`
            const fileName = `rgmv_hq_${codeName}-0${i}.usm`
            downloadFile({ url, fileName })
        } else {
            const url = `https://bestdori.com/assets/jp/movie/mv/music_video_${codeName}_hq_rip/rgmv_hq_${codeName}-${i}.usm`
            const fileName = `rgmv_hq_${codeName}-${i}.usm`
            downloadFile({ url, fileName })
        }
    }

    readLine.close()
}
