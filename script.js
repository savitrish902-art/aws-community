/* -----------------------------
   SESSION FILTER
----------------------------- */

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".session-card");

filters.forEach(filter => {

  filter.addEventListener("click", () => {

    filters.forEach(item => {
      item.classList.remove("active");
    });

    filter.classList.add("active");

    const category = filter.dataset.filter;

    cards.forEach(card => {

      if(
        category === "all" ||
        card.dataset.category === category
      ){
        card.style.display = "flex";
      }
      else{
        card.style.display = "none";
      }

    });

  });

});


/* -----------------------------
   SEARCH
----------------------------- */

const searchInput =
  document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

  const search =
    searchInput.value.toLowerCase();

  cards.forEach(card => {

    const text =
      card.innerText.toLowerCase();

    if(text.includes(search)){
      card.style.display = "flex";
    }
    else{
      card.style.display = "none";
    }

  });

});


/* -----------------------------
   MY DAY
----------------------------- */

let selectedSessions = [];

function addToDay(button){

  const card =
    button.closest(".session-card");

  const title =
    card.querySelector("h3").innerText;

  const time =
    card.querySelector(".card-top span:last-child").innerText;

  const alreadyAdded =
    selectedSessions.some(
      session => session.title === title
    );

  if(alreadyAdded){

    selectedSessions =
      selectedSessions.filter(
        session => session.title !== title
      );

    button.classList.remove("added");
    button.innerHTML = "＋ Add to My Day";

    showToast("Removed from your day");

  }
  else{

    selectedSessions.push({
      title:title,
      time:time
    });

    button.classList.add("added");
    button.innerHTML = "✓ Added to My Day";

    showToast("✓ Added to your day!");

  }

  updateMyDay();

}


function updateMyDay(){

  const list =
    document.getElementById("myDayList");

  const count =
    document.getElementById("count");

  count.innerText =
    `${selectedSessions.length} session${selectedSessions.length === 1 ? "" : "s"}`;

  if(selectedSessions.length === 0){

    list.innerHTML = `
      <div class="empty-day">
        ✦
        <br>
        Add a session to start building your day.
      </div>
    `;

    return;
  }

  list.innerHTML = "";

  selectedSessions.forEach(session => {

    const item =
      document.createElement("div");

    item.className = "day-item";

    item.innerHTML = `
      <strong>${session.title}</strong>
      <small>${session.time}</small>
    `;

    list.appendChild(item);

  });

}


/* -----------------------------
   TOAST
----------------------------- */

function showToast(message){

  const toast =
    document.getElementById("toast");

  toast.innerText = message;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    },2200);

}


/* -----------------------------
   REGISTRATION MODAL
----------------------------- */

function openModal(){

  document
    .getElementById("modal")
    .classList.add("show");

}


function closeModal(){

  document
    .getElementById("modal")
    .classList.remove("show");

}


const modal =
  document.getElementById("modal");

modal.addEventListener("click", event => {

  if(event.target === modal){

    closeModal();

  }

});


/* -----------------------------
   REGISTRATION
----------------------------- */

const form =
  document.getElementById("registerForm");

form.addEventListener("submit", event => {

  event.preventDefault();

  closeModal();

  showToast(
    "🎉 You're in! See you at Student Day."
  );

  form.reset();

});


/* -----------------------------
   JOURNEY INTERACTION
----------------------------- */

const journeySteps =
  document.querySelectorAll(".journey-step");

journeySteps.forEach(step => {

  step.addEventListener("click", () => {

    journeySteps.forEach(item => {
      item.classList.remove("active");
    });

    step.classList.add("active");

  });

});


/* -----------------------------
   SCROLL REVEAL
----------------------------- */

const revealElements =
  document.querySelectorAll(
    ".session-card, .speaker-card, .journey-step, .timeline-card"
  );

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          entry.target.style.opacity = "1";
          entry.target.style.transform =
            "translateY(0)";

        }

      });

    },
    {
      threshold:.12
    }
  );


revealElements.forEach(element => {

  element.style.opacity = "0";
  element.style.transform =
    "translateY(20px)";

  element.style.transition =
    "opacity .6s ease, transform .6s ease";

  observer.observe(element);

});
