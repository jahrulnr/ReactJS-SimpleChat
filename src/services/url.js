class UrlHelper {
  pathName = () => {
    return window.location.pathname
  }

  parsedPath = () => {
    return this.pathName().substring(1).split('/')
  }
}

const urlHelper = new UrlHelper()
export default urlHelper