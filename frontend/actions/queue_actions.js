export const RECEIVE_QUEUE = "RECEIVE_QUEUE";

export const receiveQueue = (queue) => {
  return {
    type: RECEIVE_QUEUE,
    queue
  }
}
