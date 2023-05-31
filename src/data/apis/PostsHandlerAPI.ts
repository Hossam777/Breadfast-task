import { baseUrl } from "../../contsants/APIs"
import Post from "../../models/Post"
import User from "../../models/User";

class PostsHandlerAPI {
    getAllPosts = async (): Promise<Post[]> => {
        return new Promise((resolve, reject) => {
            fetch(baseUrl + '/posts', {
                method: "GET"
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response.status;
                }
            })
            .then(resolve)
            .catch(reject);
        })
    }
    getAllUser = async (): Promise<User[]> => {
        return new Promise((resolve, reject) => {
            fetch(baseUrl + "/users", {
                method: "GET"
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response.status;
                }
            })
            .then(resolve)
            .catch(reject);
        })
    }
}

export default new PostsHandlerAPI();