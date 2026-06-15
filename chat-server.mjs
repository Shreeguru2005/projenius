import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = Number(process.env.CHAT_PORT || 8787);
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const CHAT_MODEL = process.env.OLLAMA_CHAT_MODEL || "llama3.2:3b";
const EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || "nomic-embed-text";
const PRIMARY_PHONE = "+91 89254 50473";
const WHATSAPP_PHONE = "+91 89254 50473";
const EMAIL = "teamprojenius2025@gmail.com";
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=ProJenius%20Innovation%20Technology%20Madurai%20Tamil%20Nadu%20India";
const WHATSAPP_URL =
  "https://wa.me/918925450473?text=Hello%20ProJenius%2C%20I%20want%20to%20know%20more%20about%20your%20services.";
const INTERNSHIP_WHATSAPP_URL =
  "https://wa.me/918925450473?text=Hello%20ProJenius%2C%20I%20want%20to%20apply%20for%20an%20internship.";
const COURSE_WHATSAPP_URL =
  "https://wa.me/918925450473?text=Hello%20ProJenius%2C%20I%20want%20course%20details.";

const knowledgeFiles = [
  "company.txt",
  "courses.txt",
  "services.txt",
  "faqs.txt",
  "contact.txt",
  "company-knowledge.json",
  "people.txt",
  "about-full.txt",
  "services-full.txt",
  "courses-full.txt",
  "workshops-full.txt",
  "startup-full.txt",
  "products-projects.txt",
  "blogs-testimonials-pricing.txt",
  "internship-full.txt",
];
let knowledgeIndex = [];
let isOllamaAvailable = false;

const contactActions = [
  { label: "Call", type: "open_url", url: "tel:+918925450473" },
  { label: "WhatsApp", type: "open_url", url: WHATSAPP_URL },
  { label: "Email", type: "open_url", url: `mailto:${EMAIL}` },
  { label: "Google Maps", type: "open_url", url: GOOGLE_MAPS_URL },
];

const defaultActions = [
  { label: "Courses", type: "send_message", message: "What courses do you offer?" },
  { label: "Internship", type: "send_message", message: "What internships do you offer?" },
  { label: "Services", type: "send_message", message: "What services do you provide?" },
  { label: "Contact", type: "send_message", message: "How can I contact ProJenius?" },
];

function result(reply, action = null, actions = []) {
  return { reply, action, actions };
}

async function readJsonRequest(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  return rawBody ? JSON.parse(rawBody) : {};
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  });

  res.end(JSON.stringify(payload));
}

function splitIntoChunks(source, text) {
  return text
    .split(/\n\s*\n/g)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk, index) => ({
      id: `${source}-${index}`,
      source,
      text: chunk,
    }));
}

async function ollamaEmbed(input) {
  const response = await fetch(`${OLLAMA_URL}/api/embed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: EMBED_MODEL,
      input,
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama embed failed: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data.embeddings) ? data.embeddings[0] : data.embedding;
}

function cosineSimilarity(a, b) {
  let dot = 0;
  let aMagnitude = 0;
  let bMagnitude = 0;

  for (let i = 0; i < Math.min(a.length, b.length); i += 1) {
    dot += a[i] * b[i];
    aMagnitude += a[i] * a[i];
    bMagnitude += b[i] * b[i];
  }

  if (!aMagnitude || !bMagnitude) {
    return 0;
  }

  return dot / (Math.sqrt(aMagnitude) * Math.sqrt(bMagnitude));
}

function getDirectAnswer(message) {
  const normalized = message.toLowerCase();

  if (/\b(map|google map|maps|direction|directions|navigate|navigation)\b/.test(normalized)) {
    return result(
      `Opening ProJenius on Google Maps. If it does not open automatically, use this link: ${GOOGLE_MAPS_URL}`,
      {
        type: "open_url",
        url: GOOGLE_MAPS_URL,
      },
      contactActions,
    );
  }

  if (/\b(address|office|location|located|where are you|where is projenius)\b/.test(normalized)) {
    return result(
      `We are located in Madurai, Tamil Nadu, India. Google Maps: ${GOOGLE_MAPS_URL}`,
      null,
      [{ label: "Open Maps", type: "open_url", url: GOOGLE_MAPS_URL }, ...contactActions.slice(0, 3)],
    );
  }

  if (/\b(contact|reach|connect|talk to|speak to|get in touch|support)\b/.test(normalized)) {
    return result(
      `You can contact our team at ${PRIMARY_PHONE}. You can also reach us on WhatsApp at ${WHATSAPP_PHONE} or email us at ${EMAIL}. You can use the contact form on this website as well.`,
      null,
      contactActions,
    );
  }

  if (/\b(phone|contact number|mobile|call|whatsapp|number)\b/.test(normalized)) {
    return result(
      `You can contact our team at ${PRIMARY_PHONE}. You can also reach us on WhatsApp at ${WHATSAPP_PHONE}.`,
      null,
      contactActions.slice(0, 2),
    );
  }

  if (/\b(email|mail|gmail)\b/.test(normalized)) {
    return result(`Our email address is ${EMAIL}.`, null, [
      { label: "Email", type: "open_url", url: `mailto:${EMAIL}` },
      { label: "Call", type: "open_url", url: "tel:+918925450473" },
    ]);
  }

  if (/\b(apply|join|enroll|enrol|admission|register)\b/.test(normalized)) {
    const isInternship = /\b(intern|internship)\b/.test(normalized);
    const isCourse = /\b(course|training|class|program)\b/.test(normalized);
    const url = isInternship ? INTERNSHIP_WHATSAPP_URL : isCourse ? COURSE_WHATSAPP_URL : WHATSAPP_URL;
    const label = isInternship ? "Apply on WhatsApp" : isCourse ? "Ask Course Details" : "Message on WhatsApp";

    return result(
      `Sure. Please contact our team at ${PRIMARY_PHONE}, or continue on WhatsApp and our team will guide you with the next steps.`,
      { type: "open_url", url },
      [{ label, type: "open_url", url }, { label: "Call", type: "open_url", url: "tel:+918925450473" }],
    );
  }

  if (/\b(certificates?|certifications?|completion certificate|internship certificate)\b/.test(normalized)) {
    return result(
      `Yes. Our internship benefits include an Internship Certificate and Project Completion Certificate. For exact eligibility and process details, contact our team at ${PRIMARY_PHONE}.`,
      null,
      contactActions.slice(0, 2),
    );
  }

  if (/\b(online|offline|hybrid|mode)\b/.test(normalized) && /\b(intern|internship|course|training)\b/.test(normalized)) {
    return result(
      `Our internship program supports Online, Offline, and Hybrid modes. For the currently available batches, contact our team at ${PRIMARY_PHONE}.`,
      null,
      contactActions.slice(0, 2),
    );
  }

  if (/\b(duration|how long|months|month)\b/.test(normalized) && /\b(intern|internship|course|training|program)\b/.test(normalized)) {
    return result(
      `Our internship durations include 1 Month, 3 Months, and 6 Months. Course and project timelines depend on the selected program, so please contact our team at ${PRIMARY_PHONE} for the best option.`,
      null,
      contactActions.slice(0, 2),
    );
  }

  if (/\b(placement|job support|career support|hiring)\b/.test(normalized)) {
    return result(
      `Yes. Our internship benefits include Placement Assistance, Resume Building Support, LinkedIn Profile Optimization, mentorship, and career guidance. For details, contact our team at ${PRIMARY_PHONE}.`,
      null,
      contactActions.slice(0, 2),
    );
  }

  if (/\b(final year|mini project|major project|college project|student project|project development)\b/.test(normalized)) {
    return result(
      `Yes. We support students with project guidance and development, including software, IoT, AI, web, and hardware-based projects. To discuss your project, contact our team at ${PRIMARY_PHONE}.`,
      null,
      contactActions.slice(0, 2),
    );
  }

  if (/\b(fee|fees|price|pricing|cost|charges|package)\b/.test(normalized)) {
    return result(
      `Pricing depends on the selected course, internship, service, or project scope. The website shows monthly and yearly package examples, but for current fees and an accurate quote, contact our team at ${PRIMARY_PHONE}.`,
      null,
      contactActions.slice(0, 2),
    );
  }

  if (/\b(ceo|chief executive officer)\b/.test(normalized)) {
    return result(
      "Harshini M is the CEO and Co-Founder of ProJenius.",
      null,
      contactActions.slice(0, 2)
    );
  }

  if (/\b(founder|co-founder|co-founders|founded)\b/.test(normalized)) {
    return result(
      "Karthick Ganesh M is the Founder and COO of ProJenius, and Harshini M is the CEO and Co-Founder.",
      null,
      contactActions.slice(0, 2)
    );
  }

  if (/\b(internships?|internship domains?)\b/.test(normalized)) {
    return result(
      "We offer internships in Full Stack, Frontend, Backend, React JS, Python, Java, AI/ML, Data Science, IoT, Blockchain, UI/UX, and Mobile App Development.",
      null,
      contactActions.slice(0, 2)
    );
  }

  if (/\b(courses?|training programs?|what courses)\b/.test(normalized)) {
    return result(
      "We offer courses in React Development, UI/UX Designing, Python Programming, IoT Development, Digital Marketing, and Data Analytics.",
      null,
      contactActions.slice(0, 2)
    );
  }

  return null;
}

function findRelevantKnowledgeFallback(message) {
  const words = message.toLowerCase().split(/\W+/).filter((w) => w.length > 2);
  if (words.length === 0) return [];

  return knowledgeIndex
    .map((chunk) => {
      const text = chunk.text.toLowerCase();
      let score = 0;
      for (const word of words) {
        if (text.includes(word)) {
          const regex = new RegExp("\\b" + word + "\\b");
          if (regex.test(text)) {
            score += 3;
          } else {
            score += 1;
          }
        }
      }
      return { ...chunk, score };
    })
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

async function loadKnowledge() {
  const chunks = [];

  for (const file of knowledgeFiles) {
    const text = await readFile(join(__dirname, "knowledge", file), "utf8");
    chunks.push(...splitIntoChunks(file, text));
  }

  try {
    // Attempt to test Ollama connection
    console.log("Checking if local Ollama server is running...");
    await fetch(`${OLLAMA_URL}/api/tags`);
    
    console.log("Ollama server found. Generating knowledge embeddings...");
    knowledgeIndex = await Promise.all(
      chunks.map(async (chunk) => ({
        ...chunk,
        embedding: await ollamaEmbed(chunk.text),
      })),
    );
    isOllamaAvailable = true;
    console.log(`Loaded ${knowledgeIndex.length} knowledge chunks with embeddings.`);
  } catch (err) {
    console.warn("Ollama is not running or accessible. Starting in offline fallback mode.");
    knowledgeIndex = chunks.map((chunk) => ({
      ...chunk,
      embedding: null,
    }));
    isOllamaAvailable = false;
    console.log(`Loaded ${knowledgeIndex.length} knowledge chunks in fallback mode.`);
  }
}

async function findRelevantKnowledge(message) {
  if (!knowledgeIndex.length) {
    return [];
  }

  const queryEmbedding = await ollamaEmbed(message);

  return knowledgeIndex
    .map((chunk) => ({
      ...chunk,
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

async function askOllama(message, history = []) {
  const directAnswer = getDirectAnswer(message);

  if (directAnswer) {
    return directAnswer;
  }

  if (!isOllamaAvailable) {
    const matches = findRelevantKnowledgeFallback(message);
    if (matches.length > 0 && matches[0].score >= 2) {
      return {
        reply: matches[0].text,
        action: null,
        actions: defaultActions,
      };
    }
    return {
      reply: `I do not have that exact detail right now. Please contact our team at ${PRIMARY_PHONE}, and we will guide you with the correct information.`,
      action: null,
      actions: defaultActions,
    };
  }

  const matches = await findRelevantKnowledge(message);
  const context = matches
    .map((match) => `[${match.source}]\n${match.text}`)
    .join("\n\n");

  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: CHAT_MODEL,
      stream: false,
      options: {
        temperature: 0.2,
      },
      messages: [
        {
          role: "system",
          content:
            `You are the official ProJenius website assistant. Speak as ProJenius using "we", "our", and "our team"; do not refer to ProJenius as a third party. Answer using only the supplied ProJenius knowledge context. Be concise, professional, and helpful. If the answer is not in the context, say: "I do not have that exact detail right now. Please contact our team at ${PRIMARY_PHONE}, and we will guide you with the correct information." Do not invent prices, dates, phone numbers, addresses, or guarantees.`,
        },
        {
          role: "user",
          content: `ProJenius knowledge context:\n${context || "No matching context found."}`,
        },
        ...history.slice(-6),
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama chat failed: ${response.status}`);
  }

  const data = await response.json();
  return {
    reply: data.message?.content?.trim() || "I could not generate a response.",
    action: null,
    actions: defaultActions,
  };
}

const server = createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (req.method === "GET" && req.url === "/api/health") {
    sendJson(res, 200, {
      ok: true,
      chatModel: CHAT_MODEL,
      embedModel: EMBED_MODEL,
      knowledgeChunks: knowledgeIndex.length,
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/chat") {
    try {
      const body = await readJsonRequest(req);
      const message = String(body.message || "").trim();
      const history = Array.isArray(body.history) ? body.history : [];

      if (!message) {
        sendJson(res, 400, { error: "Message is required." });
        return;
      }

      const result = await askOllama(message, history);
      if (
        /do not have|don't have|not in the context|not available|not know|cannot provide/i.test(
          result.reply || "",
        )
      ) {
        sendJson(
          res,
          200,
          {
            reply: `I do not have that exact detail right now. Please contact our team at ${PRIMARY_PHONE}, and we will guide you with the correct information.`,
            action: null,
            actions: contactActions,
          },
        );
        return;
      }

      sendJson(res, 200, {
        ...result,
        actions: result.actions?.length ? result.actions : defaultActions,
      });
    } catch (error) {
      console.error(error);
      sendJson(res, 500, {
        error:
          "The local AI server could not answer. Check that Ollama is running and the required models are installed.",
      });
    }

    return;
  }

  sendJson(res, 404, { error: "Not found." });
});

loadKnowledge()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`ProJenius local chat API running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start local chat API.");
    console.error(error);
    process.exit(1);
  });
