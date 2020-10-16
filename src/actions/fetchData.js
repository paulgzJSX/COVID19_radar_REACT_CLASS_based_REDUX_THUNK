export const fetchData = (country) => {
    return async (dispatch, getState) => {
        const baseURL = 'https://covid19.mathdro.id/api'

        try {
            const { confirmed, recovered, deaths } = await (await fetch(baseURL + `/countries/${country}`)).json()
            const { serverCountries } = getState()
            const { iso2 } = serverCountries.find(ctry => ctry.name === country)

            dispatch({
                type: 'ADD_COUNTRY', country: {
                    country,
                    total: confirmed.value,
                    active: (confirmed.value - recovered.value),
                    recovered: recovered.value,
                    recoveryrate: parseFloat((recovered.value / confirmed.value * 100).toFixed(2)),
                    deaths: deaths.value,
                    deathrate: parseFloat((deaths.value / confirmed.value * 100).toFixed(2)),
                    iso2: iso2.toLowerCase()
                }
            })

            dispatch({ type: 'SORT_DESC', field: 'total' })
            dispatch({ type: 'SET_CURRENT_COLUMN', column: 'total title' })

        } catch (err) {
            console.error(err)
        }
        // }
    }
}


