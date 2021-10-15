const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = '/catalogData.json';


const reg = /\b'.+'\b/
const reg_2 = /\w'\w/




class GoodsItem {
    constructor(img = "img", title = "title", price = 0, desc = "some text") {
        this.img = img;
        this.title = title;
        this.price = price;
        this.desc = desc;
    }
    render() {
        return `
    <div class="goods-item">
    <img scr=${this.img} width="250" height="250"/>
    <h3>${this.title}</h3>
    <p class="goods_price">${this.price}</p>
    <p class="goods_desc">${this.desc}</p>
    </div>
    `;
    }
}

class GoodsList {
    goods = [];
    constructor() {
        this.fetchGoods(() => {
            this.render();
        });
        this.filteredGoods = [];

    }

    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
    }

    fetchGoods(callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${API}${GOODS}`, true);
        xhr.send();
        xhr.onload = () => {
            this.goods = JSON.parse(xhr.responseText);
            callback();
        }


    }
    // getCount() {
    //     let count = 0;
    //     this.goods.forEach(({ price }) => {
    //         count += price;
    //     })
    //     return count;
    // }

    render() {
        const goodsList = this.goods.map(({ img, product_name, price, desc }) => {
            const goodsItem = new GoodsItem(img, product_name, price, desc);
            return goodsItem.render()
        });
        document.querySelector('.goods-list').innerHTML = goodsList.join('');
    }

}




window.onload = () => {
    const goodsList = new GoodsList();
}






