import express from 'express'
import Router from '../routes/routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

export const App = express()

App.use(express.json())

App.use(cookieParser())

App.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

App.use(Router)