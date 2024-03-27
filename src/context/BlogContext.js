import { createContext,useContext } from "react";

export const BlogContext = createContext({})

export const useBlog = ()=>{
    return useContext(BlogContext);
}


