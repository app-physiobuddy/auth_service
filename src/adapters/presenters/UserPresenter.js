class UserPresenter {
  present(users) {
    const n_users = users.length;  
    let message = users.map(element => `User '${element.name}'`).join(" // ");  // Correctly map and join names into a string
    
    let end = `We have ${n_users} users registered in the app: ${message}`;

    return end;  
  }
}



module.exports = { UserPresenter };
