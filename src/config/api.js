import appConfig from "./app"

class apiConfig {
  static LOGIN = appConfig.API + 'login' // post
  static MESSAGES = appConfig.API + 'messages'
  static SEARCH_FRIENDS = appConfig.API + 'friends/search' // post
  static FRIEND_REQUESTS = appConfig.API + 'friends/request'
  static FRIENDS = appConfig.API + 'friends'
  static USER = appConfig.API + 'users'
}

export default apiConfig