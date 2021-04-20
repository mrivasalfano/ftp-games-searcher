import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'https://free-to-play-games-database.p.rapidapi.com/api',
    headers: {
        'x-rapidapi-key': '9fb3e46108msh54c6f003a41826ap1658b1jsn7050f6012fd7',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
});

const getAll = (sort, tags, platform) => {
    return new Promise(async(resolve, reject) => {
        try {
            const params = {
                'sort-by': sort
            };

            let resource = 'games';

            if (tags.length > 0) {
                resource = 'filter';
                params.tag = tags.join('.');
            }
            
            if (platform !== '')
                params.platform = platform;

            console.log(params);
            
            const response = await axiosInstance.get(`/${resource}`, {params});
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

export { getAll, get};