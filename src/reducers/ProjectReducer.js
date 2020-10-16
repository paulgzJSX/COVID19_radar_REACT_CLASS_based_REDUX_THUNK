const initState = {
    countries: [],
    sortDirection: false,
    currentColumn: '',
    serverCountries: []
}


const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_COUNTRY':
            return { ...state, countries: [...state.countries, action.country] }

        case 'DELETE_COUNTRY':
            return { ...state, countries: state.countries.filter(ctry => ctry.country !== action.country) }

        case 'DELETE_ALL':
            return { ...state, countries: [] }

        case 'SORT_ASC':
            if (typeof state.countries[0][action.field] == 'string') {
                return {
                    ...state,
                    countries: [...state.countries.sort((a, b) => a[action.field].localeCompare(b[action.field]))]
                }
            }
            if (typeof state.countries[0][action.field] == 'number') {
                return {
                    ...state,
                    countries: [...state.countries.sort((a, b) => a[action.field] - b[action.field])]
                }
            }
            break

        case 'SORT_DESC':
            if (typeof state.countries[0][action.field] == 'string') {
                return {
                    ...state,
                    countries: [...state.countries.sort((a, b) => b[action.field].localeCompare(a[action.field]))]
                }
            }
            if (typeof state.countries[0][action.field] == 'number') {
                return {
                    ...state,
                    countries: [...state.countries.sort((a, b) => b[action.field] - a[action.field])]
                }
            }
            break

        case 'TOGGLE_SORT_DIRECTION':
            return { ...state, sortDirection: !state.sortDirection }

        case 'SET_CURRENT_COLUMN':
            return { ...state, currentColumn: action.column }

        case 'FETCH_COUNTRIES':
            return { ...state, serverCountries: action.countries }

        default:
            return state;
    }
}

export default projectReducer

