import axios from "axios"

export const moviesApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: import.meta.env.VITE_TMDB_KEY
    }
})

export const fetchToken = async () => {
    try {
        //* a yin sone token twr u dl
        const { data } = await moviesApi.get('/authentication/token/new')
        const token = data.request_token
        if (data.success) {
            //* success yin token store dl
            localStorage.setItem('request_token', token)

            //* redirect to main page
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`
        }
    } catch (error) {
        console.log('Sorry your token could not be created.', error)
    }
}

export const createSessionId = async () => {
    //* session id create moh so request_token lo ml sw sw ka login tone ka token to localstorage htl mr store htr loh pyn u
    const token = localStorage.getItem('request_token')

    if (token) {
        try {
            const { data: { session_id } } = await moviesApi.post('/authentication/session/new', {
                request_token: token
            })

            //* success p so localstorage htl store ml
            localStorage.setItem('session_id', session_id)

            //? retun that session id
            return session_id
        }
        catch (err) {
            console.log('Sorry your session id could not be created.', err)
        }
    }
}