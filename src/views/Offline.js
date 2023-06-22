import page from '../services/page'
import logo from '../assets/reactjs.png'

function Offline() {
  new page().setTitle("Offline")

  return (
    <main className="d-flex w-100 h-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">

              <div className="text-center mt-4">
                <img src={logo} className='col-6' alt='Logo' />
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="m-sm-3 text-center">
                    Anda sedang Offline
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Offline;
