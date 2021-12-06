import { useEffect, useState } from 'react'
import yelp from '../api/yelp'

export default () => {
[results, setResults] = useState([])
const [errorMessage, setErrorMessage] = useState('')

const searchApi = async (searchTerm) => {
    try {
        const response = await yelp.get('/search', {
            params: {
                limit: 50,
                term : searchTerm,
                location: 'london'
            }
        })
        setResults(response.data.businesses)
    } catch (err) {
        setErrorMessage('Something went wrong')
    }
}

useEffect( () => {
    searchApi('pasta')
}, [])
//  this is for when its first rendered 

return [searchApi, results, errorMessage]

}