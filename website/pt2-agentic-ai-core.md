# CursorAI Prompt — Create `src/utils/agenticAI.js`

## Objective
Build a utility module that powers an **agentic AI sustainability coach**.  
This file handles system prompt generation, API communication, proactive suggestions, and action feedback learning.

---

## File Path
`src/utils/agenticAI.js`

---

## Environment Configuration

### .env File Setup
Create a `.env` file in the project root with:
```
VITE_LITELLM_API_KEY=your_api_key_here
VITE_LITELLM_GATEWAY_URL=https://your-duke-litellm-gateway-url.com
```

**Note:** The gateway URL should point to Duke's LiteLLM Enterprise Edition endpoint.  
The API key should be your authentication token for the gateway.

---

## Instructions

### 1. Imports
- Import `userProfile` from `'./userProfile.js'`
- Import `fetch` if running in Node (optional — check if not globally available)

---

### 2. Function: `buildSystemPrompt(userProfile)`

**Goal:** Generate a full system prompt string for the AI.

**Contents of the string:**
- `"You are an agentic AI sustainability coach for [userName]."`
- The full user profile summary (routine, preferences, history)
- Behavioral instructions:
  - Proactively suggest actions based on their routine and context  
  - Reference their past successes and failures  
  - Learn from rejections — if they rejected X because Y, don't suggest similar  
  - Personalize everything — never give generic advice  
  - Celebrate progress and adjust difficulty based on success rate  
  - Be encouraging but realistic about constraints  
- Include time/day context awareness rules  

**Example Return:**
```js
return `
You are an agentic AI sustainability coach for ${userProfile.userName || "a user"}.
Profile Summary:
${userProfile.getSummaryForAI()}

Behavior Guidelines:
- Proactively suggest actions based on their routine and context.
- Reference their past successes and failures.
- Learn from rejections — if they rejected X because Y, don't suggest similar.
- Personalize everything — never give generic advice.
- Celebrate progress and adjust difficulty based on success rate.
- Be encouraging but realistic about constraints.

Time/Day Context Awareness:
- Adapt tone and suggestions to fit current day rhythms and habits.
`;
```

---

### 3. Async Function: `callAgenticAI(userMessage, conversationHistory)`

**Purpose:**  
Communicates with GPT-4.1-mini via Duke's LiteLLM Enterprise Edition gateway.

**Steps:**
1. Build system prompt via `buildSystemPrompt(userProfile)`
2. Make POST request to LiteLLM gateway endpoint
3. Use OpenAI-compatible API format
4. Model: `"gpt-4.1-mini"`
5. Headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer ${import.meta.env.VITE_LITELLM_API_KEY}`
6. Include conversationHistory array of `{ role, content }`
7. Return assistant's text response
8. Include error handling and friendly fallback messages

**Example Implementation:**
```js
export async function callAgenticAI(userMessage, conversationHistory = []) {
  try {
    const systemPrompt = buildSystemPrompt(userProfile);
    const apiKey = import.meta.env.VITE_LITELLM_API_KEY;
    const gatewayUrl = import.meta.env.VITE_LITELLM_GATEWAY_URL;

    if (!apiKey || !gatewayUrl) {
      throw new Error("Missing API key or gateway URL. Please check your .env file.");
    }

    // Construct the full endpoint URL (LiteLLM uses OpenAI-compatible /v1/chat/completions)
    const endpoint = gatewayUrl.endsWith('/') 
      ? `${gatewayUrl}v1/chat/completions`
      : `${gatewayUrl}/v1/chat/completions`;

    const payload = {
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...conversationHistory,
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response from assistant.";
  } catch (err) {
    console.error("Error in callAgenticAI:", err);
    return "Sorry, I encountered a technical issue while processing your message. Please check your API configuration.";
  }
}
```

---

## Notes

- **LiteLLM Gateway:** Uses OpenAI-compatible API format, so the endpoint should be `/v1/chat/completions`
- **Model Name:** Verify the exact model name with your LiteLLM gateway (may be `gpt-4.1-mini`, `gpt-4o-mini`, or similar)
- **Environment Variables:** Vite requires `VITE_` prefix for environment variables to be accessible in the browser
- **Error Handling:** Always provide user-friendly error messages and log technical details to console
