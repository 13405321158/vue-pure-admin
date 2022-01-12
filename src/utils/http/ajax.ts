import { sha256 } from "js-sha256";
import { storageSession } from "/@/utils/storage";

class Ajax {
  uid4 = "";
  uid1 = storageSession.getItem("info")?.userid;

  // get方式
  get(url: RequestInfo) {
    const uid3 = new Date().getTime() + "";
    const uid2 = Math.round(Math.random() * 999999) + "";
    if (typeof this.uid1 != "undefined") {
      this.uid4 = sha256(this.uid1 + uid2 + uid3);
    }
    return new Promise((resolve, reject) => {
      fetch(url, {
        headers: {
          uid3: uid3,
          uid2: uid2,
          uid1: this.uid1,
          uid4: this.uid4,
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  // post方式: json 格式传递参数
  post(url: RequestInfo, data: any) {
    const uid3 = new Date().getTime() + "";
    const uid2 = Math.round(Math.random() * 999999) + "";
    return new Promise((resolve, reject) => {
      if (typeof this.uid1 != "undefined") {
        this.uid4 = sha256(this.uid1 + uid2 + uid3);
      }

      fetch(url, {
        method: "POST",
        headers: {
          uid3: uid3,
          uid2: uid2,
          uid1: this.uid1,
          uid4: this.uid4,
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
}
export const http = new Ajax(); //ES6导出
