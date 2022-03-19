import  express, { Request, Response, ErrorRequestHandler } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import apiRoutes from './routes/api'
import { MulterError } from 'multer'

dotenv.config();

const server = express();

server.use(cors({
   origin: 'https://resttesttest.com/',//Liberar acesso dessa api apenas para o domínio especificado
   //methods: ['GET', 'POST']
}));

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true})) ;

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
   res.status(404);
   res.json({error: 'Endpoint não encontrado'});
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
   res.status(400); // Client request error

   if(err instanceof MulterError){
      res.json({ error: err.code })
   } else {
      console.log( err );
      res.json({ error: 'Ocorreu algum errorHandler.'})
   }
}

server.use(errorHandler)

server.listen(process.env.PORT);