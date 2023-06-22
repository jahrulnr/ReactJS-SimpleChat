class appConfig {
  static NAME = process.env.REACT_APP_APP_NAME ?? "SimpleChat"
  static COOKIE_NAME = "SimpleChat"

  static API = process.env.REACT_APP_API ?? "http://localhost/"
}

export default appConfig;