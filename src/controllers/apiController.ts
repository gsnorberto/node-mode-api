import { Request, Response } from 'express'
import { Phrase } from '../models/Phrase'
import { Sequelize } from 'sequelize'

// Requisições de teste
export const ping = (req: Request,res: Response ) => {
   res.json({pong: true})
}
export const random = (req: Request, res: Response) =>{
   let nRand: number = Math.floor(Math.random() * 10);

   res.json({number: nRand})
}
export const nome = (req:Request, res:Response) => {
   let nome: string = req.params.nome;
   res.json({nome})
}

// Add a new phrase in DB
export const createPhrase = async (req: Request, res: Response) => {
   let { author, txt } = req.body

   let newPhrase = await Phrase.create({ author, txt })

   res.status(201); 
   res.json({id: newPhrase.id, author, txt})
}

// get all phrases in DB
export const listPhrases = async (req: Request, res: Response) => {
   let list = await Phrase.findAll();

   res.json({ list })
}

// get a specific phrase
export const getPhrase = async (req: Request, res: Response) => {
   let { id } = req.params;

   let phrase = await Phrase.findByPk(id);

   if(phrase){
      res.json({phrase})
   } else {
      res.json({error: 'Frase não encontrada'})
   }
   
}

// update a specific phrase
export const updatePhrase = async (req: Request, res: Response) => {
   let { id } = req.params;
   let { author, txt } = req.body

   let phrase = await Phrase.findByPk(id);

   if(phrase){
      phrase.author = author;
      phrase.txt = txt;

      await phrase.save();
      res.json({phrase})
   } else {
      res.json({error: 'Frase não encontrada'})
   }
}

// delete a specific phrase
export const deletePhrase = async (req: Request, res: Response) => {
   let { id } = req.params;

   await Phrase.destroy( { where: { id } });

   res.json({})
}

// get random items from data base
export const randomPhrase = async (req: Request, res: Response) => {
   let phrase = await Phrase.findOne({
      order: [
         Sequelize.fn('RAND')
      ]
   });

   if(phrase){
      res.json({ phrase })
   } else {
      res.json({ error: 'Não há frases cadastradas!'})
   }
}