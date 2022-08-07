const socket = io();

const msgInp = document.querySelector('#msgInp');
const sendMsgBtn = document.querySelector('#sendMsgBtn');
const messagesBlock = document.querySelector('.chatbot .messages');

sendMsgBtn.addEventListener('click', (e) => {
    e.preventDefault();
    socket.emit('msg', msgInp.value);
    msgInp.value = "";
})

socket.on('history', (msgs) => {
    messagesBlock.innerHTML =msgs.map((msg) => `
        <div class="${msg.src}Message">
            <p class="messageText"><b class="messageSource">${msg.src === 'user' ? 'Tú' : 'Bot'}</b>${msg.text}</p>
        </div>
        `).join('\n');
})