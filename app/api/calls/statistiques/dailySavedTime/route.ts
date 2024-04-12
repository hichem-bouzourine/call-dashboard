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

  // Sort calls by date (ascending order)
  filteredCalls.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Get the oldest and newest call dates
  const oldestDate = new Date(filteredCalls[0].date);
  const newestDate = new Date(filteredCalls[filteredCalls.length - 1].date);

  // Calculate the number of days between the oldest and newest call dates
  const numberOfDays = Math.ceil((newestDate.getTime() - oldestDate.getTime()) / (1000 * 60 * 60 * 24))+1;

  // Calculate time saved for each call
  const timeSavedPerCall = filteredCalls.map(call => {
    if (call.subject === 'appointment') {
      return 5; // Time saved for appointment calls: 5 minutes
    } else {
      return 3; // Time saved for other calls: 3 minutes
    }
  });

  // Calculate total time saved for all calls
  const totalTimeSaved = timeSavedPerCall.reduce((acc, curr) => acc + curr, 0);

  // Calculate daily average time saved
  const dailyAverage = totalTimeSaved / numberOfDays;

  return new Response(JSON.stringify(dailyAverage), { status: 200 });
}