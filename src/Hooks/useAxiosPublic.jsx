import axios from "axios";

export const axiosPublic=axios.create({
    baseURL:'https://opinionloom-server-58m8otk87-md-muhtasim-fuad-rahats-projects.vercel.app/'
})

const useAxiosPublic=()=>{
    return axiosPublic;
}

export default useAxiosPublic;