import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './middlewares/routes.js'

// STATEFUL --> tudo que for declarado na aplicação vai ficar salvo na memória (precisa da memória para que a aplicação continue funcionando)
// STATELESS --> salva tudo em dispositivos externos (ex: banco de dados), ou seja, se parar a aplicação e rodar dnv, ela continua funcionando normalmente

// Headers/cabeçalhos --> (metadados) - informações adicioanis que o backend e o frontend saiba lidar com aquela resposta (não são o dado em si)
// eu posso tanto obter os headers da resposta da requisição, como também enviar headers na requisição



const server = http.createServer(async (req, res)=> {
    const { method, url } = req

    await json(req, res) // chamar a função json(dentro de middlewares) - passando req e res como parâmetros

    // verificar se a operação que está sendo feita é igual a aulguma das rotas do array de rotas (routes):
    const route = routes.find(route => {
        return route.method == method && route.path == url
    })

    if (route) { // caso tenha encontrado alguma rota
        return route.handler(req, res) // vai retornar a função que é executada ao se chamar aquela rota
    }

    return res.writeHead(404).end()
})

server.listen(3333)

// STREAMS --> ser possível obter/ler pequenas partes de uma coisa e já consegui trabalhar com os dados, mesmo antes de ler o arquivo por completo
// ex: IPORTAÇÃO DE CLIENTES VIA CSV (EXCEL) --> se subir um arquivo muito grande no sistema (através de uma rota POST por ex), caso não esteja usando stream, vai ter que ler o arquivo inteiro para depois dar alguma resposta (o que ia demorar muito)
// READABLE STREAMS (streams de leitura) e WRITABLE STREAMS (streams de escrita) - um é para ler o outro é para enviar
// req e res são stream (posso deixar uma req aberta e ir enviando dados aos poucos) (bem como posso recebr a resposta da requisição aos poucos)
// stdin --> tudo que o usuário digita no terminal
// stdout --> retorno da aplicação no terminal
// pipe() --> serve para encaminhar algo