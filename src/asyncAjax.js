const Promise = require('es6-promise').Promise;
if (!axios) {
    throw new Error('async need axios.js');
}
!function (window, axios) {
    const asyncAjax = async function (url, param, type = 'get') {
        type = type.toLowerCase();
        if (type === 'get') {
            return new Promise((resolve, reject) => {
                axios.get(url, {
                    params: param
                }).then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
        if (type === 'post') {
            return new Promise((resolve, reject) => {
                axios.post(url, param).then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }


    window.asyncAjax = asyncAjax;
}(window, axios);
