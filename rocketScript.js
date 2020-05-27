const request = require('request-promise');
const endpoint = "https://api.spacexdata.com/v3/rockets"

document.addEventListener('DOMContentLoaded', () => {
    const rocketsDiv = document.querySelector('#rockets');
    for (let i = 0; i < 4; i++) {
      let newRocket = document.createElement("div");
      newRocket.innerHTML = '<span>' + i + '<span>';
      document.getElementById("rockets").appendChild(newRocket);
    }
});

const url = "https://api.spacexdata.com/v3/rockets"
async function main() {
  try {
    const result = await request({
      url,
      method: 'GET',
    });
    console.log("done");
    console.log(result[0]);

  } catch (e) {
    console.log("error");
  } finally {

  }

}

main();
