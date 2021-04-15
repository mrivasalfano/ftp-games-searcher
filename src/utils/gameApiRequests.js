import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'https://free-to-play-games-database.p.rapidapi.com/api',
    headers: {
        'x-rapidapi-key': '9fb3e46108msh54c6f003a41826ap1658b1jsn7050f6012fd7',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
});

const getAllSortedByParam = (sortParam) => {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await axiosInstance.get('/games', {
                params: {
                    'sort-by': sortParam
                }
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}

const get = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await axiosInstance.get('/game', { params: { id } });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}

export { getAllSortedByParam, get};