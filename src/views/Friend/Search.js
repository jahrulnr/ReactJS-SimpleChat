import { useEffect, useRef, useState } from 'react';
import { AccessToken, Auth } from '../../services/cookie';
import page from '../../services/page'
import axios from 'axios';
import apiConfig from '../../config/api';
import { RoutePath } from '../../route/route';
import { Toast } from 'primereact/toast';
import Friend from '../../models/friend';
import { Link } from 'react-router-dom';

function Search() {
  new page().setTitle("Teman")
  const toast = useRef(null)

  const [firstLoad, setFirstLoad] = useState(true)
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

  const [search, setSearch] = useState('')
  const [friend, setFriend] = useState(<></>)

  const searchFriend = function () {
    axios({
      url: apiConfig.SEARCH_FRIENDS,
      method: 'POST',
      responseType: 'json',
      data: {
        search: search
      },
      headers: AccessToken().get()
    })
      .then((resp) => {
        if (resp.data.length > 0) {
          let friend = new Friend()
          setFriend(
            <>
              {resp.data.map(data => {
                friend.set(data)
                return (
                  <div key={friend.get().id} className="list-group-item d-flex justify-content-between">
                    <div>
                      <strong><small>@{friend.get().username}</small></strong><br />
                      {friend.get().name}
                    </div>
                    <div className='my-auto'>
                      {actionButton(friend, data.status)}
                    </div>
                  </div>
                )
              })}
            </>
          )
        }
        else {
          setFriend(
            <span className="list-group-item">
              Teman tidak ditemukan
            </span>
          )
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

  const actionButton = (friend, status) => {
    if (status === null)
      return (
        <button className='btn btn-primary' onClick={() => friendRequest(friend.get().id)}>
          <i className='fa-solid fa-plus' style={{ width: '15px' }}></i>
        </button>
      )
    else if (status === "1")
      return (
        <Link className='btn btn-success' to={RoutePath.CHAT + `/${friend.get().id}`}>
          <i className="fa-solid fa-comments" style={{ width: '15px' }}></i>
        </Link>
      )
    else if (status === "0")
      return (
        <button className='btn btn-success' onClick={() => removeFriend(friend.get().id)}>
          <i className='fa-solid fa-check' style={{ width: '15px' }}></i>
        </button>
      )
  }

  const friendRequest = (id) => {

  }

  const removeFriend = (id) => {

  }

  useEffect(() => {
    setTimeout(() => {
      if (firstLoad === true) {
        setFirstLoad(false)
        getFriends()
      }
    }, 100)
    const interval = setInterval(() => {
      getFriends()
    }, 1000 * 5)

    return () => { clearInterval(interval) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(function () {
    if (search.length > 0) {
      searchFriend()
    }
    else {
      setFriend('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <div className='row'>
      <Toast ref={toast} />
      <div className='col-12 col-md-7'>
        <div className='card shadow-lg'>
          <div className='card-body'>
            <div className='card-title d-flex mb-3'>
              <div className="col-auto my-auto me-2">Cari</div>
              <div className="w-100">
                <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
            <hr className={friend ? '' : 'd-none'} />
            <div className='list-group'>
              {friend}
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

export default Search;
