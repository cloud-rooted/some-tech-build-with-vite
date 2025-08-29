
  (function () {
    var host = document.currentScript;

    // Root container (fixed at bottom-right)
    var container = document.createElement("div");
    container.setAttribute("aria-hidden","false");
    container.style.cssText = "position:fixed;bottom:22px;right:22px;z-index:2147483647;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial;background:transparent;";

    // Floating circular button (icon)
    var btn = document.createElement("button");
    btn.setAttribute("aria-label","Open support chat");
    btn.style.cssText =
      "width:60px;height:60px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;outline:none;" +
      "background:linear-gradient(135deg,#A259FF 0%,#6C63FF 100%);box-shadow:0 8px 30px rgba(99,84,255,0.18), 0 4px 10px rgba(0,0,0,0.12);" +
      "transition:transform 0.22s ease, box-shadow 0.22s ease;";
    btn.onmouseenter = function () { btn.style.transform = "translateY(-3px) scale(1.02)"; };
    btn.onmouseleave = function () { btn.style.transform = "none"; };

    // SVG chat icon (white)
    btn.innerHTML = ''
      + '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">'
      + '<path d="M12 3C7 3 3 6.58 3 11c0 2.4 1.2 4.58 3.15 6.07L6 21l3.14-1.57A10.95 10.95 0 0 0 12 19c5 0 9-3.58 9-8s-4-8-9-8z" fill="white"/>'
      + '</svg>';

    // Chat window (initially hidden)
    var chat = document.createElement("aside");
    chat.setAttribute("role","dialog");
    chat.setAttribute("aria-label","AI Support Chat");
    chat.style.cssText =
      "width:360px;height:480px;position:absolute;bottom:78px;right:0;border-radius:14px;overflow:hidden;display:none;flex-direction:column;" +
      "background:#fff;box-shadow:0 20px 60px rgba(2,6,23,0.18);font-size:14px;color:#0f172a;";

    // Header (gradient)
    var header = document.createElement("div");
    header.style.cssText = "display:flex;align-items:center;gap:10px;padding:14px 14px;background:linear-gradient(135deg,#A259FF 0%,#6C63FF 100%);color:#fff;";
    header.innerHTML = ''
      + '<div style="width:40px;height:40px;border-radius:10px;background:rgba(255,255,255,0.14);display:flex;align-items:center;justify-content:center;">'
      + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3C7 3 3 6.58 3 11c0 2.4 1.2 4.58 3.15 6.07L6 21l3.14-1.57A10.95 10.95 0 0 0 12 19c5 0 9-3.58 9-8s-4-8-9-8z" fill="white"/></svg>'
      + '</div>'
      + '<div style="flex:1;font-weight:700;">AI Support</div>'
      + '<button aria-label="Close chat" style="background:transparent;border:none;color:rgba(255,255,255,0.95);font-weight:600;cursor:pointer;padding:6px 8px;border-radius:8px;outline:none;">✕</button>';

    // Messages area
    var messagesWrap = document.createElement("div");
    messagesWrap.style.cssText = "flex:1;padding:16px;overflow:auto;background:linear-gradient(180deg,#fbfbfd,#fafafa);display:flex;flex-direction:column;gap:10px;";

    // Initial bot message
    var welcome = document.createElement("div");
    welcome.style.cssText = "align-self:flex-start;max-width:78%;background:#0f172a;color:#fff;padding:10px 12px;border-radius:12px;border:1px solid rgba(15,23,42,0.06);box-shadow:0 6px 18px rgba(12,18,33,0.06);";
    welcome.textContent = "Hi 👋 I’m your AI assistant. How can I help today?";
    messagesWrap.appendChild(welcome);

    // Footer (input area)
    var footer = document.createElement("div");
    footer.style.cssText = "padding:12px;border-top:1px solid rgba(15,23,42,0.04);display:flex;gap:8px;align-items:center;background:#fff;";
    footer.innerHTML = ''
      + '<input aria-label="Type a message" id="chat-input" type="text" placeholder="Type a message..." '
      + 'style="flex:1;padding:10px 12px;border-radius:10px;border:1px solid rgba(15,23,42,0.06);outline:none;font-size:14px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.6);">'
      + '<button id="chat-send" aria-label="Send message" style="padding:10px 14px;border-radius:10px;border:none;cursor:pointer;font-weight:700;background:linear-gradient(135deg,#A259FF 0%,#6C63FF 100%);color:#fff;">Send</button>';

    // Assemble
    chat.appendChild(header);
    chat.appendChild(messagesWrap);
    chat.appendChild(footer);
    container.appendChild(btn);
    container.appendChild(chat);
    host.parentNode.insertBefore(container, host);

    // Elements references
    var chatVisible = false;
    var closeBtn = header.querySelector("button");
    var input = footer.querySelector("#chat-input");
    var sendBtn = footer.querySelector("#chat-send");
    var messages = messagesWrap;

    // Toggle display with a small slide animation
    function showChat() {
      chat.style.display = "flex";
      chat.style.opacity = "0";
      chat.style.transform = "translateY(12px) scale(0.995)";
      setTimeout(function () {
        chat.style.transition = "opacity 220ms ease, transform 220ms ease";
        chat.style.opacity = "1";
        chat.style.transform = "translateY(0) scale(1)";
      }, 10);
      chatVisible = true;
      btn.setAttribute("aria-pressed","true");
      input.focus();
    }
    function hideChat() {
      chat.style.transition = "opacity 160ms ease, transform 160ms ease";
      chat.style.opacity = "0";
      chat.style.transform = "translateY(12px) scale(0.995)";
      setTimeout(function () { chat.style.display = "none"; }, 200);
      chatVisible = false;
      btn.setAttribute("aria-pressed","false");
    }

    // Toggle click
    btn.onclick = function () { if (chatVisible) hideChat(); else showChat(); };

    // Close via header button
    closeBtn.onclick = hideChat;

    // Simple message add helper
    function addMessage(text, fromUser) {
      var b = document.createElement("div");
      b.style.cssText = "max-width:78%;padding:10px 12px;border-radius:12px;font-size:14px;line-height:1.35;box-shadow:0 6px 18px rgba(12,18,33,0.06);";
      if (fromUser) {
        b.style.marginLeft = "auto";
        b.style.background = "#f3f4f6";
        b.style.color = "#0f172a";
        b.style.borderRadius = "12px 12px 10px 12px";
      } else {
        b.style.background = "#0f172a";
        b.style.color = "#fff";
        b.style.borderRadius = "12px 12px 12px 10px";
      }
      b.textContent = text;
      messages.appendChild(b);
      messages.scrollTop = messages.scrollHeight + 100;
    }

    // Send action (dummy response)
    function send() {
      var val = input.value.trim();
      if (!val) return;
      addMessage(val, true);
      input.value = "";
      // Simulate typing / response
      setTimeout(function () {
        addMessage("🤖 (demo) I heard: \"" + val + "\" — this is a dummy reply. Replace with your AI integration.", false);
      }, 520);
    }

    // Events
    sendBtn.onclick = send;
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") send();
    });

    // Accessibility: close chat with Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && chatVisible) hideChat();
    });

    // Optional: show a subtle pulse to attract attention after a short delay
    setTimeout(function () {
      btn.style.boxShadow = "0 14px 40px rgba(99,84,255,0.18), 0 6px 20px rgba(99,84,255,0.10)";
      btn.style.transition = "box-shadow 600ms ease";
      setTimeout(function () { btn.style.boxShadow = "0 8px 30px rgba(99,84,255,0.18), 0 4px 10px rgba(0,0,0,0.12)"; }, 1600);
    }, 1200);

    // Expose a small API (optional)
    container.openChat = showChat;
    container.closeChat = hideChat;
    window.__premiumChatWidget = container;

  })();
  
  