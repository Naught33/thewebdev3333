export default function toast(message){
    const toastBody = document.createElement('div');
    toastBody.className = 'toast show';
    document.body.appendChild(toastBody);
    toastBody.innerHTML = `
        <p>${message}</p>    
    `;

    setTimeout(()=>{
        toastBody.classList.remove('show');
    }, 3000);


    setTimeout(()=>{
        document.body.removeChild(toastBody);
    }, 8000);

}