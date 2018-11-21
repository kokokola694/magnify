export const RECEIVE_INPUT = "RECEIVE_INPUT";

export const receiveInput = (input) => {
  return {
    type: RECEIVE_INPUT,
    input
  }
}
