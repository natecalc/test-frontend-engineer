import axios from "axios";


const getProductList = async () => (await axios.get('https://fakestoreapi.com/products')).data;

export default getProductList;