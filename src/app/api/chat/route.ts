import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || "";

  let reply = "I'm PayGroq. Tell me what you'd like to buy!";
  
  if (lastMessage.includes("sneakers") || lastMessage.includes("buy")) {
    reply = "Excellent choice! I've found the Nike Air Max in your size. Are you ready to checkout?";
  }

  // Create a simple stream to simulate AI SDK
  const stream = new ReadableStream({
    async start(controller) {
      const words = reply.split(" ");
      for (const word of words) {
        // Send format expected by useChat (0: text content)
        controller.enqueue(new TextEncoder().encode(`0:"${word} "\n`));
        await new Promise((r) => setTimeout(r, 50)); // simulate Groq LPU streaming speed
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
