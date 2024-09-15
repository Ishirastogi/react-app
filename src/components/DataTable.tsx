import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";

interface RowData {
  id: number;
  name: string;
  email: string;
}

const DataTableComponent: React.FC = () => {
  const [data, setData] = useState<RowData[]>([]);
  const [selectedRows, setSelectedRows] = useState<RowData[]>([]);
  const [page, setPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Fetches data from the server
  const fetchData = async (pageNumber: number) => {
    try {
      const response = await axios.get(
        `https://api.artic.edu/api/v1/artworks?page=${pageNumber}`
      );
      setData(response.data.data);
      setTotalRecords(response.data.pagination.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle page change for server-side pagination
  const onPageChange = (event: any) => {
    setPage(event.page);
  };


  return (
    <div className="datatable-container">
      <DataTable
        value={data}
        paginator
        rows={10}
        totalRecords={totalRecords}
        lazy
        size={"small"}
        onPage={onPageChange}
        selection={selectedRows}
        selectionMode="checkbox"
        onSelectionChange={(e) => setSelectedRows(e.value)}
        showGridlines
        dataKey="id"
        selectionPageOnly
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Place of Origin" />
        <Column field="artist_display" header="Artist Display" />
        <Column field="inscriptions" header="Inscription" />
        <Column field="date_start" header="Date Start" />
        <Column field="date_end" header="Date End" />
      </DataTable>
    </div>
  );
};

export default DataTableComponent;