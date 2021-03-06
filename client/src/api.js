import axios from 'axios'

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : 'http://localhost:5000/api',
  withCredentials: true
})

const errHandler = err => {
  if (err.response && err.response.data) {
    console.error('API response', err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  getCurrentUser() {
    return service
      .get(`/users/current`)
      .then(res => res.data.user)
      .catch(errHandler)
  },
  changeUserStatus(data) {
    return service
      .post(`/users/changeUserStatus/`, data)
      .then(res => {
        return res.data
      })
      .catch(errHandler)
  },

  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  login(username, password) {
    return service
      .post('/login', {
        username,
        password
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service.get('/logout')
  },

  getUserTreeps(userId) {
    return service
      .get(`/treeps/user/${userId}`)
      .then(res => res.data)
      .catch(errHandler)
  },

  getOneTreepById(treepId) {
    return service
      .get(`/treeps/${treepId}`)
      .then(res => res.data)
      .catch(errHandler)
  },

  getTreepMetadata(treepId) {
    return service
      .get(`/treeps/${treepId}/metadata`)
      .then(res => res.data)
      .catch(errHandler)
  },

  addTreep(data) {
    return service
      .post('/treeps/add', data)
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteTreep(treepId) {
    return service
      .post(`/treeps/${treepId}/delete`)
      .then(res => res.data)
      .catch(errHandler)
  },

  addUserPicture(file, id) {
    const formData = new FormData()
    formData.append('picture', file)
    return service
      .post(`/users/${id}/profpicupload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => res.data)
      .catch(errHandler)
  },

  getMapboxSearchSuggestions(searchQuery) {
    return service
      .get(`/mapbox/${searchQuery}`)
      .then(res => res.data)
      .catch(errHandler)
  },

  addNewCollection(data) {
    return service
      .post(`/treeps/collections/create`, data)
      .then(res => res.data)
      .catch(errHandler)
  },

  // getUserCollections(userId) {
  //   return service
  //     .get(`/treeps/collections/user/${userId}`)
  //     .then(res => res.data)
  //     .catch(errHandler)
  // },

  getUserCollections(userId) {
    return service
      .get(`/users/${userId}/collections`)
      .then(res => res.data)
      .catch(errHandler)
  }
}
