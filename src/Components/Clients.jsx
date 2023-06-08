import { useState } from "react"
import Edit from "./Edit"


export default function Clients({ data, setEditData, setDeleteData, msg }) {

    const [filter, setFilter] = useState("all")

    if (null === data) {
        return (
            <h2>LOADING....</h2>
        )
    }

    const filteredData = data.filter((c) => {
        if (filter === "zero") {
          return c.balance === 0
        } else if (filter === "non-zero") {
          return c.balance !== 0
        } else {
          return true
        }
      })


    return (
        <div className="container mt-5 list">
            <h2>Registruoti vartotojai</h2>
            <div className="filter">
                <h4 onClick={() => setFilter("zero")}>Tuščios sąskaitos</h4>
                <h4 onClick={() => setFilter("non-zero")}>Sąskaitos su likučiu</h4>
                <h4 onClick={() => setFilter("all")}>Visos sąskaitos</h4>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Vardas</th>
                        <th>Pavardė</th>
                        <th>Sąskaitos likutis</th>
                        <th>Suma</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.sort((a, b) => a.surname.localeCompare(b.surname)).map((c) => (
                        <tr key={c.id}>
                            <td>{c.name}</td>
                            <td>{c.surname}</td>
                            <td>{(c.balance).toFixed(2)}</td>

                            <Edit c={c} setEditData={setEditData} setDeleteData={setDeleteData} msg={msg} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}