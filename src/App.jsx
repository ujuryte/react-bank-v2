
import { useEffect, useState } from 'react';
import './App.scss';
import Clients from './Components/Clients';
import Create from './Components/Create';
import Stat from './Components/Stat';
import { bank } from './Components/Icon';
import Messages from './Components/Messages';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


const url = 'http://localhost:3003/clients';

function App() {

  const [data, setData] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [messages, setMessages] = useState([]);
  



  useEffect(() => {
    axios.get(url)
      .then(res => {
        setData(res.data.clients.map((c) => ({ ...c, pid: null})));
      })
  }, []);


  useEffect(() => {
    if (null === createData) {
      return
    }
    const promiseID = uuidv4();

    setData(c => [...c, {
      ...createData,
      pid: promiseID
    }]);



    axios.post(url, { client: createData, promiseID })
      .then(res => {
        setData(c => c.map(c => c.pid === res.data.promiseID ? { ...c, pid: null, id: res.data.id } : { ...c }))
      });
  }, [createData])

  useEffect(() => {
    if (null === editData) {
      return;
    }
    const promiseID = uuidv4();
    setData(c => c.map(c => c.id === editData.id ? { ...c, ...editData, pid: promiseID } : { ...c }))



    axios.put(url + '/' + editData.id, { client: editData, promiseID })
      .then(res => {
        setData(c => c.map(c => c.pid === res.data.promiseID ? { ...c, pid: null } : { ...c }))
      });
  }, [editData]);

  useEffect(() => {
    if (null === deleteData) {
      return;
    }
    setData(c => c.filter(c => c.id !== deleteData.id))


    axios.delete(url + '/' + deleteData.id)
      .then(res => {
      })
  }, [deleteData])

  const msg = (text, type) => {
    const id = uuidv4();
    setMessages(m => [...m, { text, type, id }]);
    setTimeout(() => {
      setMessages(m => m.filter(m => m.id !== id));
    }, 5000)
  }



  return (
    <>

      <div className="container">

        <div className='row'>

          <div className='table-col col-8'>
            <div className='title'>
              <div>{bank}</div>
              <h2 >Bankas ver. 1</h2>
            </div>
            <Clients data={data} setEditData={setEditData} setDeleteData={setDeleteData} msg={msg} />
          </div>
          <div className='col-4 p-4'>
            <Stat data={data} />
            <Create setCreateData={setCreateData} msg={msg} />
          </div>
        </div>



      </div>
      <Messages messages={messages} />
    </>

  );
}

export default App;
