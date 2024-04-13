import callsData from '../../../../data/data.json';

export const GET = async (req: Request, res: Response) => {

    // create a set of unique 'to' numbers from callsData
    const uniqueTo: string[] = Array.from(new Set(callsData.map((call) => call.to)));

    // Respond with JSON-encoded unique dest (status 200)
    return new Response(JSON.stringify(uniqueTo), { status: 200 });
    // Respond with JSON-encoded calls (status 200)
};
