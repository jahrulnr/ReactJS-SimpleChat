import appConfig from "./app"

class apiConfig {
  static LOGIN = appConfig.API + 'login' // post
  static MESSAGES = appConfig.API + 'messages'
  static SEARCH_FRIENDS = appConfig.API + 'friends/search' // post
  static FRIEND_REQUESTS = appConfig.API + 'friends/request' // post
  static ACCEPT_FRIEND_REQUEST = appConfig.API + 'friends/accept' // post
  static DECLINE_FRIEND_REQUEST = appConfig.API + 'friends/decline' // post
  static FRIENDS = appConfig.API + 'friends'
  static USER = appConfig.API + 'users'
}

export default apiConfig