function Notifier() {}

// Returns "true" if this browser supports notifications.
Notifier.prototype.hasSupport = function() {
  return !!window.webkitNotifications;
}

// Request permission for this page to send notifications. If allowed,
// calls function "cb" with true.
Notifier.prototype.requestPermission = function(cb) {
  window.webkitNotifications.requestPermission(function() {
    cb && cb((new Notifier()).hasPermission());
  });
}

Notifier.prototype.hasPermission = function() {
  return this.hasSupport() && 0 == window.webkitNotifications.checkPermission();
}

// Popup a notification with icon, title, and body. Returns false if
// permission was not granted.
Notifier.prototype.notify = function(icon, title, body) {
  if (this.hasPermission()) {
    var popup = window.webkitNotifications.createNotification(icon, title, body);
    popup.show();
    
    popup.onclick = function(x) {
      window.focus();
      this.cancel();
    };

    setTimeout(function(){
      popup.cancel();
    }, 10000);

    return true;
  }

  return false;
}

var NOTIFIER = new Notifier();