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

  // get the average time of the calls
  const averageTime = filteredCalls.reduce((acc, call) => {
    if (call.to === correctNumber) {
      return acc + call.duration;
    } else {
      return acc;
    }
  }, 0) / filteredCalls.length;

  return new Response(JSON.stringify(averageTime), { status: 200 });
};
