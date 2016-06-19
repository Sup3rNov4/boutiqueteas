(function(document) {
  'use strict';

  var app = document.querySelector('#app');
  app.firebaseURL = 'https://project-1728811666298556286.firebaseio.com';
  app.firebaseProvider = 'anonymous';

  app.items = [
    {
      done: true,
      text: 'Create Contacts'
    },
    {
      done: false,
      text: 'Use Firebase'
    }
  ];

  app.onFirebaseError = function(event) {
    this.$.errorToast.text = event.detail.message;
    this.$.errorToast.show();
  };
  app.onFirebaseLogin = function(event) {
    this.ref = new Firebase(this.firebaseURL + '/user/' +
                                                  event.detail.user.uid);
  };

  app.onFirebaseLogin = function(event) {
    this.ref = new Firebase(this.firebaseURL + '/user/' +
                                                    event.detail.user.uid);
    this.ref.on('value', function(snapshot) {
      app.updateItems(snapshot);
    });
  };

  app.addItem = function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.ref.push({
      done: false,
      text: app.newItemValue
  });
    app.newItemValue = '';
  };

  app.toggleItem = function(event) {
    this.ref.
      child(event.model.item.uid).
      update({done: event.model.item.done});
  };

  app.deleteItem = function(event) {
    this.ref.child(event.model.item.uid).remove();
  };



})(document);
