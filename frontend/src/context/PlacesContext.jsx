import { createContext, useContext, useState } from "react";

export const PlacesContext = createContext();

export const usePlacesContext = () => {
    return useContext(PlacesContext);
}

export const PlacesContextProvider = ({children}) => {
    const [places, setPlaces] = useState(null);
    const [placeType, setPlaceType] = useState(-1);
    const [currentPage, setCurrentPage] = useState(1);

    return <PlacesContext.Provider value={{places, setPlaces, placeType, setPlaceType, currentPage, setCurrentPage}}>
        {children}
    </PlacesContext.Provider>
}