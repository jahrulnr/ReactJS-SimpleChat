class appConfig {
  static NAME = "SimpleChat"
  static COOKIE_NAME = "SimpleChat"

  static API = process.env.REACT_APP_API ?? "http://localhost/"
}

export default appConfig;