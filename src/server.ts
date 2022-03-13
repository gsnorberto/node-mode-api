import  express, { Request, Response } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import apiRoutes from './routes/api'

dotenv.config();

const server = express();

server.use(cors({
   origin: 'https://resttesttest.com/',//Liberar acesso dessa api apenas para o domínio especificado
   //methods: ['GET', 'POST']
}))

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true})) 

server.use(apiRoutes)

server.use((req: Request, res: Response) => {
   res.status(404);
   res.json({error: 'Endpoint não encontrado'});
})

server.listen(process.env.PORT)