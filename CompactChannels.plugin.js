/**
 * @name CompactChannels
 * @author Hugo Setyadji
 * @description Collapsable channel view with hover expansion.
 *  \nAdds CSS to hide overlapping elements in the sidebar.
 *  \nToggleable with Ctrl+L
 * @version 0.1.0
 * @website https://github.com/setyadjih
 */

function collapseSidebar() {
  var Sidebar = document.getElementsByClassName("sidebar-2K8pFh")[0];

  Sidebar.style.width = "57px";
  var ChannelDrop = document.getElementsByClassName("button-1w5pas")[0];
  if (ChannelDrop) {
    ChannelDrop.style.display = "none";
  }

  var ChannelWidgets = document.getElementsByClassName("children-3rEycc");
  if (ChannelWidgets) {
    for (let widget of ChannelWidgets) {
      widget.style.opacity = "0";
    }
  }

  var addChannel = document.getElementsByClassName("children-L002ao");
  if (addChannel) {
    for (let button of addChannel) {
      button.style.display = "none";
    }
  }
}

module.exports = class CompactChannelsPlugin {
  constructor() {
    this.toggleSidebarLock = (event) => {
      if (event.key == "l" && event.ctrlKey) {
        document.sidebarLocked = !document.sidebarLocked;
        var lock = document.sidebarLocked;

        var msg = lock ? "locked" : "unlocked";
        var msgType = lock ? "info" : "";
        BdApi.showToast("Sidebar " + msg, {
          timeout: 700,
          type: msgType,
          icon: false,
        });
        if (!lock) {
          collapseSidebar();
        }
        return;
      }
    };
  }

  GetName() {
    return "CompactChannels";
  }

  start() {
    // Get Elements
    var Sidebar = document.getElementsByClassName("sidebar-2K8pFh")[0];
    document.sidebarLocked = false;

    Sidebar.style.transition = "width 0.1s";

    BdApi.injectCSS(
      this.GetName(),
      `
        .children-3rEycc 
        {
            transition: opacity .5s;
        }
        `
    );
    document.addEventListener("keydown", this.toggleSidebarLock, false);

    Sidebar.onmouseout = function () {
      if (document.sidebarLocked) {
        return;
      }

      collapseSidebar();
    };

    Sidebar.onmouseover = function () {
      if (document.sidebarLocked) {
        return;
      }

      Sidebar.style.width = "240px";

      var ChannelName = document.getElementsByClassName("button-1w5pas")[0];
      if (ChannelName) {
        ChannelName.style.display = "block";
      }

      var ChannelWidgets = document.getElementsByClassName("children-3rEycc");
      if (ChannelWidgets) {
        for (let widget of ChannelWidgets) {
          widget.style.opacity = "1";
        }
      }

      var addChannel = document.getElementsByClassName("children-L002ao");
      if (addChannel) {
        for (let button of addChannel) {
          button.style.display = "flex";
        }
      }
    };
  }

  onSwitch() {
    if (document.sidebarLocked) {
      return;
    }

    var ChannelDrop = document.getElementsByClassName("button-1w5pas")[0];
    if (ChannelDrop) {
      ChannelDrop.style.display = "none";
    }

    var ChannelWidgets = document.getElementsByClassName("children-3rEycc");
    if (ChannelWidgets) {
      for (let widget of ChannelWidgets) {
        widget.style.opacity = "0";
      }
    }
  }

  stop() {
    var Sidebar = document.getElementsByClassName("sidebar-2K8pFh")[0];
    Sidebar.style.width = "240px";

    document.removeEventListener("keydown", this.toggleSidebarLock);

    var ChannelName = document.getElementsByClassName("button-1w5pas")[0];
    if (ChannelName) {
      ChannelName.style.display = "block";
    }

    var ChannelWidgets = document.getElementsByClassName("children-3rEycc");
    for (let widget of ChannelWidgets) {
      widget.style.opacity = "1";
    }
  }
};
