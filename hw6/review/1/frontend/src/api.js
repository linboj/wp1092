import axios from 'axios';

const instance = axios.create({
  baseURL: `http://localhost:5000/`,
});

// const createCard = async (name, subject, score) => {
//   try{
//     const {
//       data: { message, card }
//     } = await instance.post('/api/create-card', {
//       name,
//       subject,
//       score,
//   });
//     return message
//   }
//   catch(error){
//     console.log(error)
//     return Promise.reject(error)
//   }
// }

export default instance;
