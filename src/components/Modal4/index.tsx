import React from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from 'react-select'
import { ModalForm } from "./ModalTeste";

import { Button} from "@material-ui/core";

const MySwal = withReactContent(Swal);

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const showFormModal = () => {
  return new Promise(() => {
    MySwal.fire({
      title: "Enter values",
      html: (
          <Select  onChange={(e) => console.log(e)} isMulti={true} options={options} />
      ),
      showConfirmButton: false
    });
  });
};

export class Modal4 extends React.Component {
  showModal = () => {
    showFormModal()
      .then(values => console.log(values))
      .catch(() => console.log("Modal closed"));
  };

  render() {
    return <Button onClick={this.showModal}>Show modal form</Button>;
  }
}
