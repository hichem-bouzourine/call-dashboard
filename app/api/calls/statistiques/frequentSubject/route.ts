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

  // get the frequent subject of calls (subject is string)
    const subjectMap = new Map<string, number>();
    filteredCalls.forEach(call => {
      if (call.subject) {
        const count = subjectMap.get(call.subject) || 0;
        subjectMap.set(call.subject, count + 1);
      }
    });

    let maxCount = 0;
    let frequentSubject = null;
    
    subjectMap.forEach((count, subject) => {
      if (count > maxCount) {
        maxCount = count;
        frequentSubject = subject;
      }
    });  

  return new Response(JSON.stringify(frequentSubject), { status: 200 });
};
