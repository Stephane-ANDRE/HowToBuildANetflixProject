// Importing Axios for making HTTP requests it s similar FETCH or AJAX
import axios from 'axios'; 

// Defining a fetcher function that takes a URL as a parameter and returns a Promise
// Making a GET request to the specified URL using Axios
const fetcher = (url: string) => axios.get(url) 
// Extracting the data property from the response and returning it
    .then(res => res.data); 

export default fetcher; 