const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");
const free_trial_element = document.getElementById("freeTrial");
const remove_element = document.getElementById("form_input_data");

let loadInterval;

function loader(element) {
    element.textContent = "";
    loadInterval = setInterval(() => {
        element.textContent += "";

        if (element.textContent === "...") {
            element.textContent = "";
        }
    }, 300)
}

function typeText(element, text) {
    let index = 0;
    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML = text.charAt(index);
            index++;
        } else {
            clearInterval(interval)
        }
    }, 20)
}

function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexaDecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexaDecimalString}`
}

function chatStripe(isAi, value, uniqueId) {
    return `
       <div class="wrapper">
            <div class="chat">
                <div class="profile">
                    <img src=${isAi ? "bot.svg" : "user.svg"} alt="${isAi ? "bot" : "user"}"/>
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
       </div>
    `
}

export const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    chatContainer.innerHTML += chatStripe(false, data.get("prompt"));
    form.reset();

    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, "", uniqueId);
    const messageDiv = document.getElementById(uniqueId);

    loader(messageDiv);
    const response = await fetch("http://localhost:4000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: data.get("prompt")
        })
    });

    clearInterval(loadInterval);
    messageDiv.innerHTML = " ";

    if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.tirm();

        typeText(messageDiv, parsedData);
        const freeTrial = localStorage.get("freeTrial");
        const FREE_TRIAL = JSON.parse(freeTrial);

        if (FREE_TRIAL == 1) {
            const freeTrial = JSON.stringify(2);
            localStorage.setItem("freeTrial", freeTrial);
            free_trial_element.innerHTML = 2
        } else if (FREE_TRIAL == 2) {
            const freeTrial = JSON.stringify(3);
            localStorage.setItem("freeTrial", freeTrial);
            free_trial_element.innerHTML = 3
        } else if (FREE_TRIAL == 3) {
            const freeTrial = JSON.stringify(4);
            localStorage.setItem("freeTrial", freeTrial);
            free_trial_element.innerHTML = 4
        }
        else if (FREE_TRIAL == 4) {
            const freeTrial = JSON.stringify(5);
            localStorage.setItem("freeTrial", freeTrial);
            free_trial_element.innerHTML = 5;
            remove_element.remove()

        } else if (FREE_TRIAL == 5) {
            console.log("Pro Member")
        } else {
            const freeTrial = JSON.stringify(1);
            localStorage.setItem("freeTrial", freeTrial);
            free_trial_element.innerHTML = 1;
        }

    } else {
        const error = await response.text();
        messageDiv.innerHTML = "Something went wrong, Reload the page!!";
        alert(error)
    }
}

form.addEventListener("submit", handleSubmit());
form.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        handleSubmit(e)
    }
})