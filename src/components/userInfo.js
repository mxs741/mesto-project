export class UserInfo {
  constructor (postProfileInfo) {
    this.name;
    this.about;
    this.avatar;
    this._postProfileInfo = postProfileInfo;
  }

  getUserInfo (data) {
    this.name = data.name;
    this.about = data.about;
    this.avatar = data.avatar;
    this.userId = data._id;
    return this;
  }

  setUserInfo () {
    this._postProfileInfo()
  }
}