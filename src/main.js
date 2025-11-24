//Imports
import { SectionIndicator } from "./components/sectionIndicator.js";
import sendMail from "./components/sendMail.js";
import toast from "./components/toast.js";
// import Dynamic from "./components/dynamic.js";


//states

let isMenuOpen = false;

//DOM elements
const app = document.getElementById('app');
const menuButton = document.getElementsByClassName('menu-icons')[0];
const hero = document.getElementsByClassName('hero')[0];
const content = document.getElementsByClassName('content')[0];
const services = document.getElementsByClassName('services')[0];
const footer = document.getElementsByClassName('footer')[0];
const model = document.getElementsByTagName('spline-viewer')[0];
const indicator = document.getElementById('indicator');
const indicatorParent = document.getElementsByClassName('indicators')[0];

//form information

const senderName = document.getElementById('name');
const senderEmail = document.getElementById('email');
const messageBody = document.getElementById('message');
const sendBtn = document.getElementById('submit');
const form = document.getElementById('inquiry');

//contacts

const myContacts = document.getElementsByClassName('contacts')[0];

const sectionsArray = [hero, services, content, footer];

//initializations of classes
const ic = new SectionIndicator(sectionsArray,0);

//function definitions

const screenLenght = ic.getLength();

for(let i = 0; i<screenLenght; i++){
    const indcatorPosition = document.createElement('div');
    indcatorPosition.classList.add('positionIndicator');
    indicatorParent.appendChild(indcatorPosition);
}

indicatorParent.children[0].classList.add('current');

function findSectionInView() {
    let maxVisibleHeight = 0;
    let mostVisibleSection = null;

    sectionsArray.forEach(section => {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

        if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            mostVisibleSection = section;
        }
    });

    return mostVisibleSection;
}


function removeClassList(){
    indicatorParent.querySelector('current').classList.remove('current');
}

function positionModel(position){
    if(position < 25){
        model.style.right = '16%';
        return;
    }

    if(position > 25 && position < 50){
        model.style.right = '78%';
        return;
    }

    if(position > 50 && position < 75){
        model.style.right = '47%';
        return;
    }

    if(position > 75){
        model.style.right = '16%';
        return;
    }
}

function openMenu(){
    document.getElementsByClassName('hamburger-menu')[0].style.opacity = 0;
    document.getElementsByClassName('close-menu')[0].style.opacity = 1;
    isMenuOpen = true;
}

function closeMenu(){
    document.getElementsByClassName('hamburger-menu')[0].style.opacity = 1;
    document.getElementsByClassName('close-menu')[0].style.opacity = 0;
    isMenuOpen = false;
}

function calculateTopHeightPercentage(element){
    const elementRect = element.getBoundingClientRect();
    const appRect = app.getBoundingClientRect();
    const distanceFromTop = elementRect.top + element.clientHeight - appRect.top + app.scrollTop;
    const percentage = (distanceFromTop / app.scrollHeight) * 100;
    return percentage.toFixed(2);
}

function indicateOnScroll(){
    const currentSection = findSectionInView();
    const indicatorPosition = sectionsArray.indexOf(currentSection);
    Array.from(indicatorParent.children).forEach(child=>{
        if(child.className === 'positionIndicator current'){
            child.classList.remove('current');
            return;
        }
    });
    indicatorParent.children[indicatorPosition].classList.add('current');
    ic.pos = indicatorPosition;
}

async function copy(content, toastMessage) {
  try {
    await navigator.clipboard.writeText(content);
    toast(toastMessage+ ' copied to clipboard');
  } catch (err) {
    toast('Failed to copy ' + toastMessage + '. Please try again');
  }
}

//event listeners

menuButton.addEventListener('click',(e)=>{
    if(!isMenuOpen){
        openMenu();
        return;
    }
    closeMenu();
});



app.addEventListener('scroll',()=>{
    const position = calculateTopHeightPercentage(findSectionInView());
    positionModel(position);
    indicateOnScroll();
})

//misc
//section indicator controlling

function scrollNext(arr){    
    arr[ic.next()].scrollIntoView({ behavior: 'smooth' });
}

function scrollPrev(arr){
    arr[ic.prev()].scrollIntoView({ behavior: 'smooth' });
}

indicator.addEventListener('click',(e)=>{
    const controls = indicator.querySelectorAll('ion-icon');
    if(e.target === controls[0]){
        scrollPrev(sectionsArray);
    }

    if(e.target === controls[1]){
        scrollNext(sectionsArray);
    }
});

sendBtn.addEventListener('click',(e)=>{
    e.preventDefault();

    const sender = senderName.value;
    const senderMail = senderEmail.value;
    const body = messageBody.value;
    sendBtn.textContent = 'sending...';

    if(sender === '' || senderMail === '' || body === ''){
        sendBtn.textContent = 'fill in all fields';
        setTimeout(()=>{
            sendBtn.textContent = 'Submit';
        }, 1500);
        return;
    }

    if(sendMail(sender, senderMail, body) === 'ERROR'){
        sendBtn.textContent = 'Error, please try again';
    }else{
        toast('Message sent successfully');
        sendBtn.textContent = 'sent';
        form.reset();
    }
    setTimeout(()=>{
        sendBtn.textContent = 'Submit';
    }, 2000)
});

myContacts.addEventListener('click',(e)=>{
    if(e.target === myContacts.querySelectorAll('p')[0]){
        window.location.href = `mailto:thewebdev3333@gmail.com?subject=${encodeURIComponent('Hello, I am reaching out from your website')}&body=${encodeURIComponent('What would you like to talk to us about?')}`;
        return;
    }

    if(e.target === myContacts.querySelectorAll('p')[1]){
        window.location.href = `mailto:nevillevalentine56@gmail.com?subject=${encodeURIComponent('Hello, I am reaching out from your website')}&body=${encodeURIComponent('What would you like to talk to us about?')}`;
        return;
    }

    if(e.target === myContacts.querySelectorAll('p')[2]){
        copy(e.target.textContent, 'Phone number')
        return;
    }
})