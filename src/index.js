/**
 * Index File, 
 */

const container = setupContainer();
const actionButton = container.getElementsByClassName(COMPONENTS.ActionButtons)[0];
const resultArea = container.getElementsByClassName(COMPONENTS.ResultArea)[0];
let allRecipients = [];
let threadList = [];
let promiseList = [];

InboxSDK.load(2, APP_ID).then(sdk => {
  console.log("sdk", sdk);
  sdk.Conversations.registerThreadViewHandler(threadView => {
    // clear container and reset data
    resetData();
    resetContainer(container);
    actionButton.appendChild(getActionButtons(buttonClickHandler));

    // add sidebar
    threadView.addSidebarContentPanel({
      title: "Message/Thread Data",
      iconUrl: null,
      el: container,
    });

    // List of messages in thread
    const messageViews = threadView.getMessageViewsAll();
    messageViews.forEach(messageView => {
      promiseList.push(messageView.getRecipientsFull());
    });

    Promise.all(promiseList).then(values => {
      threadList = [...values];
      processThreadData(threadList);

      // default set to all  contact visibility.
      buttonClickHandler(BUTTON_TYPE.All);
    });
  });
});

/**
 * Resets all the variables to initial state.
 */
function resetData() {
  allRecipients = [];
  threadList = [];
  promiseList = [];
}

/**
 * This processes thread data
 * ie: removes duplicate emails.
 * @param {*} threadList
 */
function processThreadData(threadList) {
  let recipientSet = new Set([]);
  allRecipients = [];
  threadList.flat().forEach(thread => {
    if (!recipientSet.has(thread.name)) {
      recipientSet.add(thread.name);
      allRecipients.push(thread);
    }
  });
}

/**
 * Handles click actions triggered from action button *
 * @param {*} type This is BUTTON_TYPE
 */
function buttonClickHandler(type) {
  clearChildrens(resultArea);

  switch (type) {
    case BUTTON_TYPE.All:
      resultArea.appendChild(createTable(allRecipients));
      break;
    case BUTTON_TYPE.ThreadView:
      threadList.forEach(thread => {
        resultArea.appendChild(createTable(thread));
      });
      break;
  }
}

/**
 * This resets container
 */
function resetContainer() {
  clearChildrens(actionButton);
  clearChildrens(resultArea);
}
