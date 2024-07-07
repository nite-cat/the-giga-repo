const fs = require("fs");
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

async function main() {
    const repos = JSON.parse(fs.readFileSync("./repo_list.json").toString())
    let plugin_list = []
    for (let repo of repos) {
    const plugins = await get_json(repo)
        plugin_list.push(...plugins)
    }

    plugin_list = plugin_list.filter((obj1, i, arr) => 
        arr.findIndex(obj2 => (obj2.InternalName === obj1.InternalName)) === i
    )
    
    fs.writeFileSync("./the-one.json", JSON.stringify(plugin_list.sort((a, b) => a.Name.localeCompare(b.Name)), null, '\t'))
    }

main()
