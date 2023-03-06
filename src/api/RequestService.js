// import FetchService from "@/api/FetchService";
import axios from "@/api/axios";
import FetchService from "@/api/FetchService";
import {useAuthStore} from "@/store/authStore";

const csrf = () => axios.get('/sanctum/csrf-cookie')

class RequestService {
  async makeLogin(userLogin) {
    const authStore = useAuthStore()
    await csrf()
    await axios.post('/login', userLogin)
    const response = await this.getUserInfo().then(res => res.data)
    authStore.userInfo = response
    localStorage.setItem('userInfo', JSON.stringify(response))
  }

  async makeRegistration(userRegistration) {
    const authStore = useAuthStore()
    await csrf()
    await axios.post('/register', userRegistration)
    authStore.userInfo = await this.getUserInfo().then(res => res.data)
  }

  async logout() {
    await csrf()
    axios.post('/logout')
  }

  async getUserInfo() {
    return FetchService.getData('/api/users/info')
  }

  async getFolder(id) {
    return FetchService.getData(`/api/folders/${id}`)
  }

  async uploadFile(folderId, data) {
    await axios.post(`/api/folders/${folderId}/upload-file`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async editFileName(id, newValue){
    await FetchService.putData(`/api/files/${id}`, newValue)
  }

  async downloadFile(id, fileName) {
    await axios.get(`/api/files/${id}`, {
      responseType: "blob"
    }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', fileName); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    })

  }

  async createFolder(folderId, data) {
    await axios.post(`/api/folders/${folderId}`, data)
  }


  async deleteFolder(folderId) {
    await axios.delete(`/api/folders/${folderId}`)
  }

  async deleteFile(fileId) {
    await axios.delete(`/api/files/${fileId}`)
  }

  async getSharedLink(fileId) {
    await axios.post(`/api/shared-files/${fileId}`)
  }

  async deleteSharedLink(fileId) {
    await axios.delete(`/api/shared-files/${fileId}`)
  }

}

export default new RequestService()
