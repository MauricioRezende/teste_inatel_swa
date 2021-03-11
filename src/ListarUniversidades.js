import React, { useState } from 'react'
import axios from 'axios'

const ListarUniversidades = () =>{
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [pesquisa, setPesquisa] = useState('')
    const [itemPage, setItemPage] = useState(10)
    const [page, setPage] = useState(0)

    const handleSubmit = evt => {
        evt.preventDefault()
    }
 
    const onChange = evt => {
        setPesquisa(evt.target.value)
        axios
            .get('http://universities.hipolabs.com/search?country=brazil&name=' + pesquisa)
            .then(res => {
                let cont = 0
                const newData =
                    res.data.map(item => {
                        item = {...item, id: cont}
                        cont++
                        return item
                    })
                setData2(newData)
                setData(newData.filter(item => item.id >= 0 & item.id < 0 + itemPage))
                setPage(0)
            })
    }
    
    const handleClickSelect = evt => {       
        setData(data2.filter(item => item.id >= 0 & item.id < 0 + evt.target.value))
        setItemPage(evt.target.value)
        setPage(0)
    }

    const pagina = evt => {
        setPage(evt - 1)
        setData(data2.filter(item => item.id >= ((evt - 1)  * itemPage) & item.id < ((evt - 1) * itemPage) + parseInt(itemPage)))
    }

    const Pagination = () => {
        const options = [];

        options.push(
            <li className={page === 0 ? 'disabled' : 'waves-effect'} onClick={() => pagina('1')} >
                <a>
                    <i className="material-icons">chevron_left</i>
                </a>
            </li>
        )

        for (var i = 1; i <= Math.ceil(data2.length/itemPage); i++) {
            options.push(<li key={i} onClick={e => pagina(e.target.innerText)} className={page === i-1 ? 'active' : 'waves-effect'}><a>{i}</a></li>)
        }

        options.push(
            <li className={page === Math.ceil(data2.length/itemPage) - 1 ? 'disabled' : 'waves-effect'} onClick={() => pagina(`${Math.ceil(data2.length/itemPage)}`)} >
                <a>
                    <i className="material-icons">chevron_right</i>
                </a>
            </li>
        )

        return (
            <ul className="pagination">
                {options}
            </ul>
        )
    }

    return (
        <div className='container'>
            <div className='center-align'>
                <h2>Listar Universidades</h2>
            </div>
            <hr />
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='input-field col l10 m10 s12'>
                        <input placeholder='Informe uma palavra' id='pesquisar' type='text'  onChange={onChange} />
                        <label htmlFor='pesquisar'>Pesquisar</label>
                    </div>
                    <div className="col l2 m2 s12">
                        <label>Itens por página:</label>
                        <select onChange={handleClickSelect} className='browser-default'>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </div>

                <table className='highlight'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 &&
                            <tr>
                                <td colSpan={2}>Nenhum item encontrado.</td>
                            </tr>
                        }
                        {data.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>                

                { data2.length > itemPage &&
                    <div className='center-align'>
                        <br />
                        <Pagination />
                    </div>
                }
            </form>
        </div>
    )
}

export default ListarUniversidades