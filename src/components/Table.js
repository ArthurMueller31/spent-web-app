import React, { useState } from 'react';
import axios from 'axios';

function NotaFiscalScraper() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://192.168.2.9:3001/scrape', { url });
      setData(response.data.data); // Salva os dados de resposta
      setError(null);
    } catch (err) {
      setError('Erro ao buscar dados da nota fiscal');
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Insira o link da nota fiscal"
        />
        <button type="submit">Buscar Nota Fiscal</button>
      </form>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
                <td>{data.prices[index]}</td>
              </tr>
            ))}
            <tr>
              <td><strong>Data de Emissão:</strong></td>
              <td>{data.emissionDate}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default NotaFiscalScraper;
