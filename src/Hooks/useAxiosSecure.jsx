import axios from "axios";

export const axiosSecure=axios.create({
    baseURL:'https://opinionloom-server-58m8otk87-md-muhtasim-fuad-rahats-projects.vercel.app/'
})

const useAxiosSecure=()=>{
    return axiosSecure;
}

export default useAxiosSecure;