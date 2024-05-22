import Swal from 'sweetalert2';

export async function copyToClipboard(data) {
   await navigator.clipboard.writeText(data);
   displayMessage('Copied to your clipboard!')
   return true;
}

export function transformAdditionalDetails(data) {
   const arr = [];
   data.forEach((item) => {
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
   return data.map((item) => {
      return { item: item.title + ' - ' + item.description };
   });
}

export function sanitizeProjectFormData(data) {
   const sanitizedAdditionalDetails = data.additionalDetails.filter(
      (item) => !!item.title && !!item.description
   );
   return { ...data, additionalDetails: sanitizedAdditionalDetails };
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
      background: isError ? '#5c0826' : '#1b611a',
      color: '#fff',
      backdrop: false,
      width: '350px',
   });
}

const dateOptions = {
   year: 'numeric',
   month: 'short',
   day: 'numeric',
};

export function formatDate(date) {
   return new Date(date).toLocaleDateString('en-US', dateOptions);
}

export function appendQuery(url, queryArr) {
   const urlObj = new URL(url);
   queryArr.forEach(({ query, value }) => {
      urlObj.searchParams.append(query, value);
   });
   return urlObj.toString();
}
