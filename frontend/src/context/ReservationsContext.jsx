import { createContext, useContext, useState } from "react";

export const ReservationsContext = createContext();

export const useReservationsContext = () => {
    return useContext(ReservationsContext);
}

export const ReservationsContextProvider = ({children}) => {
    const [reservations, setReservations] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    return <ReservationsContext.Provider value={{reservations, setReservations, currentPage, setCurrentPage}}>
        {children}
    </ReservationsContext.Provider>
}