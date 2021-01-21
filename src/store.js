const $d = document;

const state = {
  information: [],
};

const template = () => {
  const cards = state.information
    .map(
      (info, i, a) => `
    <div class="info-value">
              <h3>${info.title}</h3>
              <h2 id="ip-address">${info.value}</h2>
            </div>
            ${i < a.length - 1 ? '<div class="separator"></div>' : ""}
    `
    )
    .join("");
  return cards;
};

const render = () => {
  const $list = $d.getElementById("card-list");
  $list.innerHTML = template();
};

export { render, state };
