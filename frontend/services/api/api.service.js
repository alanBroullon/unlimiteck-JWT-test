import axios from 'axios';

export function getCookie (cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

const api = {
    encode: (obj) => {
        return Object.entries(obj).map(e =>
            `${encodeURIComponent(e[0])}=${encodeURIComponent(e[1])}`,
        ).join('&')
    },
    post: (url, data, headers) => {
        if (headers) {
            return axios.post(url, data, {headers: headers})
        } else {
            return axios.post(url, data)
        }
    },
    get: (url, headers) => axios.get(url, {headers: headers})
}

export default api;
