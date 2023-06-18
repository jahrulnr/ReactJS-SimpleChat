import { useEffect, useState } from 'react';
import { AccessToken, Auth } from '../../helpers/cookie';
import page from '../../helpers/page'
import axios from 'axios';
import apiConfig from '../../config/api';
import toastr from 'reactjs-toastr/lib/react-toast';
import url from '../../helpers/url'
import Friend from '../../models/friend';
import {default as ChatModel} from '../../models/message'
import { RoutePath } from '../../route/route';

function Chat() {
  new page().setTitle("Pesan")

  const friend_id = url.parsedPath()[1] ?? false
  const [firstLoad, setFirstLoad] = useState(true)
  const [friendData, setFriendData] = useState({})

  const getFriendData = () => {
    axios.get(`${apiConfig.FRIENDS}/${friend_id}`, { headers: AccessToken().get() })
      .then((resp) => {
        if(resp.data?.name){
          let friend = new Friend()
          friend.set(resp.data)
          setFriendData(friend.get())
          new page().setTitle(`Pesan ${friend.get().name}`, false)
        }
      })
      .catch((err) => {
        if(err.toJSON){
          var errJson = err.toJSON()
          if(errJson.code === "ERR_BAD_REQUEST"){
            toastr.error("Sesi anda telah habis")
            setTimeout(() => window.location.href = RoutePath.HOME, 2000)
          }
          console.error(errJson)
        }
        else
          console.error(err.message)
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

  const getChat = function() {
    axios.get(`${apiConfig.MESSAGES}/${friend_id}`, { headers: AccessToken().get() })
      .then((resp) => {
        if(resp.data.data.length > 0)
          setChat(
            <>
            {resp.data.data.slice().reverse().map((data, i) => {
              var chat = new ChatModel()
              chat.set(data)
              chat = chat.get()
              return (
                <li key={i} className="list-group-item">
                  <div className={chat.from_id === Auth().get().id ? 'text-end': 'text-start'}>{chat.text}</div>
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
        if(err.toJSON){
          var errJson = err.toJSON()
          if(errJson.code === "ERR_BAD_REQUEST"){
            toastr.error("Sesi anda telah habis")
            setTimeout(() => window.location.href = RoutePath.HOME, 2000)
          }
          console.error(errJson)
        }
        else
          console.error(err.message)
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

  const getFriends = function() {
    axios.get(apiConfig.FRIENDS, { headers: AccessToken().get() })
      .then((resp) => {
        if(resp.data.length > 0)
          setFriends(
            <>
            {resp.data.map(data => (
              <li key={data.friend_id} className="list-group-item">
                {data.name}
              </li>
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
        if(err.toJSON){
          var errJson = err.toJSON()
          if(errJson.code === "ERR_BAD_REQUEST"){
            toastr.error("Sesi anda telah habis")
            setTimeout(() => window.location.href = RoutePath.HOME, 2000)
          }
          console.error(errJson)
        }
        else
          console.error(err.message)
      })
  }
  
  useEffect(function(){
    if(firstLoad === true){
      setFirstLoad(false)
      getFriendData()
      getChat()
      getFriends()
    }
    const interval = setInterval(() => {
      getChat()
      getFriends()
    }, 1000 * 5)
    return () => clearInterval(interval)
  }, [firstLoad, chat, friendData, friends])

  return (
    <div className='row'>
      <div className='col-12 col-md-7'>
        <div className='card shadow-lg'>
          <div className='card-body'>
            <div className='card-title'>
              <h3 className='h3 my-auto'>{friendData?.name ?? 'Anonim'}</h3>
            </div>
            <ul className="list-group">
              {chat}
            </ul>
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
