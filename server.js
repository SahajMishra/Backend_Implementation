import exp from 'express'
// import depot from "./middleware/depot.js"
import egs from "./egs.js"


const app=exp()

app.use("/api", egs);


app.get("/api", (req, res)=>{
    res.send("Done");
})

app.get("/", (req, res)=>{
    res.send("Hello Sahaj");
});




app.listen(3000, ()=>{
    console.log("Working..........")
})
