import exp from 'express'
// import depot from "./middleware/depot.js"
import egs from "./egs.js"
import scheduleRoutes from "./project/routes/scheduleRoutes.js"

const app = exp()

app.use(exp.json())
app.use("/api", egs)
app.use("/api/schedule", scheduleRoutes)


app.get("/api", (req, res)=>{
    res.send("Done");
})

app.get("/", (req, res)=>{
    res.send("Hello Sahaj");
});




app.listen(3000, ()=>{
    console.log("Working..........")
})
