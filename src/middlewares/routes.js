import { randomUUID } from 'node:crypto'
import {Database} from './database.js'

const database = new Database

export const routes = [
    // cada objeto vai ser uma rota
    // vai conter --> metodo da rota, caminho para chamar a rota (path), o que vai acontecer quando essa rota for chamada (handler)
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users') // vai buscar todos os usuários desse local

            return res.end(JSON.stringify(users))
        }
    },

    {
        method: 'POST',
        path: '/users',
        handler: (req, res) => {
            const {name, email} = req.body
        
            const user =  {
                id: randomUUID(),
                name,
                email,
            }
    
            database.insert('users', user) // o nome da tabela ('users') e a info que quer inserir (user)
            
            return res.writeHead(201).end()
        }
    }
]