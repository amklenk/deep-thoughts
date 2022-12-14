import decode from 'jwt-decode';

class AuthService {
    // retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    }
    // check if user is still logge din
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        // use type coersion to check if token is not undefined and the token is not expired
        return !!token && !this.isTokenExpired(token);
    }

    // check if the token has expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    // retrieve token from localStorage
    getToken() {
        // retrieves user token
        return localStorage.getItem('id_token');
    }

    // set token to localStorage and reload page to homepage
    login(idToken) {
        // save user token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    // clear token from localStorage and force logout
    logout() {
        // clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and reset the state of the applicatin
        window.location.assign('/');
    }
};

export default new AuthService();