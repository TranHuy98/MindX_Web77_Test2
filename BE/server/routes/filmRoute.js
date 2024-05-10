import {Router} from 'express';

import filmController from '../controllers/filmController.js';

const filmRouter = Router();

filmRouter.get('', filmController.getAllFilm); //danh sach phim
filmRouter.post('', filmController.createFilm); //them film
filmRouter.put('/:filmId', filmController.updateFilm); //sua thong tin film
filmRouter.delete('/:filmId', filmController.deleteFilm); //xoa phim
filmRouter.get('/search', filmController.findFilmByName) //tim kiem

export default filmRouter;