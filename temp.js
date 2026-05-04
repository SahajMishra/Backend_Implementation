// let a = "http://20.207.122.201/evaluation-service/vehicles";

// let b="http://20.207.122.201/evaluation-service/depots";


// async function getData() {
//     let res = await fetch(b);
//     let data = await res.json();
//     console.log(data);
// }

// getData();


import exp from 'express'
import depot from "./egs.js"

const app=exp()


async function getData() {
    try {
        const res = await fetch('http://localhost:3000/api/data');
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

getData();