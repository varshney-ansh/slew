import { Schema, model, models } from 'mongoose';

const indexSchema = new Schema({
    title: String,
    favUrl: String,
    cite: String,
    siteName: String,
    targetUrl: String,
    desc: String,
    keywords: Array
}, { timestamps: true })

const index = models.index || model('index', indexSchema);

export default index;