import appConfig from "./app"

class apiConfig {
  static LOGIN = appConfig.API+'login' // post
  static MESSAGES = appConfig.API+'messages'
  static FRIENDS = appConfig.API+'friends'
  static USER = appConfig.API+'users'
}

export default apiConfig