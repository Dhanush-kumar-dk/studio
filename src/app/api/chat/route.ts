import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { getArticles } from '@/app/actions';

// Open-source model caller for Groq / HuggingFace / OpenRouter
async function callOpenSourceModel(messages: { role: string; content: string }[]): Promise<string | null> {
  const groqApiKey = process.env.GROQ_API_KEY;
  const hfApiKey = process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN;
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  // 1. Try Groq (Llama-3.3-70B - fastest open-source inference)
  if (groqApiKey) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content || null;
      }
    } catch (e) {
      console.warn('Groq open-source inference failed, falling back:', e);
    }
  }

  // 2. Try OpenRouter (Open-source free tier)
  if (openRouterApiKey) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openRouterApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://debtanddominion.com',
          'X-Title': 'Debt & Dominion News AI',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content || null;
      }
    } catch (e) {
      console.warn('OpenRouter open-source inference failed, falling back:', e);
    }
  }

  // 3. Try Hugging Face Serverless
  if (hfApiKey) {
    try {
      const res = await fetch('https://router.huggingface.co/hf-inference/models/meta-llama/Llama-3.1-8B-Instruct/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hfApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/Llama-3.1-8B-Instruct',
          messages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content || null;
      }
    } catch (e) {
      console.warn('Hugging Face inference failed, falling back:', e);
    }
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Grounding: Fetch latest published articles from Debt & Dominion
    let newsContext = '';
    try {
      const articles = await getArticles();
      if (articles && articles.length > 0) {
        const topArticles = articles.slice(0, 10);
        newsContext = topArticles
          .map(
            (a) =>
              `- Title: "${a.title}"\n  Category: ${a.category}\n  Author: ${a.author}\n  Date: ${new Date(a.publishedAt).toLocaleDateString()}\n  Slug: /articles/${a.slug}\n  Summary: ${a.excerpt}`
          )
          .join('\n\n');
      }
    } catch (e) {
      console.warn('Could not fetch articles for news context:', e);
    }

    const systemPrompt = `You are the Debt & Dominion News AI Analyst, an intelligent journalism and geopolitical intelligence assistant powered by open-source news models.
Debt & Dominion is an elite media publication reporting on global debt cycles, macroeconomic trends, financial dominance, geopolitical power shifts, and emerging technologies.

CURRENT PUBLISHED ARTICLES & ARCHIVE ON DEBT & DOMINION:
${newsContext || 'No articles loaded currently.'}

CORE GUIDELINES:
1. When users ask about topics, events, or news covered on Debt & Dominion, cite the relevant articles and link to them using markdown: [Article Title](/articles/slug).
2. For general macroeconomic or geopolitical questions (e.g. inflation, sovereign debt, currency reserves, sanctions, tech regulation), provide clear, insightful, data-backed explanations.
3. Maintain an authoritative, journalistic, objective tone — analytical, sophisticated, yet accessible to readers.
4. Keep answers focused, engaging, and well-structured with short paragraphs or bullet points.`;

    const openSourceMessages = [
      { role: 'system', content: systemPrompt },
      ...(Array.isArray(history)
        ? history.map((h: { role: string; text: string }) => ({
            role: h.role === 'user' ? 'user' : 'assistant',
            content: h.text,
          }))
        : []),
      { role: 'user', content: message },
    ];

    // Attempt dedicated open-source endpoint (Groq / OpenRouter / HuggingFace)
    const openSourceResponse = await callOpenSourceModel(openSourceMessages);
    if (openSourceResponse) {
      return NextResponse.json({ text: openSourceResponse, model: 'Open-Source (Llama 3.3)' });
    }

    // Default high-performance news intelligence engine (Gemini 2.5 Flash)
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      const prompt = `${systemPrompt}\n\nUser Question: ${message}`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      return NextResponse.json({ text, model: 'Debt & Dominion News Intelligence' });
    }

    return NextResponse.json(
      { error: 'No AI model provider configured. Set GEMINI_API_KEY, GROQ_API_KEY, or HUGGINGFACE_API_KEY.' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('News chatbot error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to generate response' }, { status: 500 });
  }
}
