class UrlHelper {
  fullPath = () => {
    return window.location.pathname
  }

  currentPath = () => {
    return this.fullPath().substring(1)
  }

  parsedPath = () => {
    return this.currentPath().split('/')
  }
}

const urlHelper = new UrlHelper()
export default urlHelper