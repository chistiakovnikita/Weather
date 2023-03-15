import { useState } from 'react'
import './App.css'
import Spinner from './components/Spinner'

function App() {
    const API_KEY = '8124de3bbf904e21a8e192516230503'

    const [data, setData] = useState({})
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const handleInputChange = (evt) => setInputValue(evt.target.value)

    const handleFormSubmit = (evt) => {
        evt.preventDefault()

        fetch(
            `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${inputValue}`
        )
            .then((response) => response.json())
            .then((data) => setData(data))
            .finally(() => setIsLoading(false))
    }

    return (
        <div className="App">
            <header className="header">
                <h1 className="header-title">Прогноз погоды</h1>
                <form onSubmit={handleFormSubmit} className="header-form">
                    <input
                        onChange={handleInputChange}
                        type="text"
                        value={inputValue}
                        className="header-input"
                        placeholder="Введите название города"
                    />
                    <button type="submit" className="header-btn">
                        поиск
                    </button>
                </form>
            </header>
            <main>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <section className="main">
                        <div className="card">
                            <h2 className="card-city">{data.location.name}</h2>
                            <span className="card-country">
                                {data.location.country}
                            </span>
                            <div className="card-weather">
                                <p className="card-temperature">
                                    {data.current.temp_c} °C
                                </p>
                                <p className="card-description">
                                    {data.current.condition.text}
                                </p>
                            </div>
                            <p className="feelslike">
                                feelslike {data.current.feelslike_c}
                            </p>
                        </div>
                    </section>
                )}
            </main>
        </div>
    )
}

export default App
