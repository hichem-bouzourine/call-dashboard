import callsData from '../../../../../data/data.json';

export const GET = async (req: Request, res: Response) => {
  // Parse URL and get 'to' query parameter (trimmed)
  const url = new URL(req.url, 'http://localhost:3000');
  const toValue = url.searchParams.get('to')?.trim();

  if (toValue == undefined ) {
    return new Response("Bad Request, Destination not inserted",{ status: 400 });
  } 

  // Construct complete phone number (add leading '+' if needed)
  const correctNumber = "+" + (toValue || "");
    
  const filteredCalls = toValue ? callsData.filter(call => call.to === correctNumber) : [];

  if (filteredCalls.length === 0) {
    return new Response("No calls found for this destination", { status: 404 });
  }

  // get number of unique callers
    const uniqueCallers = new Set<string>();
    filteredCalls.forEach(call => {
      uniqueCallers.add(call.from);
    });

    // convert set to array in order to send it as a JSON response
    const uniqueCallersArray = Array.from(uniqueCallers);


  return new Response(JSON.stringify(uniqueCallersArray), { status: 200 });
};
