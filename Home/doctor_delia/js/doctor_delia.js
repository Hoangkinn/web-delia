const contentContainer = document.querySelector(".doctor_delia__content");
const detailContainer = document.querySelector(".doctor_delia__detail");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");

function displayDoctor(doctor) {
  contentContainer.querySelector(".doctor_delia__pic img").src =
    doctor.image;
  contentContainer.querySelector(".doctor_delia__level").textContent =
    doctor.level;
  contentContainer.querySelector(".doctor_delia__name").textContent =
    doctor.name;
  contentContainer.querySelector(".doctor_delia__position").textContent =
    doctor.position;
  contentContainer.querySelector(".doctor_delia__note").innerHTML =
    doctor.note;
}

function displayDoctorPopup(doctor) {
  popup.querySelector(".doctor_delia__pic img").src =
    doctor.image;
  popup.querySelector(".doctor_delia__level").textContent = doctor.level;
  popup.querySelector(".doctor_delia__name").textContent = doctor.name;
  popup.querySelector(".doctor_delia__position").textContent =
    doctor.position;
  popup.querySelector(".doctor_delia__note").innerHTML = doctor.note;
}

doctors.forEach((doctor, index) => {
  const item = document.createElement("div");
  item.classList.add("doctor_delia__item");
  const img = document.createElement("div");
  img.classList.add("doctor_delia__img");
  img.innerHTML = `<img src="${doctor.image}" alt="">`;
  const text = document.createElement("div");
  text.classList.add("doctor_delia__text");
  text.innerHTML = `
<div class="doctor_delia__level">${doctor.level}</div>
<div class="doctor_delia__name">${doctor.name}</div>
<div class="doctor_delia__position">${doctor.position}</div>
`;
  const icon = document.createElement("div");
  icon.classList.add("doctor_delia__icon");
  icon.innerHTML = `<img src="./images/icon.png" alt="" loading="lazy">`;
  item.appendChild(img);
  item.appendChild(text);
  item.appendChild(icon);
  detailContainer.appendChild(item);

  item.addEventListener("click", () => {
    displayDoctor(doctor);
    popup.classList.add("show");
    overlay.classList.add("show");
    displayDoctorPopup(doctor);
  });

  if (index === 0) {
    displayDoctor(doctor);
  }
});

overlay.addEventListener("click", () => {
  popup.classList.remove("show");
  overlay.classList.remove("show");
});

const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", () => {
  popup.classList.remove("show");
  overlay.classList.remove("show");
});
