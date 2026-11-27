/* Booking form: collects the data from index.html and emails it via FormSubmit */

const MAIL_ENDPOINT = "https://formsubmit.co/ajax/tovmasyannarek008@gmail.com";

const bookingForm = document.getElementById("booking-form");

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  if (form.company.value) return; // spam trap

  const btn = document.getElementById("form-submit-btn");
  const success = document.getElementById("form-success");
  const error = document.getElementById("form-error");
  success.classList.remove("show");
  error.classList.remove("show");

  btn.disabled = true;
  btn.classList.add("loading");

  try {
    const res = await fetch(MAIL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        _subject: "Նոր հայտ՝ " + form.name.value.trim(),
        _template: "table",
        _captcha: "false",
        "Անուն": form.name.value.trim(),
        "Հեռախոս": form.phone.value.trim(),
        "Ծառայություն": form.service.selectedOptions[0].textContent.trim(),
        "Ամսաթիվ": form.date.value,
        "Նշումներ": form.notes.value.trim()
      })
    });

    const result = await res.json().catch(() => ({}));
    if (!res.ok || result.success === "false" || result.success === false) {
      throw new Error(result.message || "Request failed");
    }

    success.classList.add("show");
    form.reset();
  } catch (err) {
    console.error("Booking error:", err);
    error.classList.add("show");
  } finally {
    btn.disabled = false;
    btn.classList.remove("loading");
  }
});
