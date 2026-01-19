import { server } from "./serverConfig.js";

server.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
})