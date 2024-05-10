import mongoose from "mongoose";

const filmSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    time: {
        type: Number,
    },
    year: {
        type: Number
    },
    image: {
        type: String,
    },
    introduce: {
        type: String,
    }

});

const FilmModel = mongoose.model('film', filmSchema);

export default FilmModel;