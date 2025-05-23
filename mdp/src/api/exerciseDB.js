import axios from 'axios'

const api = axios.create({
    baseURL:'https://exercisedb.p.rapidapi.com',
    headers: {
        'x-rapidapi-key': import.meta.env.VITE_EXERCISE_DB_KEY,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
})

const getAllExos = async () => {
    const response = await api.get('/exercises?limit=-1')
    return response.data
}

const getExosByBodyPart = async (bodyPart) => {
    const response = await api.get('/exercises/bodyPart/'+bodyPart+'?limit=-1')
    return response.data
}

export {
    getAllExos,
    getExosByBodyPart
}