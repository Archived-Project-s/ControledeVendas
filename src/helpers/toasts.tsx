import Swal, { SweetAlertIcon } from 'sweetalert2';

const toast = (msg: string, toastType: SweetAlertIcon) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: 'var(--backgroundcolor)',
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: toastType,
        title: msg
      })
}

export const successToast = (msg: string) =>{
    toast(msg, 'success')
}

export const errorToast = (msg: string) =>{
    toast(msg, 'error')
}

export const warningToast = (msg: string) =>{
  toast(msg, 'warning')
}

export const infoToast = (msg: string) =>{
  toast(msg, 'info')
}

export const questionToast = (msg: string) =>{
  toast(msg, 'question')
}