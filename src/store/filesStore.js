import { defineStore } from 'pinia'
import RequestService from "@/api/RequestService";
import {useAuthStore} from "@/store/authStore";

export const useFilesStore = defineStore('files', {
  state: () => {
    return {
      homeFolder: {},
      currentFolder: {},
      currentFolderId: 0,
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async setFiles(){
      const authStore = useAuthStore()
      this.homeFolder = await RequestService.getFolder(authStore.userInfo.home_folder_id).then(res => res.data)
      this.currentFolder = this.homeFolder
      this.currentFolderId = this.homeFolder.id
    }
  },
  getters: {

  }
})
