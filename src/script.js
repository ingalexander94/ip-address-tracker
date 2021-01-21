import { sendRequest } from "./api.js";
import { render, state } from "./store.js";

(() => {
  const EXP_REG = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(localhost)$/;
  const $d = document;
  const $form = $d.getElementById("formIp");
  const $input = $d.querySelector("#formIp input");

  const start = async () => {
    state.information = await sendRequest();
    render();
  };

  const resetForm = () => {
    $input.value = "";
    $input.focus();
  };

  $d.addEventListener("DOMContentLoaded", start());

  $form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ip = $input.value.trim();
    if (!RegExp(EXP_REG).test(ip)) {
      resetForm();
      alert("IP is no valid");
      return;
    }
    const data = await sendRequest(ip);
    state.information = data;
    render();
    resetForm();
  });
})();
