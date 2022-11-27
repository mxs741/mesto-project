import {api} from './api.js';
import {profileName, profileDescription, inputName, popupEditForm, editProfileBtn} from './variables.js';

export class UserInfo {
  constructor (name, about, avatar) {
    this._name;
    this._about;
    this._avatar;
  }

  getUserInfo (data) {
    this._name = data.name;
    this._about = data.about;
    this._avatar = data.avatar;
    this._userId = data._id;
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