import { useState } from "react";
export default function Edit({ c, setEditData, setDeleteData, msg }) {
 
  const [diffBalance, setDiffBalance] = useState('');

  
  const onBalanceInputChange = (e) => {
    setDiffBalance(Number(e.target.value));
  };
  
  const addToBalance = () => {
    if (diffBalance > 0) {
      setEditData({ ...c, balance: c.balance + diffBalance });
      msg('Vartotojui sėkmingai pridėtos lėšos!', 'alert-success');
    }
    setDiffBalance('')
  };

  const deductBalance = () => {
    if (diffBalance <= c.balance) {
        setEditData({ ...c, balance: c.balance - diffBalance });
        msg('Vartotojui sėkmingai nuskaičiuotos lėšos!', 'alert-success');
    } else {
        msg('Vartotojui neužtenka lėšų.', 'alert-danger');
        return
    }
    setDiffBalance('')
  }

  const destroy = _ => {
    if(c.balance > 0){
        msg('Negalima ištrinti turtingo vartotojo.', 'alert-danger');
        return
    }
    
    setDeleteData(c)
    msg('Vartotojas sėkmingai ištrintas!', 'alert-success');
  }

  return (
    <>
      <td>
        <div className="input-group">
          <span className="input-group-text">$</span>
          
          <input type="number" value={diffBalance} onChange={onBalanceInputChange} required min={0} className="form-control arrows" />
        </div>
      </td>
      <td>
        <button onClick={addToBalance} className="btn btn-success">
          Pridėti lėšas
        </button>
      </td>
      <td>
        <button className="btn btn-warning" onClick={deductBalance}>Nuskaičiuoti lėšas</button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={destroy}>Ištrinti sąskaitą</button>
      </td>
    </>
  );
}