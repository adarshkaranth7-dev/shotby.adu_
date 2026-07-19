emailjs.init({
    publicKey: "LfHguKwytYivqo1dl"
});

document.getElementById("hireForm").addEventListener("submit", function (e) {

    e.preventDefault();

    emailjs.sendForm(
        "service_0lebhxj",
        "template_mjrd6c8",
        this
    )

    .then(() => {

        document.getElementById("hireForm").innerHTML = `
            <div class="success">
                <h2>✅ Thank You!</h2>
                <p>Your request has been sent successfully.</p>
                <p>I'll get back to you within 24 hours.</p>
            </div>
        `;

    })

    .catch((error) => {

        console.log("EmailJS Error:", error);
        alert("Error: " + error.text);

    });

});
window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader").style.opacity = "0";

        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 600);

    }, 3000);

});
const clientType = document.getElementById("client_type");
const otherClient = document.getElementById("otherClient");

clientType.addEventListener("change", function () {

    if (this.value === "Other") {
        otherClient.style.display = "block";
        otherClient.required = true;
    } else {
        otherClient.style.display = "none";
        otherClient.required = false;
        otherClient.value = "";
    }

});
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});