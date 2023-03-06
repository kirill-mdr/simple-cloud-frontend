import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isAuth: JSON.parse(localStorage.getItem('isAuth')) || false,
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setAuth(value) {
      localStorage.setItem('isAuth', JSON.stringify(true))
      this.isAuth = value
    }
  },
  getters: {
    getAuth(){
      return this.isAuth
    }
  }
})
