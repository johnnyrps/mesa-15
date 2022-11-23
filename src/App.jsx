import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const App = () => {
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });
  const [Id, setId] = useState("");

  useEffect(() => {
    getProdutos();
  }, []);


  async function getProdutos(){
    const response = await axios.get("http://127.0.0.1:5174/api/products/");
    setProdutos(response.data.products);
  }

  function submitForm(){
    if (Id){
       editarProdutos();
    } else {
      inserirProdutos();
    }
  }

  async function inserirProdutos(){
    try {
      setId(Math.random() + 10);
      const response = await axios.post("http://127.0.0.1:5174/api/products/",
      {
        id: Id,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        category: formData.category,
        image: formData.image,
      });
      setFormData({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: "",
      });
      getProdutos();
      setId("");
    } catch (error) {
      alert("Erro ao Salvar!")
    }

  }

  function estadoProdutos(produto){
    try {
      setFormData({
        title: produto.title,
        description: produto.description,
        price: produto.price,
        stock: produto.stock,
        category: produto.category,
        image: produto.image,
      });

      setId(produto.id);
    } catch (error) {
      alert("Erro ao editar: " + error.mensage);
    }
  }

  async function editarProdutos(){
    try {
      const response = await axios.put(`http://127.0.0.1:5174/api/products/${Id}`, 
        {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          stock: formData.stock,
          category: formData.category,
          image: formData.image,
        }
      );
  
      setId("");
      alert("Produto alterado!");
      setFormData({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: "",
      });
      getProdutos();
      
    } catch (error) {
      alert("Erro ao alterar: " + error.mensage);
    }

  }

  async function excluirProdutos(Id){
    try {
      await axios.delete(`http://127.0.0.1:5174/api/products/${Id}`);
      alert("Produto excluído com sucesso!");
      getProdutos();
    } catch (error) {
      alert("Erro ao excluir: " + error.mensage);
    }
  }
  
  return (
    <div>
      <form>
        <input
          placeholder="Título"
          value={formData.title}
          onChange={(event) =>
            setFormData({ ...formData, title: event.target.value })
          }
        />
        <input
          placeholder="Descrição"
          value={formData.description}
          onChange={(event) =>
            setFormData({ ...formData, description: event.target.value })
          }
        />
        <input
          placeholder="Preço"
          value={formData.price}
          onChange={(event) =>
            setFormData({ ...formData, price: event.target.value })
          }
        />
        <input
          placeholder="Estoque"
          value={formData.stock}
          onChange={(event) =>
            setFormData({ ...formData, stock: event.target.value })
          }
        />
        <input
          placeholder="Categoria"
          type="text"
          value={formData.category}
          onChange={(event) =>
            setFormData({ ...formData, category: event.target.value })
          }
        />
        <input
          placeholder="Imagem"
          type="text"
          value={formData.image}
          onChange={(event) =>
            setFormData({ ...formData, image: event.target.value })
          }
        />
        <button type="button" onClick={submitForm}>
          Salvar
        </button>
      </form>
       <div className="container-table">
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Imagem</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.title}</td>
                <td>{produto.description}</td>
                <td>{produto.price}</td>
                <td>{produto.category}</td>
                <td><img src={produto.image} width="30%" height="30%"/></td>
                <td>
                  <button onClick={() => estadoProdutos(produto)}>Editar</button>
                  <button onClick={() => excluirProdutos(produto.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) 
}

export default App;