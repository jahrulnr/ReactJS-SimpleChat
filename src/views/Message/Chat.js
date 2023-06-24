import { useEffect, useRef, useState } from 'react';
import { AccessToken, Auth } from '../../services/cookie';
import page, { ScrollToBottom } from '../../services/page'
import axios from 'axios';
import apiConfig from '../../config/api';
import url from '../../services/url'
import Friend from '../../models/friend';
import { default as ChatModel } from '../../models/message'
import { RoutePath } from '../../route/route';
import { Toast } from 'primereact/toast';
import { Link } from 'react-router-dom';

function Chat() {
  new page().setTitle("Pesan")
  const toast = useRef(null)

  const friend_id = url.parsedPath()[1] ?? false
  const [firstLoad, setFirstLoad] = useState(true)
  const [friendData, setFriendData] = useState({})

  const getFriendData = () => {
    axios.get(`${apiConfig.FRIENDS}/${friend_id}`, { headers: AccessToken().get() })
      .then((resp) => {
        if (resp.data?.name) {
          let friend = new Friend()
          friend.set(resp.data)
          setFriendData(friend.get())
          new page().setTitle(`Pesan ${friend.get().name}`, false)
        }
      })
      .catch((err) => {
        if (err.toJSON) {
          var errJson = err.toJSON()
          console.error(errJson)
          if (errJson.status === 403 || errJson.status === 401) {
            Auth().remove()
            toast.current.show({ severity: 'warn', detail: 'Sesi anda telah habis' })
            setTimeout(() => window.location.href = RoutePath.HOME, 2000)
          }
          else if (errJson.status === 400) {
            toast.current.show({ severity: 'warn', detail: 'Teman tidak ditemukan' })
            setTimeout(() => window.location.href = RoutePath.HOME, 2000)
          }
          else {
            toast.current.show({ severity: 'error', detail: 'Server mengalami masalah' })
          }
        }
        else {
          console.error(err.message)
          toast.current.show({ severity: 'error', detail: 'Server mengalami masalah' })
        }
      })
  }

  const [chat, setChat] = useState(
    <>
      <li className="list-group-item">
        Mengambil pesan
        <i className='ms-20 fa-solid fa-spin fa-spinner'></i>
      </li>
    </>
  )

  const getChat = function () {
    axios.get(`${apiConfig.MESSAGES}/${friend_id}`, { headers: AccessToken().get() })
      .then((resp) => {
        if (resp.data.data.length > 0)
          setChat(
            <>
              {resp.data.data.slice().reverse().map((data, i) => {
                var chat = new ChatModel()
                chat.set(data)
                chat = chat.get()
                return (
                  <li key={i} className="list-group-item">
                    <div className={chat.from_id === Auth().get().id ? 'text-end' : 'text-start'}>{chat.text}</div>
                  </li>
                )
              })}
            </>
          )
        else
          setChat(
            <>
              <li className="list-group-item">
                Tidak ada pesan
              </li>
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
        else {
          console.error(err.message)
          toast.current.show({ severity: 'error', detail: 'Server mengalami masalah' })
        }
      })
  }

  const [friends, setFriends] = useState(
    <>
      <li className="list-group-item">
        Mengambil daftar teman
        <i className='ms-2 fa-solid fa-spin fa-spinner'></i>
      </li>
    </>
  )

  const getFriends = function () {
    axios.get(apiConfig.FRIENDS, { headers: AccessToken().get() })
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
              <li className="list-group-item">
                Anda belum memiliki teman
              </li>
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

  const [message, setMessage] = useState('')
  const [disableButton, setDisableButton] = useState(true)
  const sendMessage = (e) => {
    e.preventDefault()
    if (message.length > 0) {
      setDisableButton(true)
      axios({
        url: apiConfig.MESSAGES,
        method: "POST",
        responseType: 'json',
        data: {
          to_id: friend_id,
          message: message
        },
        headers: AccessToken().get()
      })
        .then((resp) => {
          setMessage('')
          getChat()
        })
        .catch((err) => {
          console.log(err)
          toast.current.show({
            severity: 'error', detail: 'Tidak dapat mengirim pesan'
          })
        })
    }
  }

  const handleMessage = (text) => {
    setDisableButton(!(text.length > 0))
    setMessage(text)
  }

  useEffect(() => {
    setTimeout(() => {
      if (firstLoad === true) {
        setFirstLoad(false)
        getFriendData()
        getChat()
        getFriends()
      }
    }, 100)
    const interval = setInterval(() => {
      getChat()
      getFriends()
    }, 1000 * 5)

    return () => { clearInterval(interval) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='row'>
      <Toast ref={toast} />
      <div className='col-12 col-md-7'>
        <div className='card shadow-lg'>
          <div className='card-body'>
            <div className='card-title'>
              <h3 className='h3 my-auto'>{friendData?.name ?? 'Anonim'}</h3>
            </div>
            <ul className="list-group" style={{ height: "50vh", overflowY: 'auto' }}>
              {chat}
              <ScrollToBottom />
            </ul>
          </div>
          <div className="card-footer bg-primary">
            <form className='d-flex' method='post' onSubmit={sendMessage}>
              <div className='w-100 me-2'>
                <input type='text' value={message} onChange={(e) => handleMessage(e.target.value)} className='form-control' />
              </div>
              <div className='col-auto'>
                <button type='submit' className='btn btn-success' disabled={disableButton} >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </form>
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

export default Chat;
