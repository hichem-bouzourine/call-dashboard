import callsData from '../../../data/data.json';

export const GET = async (req: Request, res: Response) => {
  // Parse URL and get 'to' query parameter (trimmed)
  const url = new URL(req.url, 'http://localhost:3000');
  const toValue = url.searchParams.get('to')?.trim();

  if (toValue !== undefined ) {

    // Construct complete phone number (add leading '+' if needed)
    const correctNumber = "+" + (toValue || "");
    
    // Filter calls based on 'to' number
    const filteredCalls = toValue ? callsData.filter(call => call.to === correctNumber) : [];
    
    // Respond with JSON-encoded filtered calls (status 200)
    return new Response(JSON.stringify(filteredCalls), { status: 200 });
  } else {
    
    // Respond with JSON-encoded calls (status 200)
    return new Response(JSON.stringify(callsData), { status: 200 });
  }
};
