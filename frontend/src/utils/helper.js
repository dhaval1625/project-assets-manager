import Swal from 'sweetalert2'

export async function copyToClipboard(data) {
   await navigator.clipboard.writeText(data);
   return true;
}

export function transformAdditionalDetails(data) {
   const arr = [];
   data.forEach(item => {
      if (item.item && item.item.length > 0) {
         const [key, value] = item.item.split(' - ');
         if (key && value) {
            arr.push({
               title: key,
               description: value,
            });
         }
      }
   });
   return arr;
}

export function convertAdditionalToString(data) {
   return data.map(item => {
      return { item: item.title + ' - ' + item.description };
   });
}

export function isValidUrl(string) {
   try {
      new URL(string);
      return true;
   } catch (err) {
      return false;
   }
}

export function displayMessage(message, isError) {
   Swal.fire({
      position: 'top-end',
      text: message,
      showConfirmButton: false,
      timer: 2000,
      background: isError ? '#9a3737' : '#2c542c',
      color: '#fff',
      backdrop: false,
      width: '350px',
   });
}


