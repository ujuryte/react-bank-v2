import { useState } from 'react';

export default function Create({setCreateData, msg}) {

const [name,setName] = useState('')
const [surname, setSurname] = useState('')
const [balance, setBalance] = useState(0)

const doName = e => {
    setName(e.target.value)
}

const doSurname = e => {
    setSurname(e.target.value)
}


const create = _ => {
    if(surname === '' || name === ''){
        msg('Įveskite vartotojo duomenis.', 'alert-warning');
        return
    } else {
        setCreateData({
            name,
            surname,
            balance
        })
        msg('Naujas vartotojas sėkmingai sukurtas!', 'alert-success');
    }
    
    setName('');
    setSurname('');
    setBalance(0);
}


return (
    <div className='create mt-5'>
        <h2>Naujo vartotojo sukūrimas</h2>
        <div className="form-container">
            <form className="form">
                <div className="mb-3">
                    <label className="me-4">Vardas:</label>
                    <input type="text" name="name" value={name} onChange={doName} />
      
                </div>
                <div className="mb-3">
                    <label className="me-3">Pavardė:</label>
                    <input type="text" value={surname} onChange={doSurname} />
                </div>
                <button className="btn btn-dark" onClick={create} type='button'>Sukurti</button>
            </form>
        </div>
    </div>
  );
}
