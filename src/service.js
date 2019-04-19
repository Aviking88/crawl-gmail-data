/**
 * This method setups sidebar container.
 * @returns HTMLElement
 * @param {*} params
 */
function setupContainer() {
  const containerBody = createElement({
    elementType: "div",
    elementId: COMPONENTS.Container,
    elementStyles: `
    display:flex;
    flex-flow: column;
    margin: 0 20px;
    box-shadow: 0px 0px 8px #ADADAD;
    padding: 20px;
    height: auto;
  `,
  });

  containerBody.innerHTML = "<h1>Message View</h1>";

  // Action Buttons
  containerBody.appendChild(createElement({ elementType: "div", elementClass: COMPONENTS.ActionButtons }));

  // Result Area
  containerBody.appendChild(createElement({ elementType: "div", elementClass: COMPONENTS.ResultArea }));
  return containerBody;
}

/**
 * Returnes table form of passed data
 *
 * @param {*} data
 * @returns Table(HTMLElement)
 */
function createTable(data) {
  const table = createElement({ elementType: "table", elementStyles: `width:100%; border:1px solid black; margin-top: 20px` });

  // Set table header
  let keys = Object.keys(data[0]);
  const header = table.createTHead();
  const row = header.insertRow(0);
  let rowNumber = 0;
  keys.forEach(key => {
    const cell = row.insertCell(rowNumber++);
    cell.innerHTML = `<b>${key}</b>`;
  });

  // insert rows,
  rowNumber = 1;
  data.forEach(item => {
    const row = table.insertRow(rowNumber++);

    let keyIdx = 0;
    Object.keys(item).forEach(j => {
      const cell = row.insertCell(keyIdx++);
      cell.innerHTML = item[j];
    });
  });

  return table;
}

/**
 * Returns action button that includes four buttons (ALL, CC, BCC, TO)
 * @param {*} ActionHandler ActionHandler is function that binded to onClick event.
 * @returns HTMLDivElement
 */
function getActionButtons(ActionHandler) {
  /** Action Button container   */
  const buttonsContainer = createElement({
    elementType: "div",
    elementId: "btn-container",
    elementStyles: `
  display:flex;
  flex-flow: row;
  justify-content: space-between;
  `,
  });

  // Button for All
  const all = createElement({
    elementType: "button",
    elementClass: BUTTON_CLASSES.ButtonAll,
    elementStyles: `background-color: #6dab3cc2`,
  });
  all.appendChild(document.createTextNode(BUTTON_TYPE.All));
  all.addEventListener("click", () => ActionHandler(BUTTON_TYPE.All));
  buttonsContainer.appendChild(all);

  // Button for ThreadWise
  const cc = createElement({
    elementType: "button",
    elementClass: BUTTON_CLASSES.ButtonThreadView,
    elementStyles: `background-color: #6dab3cc2`,
  });
  cc.appendChild(document.createTextNode("Threadwise"));
  cc.addEventListener("click", () => ActionHandler(BUTTON_TYPE.ThreadView));
  buttonsContainer.appendChild(cc);

  return buttonsContainer;
}

/**
 * Creates element based on provided parameters
 *
 * @param {*} { elementType = "div", elementId = "", elementClass = "", elementStyles = "" }
 * @returns HTMLElement
 */
function createElement({ elementType = "div", elementId = "", elementClass = "", elementStyles = "" }) {
  const elm = document.createElement(elementType);
  elm.setAttribute("id", elementId);
  elm.setAttribute("class", elementClass);
  elm.setAttribute("style", elementStyles);
  return elm;
}

/**
 *This method clears all the childs from passed parent
 *
 * @param {*} parent  provide container that
 */
function clearChildrens(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
