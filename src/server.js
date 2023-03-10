import http from 'node:http'
import { json } from './middlewares/json.js';

const users = [];

const server = http.createServer(async (req, res)=> {
    const { method, url } = req

    await json(req, res) // chamar a função json(dentro de middlewares) - passando req e res como parâmetros

    if (method === "GET" && url === "/users") {
        return res
        .end(JSON.stringify(users))
    }
    
    if (method === "POST" && url === "/users") {
        const {name, email} = req.body
        
        users.push({
            id: 1,
            name,
            email,
        })
        
        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333)
// o servidor server que foi criado usando o createServer, vai ouvir a porta localhost 3333