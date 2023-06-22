import { Cookies } from "react-cookie";
import appConfig from "../config/app";
import User from "../models/user";
import { AxiosHeaders } from "axios";
import { RoutePath } from "../route/route";

export const AccessToken = () => {
  const key = 'aT'
  const cookie = new Cookies(appConfig.COOKIE_NAME)

  return {
    get: function () {
      const aT = cookie.get('accessToken') ?? false
      const config = new AxiosHeaders()
      if (aT !== false) {
        config.setAuthorization(`Bearer ${aT?.substr(0, aT.length - 2)}`)
      }
      return config
    },

    set: function (accessToken) {
      cookie.set('accessToken', accessToken + key, {})
    },

    remove: function () {
      cookie.remove('accessToken')
    },
  }
}

export const Auth = () => {
  const cookie = new Cookies(appConfig.COOKIE_NAME)

  let init = {
    get: () => {
      return cookie.get('user') ?? false
    },

    set: (data) => {
      const user = new User()
      user.set(data)
      cookie.set('user', user.get())
    },

    remove: () => {
      const ck = cookie.getAll()
      Object.keys(ck).forEach((key, index) => {
        cookie.remove(key)
      })

      // cookie.remove('user')
      // AccessToken().remove()

      setTimeout(() => { window.location.href = RoutePath.HOME }, 500)
    },

    check: () => {
      return init.get() ?? false
    }
  }

  return init
}