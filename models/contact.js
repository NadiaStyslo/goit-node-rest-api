import { Schema, model } from 'mongoose';

const contactShema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});
// contactShema.post('save', (error, data, next) => {
//   error.status = 400;
//   next();
// });

export const Contact = model('Contact', contactShema);
