import { useState, useEffect, createContext, useContext } from 'react';

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
        }
        else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)