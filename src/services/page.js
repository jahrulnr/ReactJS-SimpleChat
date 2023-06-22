import { useEffect, useRef } from 'react'
import appConfig from '../config/app'

class page {
  setTitle = (newTitle, useHook = true) => {
    if (useHook)
      useEffect(() => {
        document.getElementsByTagName('title')[0].text = `${appConfig.NAME} | ${newTitle}`
      }, [newTitle])
    else
      document.getElementsByTagName('title')[0].text = `${appConfig.NAME} | ${newTitle}`
  }

  isLoading = () => {
    const loader = document.getElementById('loader')
    return loader?.classList.contains('show')
  }

  setLoader = (show) => {
    const loader = document.getElementById('loader')
    if (show) {
      loader.style.display = 'block'
      loader.classList.add('show')
    }
    else {
      loader.classList.remove('show')
      loader.style.display = 'none'
    }
  }
}

export const ScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
}

export default page