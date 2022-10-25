import {
    GET_COUNTRIES, GET_COUNTRIES_BY_ID, GET_COUNTRIES_BY_NAME, FILTER_COUNTRIES_BY_CONTINENT, FILTER_COUNTRIES_BY_ACTIVITY, FOUND_OR_NOT,
    ORDER_BY_STUFF, REFRESH
} from "./actions"

const initialState = {
    paises: [],
    paisesReferencia: [],
    pais: {},
    actividades: [],
    filteredActivities: [],
    filteredContinents: [],
    foundOrNotFound: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:

            return {
                ...state, paises: action.payload,
                paisesReferencia: action.payload
            }
        case GET_COUNTRIES_BY_ID:
            return {
                ...state, pais: action.payload
            }
        case GET_COUNTRIES_BY_NAME:
            return {
                ...state, paises: action.payload
            }
        case FILTER_COUNTRIES_BY_CONTINENT:

            const PaisesfiltradosActividades = state.filteredActivities

            const allCountries = state.paisesReferencia

            const ContinentesFiltrados = action.payload === 'All' ? allCountries : allCountries.filter(countries => countries.Continente === action.payload)

            var found = true

            if (PaisesfiltradosActividades.length === 0) {
                var statusFiltered = action.payload === 'All' ? allCountries : allCountries.filter(countries => countries.Continente === action.payload)
            }
            else {
                var statusFiltered = action.payload === 'All' ? PaisesfiltradosActividades : PaisesfiltradosActividades.filter(countries => countries.Continente === action.payload)
            }
            if (statusFiltered.length === 0) {
                found = false
            }
            else { found = true }
            return {
                ...state, paises: statusFiltered,
                filteredContinents: ContinentesFiltrados,
                foundOrNotFound: found
            }

        case FILTER_COUNTRIES_BY_ACTIVITY:
            let filteredByActivity = []
            const PaisesfiltradosContinente = state.filteredContinents

            const ActividadesFiltradas = []

            const allPaises = state.paisesReferencia

            var encontrado = true

            for (let i = 0; i < allPaises.length; i++) {
                allPaises[i].activities.map(acts => acts.Nombre === action.payload && ActividadesFiltradas.push(allPaises[i]))
            }

            if (PaisesfiltradosContinente.length === 0) {
                if (action.payload !== 'All') {
                    for (let i = 0; i < allPaises.length; i++) {
                        allPaises[i].activities.map(acts => acts.Nombre === action.payload && filteredByActivity.push(allPaises[i]))

                    }
                }
                else{filteredByActivity = allPaises}
            }

            else {
                if (action.payload !== 'All') {
                    for (let i = 0; i < PaisesfiltradosContinente.length; i++) {
                        PaisesfiltradosContinente[i].activities.map(acts => acts.Nombre === action.payload && filteredByActivity.push(PaisesfiltradosContinente[i]))

                    }
                }

                else { filteredByActivity = PaisesfiltradosContinente }
            }


            if (filteredByActivity.length === 0) {
                encontrado = false
            }
            else { encontrado = true }
            return {
                ...state, paises: filteredByActivity,
                filteredActivities: ActividadesFiltradas,
                foundOrNotFound: encontrado
            }

        case FOUND_OR_NOT:
            return {
                ...state, foundOrNotFound: action.payload
            }
        case ORDER_BY_STUFF:
            const paises = state.paises
            var sortedArr = []
            const paises2 = [...state.paisesReferencia]

            if (action.payload === 'Ascendente') {
                 sortedArr = paises.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                });
            }
            else if (action.payload === 'Descendente') {
                 sortedArr = paises.sort(function (a, b) {
                    if (a.name < b.name) {
                        return 1;
                    }
                    if (a.name > b.name) {
                        return -1;
                    }
                    return 0;
                });
            }
            else if (action.payload === 'Mostpopulation') {
                 sortedArr = paises.sort(function (a, b) {
                    if (a.Poblacion < b.Poblacion) {
                        return 1;
                    }
                    if (a.Poblacion > b.Poblacion) {
                        return -1;
                    }
                    return 0;
                });
            }
            else if (action.payload === 'Leastpopulation') {
                 sortedArr = paises.sort(function (a, b) {
                    if (a.Poblacion > b.Poblacion) {
                        return 1;
                    }
                    if (a.Poblacion < b.Poblacion) {
                        return -1;
                    }
                    return 0;
                });
            }
            else if (action.payload === 'Desordenado'){
                sortedArr = paises.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                });
            }
            return {
                ...state, paises: sortedArr 
            }
            case REFRESH:
                const refreshcountries = state.paisesReferencia
                return{
                    ...state, paises: refreshcountries
                }
        default:
            return { ...state }
    }
}

export default rootReducer