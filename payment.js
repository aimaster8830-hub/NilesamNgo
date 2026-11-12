
document.addEventListener("DOMContentLoaded", function () {

    const upiId = "8830607996@ybl";
    const payeeName = "Nilesam NGO";

    let selectedAmount = 100;

    const qrContainer = document.getElementById("qrcode");
    const amountText = document.getElementById("selectedAmount");
    const customInput = document.getElementById("customAmount");
    const payButton = document.getElementById("payButton");
    const amountButtons = document.querySelectorAll("[data-amount]");

    // Check HTML elements
    if (!qrContainer || !amountText || !customInput || !payButton) {
        console.error("Payment HTML elements are missing.");
        return;
    }

    // Generate QR Code
    function generateQR(amount) {

        qrContainer.innerHTML = "";

        if (!Number.isFinite(amount) || amount <= 0) {
            selectedAmount = 0;
            amountText.textContent = "Please enter a valid amount.";
            payButton.disabled = true;
            return;
        }

        if (typeof QRCode === "undefined") {
            amountText.textContent = "QR Code library not loaded.";
            payButton.disabled = true;
            console.error("QRCode library is missing.");
            return;
        }

        const upiLink =
            `upi://pay?pa=${encodeURIComponent(upiId)}` +
            `&pn=${encodeURIComponent(payeeName)}` +
            `&am=${amount.toFixed(2)}` +
            `&cu=INR` +
            `&tn=${encodeURIComponent("College Project Demo")}`;

        new QRCode(qrContainer, {
            text: upiLink,
            width: 200,
            height: 200,
            correctLevel: QRCode.CorrectLevel.H
        });

        selectedAmount = amount;

        amountText.textContent =
            `Selected Amount: ₹${amount.toFixed(2)}`;

        payButton.disabled = false;
    }

    // Preset Amount Buttons
    amountButtons.forEach(button => {

        button.addEventListener("click", function () {

            amountButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            this.classList.add("active");

            customInput.value = "";

            const amount = Number(this.dataset.amount);

            generateQR(amount);
        });

    });

    // Custom Amount Input
    customInput.addEventListener("input", function () {

        amountButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        if (this.value.trim() === "") {
            qrContainer.innerHTML = "";
            selectedAmount = 0;
            amountText.textContent = "Enter your donation amount.";
            payButton.disabled = true;
            return;
        }

        const amount = Number(this.value);

        generateQR(amount);

    });

    // Open UPI Payment App
    payButton.addEventListener("click", function () {

        if (!Number.isFinite(selectedAmount) || selectedAmount <= 0) {
            alert("Please select a valid amount.");
            return;
        }

        const upiLink =
            `upi://pay?pa=${encodeURIComponent(upiId)}` +
            `&pn=${encodeURIComponent(payeeName)}` +
            `&am=${selectedAmount.toFixed(2)}` +
            `&cu=INR` +
            `&tn=${encodeURIComponent("College Project Demo")}`;

        window.location.href = upiLink;

    });

    // Initial QR Code
    const defaultButton = document.querySelector('[data-amount="100"]');

    if (defaultButton) {
        defaultButton.classList.add("active");
    }

    generateQR(100);

});
