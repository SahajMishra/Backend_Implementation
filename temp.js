let a = "http://20.207.122.201/evaluation-service/vehicles";

let b="http://20.207.122.201/evaluation-service/depots";


async function getData() {
    let res = await fetch(b);
    let data = await res.json();
    console.log(data);
}

getData();