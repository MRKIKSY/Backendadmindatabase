import {
    Navigate,
    useLocation
} from "react-router-dom";
// eslint-disable-next-line react-refresh/only-export-components
export const setToken = (token) => {
    // set token in localStorage
    localStorage.setItem('authToken', token)
}
// eslint-disable-next-line react-refresh/only-export-components
export const fetchToken = () => {
    // fetch the token
    return localStorage.getItem('authToken');
};



// eslint-disable-next-line react/prop-types
export function RequireToken({ children }) {

    let auth = fetchToken()
    let location = useLocation();

    if (!auth) {

        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}