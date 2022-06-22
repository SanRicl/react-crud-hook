import { useEffect, useState } from "react";
import "./App.css";
import { TiDelete } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { findIndex, forEach } from "lodash";

function App() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    const productsSaved = JSON.parse(localStorage.getItem("app-products"));

    if (!productsSaved) return;
    setProducts(productsSaved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();



    if (productName.length <= 3) {
      toast.warning("Please inform a valid name for the product");
      return;
    }
    if (productPrice < 0) {
      toast.warning("Invalid price");
    }
    if (productQuantity <= 0) {
      toast.warning("Invalid quantity");
      return;
    }

  
    //Criar uma variavel que sera o array de objetos dos produtos adicionados (imutabilidade do react) - nao pode alterar o valor base
    const newProducts = [...products];


    //novo produto sera um objeto com os atributos enviados pelo form
    const newProduct = {
      id: products.length + 1,
      name: productName.trim(),
      price: productPrice,
      quantity: productQuantity,
    };

    newProducts.forEach((products) => console.log(products.name))

    if (index === -1) {
      //o array de novos produtos vai receber o objeto de novo produto
      newProducts.push(newProduct);

      //setando o estado com o novo produto
      setProducts(newProducts);
    } else {
      // Isso me retorna o objeto do produto que eu quero editar, entao ele recebe o objeto com seus atributos atualizados.
      newProducts[index] = newProduct;

      // setando o estado com os produtos editados
      setProducts(newProducts);
      setIndex(-1);
    }
    

    localStorage.setItem("app-products", JSON.stringify(newProducts));

    setProductName("");
    setProductPrice(0);
    setProductQuantity(0);
  };

  const handleEdit = (e, index, prod) => {
    e.preventDefault();

    setIndex(index);

    setProductName(prod.name);
    setProductPrice(prod.price);
    setProductQuantity(prod.quantity);
  };

  const handleDelete = (e, index) => {
    e.preventDefault();

    const newProducts = [...products];

    newProducts.splice(findIndex(index), 1);

    localStorage.setItem("app-products", JSON.stringify(newProducts));

    //setando o novo estado sem o  ID que foi removido acima com o metodo splice
    setProducts(newProducts);
  };

  return (
    <div id="mainContainer">
      <div className="mainContent">
        <h2>Add Products</h2>
        <div className="prodForm">
          <form className="form" action="">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <label htmlFor="price">Product Price</label>
            <input
              type="number"
              id="price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />

            <label htmlFor="quantity">Product Quantity</label>
            <input
              type="number"
              id="quantity"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
            <button className="btnSub" onClick={handleSubmit}>
              Add
            </button>
          </form>

          <div className="addProds">
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Product Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <TiDelete
                        className="deleteBtn"
                        onClick={(e) => handleDelete(e, product.id)}
                      />
                      <MdEdit
                        className="editBtn"
                        onClick={(e) => handleEdit(e, index, product)}
                      />{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
