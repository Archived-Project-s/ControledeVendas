import React from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ModalForm } from "./ModalForm";

import { Button} from "@material-ui/core";

interface props{

}

const MySwal = withReactContent(Swal);

const showFormModal = (values: any) => {
  return new Promise((resolve, reject) => {
    MySwal.fire({
      title: "Enter values",
      html: (
        <ModalForm
          values={values}
          onSubmit={(values: any) => {
            resolve(values);
            Swal.close();
          }}
          onCancel={() => Swal.close()}
        />
      ),
      showConfirmButton: false
    });
  });
};

export default function Modal3() {
  const showModal = () => {
    showFormModal({
      email: "test@email.com",
      color: "green",
      firstName: "",
      lastName: ""
    })
      .then(values => console.log(values))
      .catch(() => console.log("Modal closed"));
  };

    return <Button onClick={showModal}>Show modal form</Button>;
}
