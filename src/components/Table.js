import React from "react";
import DataTable from "react-data-table-component";
import "./Table.css"

const Table = () => {
  const customStyles = {
    header: {
      style: {
        backgroundColor: "#ffffff",
        color: "black",
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "center"
      }
    },
    rows: {
      style: {
        minHeight: "50px", // altura mínima das linhas
        "&:not(:last-of-type)": {
          borderBottom: "2px solid #eee" // borda entre as linhas
        }
      }
    },
    headCells: {
      style: {
        backgroundColor: "#69d785",
        color: "#333333",
        fontWeight: "bold",
        fontSize: "28px",
        justifyContent: "center",
      }
    },
    cells: {
      style: {
        padding: "16px",
        fontSize: "20px",
        textAlign: "center",
        justifyContent: "center"


      }
    }
  };

  const columns = [
    {
      name: "Estabelecimento",
      selector: (row) => row.estabelecimento,
    },
    {
      name: "Produto",
      selector: (row) => row.produto,
  
    },
    {
      name: "Gasto",
      selector: (row) => row.gasto,
      
    },
    {
      name: "Data",
      selector: (row) => row.data,
      
    }
  ];

  const data = [
    {
      id: 1,
      estabelecimento: "Mavili",
      produto: "carne",
      gasto: 50,
      data: "25/10/2024"
    },
    {
      id: 2,
      estabelecimento: "Top",
      produto: "frango",
      gasto: 30,
      data: "22/10/2024"
    },
    {
      id: 3,
      estabelecimento: "Big",
      produto: "frutas",
      gasto: 40,
      data: "15/09/2024"
    }
  ];

  return (
    <div className="table-class">
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
      ></DataTable>
    </div>
  );
};

export default Table;
