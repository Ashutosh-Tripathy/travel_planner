import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const items = [{ "id": 9090, "name": "Item1", "price": 200, "discount": 10, "type": "fiction", "img_url": "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg" },
{ "id": 9091, "name": "Item2", "price": 250, "discount": 15, "type": "literature", "img_url": "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg" },
{ "id": 9092, "name": "Item3", "price": 320, "discount": 5, "type": "literature", "img_url": "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg" },
{ "id": 9093, "name": "Item4", "price": 290, "discount": 0, "type": "thriller", "img_url": "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg" },
{ "id": 9094, "name": "Item1", "price": 500, "discount": 25, "type": "thriller", "img_url": "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg" },
{ "id": 9095, "name": "Item2", "price": 150, "discount": 5, "type": "literature", "img_url": "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg" },
{ "id": 9096, "name": "Item3", "price": 700, "discount": 22, "type": "literature", "img_url": "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg" },
{ "id": 9097, "name": "Item4", "price": 350, "discount": 18, "type": "fiction", "img_url": "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg" }];

class ItemApi {
    static getAllItems() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], items));
            }, delay);
        });
    }


    static deleteItem(itemId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const indexOfAuthorToDelete = items.findIndex(item => {
                    item.id == itemId;
                });
                items.splice(indexOfAuthorToDelete, 1);
                resolve();
            }, delay);
        });
    }
}

export default ItemApi;