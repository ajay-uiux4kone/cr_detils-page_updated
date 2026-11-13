const workForm = document.getElementById("work-form");
const workLink = document.getElementById("work-link");

workForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const valid = workLink.value.trim() !== "" && workLink.checkValidity();
  workLink.classList.toggle("invalid", !valid);
  workLink.setAttribute("aria-invalid", String(!valid));
  if (!valid) workLink.focus();
});

workLink.addEventListener("input", () => workLink.classList.remove("invalid"));

// Clear button: keep focus in the field (mousedown) and empty it on click
const workLinkClear = document.getElementById("work-link-clear");
workLinkClear.addEventListener("mousedown", (event) => event.preventDefault());
workLinkClear.addEventListener("click", () => {
  workLink.value = "";
  workLink.classList.remove("invalid");
  workLink.removeAttribute("aria-invalid");
  workLink.focus();
});

const commentForm = document.getElementById("comment-form");
const comment = document.getElementById("comment");
const thread = document.getElementById("thread");

comment.addEventListener("input", () => {
  commentForm.classList.remove("is-error");
  comment.removeAttribute("aria-invalid");
});

commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = comment.value.trim();
  if (!text) {
    // error state: empty comment
    commentForm.classList.add("is-error");
    comment.setAttribute("aria-invalid", "true");
    comment.focus();
    return;
  }
  commentForm.classList.remove("is-error");
  comment.removeAttribute("aria-invalid");

  const row = document.createElement("div");
  row.className = "bubble-row";
  const bubble = document.createElement("div");
  bubble.className = "bubble bubble-in";
  const body = document.createElement("div");
  body.className = "bubble-text";
  const span = document.createElement("span");
  span.textContent = text; // textContent avoids HTML injection
  body.appendChild(span);
  bubble.appendChild(body);
  row.appendChild(bubble);
  thread.appendChild(row);
  comment.value = "";
});
