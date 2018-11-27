export const RECEIVE_SAVE = "RECEIVE_SAVE";
export const REMOVE_SAVE = "REMOVE_SAVE";

import * as SaveApi from '../util/save_api_util';

export const createSave = (saveInfo) => dispatch => {
  return SaveApi.createSave(saveInfo)
  .then((save) => dispatch(receiveSave(save)))
}

export const deleteSave = (saveInfo) => dispatch => {
  return SaveApi.deleteSave(saveInfo)
  .then((save) => dispatch(removeSave(save)))
}

const receiveSave = (save) => {
  return {
    type: RECEIVE_SAVE,
    savableId: save.savable_id,
    savableType: save.savable_type,
    saverId: save.saver_id
  }
}

const removeSave = (save) => {
  return {
    type: REMOVE_SAVE,
    savableId: save.savable_id,
    savableType: save.savable_type,
    saverId: save.saver_id
  }
}
