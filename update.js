const https = require('https');

function get_json(url) {
    return new Promise((resolve, reject) => {
      let data = '';
        https.get(url, (resp)=>{
    
          resp.on('data', (chunk) => {
            data += chunk;
          });
          
          resp.on('end', () => {
            resolve(JSON.parse(data));
          });
          
        }).on("error", (err) => {
            reject(err);
        });  
    })
}

async function main2() {
  let plugin_list = []
  for (let repo of repos) {
    const plugins = await get_json(repo)
    plugin_list.push(...plugins)
  }
  console.log(plugin_list)
}

async function main() {
  const fs = require("fs")
  const repos = JSON.parse(fs.readFileSync("./repo_list.json").toString())
  console.log(repos)
}

main()
