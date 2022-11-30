export class UserInfo {
  constructor (nameSelector, aboutSelector, avatarSelector) {
    this.nameSelector = document.querySelector(nameSelector);
    this.aboutSelector = document.querySelector(aboutSelector);
    this.avatarSelector = document.querySelector(avatarSelector);
  };

  getUserInfo () {
    this.name = this.nameSelector.textContent;
    this.about = this.aboutSelector.textContent;
    this.avatar = this.avatarSelector.src;
    return this;
  };

  setUserInfo ({name, about, avatar, _id}) {
    if (name) this.nameSelector.textContent = name;
    if (about) this.aboutSelector.textContent = about;
    if (avatar) this.avatarSelector.src = avatar;
    if (_id) this.myId = _id;
  };
};