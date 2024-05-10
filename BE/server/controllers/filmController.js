import FilmModel from "../models/filmModel.js"

const filmController = {

    //lay danh sach phim va sap xep
    getAllFilm: async (req, res) => {
        try {

            const { sort } = req.query;
            const sortValue = sort === 'asc' ? 1 : -1;

            const filmData = await FilmModel.find({})
                .sort({ year: sortValue });;

            res.status(200).send({
                data: filmData,
                message: 'get film success',
            })


        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'get all fail',
            })
        }
    },


    //them film
    createFilm: async (req, res) => {
        try {
            const { name, time, year, image, introduce } = req.body;

            if (!name) throw new Error('Chua co ten phim');
            if (!introduce) throw new Error('Chua co mo ta phim');

            const newFilm = await FilmModel.create({
                name,
                time,
                year,
                image,
                introduce,
            })

            console.log(newFilm);

            await newFilm.save();

            res.status(201).send({
                data: newFilm,
                message: 'add film success',
            })

        } catch (error) {
            res.status(500).send({
                message: 'add film fail',
                error: error,
            })

            console.log(error);
        }
    },

    //sua thong tin film
    updateFilm: async (req, res) => {
        try {
            const { newName, newIntro } = req.body;
            const { filmId } = req.params;

            console.log(filmId);

            if (!newName) {
                throw new Error('Chua co ten phim moi');
            }

            if (!newIntro) {
                throw new Error('Chua co mota moi');
            }

            const updatedFilm = await FilmModel.findByIdAndUpdate(
                filmId,
                { name: newName, introduce: newIntro },
                { new: true }
            );

            if (!updatedFilm) {
                return res.status(404).send({
                    message: 'Film not found',
                });
            }

            res.status(200).send({
                data: updatedFilm,
                message: 'update film success',
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'update film fail',
            });
        }
    },

    //xoa 1 phim
    deleteFilm: async (req, res) => {
        try {
            const { filmId } = req.params;
            if (!filmId) {
                res.status(404).send({
                    message: 'film not existed',
                });
            };

            await FilmModel.findByIdAndDelete(filmId.toString());

            res.status(200).send({
                message: 'delete film success',
            })

        } catch (error) {
            res.status(500).send({
                message: 'delete film fail',
            })
        }
    },
    // tim kiem film 
    findFilmByName: async (req, res) => {
        try {
            const { keyword } = req.query;
            console.log(keyword);
            const foundMovies = await FilmModel.find({ name: { $regex: `.*${keyword}.*`, $options: 'i' } });

            console.log(foundMovies);

            res.status(200).json({
                data: foundMovies,
                message: 'Tim kiem thanh cong',
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'cannot find film',
            })
        }
    },

};

export default filmController;