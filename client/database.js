/**
 * Interface to our backend
 */
module.exports = {
    getEntries() {
        return new Promise((resolve, reject) => {
            const httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = () => {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (httpRequest.status === 200) {
                        resolve(JSON.parse(httpRequest.responseText));
                    } else {
                        reject(httpRequest);
                    }
                }
            };
            httpRequest.open("GET", "/backend/allEntries", true);
            httpRequest.send();
        });
    }
};