import {api} from './Api.js';
import {profileName, profileDescription, popupEditForm, editProfileBtn} from '../utils/variables.js';

export class UserInfo {
  constructor () {
    this.name;
    this.about;
    this.avatar;
  }

  getUserInfo (data) {
    this.name = data.name;
    this.about = data.about;
    this.avatar = data.avatar;
    this.userId = data._id;
    return this;
  }

  setUserInfo (inputName, inputDescription) {
    this._inputName = inputName;
    this._inputDescription = inputDescription;
    api.postProfileInfo({
      name: this._inputName,
      about: this._inputDescription
    })
      .then(() => {
        profileName.textContent = this._inputName;
        profileDescription.textContent = this._inputDescription;
        popupEditForm.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        editProfileBtn.textContent = 'Сохранить';
      })
  }
}