import React, { useEffect, useMemo, useRef, useState } from "react";
import "../assets/css/ChatBot.css";

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || "http://localhost:8787/api/chat";
const URL_PATTERN = /(https?:\/\/[^\s]+)/g;
const PHONE_PATTERN = /(\+91\s?\d{5}\s?\d{5})/g;
const EMAIL_PATTERN = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;

const quickActions = [
  { label: "Courses", type: "send_message", message: "What courses do you offer?" },
  { label: "Internship", type: "send_message", message: "What internships do you offer?" },
  { label: "WhatsApp", type: "open_url", url: "https://wa.me/918925450473" },
  { label: "Maps", type: "send_message", message: "Open company location on Google Maps" },
];

const helperPrompts = [
  "I'm here to help",
  "Need support?",
  "Ask me anything",
  "Courses, internships, services",
];

const renderMessageContent = (content) => {
  const tokenPattern = /(https?:\/\/[^\s]+)|(\+91\s?\d{5}\s?\d{5})|([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;

  return content.split(tokenPattern).filter(Boolean).map((part, index) => {
    if (part.match(URL_PATTERN)) {
      return (
        <a href={part} target="_blank" rel="noreferrer" key={`${part}-${index}`}>
          {part}
        </a>
      );
    }

    if (part.match(PHONE_PATTERN)) {
      const tel = part.replace(/\s/g, "");
      return (
        <a href={`tel:${tel}`} key={`${part}-${index}`}>
          {part}
        </a>
      );
    }

    if (part.match(EMAIL_PATTERN)) {
      return (
        <a href={`mailto:${part}`} key={`${part}-${index}`}>
          {part}
        </a>
      );
    }

    return part;
  });
};

const ChatBot = () => {
  const [pjChatOpen, setPjChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi, I am the ProJenius assistant. How can I help you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [helperIndex, setHelperIndex] = useState(0);
  const messageListRef = useRef(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHelperIndex((currentIndex) => (currentIndex + 1) % helperPrompts.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  const chatHistory = useMemo(
    () =>
      messages
        .filter((message) => message.role === "user" || message.role === "assistant")
        .map((message) => ({
          role: message.role,
          content: message.content,
        })),
    [messages],
  );

  const scrollToLatestMessage = () => {
    window.setTimeout(() => {
      messageListRef.current?.scrollTo({
        top: messageListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  };

  const sendMessageText = async (messageText) => {
    const message = messageText.trim();

    if (!message || loading) {
      return;
    }

    setInput("");
    setLoading(true);
    setMessages((currentMessages) => [
      ...currentMessages,
      { role: "user", content: message },
    ]);
    scrollToLatestMessage();

    try {
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          history: chatHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Chat request failed.");
      }

      if (data.action?.type === "open_url" && data.action.url) {
        window.open(data.action.url, "_blank", "noopener,noreferrer");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: data.reply,
          actions: data.actions || [],
        },
      ]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content:
            "I cannot reach the ProJenius Innovation Technology assistant right now. Please make sure the chat server and Ollama are running.",
        },
      ]);
    } finally {
      setLoading(false);
      scrollToLatestMessage();
    }
  };

  const runAction = (action) => {
    if (action.type === "open_url" && action.url) {
      window.open(action.url, "_blank", "noopener,noreferrer");
      return;
    }

    if (action.type === "send_message" && action.message) {
      sendMessageText(action.message);
    }
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    sendMessageText(input);
  };

  return (
    <>
      {!pjChatOpen && (
        <div className="pj-chatbot-launcher">
          <div className="pj-chatbot-helper-bubble">
            {helperPrompts[helperIndex]}
          </div>
          <button
            className="pj-chatbot-toggle-btn"
            onClick={() => setPjChatOpen(true)}
            aria-label="Open ProJenius chat"
          >
            <i className="bi bi-chat-dots-fill"></i>
          </button>
        </div>
      )}

      {pjChatOpen && (
        <div className="pj-chatbot-wrapper">
          <div className="pj-chatbot-header">
            <div>
              <span>ProJenius Innovation Technology</span>
              <small>I am here to assist you</small>
            </div>
            <button
              className="pj-chatbot-close-btn"
              onClick={() => setPjChatOpen(false)}
              aria-label="Close chatbot"
            >
              x
            </button>
          </div>

          <div className="pj-chatbot-messages" ref={messageListRef}>
            {messages.map((message, index) => (
              <div
                className={`pj-chatbot-message pj-chatbot-message-${message.role}`}
                key={`${message.role}-${index}`}
              >
                {renderMessageContent(message.content)}
                {message.actions?.length > 0 && (
                  <div className="pj-chatbot-action-row">
                    {message.actions.map((action) => (
                      <button
                        type="button"
                        className="pj-chatbot-action-btn"
                        key={`${action.label}-${action.url || action.message}`}
                        onClick={() => runAction(action)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="pj-chatbot-message pj-chatbot-message-assistant">
                ProJenius is thinking...
              </div>
            )}
          </div>

          <div className="pj-chatbot-quick-actions">
            {quickActions.map((action) => (
              <button
                type="button"
                key={action.label}
                onClick={() => runAction(action)}
              >
                {action.label}
              </button>
            ))}
          </div>

          <form className="pj-chatbot-form" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about courses, services, workshops..."
              aria-label="Message"
            />
            <button type="submit" disabled={loading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
