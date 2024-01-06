export default {
    get : (stringkey) => {
        if (typeof stringkey !== 'string') {
            alert('key data is not string.')
            return null;
        }
        return localStorage.getItem(stringkey)
    },

    set : (stringkey, stringData) => {

        if (typeof stringkey !== 'string' || typeof stringkey !== 'string') {
            alert('key and data is not string.')
            return null;
        }
        localStorage.setItem(stringkey, stringData)
    }
}