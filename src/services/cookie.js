import { Cookies } from "react-cookie";
import appConfig from "../config/app";
import User from "../models/user";
import { AxiosHeaders } from "axios";

export const AccessToken = () => {
  const key = 'aT'
  const cookie = new Cookies(appConfig.COOKIE_NAME)

  return {
    get: function() {
      const aT = cookie.get('accessToken') ?? false
      const config = new AxiosHeaders()
      if(aT !== false){
        config.setAuthorization(`Bearer ${aT?.substr(0, aT.length - 2)}`)
      }
      return config
    },

    set: function(accessToken) {
      cookie.set('accessToken', accessToken + key, {  })
    },

    remove: function() {
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
      cookie.set('user', user.get(), {  })
    },

    remove: () => {
      cookie.remove('user')
    },

    check: () => {
      return init.get() ?? false
    }
  }

  return init
}