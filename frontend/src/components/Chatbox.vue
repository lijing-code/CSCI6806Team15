<template>
  <div id="chatbox-container"></div>
</template>

<script>
export default {
  name: "Chatbox",
  mounted() {
    // Configuring Chatbox Settings --- Jiawen Li 111124
    window.embeddedChatbotConfig = {
      chatbotId: "",
      domain: "www.chatbase.co"
    };

    // Dynamically inserting scripts for Chatbox --- Jiawen Li 111124
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    
    // Checks to see if the script already exists, preventing duplicate loads --- Jiawen Li 111124
    if (!document.querySelector(`script[src="${script.src}"]`)) {
      document.body.appendChild(script);
    }
  }
};
</script>