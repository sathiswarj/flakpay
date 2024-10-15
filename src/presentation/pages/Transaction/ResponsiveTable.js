import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

const TablePage = (props) => {
  const data_minimal_width = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        minimal: 'sm'
      },
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        minimal: 'sm'
      },
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        minimal: 'sm'
      },
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        minimal: 'sm'
      },
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        minimal: 'sm'
      },
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        minimal: 'sm'
      },
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        minimal: 'sm'
      },
      {
        label: 'Lorem ipsum dolor',
        field: 'lorem ipsum dolor',
        sort: 'asc',
        minimal: 'lg'
      },
      {
        label: 'Lorem ipsum dolor',
        field: 'lorem ipsum',
        sort: 'asc',
        minimal: 'sm'
      },
      {
        label: 'Lorem ipsum dolor',
        field: 'lorem ',
        sort: 'asc',
        minimal: 'lg'
      }
    ],
    rows: [
      {
        'id': '1',
        'lorem ipsum dolor': 'Lorem irdtrfyguyhiikpsum dolor',
        'lorem ipsum': 'Lorem ipsum dolor',
        'lorem': 'Lorem ipsum dolor'
      },
      {
        'id': '2',
        'lorem ipsum dolor': 'Lorem ipsum dolor',
        'lorem ipsum': 'Lorem ipsum dolor',
        'lorem': 'Lorem ipsum dolor'
      },
      {
        'id': '3',
        'lorem ipsum dolor': 'Lorem ipsum dolor',
        'lorem ipsum': 'Lorem ipsum dolor',
        'lorem': 'Lorem ipsum dolor'
      }
    ]
  };


  return(
    <MDBTable striped bordered>
      <MDBTableHead columns={data_minimal_width.columns} />
      <MDBTableBody rows={data_minimal_width.rows} />
    </MDBTable>
  );
};

export default TablePage;
