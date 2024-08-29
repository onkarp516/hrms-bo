class Queue {
  constructor() {
    this._items = [];
  }
  enqueue(item) {
    this._items.push(item);
  }
  dequeue() {
    return this._items.shift();
  }
  get size() {
    return this._items.length;
  }
}

class AutoQueue extends Queue {
  constructor() {
    super();
    this._pendingPromise = false;
  }

  enqueue(action) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        super.enqueue({ action, resolve, reject });
        this.dequeue();
      }, 2000);
    });
  }

  async dequeue() {
    if (this._pendingPromise) return false;

    let item = super.dequeue();

    if (!item) return false;

    try {
      this._pendingPromise = true;
      let payload = await item.action(this);

      this._pendingPromise = false;
      item.resolve(payload);
    } catch (e) {
      console.log("error", e);
      this._pendingPromise = false;
      item.reject(e);
    } finally {
      this.dequeue();
    }

    return true;
  }
}

// Helper function for 'fake' tasks
// Returned Promise is wrapped! (tasks should not run right after initialization)
let handleEnQueue =
  ({ reqData, callfn, handleFn, ...foo } = {}) =>
  () => {
    return new Promise(async (resolve) => {
      // console.log("handleEnQueue", { reqData, callfn, handleFn });
      let pre = null;
      if (reqData) {
        pre = await callfn(reqData);
      } else {
        pre = await callfn();
      }
      // console.log(pre);
      handleFn(pre);
      resolve(foo);
    });
  };

const aQueue = new AutoQueue();

const SyncAPICall = ({ handleFn, callfn, reqData }) => {
  // console.log("handleFn", { handleFn, callfn, reqData });
  if (reqData) {
    // console.log("IF handleFn", { handleFn, callfn, reqData });
    aQueue.enqueue(
      handleEnQueue({
        handleFn: handleFn,
        callfn: callfn,
        reqData: reqData,
      })
    );
  } else {
    // console.log("else handleFn", { handleFn, callfn, reqData });
    aQueue.enqueue(
      handleEnQueue({
        handleFn: handleFn,
        callfn: callfn,
      })
    );
  }
};

export { SyncAPICall };
