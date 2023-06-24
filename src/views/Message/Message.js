import { useEffect, useRef, useState } from 'react';
import { AccessToken, Auth } from '../../services/cookie';
import page from '../../services/page'
import axios from 'axios';
import apiConfig from '../../config/api';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../route/route';
import { Toast } from 'primereact/toast';

function Message() {
  new page().setTitle("Pesan")
  const toast = useRef(null)

  const [firstLoad, setFirstLoad] = useState(true)
  const [messages, setMessages] = useState(
    <>
      <div className="list-group-item">
        Mengambil pesan
        <i className='ms-20 fa-solid fa-spin fa-spinner'></i>
      </div>
    </>
  )

  const getMessages = function () {
    return axios.get(apiConfig.MESSAGES, { headers: AccessToken().get() })
      .then((resp) => {
        if (resp.data.length > 0)
          setMessages(
            <>
              {resp.data.map(data => (
                <Link key={data.user_id} className="list-group-item" to={RoutePath.CHAT + '/' + data.user_id}>
                  {data.name}
                  <div className={data.readed === "0" ? 'fw-bold' : ''}>{data.text}</div>
                </Link>
              ))}
            </>
          )
        else
          setMessages(
            <>
              <div className="list-group-item">
                Tidak ada pesan
              </div>
            </>
          )
      })
      .catch((err) => {
        if (err.toJSON) {
          var errJson = err.toJSON()
          if (errJson.status === 403 || errJson.status === 401) {
            Auth().remove()
            toast.current.show({ severity: 'warn', detail: 'Sesi anda telah habis' })
            setTimeout(() => window.location.href = RoutePath.HOME, 2000)
          }
          else if (errJson.status === 400) {
            toast.current.show({
              severity: 'error', detail: 'Pesan tidak ditemukans'
            })
            setTimeout(() => window.location.href = RoutePath.HOME, 2000)
          }
          else {
            toast.current.show({ severity: 'error', detail: 'Server mengalami masalah' })
          }
        }
        else
          console.error(err.message)
      })
  }

  const [friends, setFriends] = useState(
    <>
      <div className="list-group-item">
        Mengambil daftar teman
        <i className='ms-2 fa-solid fa-spin fa-spinner'></i>
      </div>
    </>
  )

  const getFriends = function () {
    return axios.get(apiConfig.FRIENDS, { headers: AccessToken().get() })
      .then((resp) => {
        if (resp.data.length > 0)
          setFriends(
            <>
              {resp.data.map(data => (
                <Link key={data.friend_id} className="list-group-item" to={RoutePath.CHAT + `/${data.friend_id}`}>
                  {data.name}
                </Link>
              ))}
            </>
          )
        else
          setFriends(
            <>
              <div className="list-group-item">
                Anda belum memiliki teman
              </div>
            </>
          )
      })
      .catch((err) => {
        if (err.toJSON) {
          var errJson = err.toJSON()
          if (errJson.status === 403 || errJson.status === 401) {
            Auth().remove()
            toast.current.show({ severity: 'warn', detail: 'Sesi anda telah habis' })
            setTimeout(() => window.location.href = RoutePath.HOME, 2000)
          }
          else if (errJson.status === 400) {
            toast.current.show({
              severity: 'error', detail: 'Teman tidak ditemukans'
            })
            setTimeout(() => window.location.href = RoutePath.HOME, 2000)
          }
          else {
            toast.current.show({ severity: 'error', detail: 'Server mengalami masalah' })
          }
        }
        else
          console.error(err.message)
      })
  }

  useEffect(function () {
    if (firstLoad === true) {
      setFirstLoad(false)
      getMessages()
      getFriends()
    }
    const interval = setInterval(() => {
      getMessages()
      getFriends()
    }, 1000 * 5)
    return () => clearInterval(interval)
  }, [firstLoad])

  return (
    <div className='row'>
      <Toast ref={toast} />
      <div className='col-12 col-md-7'>
        <div className='card shadow-lg'>
          <div className='card-body'>
            <div className='card-title'>
              <h3 className='h3 my-auto'>Pesan</h3>
            </div>
            <div className="list-group">
              {messages}
            </div>
          </div>
        </div>
      </div>
      <div className='d-none d-md-block col-md-5'>
        <div className='card shadow-lg'>
          <div className='card-body'>
            <div className='card-title'>
              <h3 className='h3 my-auto'>Daftar Teman</h3>
            </div>
            <ul className="list-group">
              {friends}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
