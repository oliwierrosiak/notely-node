import { App } from "./serverConfig.js";

App.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
})