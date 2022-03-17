import { Router } from 'express';
import * as ApiController from '../controllers/apiController'
import multer from 'multer';

const router = Router();

// UPLOAD
// Memory Storage
// const storageConfig = multer({
//    storage: multer.memoryStorage()
// })

// Disk Storage
const storageConfig = multer.diskStorage({
   destination: (req, file, cb) => { //destination folder
      cb(null, './tmp')
   },
   filename: (req, file, cb) => { //file name
      let randomName = Math.floor(Math.random() * 99999999)
      cb(null, `${randomName+Date.now()}.jpg`)
   }
})

const upload = multer({
   storage: storageConfig
})

// const upload = multer({
//    dest: './tmp', //file destination folder
// })

router.get('/ping', ApiController.ping);
router.get('/random', ApiController.random);
router.get('/nome/:nome', ApiController.nome);

router.post('/frases', ApiController.createPhrase);
router.get('/frases', ApiController.listPhrases);

//static routes must always come before similar dinamic routes
router.get('/frase/aleatoria', ApiController.randomPhrase);
router.get('/frase/:id', ApiController.getPhrase);

router.put('/frase/:id', ApiController.updatePhrase);
router.delete('/frase/:id', ApiController.deletePhrase);

/* 
   "upload.single" = one file.
   "upload.array" = two or more files
   "upload.array('avatars', 2)" = "2" represents the number of files allowed
   "upload.fields" = send files of different types 
*/
//router.post('/upload', upload.array('avatars', 2), ApiController.uploadFile)

//router.post('/upload', upload.array('avatars'), ApiController.uploadFile)

router.post('/upload', upload.single('avatar'), ApiController.uploadFile)

// router.post('/upload', upload.fields([
//    { name: 'avatar', maxCount: 1},
//    { name: 'gallery', maxCount: 3},
// ]), ApiController.uploadFile)

export default router;