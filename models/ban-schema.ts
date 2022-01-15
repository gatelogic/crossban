import mongoose from 'mongoose';

const reqString = {
    type: String,
    required: true
}

const Schema = new mongoose.Schema({
    _id: reqString,
    guildId: reqString,
    reason: reqString,
});

export default mongoose.model('BanList', Schema);