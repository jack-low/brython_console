(function(IFrameApplicationWindow, Application, Window, GUI, Dialogs, Utils, API, VFS) {


  /////////////////////////////////////////////////////////////////////////////
  // WINDOWS
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Main Window Constructor
   */
  var ApplicationPythonWindow = function(app, metadata) {
    var src = API.getApplicationResource(app, 'app/index.html');

    IFrameApplicationWindow.apply(this, ['ApplicationPythonWindow', {
      src: src,
      focus: function(frame, win) {
        win.postMessage('resume', window.location.href);
      },
      blur: function(frame, win) {
        win.postMessage('pause', window.location.href);
      },
      icon: metadata.icon,
      title: metadata.name,
      width: 630,
      height: 375,
      allow_resise: false,
      allow_restore: false,
      allow_maximize: false
    }, app]);
  };

  ApplicationPythonWindow.prototype = Object.create(IFrameApplicationWindow.prototype);

  /////////////////////////////////////////////////////////////////////////////
  // APPLICATION
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Application constructor
   */
  var ApplicationPython = function(args, metadata) {
    Application.apply(this, ['ApplicationPython', args, metadata]);
  };

  ApplicationPython.prototype = Object.create(Application.prototype);

  ApplicationPython.prototype.init = function(settings, metadata, onInited) {
    Application.prototype.init.apply(this, arguments);
    this._addWindow(new ApplicationPythonWindow(this, metadata));
    onInited();
  };

  //
  // EXPORTS
  //
  OSjs.Applications = OSjs.Applications || {};
  OSjs.Applications.ApplicationPython = OSjs.Applications.ApplicationPython || {};
  OSjs.Applications.ApplicationPython.Class = ApplicationPython;

})(OSjs.Helpers.IFrameApplicationWindow, OSjs.Core.Application, OSjs.Core.Window, OSjs.GUI, OSjs.Dialogs, OSjs.Utils, OSjs.API, OSjs.VFS);
