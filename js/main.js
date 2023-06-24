// Vaqtni htmlga chiqarish
let text_do = document.querySelector(".text_do");
let time_html = document.querySelector(".time-block span");
let container = document.querySelector('.container')
setInterval(() => {
  let live_data = new Date();
  time_html.innerHTML = `${live_data.getFullYear()}.${
    live_data.getMonth() + 1 >= 9
      ? live_data.getMonth(1) + 1
      : "0" + Number(live_data.getMonth() + 1)
  }.${
    live_data.getDate() >= 9 ? live_data.getDate() : "0" + live_data.getDate()
  } <br> ${
    live_data.getHours() >= 9
      ? live_data.getHours()
      : "0" + live_data.getHours()
  }:${
    live_data.getMinutes() >= 9
      ? live_data.getMinutes()
      : "0" + live_data.getMinutes()
  }:${
    live_data.getSeconds() >= 9
      ? live_data.getSeconds()
      : "0" + live_data.getSeconds()
  }`;
}, 1000);
// localstoragedan malumotlarni joylash
let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];
function local_up() {
  localStorage.setItem("list", JSON.stringify(todos));
}
// localstoragedan malumotlarni olish
function list_html() {
  let todos = JSON.parse(localStorage.getItem("list"));
  text_do.innerHTML = "";
  todos.forEach((element, index) => {
    text_do.innerHTML += `
            <div id="Delete_block${index}" class="text-child alert alert-primary d-flex justify-content-between" ondblclick="text_child(this)">
            <p class="text_data m-1">
            ${element.Text}
            </p>
            <div class="img-icon d-flex justify-content-between align-items-center">
            <p class="time-child m-2 opacity-50">
                ${element.Time}
                </p>
                <img onclick="editActive(${index})" src="img/edit.svg" class="m-4"  alt="">
                <img onclick="deleteActive(${index})" src="img/delete.svg" alt="">
                </div>
                </div>
                `;
  });
}
if (todos.length) list_html();
// inputni tekshirish bloki
function test_input(form_control, danger_text) {
  document.querySelector(danger_text).innerHTML = `Enter a word...`;
  document.querySelector(form_control).classList.add("border-danger");
  setTimeout(() => {
    document.querySelector(danger_text).innerHTML = ``;
    document.querySelector(form_control).classList.remove("border-danger");
  }, 2000);
}
// inputdan malumotlarni olish
let form_add = document.querySelector(".form-add");
form_add.addEventListener("submit", (e, index) => {
  let in_value = e.target.querySelector("input").value.trim();
  e.preventDefault();

  if (in_value) {
    text_do.innerHTML = "";
    let live_data = new Date();
    let time_sec = `${live_data.getHours()}:${live_data.getMinutes()}:${live_data.getSeconds()}`;
    text_do.innerHTML += `
    <div class="text-child alert alert-primary d-flex justify-content-between" ondblclick="text_child(this)">
    <p class="text_data m-1">
    ${in_value}
    </p>
    <div class="img-icon d-flex justify-content-between align-items-center">
    <p class="time-child m-2">
        ${time_sec}
        </p>
        <img onclick="editActive(${index})" src="img/edit.svg" class="m-4"  alt="">
        <img onclick="deleteActive(${index})" src="img/delete.svg" alt="">
        </div>
        </div>
        `;
    todos.push({ Text: in_value, Time: time_sec, complated: false });
    local_up();
    if (todos.length) list_html();
  } else {
    test_input(".form-control", ".danger-text");
  }
  form_add.reset();
});
// modal input test
function editActive(index) {
  let text_data = document
    .querySelector("#Delete_block" + index)
    .querySelector(".text_data")
    .innerHTML.trim();
  let modal = document.querySelector(".modal");
  modal.querySelector("#exampleFormControlInput2").value = text_data;
  modal.classList.add("d-flex");
  container.classList.add('opacity-25')
  document.querySelector(".form_edit").addEventListener("submit", (e) => {
    let modal_control = document.querySelector(".edit_input").value.trim();
    e.preventDefault();
    container.classList.remove("opacity-25");
    if (modal_control) {
      let live_data = new Date();
      todos[index].Text = modal_control;
      local_up();
      list_html();
      modal_close();
    } else {
      test_input(".modal-control", ".danger-text-modal");
    }
  });
}
// DeleteActive click delete
function deleteActive(index) {
  const deleteTodos = todos.filter((item, i) => {
    return i !== index;
  });
  todos = deleteTodos;
  local_up();
  list_html();
}
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 8) {
    modal_close();
  }
});
function modal_close(e) {
  document.querySelector(".modal").classList.remove("d-flex");
  container.classList.remove("opacity-25");
}
// Child block 2 marta bosilganda belgilash
function text_child(i) {
  i.classList.toggle("opacity_child");
}