/**
 * Index File, 
 */

const container = setupContainer();
const actionButton = container.getElementsByClassName(COMPONENTS.ActionButtons)[0];
const ResultArea = container.getElementsByClassName(COMPONENTS.ResultArea)[0];
let allRecipients = [];
let threadList = [];
let promiseList = [];

InboxSDK.load(2, APP_ID).then(sdk => {
  console.log("sdk", sdk);
  sdk.Conversations.registerThreadViewHandler(threadView => {
    //clear container
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
      console.log(values);
      threadList = [...values];
      processThreadData(threadList);

      // default set to all  contact visibility.
      buttonClickHandler(BUTTON_TYPE.All);
    });
  });
});

function resetData() {
  allRecipients = [];
  threadList = [];
  promiseList = [];
}

function processThreadData(threadList) {
  let i = 1;
  let recipientSet = new Set([]);
  let allRecpt = [];
  threadList.flat().forEach(thread => {
    if (!recipientSet.has(thread.name)) {
      recipientSet.add(thread.name);
      allRecpt.push(thread);
    }
  });
  allRecipients = allRecpt;
}

function buttonClickHandler(type) {
  let element = container.getElementsByClassName(COMPONENTS.ResultArea)[0];
  clearChildrens(element);

  switch (type) {
    case BUTTON_TYPE.All:
      element.appendChild(createTable(allRecipients));
      break;
    case BUTTON_TYPE.ThreadView:
      threadList.forEach(thread => {
        element.appendChild(createTable(thread));
      });
      break;
  }
}

function resetContainer() {
  clearChildrens(actionButton);
  clearChildrens(ResultArea);
}
