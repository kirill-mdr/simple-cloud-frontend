import axios from "@/api/axios";


class FetchService {
  async getData(url, cfg) {
    return await axios.get(url, {params: cfg})
  }
  async postData(url, cfg){
    return axios.post(url, cfg)
  }
  async putData(url, id){
    return axios.put(url, id)
  }
}

export default new FetchService()
